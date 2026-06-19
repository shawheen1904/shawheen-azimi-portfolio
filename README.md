# Shawheen Azimi Portfolio

Public portfolio site for Shawheen Azimi, a senior security engineer focused on cybersecurity, cloud security architecture, detection engineering, incident response, and AI-enabled security operations.

## Live Site

https://shawheen.ai/

## About

This site highlights professional experience, selected security engineering work, certifications, technical domains, and contact information. It is built as a lightweight static site and deployed with GitHub Pages.

## Features

- Responsive single-page portfolio.
- Interactive terminal-style navigation.
- Downloadable resume.
- Security-focused design and hardened static-site implementation.
- GitHub Pages deployment through GitHub Actions.

## Tech Stack

- HTML
- CSS
- JavaScript
- GitHub Pages
- GitHub Actions

## Security Hardening

- Strict Content Security Policy in the HTML entrypoints.
- Terminal output is rendered with DOM nodes and `textContent`, not HTML sinks.
- Terminal input is capped at 160 characters.
- No external font imports or third-party JavaScript dependencies.
- GitHub Actions are pinned to commit SHAs.
- Archive files are ignored and not deployed.

## Repository Structure

- `index.html` - GitHub Pages entrypoint.
- `styles.css` - Styling, layout, and responsive behavior.
- `app.js` - Terminal interaction, scroll behavior, counters, and animations.
- `Shawheen Azimi - Resume.pdf` - Downloadable resume.
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow.
- `.nojekyll` - Disables Jekyll processing for GitHub Pages.
