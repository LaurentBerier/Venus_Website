# Vercel Deployment Guide

This guide will help you deploy the Osman Ghazi: Ottoman Rising website to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for CLI deployment)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-git-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Configure Environment Variables** (if needed)
   - In the Vercel dashboard, go to your project settings
   - Add any required environment variables:
     - `SESSION_SECRET` - Your session secret key
     - `RESEND_API_KEY` - Resend API key for contact form delivery
     - `CONTACT_TO_EMAIL` - Recipient inbox for contact submissions
     - `CONTACT_FROM_EMAIL` - Verified sender address (Resend domain required)
     - Any other API keys or configuration values

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a production URL once deployment is complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Configuration

The project includes a `vercel.json` configuration file with the following setup:

- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Node.js Runtime**: 20.x
- **Routes**: 
  - `/api/*` → Serverless functions
  - Static assets → Direct serving
  - All other routes → SPA routing to `index.html`

## Important Notes

### Static Assets
The following directories contain static assets that need to be accessible:
- `/attached_assets/` - Game images and media
- `/assets/` - Build-time assets

These are configured in the Vercel routes to be served correctly.

### Environment Variables
If your application requires environment variables (database connections, API keys, etc.), make sure to add them in the Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add each variable with appropriate values for Production, Preview, and Development

### Build Process
The build process runs:
1. `npm install` - Installs dependencies
2. `npm run build` - Builds both frontend (Vite) and backend (esbuild)

Output structure:
```
dist/
├── public/          # Frontend build (served as static files)
│   ├── index.html
│   └── assets/
└── index.js         # Backend serverless function
```

### Serverless Functions
The Express backend is converted to a Vercel serverless function located at `/api/index.js`. All API routes should be prefixed with `/api/`.

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Assets Not Loading
- Check that asset paths in your code use relative paths
- Verify `attached_assets` directory is committed to Git
- Check Vercel routes configuration in `vercel.json`

### API Routes Not Working
- Ensure API routes are prefixed with `/api/`
- Check serverless function logs in Vercel dashboard
- Verify environment variables are set correctly

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your domain and follow DNS configuration instructions

## Performance Optimization

For optimal performance:
- Enable Vercel Analytics (Settings → Analytics)
- Use Vercel's Edge Network for static assets
- Consider enabling ISR (Incremental Static Regeneration) if applicable

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Deployment Issues](https://github.com/vercel/vercel/issues)

## Continuous Deployment

Once connected to Git, Vercel automatically:
- Deploys every push to `main` branch (production)
- Creates preview deployments for pull requests
- Provides unique URLs for each deployment
