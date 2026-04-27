# Frontend README

This folder contains the React frontend for the authentication app.

## What This Frontend Does

- Shows login, register, forgot password, reset password, and dashboard pages.
- Calls the backend authentication API using Axios.
- Stores the login token in `localStorage`.
- Protects the dashboard route so only logged-in users can view it.
- Provides form loading states, error messages, and success messages.

## Important Changes Made

- Redesigned all authentication pages with a cleaner, more polished layout.
- Added consistent branding through `Auth Studio`.
- Improved spacing, typography, buttons, form inputs, alerts, and mobile responsiveness.
- Reworked the dashboard into a better signed-in product screen.
- Removed the overly instructional side-panel content and replaced it with simpler, user-friendly copy.
- Kept the existing app flow and routes unchanged.

## Folder Structure

```text
frontend/
  src/App.js                    Main React routes
  src/App.css                   Main UI styling
  src/context/AuthContext.js    API calls and auth state
  src/pages/Login.js            Login screen
  src/pages/Register.js         Registration screen
  src/pages/ForgotPassword.js   Password reset request screen
  src/pages/ResetPassword.js    New password screen
  src/pages/Dashboard.js        Protected dashboard
```

## Environment Variables

Optional `.env` file for the frontend:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

If this variable is not set, the app defaults to:

```text
http://localhost:5000/api/auth
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

The app runs on:

```text
http://localhost:3000
```

## Build

Create a production build:

```bash
npm run build
```

The build output is created in:

```text
frontend/build
```

## App Routes

```text
/login
/register
/forgot-password
/reset-password/:token
/dashboard
```

The dashboard route is protected. If a user is not logged in, they are redirected to `/login`.

## Styling Notes

Most UI styling is in `src/App.css`. The design now uses:

- A full-height authentication layout.
- Visual side panels on desktop.
- Compact, readable form cards.
- Better mobile spacing.
- Consistent colors for login, registration, recovery, and dashboard states.
