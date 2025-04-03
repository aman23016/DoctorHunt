# Step 1: Use an official Node.js runtime as a base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port on which the service will run
EXPOSE 5001

# Step 7: Run the application
CMD ["npm", "start"]
