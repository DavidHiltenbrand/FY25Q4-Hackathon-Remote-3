// macs old code borrowed 
import express from 'express';
import { MongoClient } from 'mongodb';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 9494;
const MAX_TOKENS = 8192;
const RESERVED_TOKENS = 1000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_URI;
const MONGODB_DATABASE_NAME = 'dish_genai';
const MONGODB_COLLECTION_NAME = 'customers';

// MongoDB client
const mongoClient = new MongoClient(MONGODB_CONNECTION_STRING);
await mongoClient.connect();
const db = mongoClient.db(MONGODB_DATABASE_NAME);
const mongoCollection = db.collection(MONGODB_COLLECTION_NAME);

// OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
//const openaiConfig = new Configuration({
//  apiKey: OPENAI_API_KEY,
//});
//const openai = new OpenAIApi(openaiConfig);

// Middleware to parse JSON
app.use(express.json());

// Function to calculate tokens
const numTokensFromMessages = (messages) => {
  let numTokens = 0;
  messages.forEach(message => {
    numTokens += 4; // Message format tokens
    for (const key in message) {
      numTokens += Buffer.byteLength(message[key], 'utf-8');
    }
  });
  return numTokens + 2; // Additional tokens for priming
};

// Function to get customer data from MongoDB
const getCustomerData = async (userGpsi) => {
  try {
    const customerData = await mongoCollection.findOne({ GPSI: userGpsi }, { projection: { _id: 0 } });
    return customerData ? JSON.stringify(customerData) : "No customer found with the provided GPSI.";
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw new Error("Error retrieving data");
  }
};

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

// Chat route
app.post('/chat', async (req, res) => {
  const { message: userMessage, gpsi: userGpsi, history: chatHistory = [] } = req.body;

  // System prompt
  const systemPrompt = { role: "system", content: "Given valid JSON data from a MongoDB database describing customer data, please answer the following question. Don't explain or elaborate, just answer." };
  
  // Add the system prompt to chat history if it doesn't exist
  if (!chatHistory.length || chatHistory[0].role !== 'system') chatHistory.unshift(systemPrompt);
  chatHistory.push({ role: "user", content: userMessage });

  // Get context from MongoDB
  const context = await getCustomerData(userGpsi);
  chatHistory.splice(1, 0, { role: "system", content: `Answer based on data in the following JSON:\n\n${context}` });

  // Trim messages if exceeding token limits
  while (numTokensFromMessages(chatHistory) + RESERVED_TOKENS > MAX_TOKENS) {
    if (chatHistory.length > 4) chatHistory.splice(2, 2); // Remove oldest user-assistant message pair after context
    else break;
  }

  // OpenAI request and response streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();

  const completionRequest = {
    model: "gpt-4o-mini",
    messages: chatHistory,
    stream: true,
  };

  try {
    const response = await openai.createChatCompletion(completionRequest, { responseType: 'stream' });
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(line => line.startsWith('data: '));
      lines.forEach((line) => {
        const message = line.substring(5).trim();
        if (message === '[DONE]') {
          res.write(`data: ${JSON.stringify({ done: true, history: chatHistory })}\n\n`);
          res.end();
        } else {
          const data = JSON.parse(message);
          const content = data.choices[0].delta.content;
          chatHistory.push({ role: "assistant", content });
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      });
    });
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    res.write(`data: ${JSON.stringify({ error: 'Failed to get response from OpenAI' })}\n\n`);
    res.end();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});