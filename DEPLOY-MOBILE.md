# ONE WISH — Deployment from iPhone

## Recommended: GitHub → Vercel

1. Create a GitHub repository and upload the contents of this folder.
2. Open Vercel and choose **New Project**.
3. Import the GitHub repository.
4. Vercel will use `vercel.json` and run:
   - `npm install`
   - `npm run build`
5. The production output is `dist/`.
6. Open the generated `https://...vercel.app` URL on iPhone.
7. In Safari: Share → Add to Home Screen.

## Important

ONE WISH is designed as an offline-first PWA. The first visit needs internet so the browser can download the app and service worker. After the app has successfully loaded once, the bundled game assets are precached for offline play.

No backend, API, account, or database is required for gameplay. Game state and settings are stored locally in the browser.
