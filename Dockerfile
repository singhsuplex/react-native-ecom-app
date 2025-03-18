# Use official Node.js image as base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Ensure package-lock.json is used for strict versioning
RUN npm ci --legacy-peer-deps

# Copy the entire project to the container
COPY . .

# Expose the port your React Native app will run on (default 8081)
EXPOSE 8081

# Command to run React Native in development mode
CMD ["npx", "react-native", "start"]
