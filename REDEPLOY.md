# Redeploy Guide

This project is a Next.js app. You can redeploy in two common ways:

## Vercel (recommended)
- Ensure the Vercel project is connected to your GitHub repo `https://github.com/VIKASYADAV1815/Personal-portfolio`
- Private repo is fine as long as Vercel has GitHub access to it

### Auto-deploy via GitHub
- Push to `main`:
  - `git add -A`
  - `git commit -m "chore: redeploy"`
  - `git push origin main`
- Vercel will build and redeploy automatically

### Manual deploy via Vercel CLI
- Install CLI:
  - `npm i -g vercel`
- Link project (run inside repo):
  - `vercel link`
- Deploy to production:
  - `vercel --prod`

If environment variables are configured on Vercel, no extra steps are needed. For local `.env` sync, use:
- `vercel env pull .env`

## Node server (manual)
- Build and start:
  - `npm install`
  - `npm run build`
  - `npm run start`
- Behind a reverse proxy, expose port `3000`. For PM2:
  - `npm i -g pm2`
  - `pm2 start "npm run start" --name portfolio`

## Notes
- Private GitHub repo does not block redeploys if Vercel is authorized to access the repo
- If deployments stop after privatizing, recheck Vercel’s GitHub app permissions for this repository