# Deployment Guide

## Quick Deploy to Vercel

### Prerequisites

- Vercel account (free)
- GitHub account (recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add serverless API for RSVP management"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's an Angular project
5. Click "Deploy"

### Step 3: Set Environment Variable (Optional but Recommended)

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Environment Variables"
3. Add:
   - Name: `ADMIN_PASSWORD`
   - Value: `your-secure-password`
   - Environments: Production, Preview, Development

### Step 4: Access Your App

- Main page: `https://your-project-name.vercel.app/`
- Admin dashboard: `https://your-project-name.vercel.app/admin`

## Testing Your Deployment

1. **Test RSVP Submission**

   - Open the main page
   - Fill out the RSVP form
   - Submit and check for success message

2. **Test Admin Dashboard**
   - Go to `/admin`
   - Verify you can see the submitted RSVP
   - Test export to CSV
   - Test delete functionality

## Important Notes

- Data is stored in server memory and persists during deployment
- If you redeploy, existing data will be lost
- For production use, consider integrating with a database
- Default admin password is `zyna2026` unless you set environment variable

## Troubleshooting

If you encounter issues:

1. Check Vercel deployment logs
2. Verify API endpoints are working
3. Check browser console for JavaScript errors
4. Ensure CORS headers are properly set
