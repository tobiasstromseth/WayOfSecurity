FROM node:19-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["npm", "start"]