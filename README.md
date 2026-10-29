# SoPra FS23 User Management Client

A React front end for registering, logging in and out, browsing registered users and viewing or editing a user profile (username and birthday), written for the individual assignment of the Software Engineering Lab (SoPra) at the University of Zurich, spring semester 2023. It extends the course's React client template.

It talks to the REST API of [sopra-fs23-bavibidila-rogerjeasy-server](https://github.com/rogerjeasy/sopra-fs23-bavibidila-rogerjeasy-server).

## Pages

Routes are defined in `src/components/routing/routers/AppRouter.js`.

| Route | View | What it does | API call |
|---|---|---|---|
| `/` | `HomePage` | Buttons leading to Login and Register. | |
| `/register` | `Register` | Username and password form. On success stores the returned `token` and `id` in `localStorage` and opens the dashboard. | `POST /users` |
| `/login` | `Login` | Username and password form. Only reachable without a stored token (`LoginGuard`). | `POST /users/login` |
| `/game/dashboard` | `Game` | List of registered users; clicking one opens its profile. Buttons to edit the profile and to log out. Requires a stored token (`GameGuard`). | `GET /users`, `POST /users/logout/{id}` |
| `/profile` | `UserProfile` | Shows username, id, status, creation date and birthday of the selected user. | `GET /users/{id}` |
| `/edit` | `EditUserProfile` | New username and a birthday date picker (future dates disabled). | `PUT /users/{id}` |

All of these endpoints exist in the matching server.

## Tech stack

- React 17, React Router 5
- Axios for HTTP (`src/helpers/api.js`), Sass via `node-sass`
- Create React App (`react-scripts` 5), Jest test runner
- Google App Engine (`app.yaml`), GitHub Actions

## Project structure

```
src/
  App.js                      header + router
  components/
    routing/routers/          AppRouter, GameRouter
    routing/routeProtectors/  GameGuard, LoginGuard (others are unused drafts)
    views/                    HomePage, Login, Register, Game, UserProfile, EditUserProfile, Header
    ui/                       Button, BaseContainer, Spinner, ReactLogo
  helpers/                    api.js (Axios instance, error helper), getDomain.js, isProduction.js
  models/User.js
  styles/                     SCSS theme, UI and view styles
app.yaml                      App Engine static hosting config
.github/workflows/main.yml    build and deploy workflow
```

## Getting started

### Prerequisites

- Node.js 18 with npm (the version used by the deploy workflow and `app.yaml`; `node-sass` 8 needs a Node version it ships bindings for)
- The server running locally, see [sopra-fs23-bavibidila-rogerjeasy-server](https://github.com/rogerjeasy/sopra-fs23-bavibidila-rogerjeasy-server)

### Install and run

```bash
npm install
npm run dev
```

The app opens on http://localhost:3000 and reloads on changes.

Use `npm install` rather than `npm ci`: `package-lock.json` is out of sync with `package.json` (it still locks `node-sass` 7), so `npm ci` refuses to install.

### Backend URL

`src/helpers/getDomain.js` picks the API base URL: `http://localhost:8080` in development, and a hard-coded App Engine URL when `NODE_ENV` is `production` (that is, in `npm run build` output). Change the production URL there if you deploy the server elsewhere. There are no other environment variables.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server on port 3000. |
| `npm run build` | Production build into `build/` (runs with `CI=false`, so lint warnings do not fail the build). |
| `npm start` | Serve `build/` with `serve -s build`. `serve` is not a dependency, so install it first (`npm install -g serve`). |
| `npm test` | Run Jest in watch mode (`react-scripts test --env=jsdom`). |

The only test is `src/App.test.js`, which checks that the app renders without crashing. On macOS, if you hit an `fsevents` error when running tests, see https://github.com/jest-community/vscode-jest/issues/423.

## Deployment

- `app.yaml` serves the built `build/` folder as static files on the App Engine `nodejs18` runtime, with every unknown path falling back to `index.html` so client-side routes work.
- `.github/workflows/main.yml` runs `npm install` and `npm run build` with Node 18 on every push to `main`, then deploys to App Engine using a `GCP_SERVICE_CREDENTIALS` repository secret.

The App Engine deployment from the course is no longer running.

## Known gaps

- Password fields are plain text inputs, not masked.
- The server's registration and login responses have no `token` field, so the client stores the string `undefined` as its token. The route guards only check that some token exists.
- `/profile` and `/edit` are not guarded. Both use the `id` in `localStorage`, which is overwritten when you open another user's profile from the list, so editing then targets that user.
- `views/UsersList.js`, `views/LoginRegister.js` and several files in `routeProtectors/` are not wired into the router; `LoginRegisterGuard.js` is empty.

## Context

Built on the React client template from the University of Zurich SoPra course (Software Engineering Lab, FS23), which provided the project setup, base UI components, route guards, Axios helper and App Engine workflow. The registration, profile, edit-profile and logout features and the routing changes are the owner's own work.

## License

Apache License 2.0, see [LICENSE](LICENSE).
