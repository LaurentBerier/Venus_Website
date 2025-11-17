// Vercel serverless function entry point
import { createApp } from '../dist/index.js';

let appInstance;

// Create the app instance once and reuse it for subsequent requests
async function getApp() {
  if (!appInstance) {
    try {
      const { app } = await createApp();
      appInstance = app;
    } catch (error) {
      console.error('Failed to create app:', error);
      throw error;
    }
  }
  return appInstance;
}

// Export as a serverless function handler
export default async function handler(req, res) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
