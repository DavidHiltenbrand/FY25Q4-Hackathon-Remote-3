# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Set the environment variable to have Next.js listen on port 8080
ENV PORT 8080

# Start the Next.js app on the specified port
CMD ["npm", "start"]
