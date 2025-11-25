require('dotenv').config();

// server.js - A custom Node.js server without the Express framework.

const http = require('http');
const mongoose = require('mongoose');
const { handleApiRequest } = require('./routes');

// 1. Config from .env (with safe defaults for local)
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifelineDB';
const CLIENT_URL =
  process.env.CLIENT_URL || 'http://localhost:3000';

// 2. MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 3. HTTP server
const server = http.createServer((req, res) => {
  // 🔹 CORS HEADERS (allow React from localhost OR deployed frontend)
  const origin = req.headers.origin || CLIENT_URL;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 🔹 Log every incoming request (for debugging)
  console.log('👉 Incoming:', req.method, req.url);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Delegate to our API router
  handleApiRequest(req, res);
});

// 4. Start server
server.listen(PORT, () => {
  console.log(
    `🚀 Backend server (no-express) running on port ${PORT}`
  );
});
