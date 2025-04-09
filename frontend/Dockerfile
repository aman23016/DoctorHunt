# Step 1: Use an official Node.js image as a base image
FROM node:16 as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use Nginx to serve the frontend
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to the outside world
EXPOSE 80

# Step 10: Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
