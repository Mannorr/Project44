# PROJECT44 Foundation — Website

Official website for PROJECT44 Foundation — a faith-driven humanitarian foundation reaching vulnerable children in Lagos and Abuja, Nigeria.

## Tech Stack

Plain HTML + CSS + vanilla JS. No build step. Deploys anywhere.

## Structure

```
project44-site/
├── index.html         Home
├── about.html         About
├── get-involved.html  Get Involved
├── team.html          Meet the Team
├── contact.html       Contact
├── css/style.css      Global stylesheet (brand system)
├── js/main.js         Mobile nav, contact form, etc.
└── assets/            Images & logo
```

## Local Development

Open any `.html` file directly in a browser, or run a local server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

Deploys to any static host:

- **Netlify** — drag the folder into [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — connect this repo at [vercel.com](https://vercel.com)
- **GitHub Pages** — enable Pages in repo settings

## Brand

- **Colors**: `#0D0D0D` (black), `#00AEEF` (sky blue), `#F5A623` (amber accent)
- **Fonts**: Syne (headings), Inter (body) — both Google Fonts
- **Logo**: `assets/logo.png`

## Contact

- Email: theproject44nigeria@gmail.com
- Instagram: [@the_project44](https://instagram.com/the_project44)
