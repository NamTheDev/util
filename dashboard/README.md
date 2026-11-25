# Deployment dashboard

Read-only GitHub Actions monitor for NamTheDev public repositories. Open the [dashboard](https://namthedev.github.io/util/) after enabling GitHub Pages at [Settings → Pages](https://github.com/NamTheDev/util/settings/pages): Select **GitHub Actions** as the source. The [deployment workflow](../.github/workflows/deploy-pages.yml) runs on main pushes and manual dispatch, requires all three existing reusable validation workflows to succeed, and publishes only the static dashboard assets. If the source was just changed, run the deployment workflow manually from the Actions tab.

Repository discovery is paginated. Each repository's latest 100 default-branch runs are grouped by workflow ID; older workflows outside that window are not shown. Deployment labels are inferred from names and paths (deploy, pages, publish, release). External hosting status is not monitored. Archived repositories remain visible; private repositories are not accessible without credentials. No secrets or token storage.

Full refresh every 15 minutes while visible; running workflows refresh every minute when the remaining unauthenticated API quota permits (60 requests/hour per IP). Manual refresh is available. Fetch failures retain last known results for this session with their timestamps. GitHub API responses may lag actual deployments. The dashboard uses [shared configuration](../design/config.css) and a local Bootstrap 6 distribution; no custom CSS or framework JavaScript. Theme signaling and preference persistence follow [the specification](../formatting/THEME_SIGNAL.md).

Run `node --test tests/dashboard.test.mjs` and `python3 tests/verify_resources.py`.
