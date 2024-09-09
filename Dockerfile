# Use an official Node.js runtime as the base image
FROM node:20 AS express-library-api

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY src/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY src/ .

RUN npm run migration

RUN npm run seed

# Define the command to run your bot
CMD ["node", "app.js"]