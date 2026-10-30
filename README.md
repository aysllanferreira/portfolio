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

## Project structure

```
src/
  app/          Routes only: layouts, pages and metadata files
  components/   Shared building blocks (ui, layout, media, brand, effects)
  features/     One folder per page section; a feature never imports another feature
  content/      Locale-agnostic facts (projects, roles, stack) and the generated asset manifest
  i18n/         Locale config and typed dictionaries
  lib/          Framework-agnostic utilities (env validation, formatting, class names)
  styles/       Design tokens and global styles
scripts/        Tooling (asset scan, asset pipeline)
tests/          End-to-end specs and test setup
```

## Design system

The design lives in a design file with a token-based system: colors, radii, a type scale, effects and 48 reusable components, drawn at three widths (390 mobile, 834 tablet, 1440 desktop). The code mirrors it instead of approximating it.

- **Tokens** (`src/styles/tokens.css`) reproduce the design variables one-to-one with the same names, so `bg-surface`, `text-text-muted`, `rounded-lg` or `text-h2` mean exactly what they mean in the design. Tailwind's default palette, radii and breakpoints are removed, so off-system values cannot creep in. A unit test compares every token with an export of the design variables.
- **Spacing** keeps Tailwind's 4px base. Every design spacing token (4, 8, 12, 16, 24, 32, 48, 64, 120) is a multiple of 4.
- **Layout ranges** are `mobile` (< 768px), `tablet` (768–1199px) and `desktop` (≥ 1200px).
- **Anchored fluid scaling** (`src/styles/fluid.css`): `--dpx`, a design pixel, equals exactly `1px` at 390, 834 and 1440, and scales with the viewport inside its range. Utilities such as `fluid-text-44 tablet:fluid-text-72 desktop:fluid-text-84` state the design values directly. Pages match the design exactly at the designed widths and degrade gracefully in between. Body text keeps fixed sizes for readability.
- **Typography**: Geist for everything you read, Geist Mono for metadata, and Instrument Serif italic for the single accent word of each headline. All three are self-hosted at build time.
- **Effects**: `glass` (translucent fill, 24px backdrop blur, gradient edge stroke, opaque fallback), `glow-accent` (primary buttons and featured tiles only) and `hairline-top` (section boundaries).

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

## Quality gates

Every push to `main` runs CI: formatting, linting, type checking, unit tests with coverage, the repository asset scan, a production build, and end-to-end tests in Chromium, Firefox and WebKit. The same checks run locally with `npm run verify` and `npm run test:e2e` before anything is pushed.
