# React + Vite

## API and authentication configuration

Copy `.env.example` to `.env.local` for local development and set `VITE_API_URL`
to the API origin. Production API origins must use HTTPS. When the frontend and
API share an origin, leave `VITE_API_URL` unset.

The frontend expects the API to provide these authentication endpoints:

- `POST /auth/login` accepts `{ email, password }`, sets a secure session cookie,
  and returns `{ user: { name, email, role } }`.
- `GET /auth/me` returns the authenticated user or `401`.
- `POST /auth/logout` clears the session cookie.
- `POST /auth/request-access` accepts `{ name, email, password }` over HTTPS;
  the API must hash the password and store it server-side.
- `GET /manager/account-requests` and
  `PATCH /manager/account-requests/:id` are manager-only operations. The patch
  body is `{ approved: boolean }`.

The session cookie should be `HttpOnly`, `Secure` in production, and `SameSite`
appropriate to the deployment. The API must enforce authentication, roles, and
account-level data access on every protected endpoint; frontend route checks
are only for navigation. If the API is on a different origin, configure
credentialed CORS for the exact frontend origin and add CSRF protection for
state-changing cookie-authenticated requests.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
