# Continuum

A bilingual interactive book on higher mathematics, built around visual experiments, precise explanations, and guided practice. The project also includes a compact Obsidian knowledge base for review.

**Read online:** [Russian version](https://artem-x-meta.github.io/continuum-book/#/ru/) · [English version](https://artem-x-meta.github.io/continuum-book/#/en/)

## What is included

- 18 chapters, 80 sections, and 275 topics based on `oglavlenie-vysshaya-matematika.md`;
- complete Russian and English content packs with shared progress and bookmarks;
- full-text search, chapter navigation, bookmarks, local progress, and a dark theme;
- interactive laboratories for matrices, derivatives, Riemann sums, and Fourier series;
- a dedicated explanation, glossary, step-by-step example, common pitfall, and practice problem for every section;
- four extended interactive lessons for the core topics, in both languages;
- `vault/` with 101 connected Markdown notes, formulas, tags, and wiki links;
- `public/continuum-obsidian-vault.zip`, regenerated automatically and available from the home page.

> The web book is bilingual. The downloadable Obsidian vault is currently written in Russian.

## Local development

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

Regenerate the vault first and then build everything:

```bash
npm run build:all
```

Build with the same base path used by GitHub Pages:

```powershell
$env:BASE_PATH='/continuum-book/'
npm run build
```

Regenerate the Obsidian vault and its downloadable archive:

```bash
npm run vault
```

Verify that the committed vault and ZIP match their generated source:

```bash
npm run vault:check
```

Run the automated test suite:

```bash
npm test
```

Run the browser-based visual and interaction checks while a production preview is running:

```bash
npm run visual
```

The script auto-detects Chrome, Chromium, or Edge on Windows, Linux, and macOS. Set `BROWSER_EXECUTABLE` if the browser is installed in a custom location.

## Content architecture

Each web page and each Obsidian note correspond to one numbered section (§); its numbered subsections become internal learning blocks.

- `src/data/guides-*.ts` contains the concise Russian summaries used by the vault.
- `src/data/details-*.ts` contains the deeper Russian web lessons.
- `src/data/en/` contains the complete English content pack.
- `src/pages/lessonContent.tsx` contains the four extended interactive Russian lessons.
- `src/i18n/` contains the localized UI copy and locale context.
- `scripts/build-vault.mjs` generates the Obsidian knowledge base and ZIP archive.

## Deployment

Pushes to `main` are tested, built, and deployed to GitHub Pages by `.github/workflows/pages.yml`. The workflow obtains the repository base path from GitHub Pages, builds the Vite application, and publishes only the generated `dist/` directory.
