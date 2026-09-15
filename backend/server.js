require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const auditRouter = require('./routes/audit');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow requests from any frontend port/domain in development
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Intellix Business Plan Audit API',
    version: '1.0.0',
    aiEngine: {
      provider: process.env.USE_LOCAL_PYTHON_MODEL === 'true' ? 'Local Python Transformers' : 'Hugging Face Inference API',
      model: process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct',
      tokenConfigured: Boolean(process.env.HF_TOKEN)
    }
  });
});

// Routes
app.use('/api/audit', auditRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]:', err);

  const statusCode = err.status || (err.message && err.message.includes('Invalid file type') ? 400 : 500);
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error during business plan analysis.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Intellix Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📄 Audit API: POST http://localhost:${PORT}/api/audit`);
  console.log(`🦙 AI Model: ${process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct'}`);
  console.log(`🔑 HF Token: ${process.env.HF_TOKEN ? 'Configured ✅' : 'Not set (heuristic fallback active) ⚠️'}`);
  console.log(`=======================================================`);
});
