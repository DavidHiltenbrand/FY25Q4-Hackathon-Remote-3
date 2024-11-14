
import dotenv from "dotenv/config";
import express from "express";
import axios from "axios";
import { MongoClient } from "mongodb";
import OpenAI from 'openai';
import cors from "cors";


const app = express();
const PORT = 3000;
app.use(cors());


// OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

// MongoDB client and connection
const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  let db;
  
  // Connect to MongoDB
  async function connectToMongoDB() {
    try {
      await client.connect();
      db = client.db("equipment_monitor"); 
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
    }
  }
  
  // Example route to test MongoDB connection and fetch data
  app.get('/data', async (req, res) => {
    try {
      const collection = db.collection('movies'); 
      const data = await collection.find({}).toArray();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

// Route to handle queries to OpenAI
app.get('/ask', async (req, res) => {
  const question = req.query.question;

  if (!question) {
    return res.status(400).json({ error: 'Please provide a question query parameter' });
  }

  try {
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // or another model if preferred
        messages: [{ role: 'user', content: question }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Send back the response from OpenAI
    const answer = response.data.choices[0].message.content;
    res.json({ question, answer });
  } catch (error) {
    console.error('Error contacting OpenAI:', error);
    res.status(500).json({ error: 'Error contacting OpenAI' });
  }
});

// Route to get a record from MongoDB
app.get('/api/metrics', async (req, res) => {
  try {
      const q = {"site_id": req.query.siteid};
      console.log(q)
      //const query = { "site_id": "washpark" }; // Define your filter criteria
      const options = {
        sort: { "timestamp": -1 }, // Sort by timestamp in descending order
        projection: { _id: 0 } // Exclude the _id field
      };
  
      // Use the variable `collectionName` to specify the collection
      const record = await db.collection("events").findOne(q, options);
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
  });

// Start the server
app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});