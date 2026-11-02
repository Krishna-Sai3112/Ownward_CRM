# Ownward Labs Documentation

Product and developer documentation for the Ownward Labs CRM platform, powered by [Mintlify](https://mintlify.com).

## Local development

From the monorepo root, run:

```bash
npx nx run twenty-docs:dev
```

The docs site is available at `http://localhost:3000`.

## Content and validation

Documentation pages are written in MDX. Navigation is maintained in `navigation/base-structure.json`, with translated labels generated through the existing Crowdin workflow.

Validate the documentation with:

```bash
npx nx run twenty-docs:validate
```

The application packages retain their existing `twenty-*` workspace identifiers for compatibility with scripts and integrations. This distribution is derived from Twenty and preserves the license and upstream attribution notices.
