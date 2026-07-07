# Deployment Guide

This guide covers deploying your Astro blog to Vercel.

## Prerequisites

- GitHub account
- Repository pushed to GitHub
- Vercel account (free tier available)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Deploy blog to Vercel"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Select your repository
5. Click "Import"

### 3. Configure Project

Vercel will auto-detect your Astro project settings:

- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

These are already configured in `vercel.json`, so Vercel should detect them automatically.

### 4. Deploy

Click "Deploy" and wait for the build to complete. You'll see a deployment URL when done.

## After Deployment

### Add Custom Domain

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS instructions for your domain registrar

### Environment Variables

This site doesn't require environment variables.

### Automatic Deployments

Every time you push to your `main` branch, Vercel will automatically rebuild and deploy your site.

## Preview Deployments

Vercel creates preview deployments for pull requests. This lets you test changes before merging.

## Monitoring

- View deployment logs in Vercel dashboard
- Check build status on your GitHub PR
- Monitor site analytics in Vercel dashboard

## Troubleshooting

### Build Fails

1. Check the build log in Vercel dashboard
2. Run `npm run build` locally to test
3. Ensure all dependencies are in `package.json`

### Search Not Working

After deployment, search at `/search` requires Pagefind indexing:

```bash
npm run build
npx pagefind --source dist
```

Vercel handles this automatically in production.

### Site Shows Old Content

Vercel caches static files. Clear cache:

1. Go to project settings
2. Click "Deployments"
3. Click the three dots on the latest deployment
4. Click "Redeploy"

## Rollback

If a deployment breaks:

1. Go to "Deployments" in Vercel
2. Find the last working deployment
3. Click the three dots
4. Click "Redeploy"

## Performance Tips

- Pagefind is auto-indexed during build
- Static assets are cached aggressively
- No server-side processing needed
- Images are optimized automatically

## Support

- [Astro Docs](https://docs.astro.build)
- [Vercel Docs](https://vercel.com/docs)
- [Astro Discord](https://astro.build/chat)
