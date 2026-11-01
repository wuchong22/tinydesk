# Tiny Desk AI: Google sign-in only

`sites/tinydeskai-example` sets `auth.emailOtp` to false. Better Auth stays the account system. Email one-time-code routes return 404. Until both Google secrets are set, the sign-in dialog shows a disabled “Google sign-in coming soon” control and does not start a login. Job-finished mail still uses `emailCopy.jobReady` and the Worker `EMAIL` binding.

`auth.emailOtp` defaults to on, so the template and other sites keep email codes.

Google callback, from `APP_URL` plus Better Auth's `/api/auth` base path: `https://tinydeskai.tools/api/auth/callback/google`. The button's JavaScript origin is `https://tinydeskai.tools`. The client ID reaches the browser only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.
