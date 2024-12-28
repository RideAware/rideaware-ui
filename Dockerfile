# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json to avoid unnecessary rebuilds
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:1.25-alpine

# Copy the built files to the Nginx web server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

