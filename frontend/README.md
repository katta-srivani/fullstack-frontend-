# Frontend

React frontend for the travel landing page and authentication flow.

## Deployment Setup

Set this environment variable in your frontend hosting platform:

```env
REACT_APP_API_URL=https://your-backend-live-url.com/api
```

Do not use a local machine URL for deployment. If `REACT_APP_API_URL` is not set, the app uses `/api`, which works only when the frontend and backend are served from the same domain.

## Routes

```text
/                         Landing page
/login                    Login
/register                 Register
/forgot-password          Request reset link
/reset-password/:token    Set new password
/dashboard                Protected dashboard
```

## Local Commands

```bash
npm install
npm start
npm run build
```
