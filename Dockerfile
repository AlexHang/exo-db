FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY src/web/package*.json ./src/web/
COPY src/api/package*.json ./src/api/

# Install dependencies
RUN npm install
RUN cd src/web && npm install
RUN cd src/api && npm install

# Copy source code
COPY . .

# Run web
RUN cd src/web && npm run dev

# Run api web
RUN cd src/api && npm run dev

EXPOSE 3000 5000