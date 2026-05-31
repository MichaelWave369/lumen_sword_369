# Release Process

Use this process for moving LumenSword369 from release candidate to public v1.0.

## 1. Local verification

```bash
npm install
npm run release:check
```

This runs:

```bash
npm run validate:data
npm run build
```

## 2. GitHub verification

The `Verify` workflow runs on pushes, pull requests, and manual dispatch.

It installs dependencies and runs:

```bash
npm run release:check
```

## 3. Pages deployment

The `Deploy to GitHub Pages` workflow builds the app and deploys the `dist` folder through GitHub Pages.

Before launch, confirm repository settings:

- Settings → Pages
- Source → GitHub Actions

## 4. Release checklist

Complete `docs/V1_RELEASE_CHECKLIST.md`.

## 5. Release notes

Use `docs/V1_RELEASE_NOTES.md` as the first release note draft.

## 6. Public announcement

Use `docs/PUBLIC_LAUNCH_POST.md` as the launch post draft.

## 7. Tagging v1.0

When all checks pass, create a GitHub release/tag:

```text
v1.0.0
```

Use the release notes draft as the body.
