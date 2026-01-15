# Zyna's 1st Birthday RSVP System

## Overview

This is a birthday invitation and RSVP management system built with Angular and deployed on Vercel. The system allows guests to submit RSVPs and administrators to view and manage all submissions.

## Features

- Beautiful responsive invitation page with RSVP form
- Admin dashboard to view all RSVPs
- Export RSVPs to CSV
- Delete individual RSVPs or clear all
- Real-time updates across all users
- Password-protected admin operations

## Deployment Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables (Optional)

Set the `ADMIN_PASSWORD` environment variable in your Vercel dashboard for better security:

- Go to your Vercel project settings
- Add environment variable: `ADMIN_PASSWORD`
- Set your desired password (default: `zyna2026`)

### 3. Deploy to Vercel

```bash
# If you have Vercel CLI installed
vercel --prod

# Or connect your GitHub repository to Vercel for automatic deployments
```

### 4. Access Your Application

- **Main Invitation**: `https://your-domain.vercel.app/`
- **Admin Dashboard**: `https://your-domain.vercel.app/admin`

## How It Works

### RSVP Submission

1. Users fill out the RSVP form on the main page
2. Data is sent to the serverless API endpoint (`/api/rsvps`)
3. RSVPs are stored in server memory (persistent for the deployment)

### Admin Management

1. Access the admin dashboard at `/admin`
2. View all RSVPs in real-time
3. Export data to CSV for Excel/Google Sheets
4. Delete individual RSVPs or clear all (requires authentication)

### Security

- Admin operations (DELETE) require authentication
- Default password: `zyna2026`
- Set custom password via environment variable for production

## API Endpoints

### GET /api/rsvps

Returns all RSVP submissions sorted by timestamp (newest first)

### POST /api/rsvps

Creates a new RSVP submission

```json
{
  "name": "Guest Name",
  "attending": "joyfully_accepts" | "regretfully_declines"
}
```

### DELETE /api/rsvps?id={id}

Deletes a specific RSVP (requires authentication)

- Header: `Authorization: Bearer {password}`

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── home/           # Main invitation page
│   │   ├── admin/          # Admin dashboard
│   │   └── app.routes.ts   # Routing configuration
│   └── main.ts
├── api/
│   ├── rsvps.js           # RSVP API endpoint
│   └── auth.js            # Authentication helper
├── vercel.json            # Vercel configuration
└── package.json
```

## Important Notes

### Data Persistence

- Currently uses in-memory storage
- Data persists during the deployment lifecycle
- For production, consider integrating with:
  - Google Sheets API
  - Airtable
  - MongoDB Atlas
  - PostgreSQL

### Scaling

- Serverless functions scale automatically
- No database management required
- Suitable for small to medium events

### Customization

- Update colors and fonts in the component CSS
- Modify event details in `home.html`
- Change admin password in environment variables

## Troubleshooting

### CORS Issues

The API includes CORS headers for cross-origin requests.

### Authentication Issues

Ensure the admin password matches between:

- Client-side (`admin.ts`)
- Server-side (`auth.js` or environment variable)

### Build Errors

Run `npm install` to ensure all dependencies are installed.

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Support

For issues or questions, check the Vercel deployment logs and browser console for error details.
