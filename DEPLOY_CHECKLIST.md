# Deployment Checklist

Use this checklist before deploying to Vercel.

## Pre-Deployment

- [ ] All essays have `status: "published"` in frontmatter (if ready)
- [ ] All snippets are proofread and correct
- [ ] Links in content are working (relative paths)
- [ ] Images are placed in `public/` if used
- [ ] Run `npm run build` locally and verify no errors
- [ ] Run `npm run preview` and test the built site locally
- [ ] All git changes are committed: `git status` shows clean working directory
- [ ] Remote branch is up to date: `git push origin main`

## Vercel Setup

- [ ] GitHub repository is public (or Vercel has access)
- [ ] Vercel account created and logged in
- [ ] Repository imported into Vercel project
- [ ] Build settings auto-detected (or manually configured to match `vercel.json`)
- [ ] No environment variables needed for this site
- [ ] Initial deployment successful

## Post-Deployment

- [ ] Visit deployed URL and test all pages load
- [ ] Test essay and snippet links
- [ ] Test tag pages
- [ ] Test search functionality at `/search`
- [ ] Test navigation between pages
- [ ] Check homepage displays correct content
- [ ] Verify About page displays correctly
- [ ] Test responsive design on mobile (DevTools)
- [ ] Check Lighthouse scores in Vercel Analytics

## Custom Domain (Optional)

- [ ] Domain name purchased and DNS configured
- [ ] Domain added to Vercel project settings
- [ ] SSL certificate auto-generated
- [ ] Redirect set up from non-www to www (or vice versa)

## Ongoing Maintenance

- [ ] Set up email notifications for failed deployments
- [ ] Monitor Vercel analytics
- [ ] Update articles regularly
- [ ] Vercel automatically deploys on `git push`

## If Something Goes Wrong

1. Check deployment logs in Vercel dashboard
2. Run `npm run build` locally to reproduce error
3. Fix locally, commit, push to trigger redeploy
4. Or manually redeploy from Vercel dashboard

---

**Ready to go live?** Follow the DEPLOYMENT.md guide.
