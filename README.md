# Personal Website

Static portfolio site for Shawheen Azimi, hosted with GitHub Pages.

## Live Site

https://shawheen1904.github.io/Personal-Website/

## Project Structure

- `index.html` - GitHub Pages entrypoint.
- `styles.css` - Site styling and responsive layout.
- `app.js` - Terminal interaction, scroll behavior, counters, and animation.
- `Shawheen Azimi - Resume.pdf` - Downloadable resume.
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow.
- `.nojekyll` - Disables Jekyll processing for Pages.

## Deployment

The site deploys from `main` using GitHub Actions. In the repository settings, GitHub Pages should use **GitHub Actions** as the source.

Deployment URL:

```text
https://shawheen1904.github.io/Personal-Website/
```

## Security Notes

- Content Security Policy is defined in the HTML entrypoints.
- Terminal output is rendered with DOM nodes and `textContent`, not HTML sinks.
- Terminal input is capped at 160 characters.
- External font imports were removed in favor of local/system fonts.
- GitHub Actions are pinned to commit SHAs.
- Zip archives are ignored and not deployed.
