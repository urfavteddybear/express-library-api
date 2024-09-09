# Use an official Node.js runtime as the base image
FROM node:20 AS express-library-api

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Verify that migration.js is present
RUN ls /app/database/

# Run migrations and seed after all files are copied
RUN npm run migration
RUN npm run seed

# Define the command to run your application
CMD ["node", "app.js"]