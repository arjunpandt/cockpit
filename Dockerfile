# Use a newer version of Node.js
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy the entire project directory into the Docker image
COPY . .

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Expose the port
EXPOSE 4200

# Start the Angular development server
CMD ["ng", "serve", "--host", "0.0.0.0"]
