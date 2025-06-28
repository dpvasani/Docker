# Use the latest Node.js with Alpine as the base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Set environment variables if needed
ENV PORT=8000

# Expose the required port
EXPOSE 8000

# Start the app
CMD ["npm", "start"]
