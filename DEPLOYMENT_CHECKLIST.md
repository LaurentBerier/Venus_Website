# Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

- [ ] **Code Review**
  - [ ] All code is committed to Git
  - [ ] No console.log statements in production code (except intentional logging)
  - [ ] No hardcoded secrets or API keys in code
  - [ ] All TypeScript errors resolved (`npm run check`)

- [ ] **Build Test**
  - [ ] Run `npm run build` locally and verify it succeeds
  - [ ] Check that `dist/public` and `dist/index.js` are created
  - [ ] Test the production build locally with `npm start`

- [ ] **Assets**
  - [ ] All images in `attached_assets/` are committed
  - [ ] Image file sizes are optimized (< 1MB recommended)
  - [ ] Favicon is present in `public/` directory

- [ ] **Environment Variables**
  - [ ] List all required environment variables
  - [ ] Prepare values for production environment
  - [ ] Ensure no development secrets are used

## Vercel Setup

- [ ] **Account & Project**
  - [ ] Vercel account created
  - [ ] Git repository connected to Vercel
  - [ ] Project imported to Vercel

- [ ] **Configuration**
  - [ ] Verify `vercel.json` is in root directory
  - [ ] Check build command: `npm run build`
  - [ ] Check output directory: `dist/public`
  - [ ] Verify Node.js version: 20.x

- [ ] **Environment Variables in Vercel**
  - [ ] `SESSION_SECRET` added (generate secure random string)
  - [ ] `NODE_ENV` set to `production`
  - [ ] Any other required variables added

## Deployment

- [ ] **First Deploy**
  - [ ] Trigger deployment (push to main or manual deploy)
  - [ ] Monitor build logs for errors
  - [ ] Wait for deployment to complete

- [ ] **Verify Deployment**
  - [ ] Visit the deployment URL
  - [ ] Test homepage loads correctly
  - [ ] Verify all sections render properly
  - [ ] Check responsive design on mobile
  - [ ] Test language switcher (EN, FR, AR)
  - [ ] Verify RTL layout for Arabic
  - [ ] Test all navigation links
  - [ ] Check image gallery modal
  - [ ] Test FAQ accordion
  - [ ] Verify contact form (check console for submissions)
  - [ ] Test newsletter subscription

- [ ] **Performance Check**
  - [ ] Run Lighthouse audit
  - [ ] Check page load speed
  - [ ] Verify images load correctly
  - [ ] Test on different devices

## Post-Deployment

- [ ] **Domain Setup** (Optional)
  - [ ] Add custom domain in Vercel
  - [ ] Configure DNS settings
  - [ ] Verify SSL certificate is active

- [ ] **Monitoring**
  - [ ] Enable Vercel Analytics (optional)
  - [ ] Set up error tracking
  - [ ] Monitor function logs

- [ ] **Documentation**
  - [ ] Update README with live URL
  - [ ] Document any deployment-specific configurations
  - [ ] Share deployment URL with team

## Continuous Deployment

- [ ] **GitHub Integration**
  - [ ] Verify automatic deployments on push to main
  - [ ] Check preview deployments for PRs work
  - [ ] Test branch deployments if needed

## Troubleshooting

If deployment fails, check:

1. **Build Logs**: Review for errors in Vercel dashboard
2. **Dependencies**: Ensure all packages are in `package.json`
3. **Environment Variables**: Verify all required vars are set
4. **Routes**: Check `vercel.json` routes configuration
5. **Assets**: Confirm all assets are in Git repository
6. **Function Size**: Ensure serverless function is under 50MB

## Common Issues & Solutions

### Images Not Loading
- Check `attached_assets/` is in Git
- Verify routes in `vercel.json` include assets paths
- Ensure import paths use `@assets/` alias

### API Routes 404
- Confirm routes start with `/api/`
- Check `api/index.js` exists
- Verify serverless function configuration

### Build Fails
- Run `npm run build` locally first
- Check Node.js version compatibility
- Review build logs for specific errors

### Slow Load Times
- Optimize image sizes
- Enable Vercel's image optimization
- Check bundle size with build analyzer

## Success Criteria

Deployment is successful when:

- ✅ Website loads without errors
- ✅ All images display correctly
- ✅ All sections are visible and functional
- ✅ Language switching works (EN, FR, AR)
- ✅ Arabic displays with RTL layout
- ✅ Navigation and scroll functions work
- ✅ Forms submit successfully
- ✅ Mobile responsive design works
- ✅ Lighthouse score > 90 for performance
- ✅ No console errors in browser

## Rollback Plan

If issues occur:

1. Go to Vercel dashboard → Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"
4. Fix issues locally
5. Redeploy when ready

---

**Note**: Keep this checklist updated as the project evolves and new requirements are added.
