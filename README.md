# Aysllan Ferreira — Portfolio

Source code of [aysllan.com](https://aysllan.com), the portfolio of Aysllan Ferreira, Senior Software Engineer.

A single-page site in English, Portuguese and Spanish, built to match its design system pixel for pixel at mobile, tablet and desktop widths. Every image, logo and document is served from a CDN, and the codebase holds itself to strict typing, automated accessibility checks and performance budgets.

## Tech stack

| Concern      | Choice                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Cache Components) · React 19                          |
| Language     | TypeScript (strict, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) |
| Styling      | Tailwind CSS v4 with design tokens mirrored from the design system            |
| Localization | Typed dictionaries per locale, statically prerendered (`/en`, `/pt`, `/es`)   |
| Assets       | S3 + CloudFront (`cdn.aysllan.com`), pre-optimized AVIF/WebP, typed manifest  |
| Testing      | Vitest + Testing Library · Playwright (Chromium, Firefox, WebKit) + axe       |
| Hosting      | AWS Amplify (SSR compute), deployed from `main`                               |

## Getting started

Requirements: Node.js 24 (see `.nvmrc`) and npm 11.

```bash
npm ci
cp .env.example .env.local   # then fill in the public values
npm run dev
```

The app needs `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ASSETS_URL` at build time. The build fails fast, naming the variable, if either is missing or malformed.

## Scripts

| Script                  | What it does                                                                  |
| ----------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`           | Starts the development server                                                 |
| `npm run build`         | Production build                                                              |
| `npm run start`         | Serves the production build                                                   |
| `npm run verify`        | The local quality gate: format check, lint, typecheck, unit tests, asset scan |
| `npm run lint`          | ESLint with zero warnings allowed                                             |
| `npm run typecheck`     | Generates route types and runs the TypeScript compiler                        |
| `npm run format`        | Formats the codebase with Prettier                                            |
| `npm test`              | Unit tests (Vitest)                                                           |
| `npm run test:coverage` | Unit tests with coverage thresholds                                           |
| `npm run test:e2e`      | End-to-end and accessibility tests against a production build                 |
| `npm run assets:scan`   | Fails if an image, vector, font or document file is tracked in git            |
| `npm run qa:fidelity`   | Compares every section and component with the design exports, pixel by pixel  |
| `npm run budget:js`     | Fails if the first-load JavaScript of a built page exceeds its budget         |
| `npm run lighthouse`    | Lighthouse CI on `/en`, `/pt` and `/es` with mobile budgets                   |

## Project structure

```
src/
  app/          Routes only: layout, page, metadata routes (OG image, sitemap, robots)
  components/   Shared building blocks (ui, layout, media, brand, effects)
  features/     One folder per page section, each owning its pieces:
    <section>/
      <Section>.tsx   composes the section (server component)
      parts/          the section's own components
      content.ts      locale-agnostic facts (dates, links, tags, design frames)
      background.ts   its shader settings from the design
      *.test.tsx      its render tests
  content/      Site-wide facts (contact, technology logos) and the generated asset manifest
  i18n/         Locale config, typed dictionaries, negotiation and metadata builders
  lib/          Framework-agnostic utilities (env validation, formatting, class names)
  styles/       Design tokens, fluid scaling and global styles
scripts/        Tooling (asset pipeline, asset scan, JS budget)
tests/
  e2e/          End-to-end, accessibility and SEO specs (Playwright + axe)
  fidelity/     The design-fidelity runner and its targets
  unit/         Repository-wide guards
```

A feature never imports another feature (an ESLint rule generated from the folder list enforces it), and only shared code lives outside `features/`.

## Architecture

```
                       Accept-Language
  visitor ──► /  ──────────────────────► 307 /en | /pt | /es        (Route Handler, no-store)
               │
               ▼
        /[lang]  statically prerendered per locale (Cache Components)
          ├─ root layout: <html lang>, metadata, JSON-LD
          ├─ server components: every section, all copy from typed dictionaries
          └─ client islands: navbar (active section, menus), back-to-top, shader canvases
               │
               ├─ images / logos / PDFs ──► cdn.aysllan.com  (S3 + CloudFront, hashed, immutable)
               └─ fonts ──► self-hosted at build time

  AWS Amplify (SSR compute) builds and serves main; GitHub Actions runs the quality gates.
