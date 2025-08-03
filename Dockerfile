# Use Node.js LTS version
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create uploads directory
RUN mkdir -p uploads && chmod 777 uploads

# Build the application
RUN npm run build

# Expose the port your app runs on
ENV PORT=3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]