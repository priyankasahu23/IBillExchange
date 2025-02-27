# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Disable strict SSL in npm
RUN npm config set strict-ssl false

# Upgrade npm to the latest version
RUN npm install -g npm@10.9.2

# Clear the npm cache
RUN npm cache clean --force

# Install project dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Serve the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