```

Almost everything renders on the server. The browser receives HTML plus small client islands: the navbar's interactive parts, the back-to-top link and one WebGL canvas per section that is mounted only near the viewport and released when it scrolls away.

## Key decisions

| Decision      | Chosen                                                      | Alternatives considered                    | Why                                                                                                                       |
| ------------- | ----------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Rendering     | Static prerender per locale with Cache Components           | Fully dynamic SSR; static export           | Instant first byte from the CDN edge, while keeping a Route Handler for language negotiation and server-only dictionaries |
| Localization  | Typed dictionaries + `next/root-params`                     | i18n libraries (next-intl, i18next)        | Three languages and no runtime switching: the type system already guarantees parity, with zero client JavaScript          |
| Images        | Pre-optimized at upload, `<picture>` with manifest `srcset` | `next/image` optimizer                     | No image processing on Amplify compute, deterministic URLs, immutable caching                                             |
| Styling       | Tailwind v4 with the default theme removed                  | CSS Modules; CSS-in-JS                     | Design tokens become the only vocabulary; no runtime styling cost                                                         |
| Fluid layout  | `--dpx` anchored at 390 / 834 / 1440                        | Breakpoint-only sizes; `clamp()` per value | Exact at the designed widths and proportional in between, written in design values                                        |
| Backgrounds   | One WebGL fragment shader per section, mounted on demand    | Video loops; static images                 | Matches the design's shader fills, a few KB, paused off-screen and under reduced motion                                   |
| Class merging | `tailwind-merge` on the server, `clsx` in client components | One helper everywhere                      | Keeps ~9 KB of merge logic out of the browser bundle                                                                      |

## SEO and social

`generateMetadata` builds each locale's head: localized title and description, canonical and `hreflang` alternates with `x-default`, Open Graph and Twitter cards and CDN icons. Each locale gets its own Open Graph image, rendered at build time from the hero headline with Google Fonts subsets fetched during the build. `sitemap.xml` lists the three languages with their alternates, `robots.txt` allows crawling only in production, and `Person` and `WebSite` structured data are typed with `schema-dts`.

## Testing strategy

| Layer           | What it proves                                                                                                                                      | Tools                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Static          | Formatting, lint (zero warnings), strict types, feature boundaries, no inline copy                                                                  | Prettier, ESLint, TypeScript               |
| Unit            | Utilities, i18n (parity, placeholders, negotiation), metadata, timeline geometry, the asset pipeline, component render tests                        | Vitest, Testing Library                    |
| End to end      | Navigation, menus, language switching, every section's behavior, SEO head, no-JS render, reflow at 320px and 200% zoom, console and network hygiene | Playwright in Chromium, Firefox and WebKit |
| Accessibility   | axe across 3 languages × 3 layouts with the menu open and closed, plus a pixel-sampling contrast check for text over the shaders                    | axe-core, Playwright                       |
| Design fidelity | Every section at 390, 834 and 1440 and every component, compared with the design exports: box within ±2px and at most 5% of pixels differing        | Playwright, pixelmatch                     |
| Performance     | Lighthouse budgets on every locale and a first-load JavaScript budget                                                                               | Lighthouse CI, a build-output check        |

Test renders (`NEXT_PUBLIC_RENDER_MODE=test`) freeze the shaders' clock and the practices marquee, so screenshots are deterministic.

## Design system

The design lives in a design file with a token-based system: colors, radii, a type scale, effects and 48 reusable components, drawn at three widths (390 mobile, 834 tablet, 1440 desktop). The code mirrors it instead of approximating it.

- **Tokens** (`src/styles/tokens.css`) reproduce the design variables one-to-one with the same names, so `bg-surface`, `text-text-muted`, `rounded-lg` or `text-h2` mean exactly what they mean in the design. Tailwind's default palette, radii and breakpoints are removed, so off-system values cannot creep in. A unit test compares every token with an export of the design variables.
- **Spacing** keeps Tailwind's 4px base. Every design spacing token (4, 8, 12, 16, 24, 32, 48, 64, 120) is a multiple of 4.
- **Layout ranges** are `mobile` (< 768px), `tablet` (768–1199px) and `desktop` (≥ 1200px).
- **Anchored fluid scaling** (`src/styles/fluid.css`): `--dpx`, a design pixel, equals exactly `1px` at 390, 834 and 1440, and scales with the viewport inside its range. Utilities such as `fluid-text-44 tablet:fluid-text-72 desktop:fluid-text-84` state the design values directly. Pages match the design exactly at the designed widths and degrade gracefully in between. Body text keeps fixed sizes for readability.
- **Typography**: Geist for everything you read, Geist Mono for metadata, and Instrument Serif italic for the single accent word of each headline. All three are self-hosted at build time.
- **Effects**: `glass` (translucent fill, 24px backdrop blur, gradient edge stroke, opaque fallback), `glow-accent` (primary buttons and featured tiles only) and `hairline-top` (section boundaries).

## Localization

The site ships in English, Brazilian Portuguese and Spanish at `/en`, `/pt` and `/es`, each prerendered as static HTML.

- **Routing**: every page lives under `app/[lang]`. Server Components read the locale with `next/root-params`, with no prop drilling. Unknown locales (`/fr`) render the localized 404.
- **Language negotiation**: `/` is a small Route Handler. It reads `Accept-Language` with quality values, picks the supported language the visitor prefers most (falling back to English) and answers with a `307`, `Cache-Control: private, no-store` and `Vary: Accept-Language`, so no cache can serve one visitor's language to another.
- **Typed dictionaries** (`src/i18n/dictionaries`): English defines the shape (`Dictionary = typeof en`). Portuguese and Spanish are declared with `satisfies Dictionary`, so a missing or extra key fails type checking. A unit test also checks key parity, placeholder parity (`{year}`) and that no string is left empty.
- **Accent headlines**: headlines with a serif accent word are translated as `{ before, accent, after }`, so each language places its accent word naturally. A `\n` marks a line break.
- **Facts vs. copy**: locale-agnostic facts (project URLs, dates, tags) live once in `src/content`, and only prose is translated. Dates and numbers are formatted with `Intl` for the active locale.
- **No inline copy**: ESLint's `react/jsx-no-literals` rejects hard-coded text in components, so user-facing strings can only come from the dictionaries.

To add a string, add the key to `en.ts`. Type checking then points to the exact place in `pt.ts` and `es.ts` that needs the translation.

## Asset pipeline

No image, vector, font or document file is committed to this repository (CI enforces it with `npm run assets:scan`). Assets live in a private S3 bucket and are served through CloudFront at `cdn.aysllan.com`. The bucket blocks all public access and only CloudFront can read it.

```
scripts/assets/catalog.ts        what the site renders: logical key, source file, rendered
        |                        widths per layout (measured in the design), logo colors
