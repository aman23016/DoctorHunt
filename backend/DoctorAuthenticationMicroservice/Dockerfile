# Use official Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Now copy all application code (including Config folder, server.js, etc.)
COPY . .

# Expose the port your app will run on (port 5001)
EXPOSE 5001

# Command to start your application (ensure the "start" script exists in package.json)
CMD ["npm", "start"]
