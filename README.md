# Next.js Multi-Language Documentation Portal

A documentation site built with Next.js App Router, localized routes, Incremental Static Regeneration (ISR), client-side search, Swagger API reference, theme switching, and Docker support.

## Features

- Localized routes for `en`, `es`, `fr`, `de`
- ISR for documentation pages (`revalidate = 60`)
- Dynamic docs routing: `/{lang}/docs/{version}/{slug}`
- Version selector (`v1`, `v2`, `v3`)
- Collapsible sidebar navigation
- Client-side full-text search across markdown docs
- Table of contents with active-section highlight on scroll
- Code blocks with copy-to-clipboard button
- Theme toggle (light/dark) with persistence in `localStorage`
- Feedback widget with client-side success confirmation
- Swagger UI page at `/api-reference` using `public/openapi.json`

## Project Structure

- `app/` - routes and UI components
- `_docs/` - markdown documentation content by language/version
- `public/locales/` - i18n UI translation JSON files
- `public/openapi.json` - OpenAPI 3 sample spec
- `Dockerfile` - multi-stage build for Next.js app
- `docker-compose.yml` - local orchestration with healthcheck
- `.env.example` - required environment variable template

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Docker

Build and run with Docker Compose:

```bash
docker-compose up --build -d
```

The app is exposed on port `3000` and has a healthcheck configured against `http://localhost:3000`.

## ISR Verification

For docs routes such as `/en/docs/v1/introduction`, Next.js ISR is enabled with a 60-second revalidation window. In production, responses include cache headers compatible with stale-while-revalidate behavior.

## Required Environment Variables

See `.env.example` for all required variables.

## Notes

- Feedback submission is intentionally client-only (no backend required).
- Search is implemented client-side over local markdown content.
