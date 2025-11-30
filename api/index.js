// Vercel serverless function entry point
const express = require('express');
const path = require('path');

// For Vercel deployment, we need to export the Express app as a serverless function
// Note: This is a simplified version. You may need to adjust based on your server setup.

let app;

try {
  // Try to import the built server
  const serverModule = require(path.join(__dirname, '../dist/index.js'));
  app = serverModule.default || serverModule;
} catch (error) {
  console.error('Failed to load server:', error);
  // Fallback: create a basic Express app
  app = express();
  app.get('*', (req, res) => {
    res.status(500).json({ error: 'Server not properly built' });
  });
}

module.exports = app;
