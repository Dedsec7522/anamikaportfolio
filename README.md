# Anamika Goswami — portfolio website

A single-page professional portfolio for Anamika Goswami, Co-Founder & Director and Certified Financial Planner.

Built with React 19, TypeScript and Vite. No backend.

## Run it

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # type-check and build to dist/
npm run preview    # serve the production build locally
npm run images     # regenerate optimised images from source-assets/
```

`dist/` is a static site: upload it to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Updating content

Everything the site says lives in one file: `src/content/profile.ts`. Edit the text there and every section updates.

### Before going live

These were not in the supplied material, so they are empty and the site hides them until filled in:

| What | Where |
| --- | --- |
| Email, phone, office location | `contact` in `src/content/profile.ts` |
| Social links (LinkedIn etc.) | `contact.social` in `src/content/profile.ts` |
| Form delivery | `contact.formEndpoint` (a URL the form POSTs JSON to, e.g. Formspree), or just `contact.email` to open the visitor's email app |
| Absolute social-share image URL | `og:image` in `index.html`, once the domain is known |

Until an email or endpoint is set, the contact form validates input and then tells the visitor it is not connected yet.

## Structure

```
source-assets/          original photographs (not shipped)
scripts/                image optimisation script
public/images/          generated, optimised images
src/
  content/profile.ts    all copy and data
  components/           one file per section + shared motion primitives
  hooks/                smooth scrolling, active-section tracking
  index.css             design tokens and base styles
  App.css               section styles, in page order
```

## Design

- Palette: warm ivory, deep forest green, brass accent (tokens in `src/index.css`).
- Type: Fraunces (display) and Manrope (text), self-hosted via Fontsource.
- Motion: Motion for React (reveals, parallax, scroll-linked timeline and text) and Lenis (smooth scrolling). All of it switches off under `prefers-reduced-motion`.
