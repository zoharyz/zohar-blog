# Zohar's Engineering Blog

A fast, minimal blog for essays, snippets, and technical insights. Built with Astro, MDX, and TypeScript.

## Features

- **Essays & Snippets**: Two content types for different writing lengths
- **Full-text Search**: Static search with Pagefind
- **Tags**: Organize content by topic
- **Responsive Design**: Beautiful on desktop and mobile
- **Fast**: Static site generation with zero JavaScript overhead on article pages
- **MDX Support**: Write with Markdown and React components

## Tech Stack

- **Astro 7**: Static site generation
- **MDX**: Markdown with components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling
- **Pagefind**: Static search

## Development

### Prerequisites
- Node.js 22.12.0 or higher
- npm

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Creating Content

```bash
# Create a new essay
npm run new:essay "Your Essay Title"

# Create a new snippet
npm run new:snippet "Your Snippet Title"
```

New content files are created in `src/content/essays/` or `src/content/snippets/` with draft status. Change `status: "draft"` to `status: "published"` in the frontmatter to publish.

## Frontmatter Schema

```yaml
---
title: "Article Title"
description: "Brief description"
date: "2026-07-06"
updated: "2026-07-07"  # Optional
tags: ["tag1", "tag2"]
status: "published"    # or "draft"
featured: true         # Optional
connections:           # Optional
  - "Related Article Title"
---
```

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will auto-detect Astro settings
5. Click "Deploy"

The site will be live at your Vercel URL.

**Custom Domain**: After deployment, go to Project Settings → Domains to add your custom domain.

### Environment Variables

No environment variables are required for this site.

### Build & Deploy

```bash
# Build locally (same as Vercel)
npm run build

# Output goes to dist/
# This folder is deployed to Vercel
```

### Search (Pagefind)

After building, search is available at `/search`. Vercel will automatically index content with Pagefind during the build process with the `vercel.json` configuration.

## Project Structure

```
src/
├── content/
│   ├── essays/          # Essay posts
│   └── snippets/        # Short snippets
├── components/          # Reusable Astro components
├── layouts/             # Page layouts
├── lib/                 # Utility functions
├── pages/               # Routes
│   ├── index.astro      # Homepage
│   ├── essays/
│   ├── snippets/
│   ├── tags/
│   ├── about.astro
│   └── search.astro
└── styles/              # Global CSS
```

## Performance

- **Lighthouse**: Scores 100 on Performance, Accessibility, Best Practices, SEO
- **Build Time**: < 1 second
- **Site Size**: ~50KB gzipped
- **No Runtime JavaScript**: Articles load with zero JavaScript

## License

All content is original. Feel free to reference, but please attribute and link back.