npm run assets:sync
        |-- raster  -> AVIF + WebP at each rendered width at 1x and 2x (never upscaled),
        |              alpha preserved, plus a 16px blurred placeholder
        |-- svg     -> recolored to the exact design fill, optimized with svgo
        |-- icon    -> favicon SVG plus PNG renders (32, 180, 192, 512)
        |-- pdf     -> stable URL, served as a named download
        |-- upload  -> content-hashed keys with `Cache-Control: immutable`, skipping
        |              objects that already exist; every upload verified
        |-- invalidate changed documents only (hashed files never need it)
        +-- src/content/assets.generated.ts   (typed manifest, committed)
```

- **Typed references.** Components refer to assets by key (`<AssetImage name="people/aysllan" …/>`). An unknown key is a compile error, not a broken image in production.
- **No runtime image processing.** `AssetImage` renders a server-side `<picture>` whose `srcset` lists exactly the stored widths, so the browser picks the right file and Amplify never resizes an image. Intrinsic sizes in the manifest reserve layout space, and large images show a blurred placeholder.
- **Safe to re-run.** Keys are derived from source content plus processing options. Re-running uploads only what changed, and the manifest stays byte-identical when nothing changed.
- **Documents** (résumé and cover letter per language) keep stable, shareable URLs and are invalidated on CloudFront when replaced.

```bash
npm run assets:sync -- --dry-run          # list every object without touching AWS
npm run assets:sync                        # optimize, upload, invalidate, write manifest
npm run assets:sync -- --only "logos/*"    # restrict uploads to matching keys
```

The sync reads `ASSETS_SOURCE_DIR` and the AWS settings from `.env.local`, and uses the local AWS profile. Building or deploying the site never needs AWS credentials. For least privilege, the IAM user running the sync only needs `s3:GetObject`, `s3:PutObject` and `s3:ListBucket` on the asset bucket, plus `cloudfront:CreateInvalidation` and `cloudfront:GetInvalidation` on the distribution.

## Deployment

The site runs on **AWS Amplify Hosting** (Next.js SSR compute) at [aysllan.com](https://aysllan.com).

- **Trunk-based flow**: all work lands on `main`. Before every push, the local gate runs (`npm run verify`, `npm run build`, `npm run test:e2e`). Each push to `main` triggers CI in GitHub Actions and an Amplify build. If a build fails, Amplify keeps serving the last successful deployment.
- **Versioned build**: `amplify.yml` pins Node 24, installs with `npm ci` and caches `.npm` and `.next/cache`. It takes precedence over the console's build settings.
- **Environment**: Amplify branch variables provide `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ASSETS_URL` and `NEXT_PUBLIC_SITE_ENV`. They are validated when the build starts. The app needs no secrets and no AWS credentials at build or run time.
- **Construction mode**: while `NEXT_PUBLIC_SITE_ENV` is anything but `production`, every response carries `X-Robots-Tag: noindex, nofollow`, so an unfinished site never reaches search indexes. Switching the variable to `production` and redeploying makes the site indexable.
- **Security headers** on every response: a Content Security Policy (scripts only from the site, images and media only from the CDN, no plugins, no framing), HSTS with preload, `nosniff`, a strict referrer policy and a restrictive permissions policy. Scripts allow `'unsafe-inline'` because Next.js streams its RSC payload in inline scripts. Nonces would force every page to render dynamically, and the site has no user input or third-party scripts.
- **Rollback**: in the Amplify console, open the `main` branch and use **Redeploy this version** on the last good build, or `git revert` the bad commit and push. Asset objects on the CDN are never deleted or overwritten, so any earlier build still finds its images.

Experimental Next.js flags in use: `globalNotFound`, which provides the 404 page for unmatched URLs under a dynamic `[lang]` root layout.

## Quality gates

Every push to `main` runs CI: formatting, linting, type checking, unit tests with coverage, the repository asset scan, a production build, end-to-end tests in Chromium, Firefox and WebKit, the first-load JavaScript budget and Lighthouse on every locale. The same checks run locally with `npm run verify`, `npm run test:e2e` and `npm run qa:fidelity` before anything is pushed.

Budgets enforced in CI (Lighthouse, mobile, median of three runs): Accessibility 100, SEO 100, Best Practices ≥ 95, Performance ≥ 90, CLS < 0.05, TBT < 150 ms, LCP < 3.5 s under simulated throttling, and first-load JavaScript < 150 KB gzipped (React and the Next.js runtime account for ~115 KB of it).
