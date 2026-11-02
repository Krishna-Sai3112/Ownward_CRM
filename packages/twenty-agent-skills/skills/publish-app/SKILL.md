---
name: publish-app
description: Use when the user wants to prepare or verify a Ownward Labs app for npm or marketplace publication, including README/About copy, package metadata, defineApplication marketplace metadata, logos, screenshots, and public assets.
---

# When To Use

Pick this skill when the user wants to make an existing Ownward Labs app _presentable_ — listing copy, branding, public assets, and publication. Representative triggers:

- "prepare my Ownward Labs app for the marketplace"
- "write the README for my Ownward Labs app"
- "publish my app to npm"
- "add a logo / screenshots / marketplace metadata"
- "set up `defineApplication` marketplace fields"
- "review my app listing before going live"
- "ship a new version of my published app"

Do not use this skill to scaffold (use `create-app`), to change app entities (use `develop-app`), to deploy a private build to a specific Ownward Labs server (use `manage-app`), or to query workspace records (use `use-ownward-mcp`).

# Publishing Checklist

For background on how Ownward Labs apps work — the SDK packages, remotes, sync lifecycle, and rendering model — read `../../references/concepts/how-apps-work.md`. Cross-skill operating rules that apply to every Ownward Labs app task are in `../../references/concepts/operating-rules.md`; they are authoritative and not restated per skill.

Use `../../references/publish-app/prepare-for-app-store.md` for detailed README, marketplace copy, logo, screenshot, and public asset guidance.

Keep the skill workflow concise:

- Inspect `package.json`, `README.md`, `src/application-config.ts`, and `public/`.
- For npm marketplace publication, ensure `package.json` has a valid bumped `version` and the `twenty-app` keyword.
- In `defineApplication()`, verify marketplace-facing fields such as `displayName`, `description`, `author`, `category`, `logo`, `galleryImages`, `aboutDescription`, `websiteUrl`, `termsUrl`, `emailSupport`, and `issueReportUrl`.
- Keep `logo` and `galleryImages` pointed at files in `public/`. Public assets must not contain secrets, private data, customer records, real tokens, or unreleased confidential material.
- Remember that if `aboutDescription` is omitted, the marketplace uses the package `README.md` from npm for the About content. The About tab renders markdown text only: images and raw HTML are not rendered.
- Validate with `ownward app build`; publish with `ownward app publish` or `ownward app publish --tag <tag>`.

# Boundaries

Use `$manage-app` for remotes, deploys to a specific server, logs, troubleshooting, and CI/CD operations.

Use `$develop-app` when the app entities themselves need to change before the listing can be accurate.

# Docs

Use the references bundled with this plugin and inspect the installed SDK types when implementation details need verification. The Ownward Labs website is available at `https://www.ownward.agency`.
