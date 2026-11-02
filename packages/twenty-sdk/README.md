<div align="center">
  <a href="https://www.ownward.agency">
    <picture>
      <img alt="Ownward Labs logo" src="https://raw.githubusercontent.com/Krishna-Sai3112/Ownward_CRM/main/packages/twenty-website/public/images/core/logo.svg" height="128">
    </picture>
  </a>
  <h1>Ownward Labs SDK</h1>

<a href="https://www.npmjs.com/package/twenty-sdk"><img alt="NPM version" src="https://img.shields.io/npm/v/twenty-sdk.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/Krishna-Sai3112/Ownward_CRM/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://discord.gg/cx5n4Jzs57"><img alt="Join the community on Discord" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Ownward Labs&labelColor=000000&logoWidth=20"></a>

</div>

The application authoring and runtime SDK for [Ownward Labs CRM](https://www.ownward.agency).

Use `twenty-sdk/define` to declare app entities, `twenty-sdk/front-component` for UI helpers, and `twenty-sdk/logic-function` for server-side helpers. The SDK also provides `billing`, `utils`, and renderer integration exports.

## Quick start

Install the standalone CLI separately from your app's SDK:

```bash
npm install -g ownward-cli
ownward app init my-twenty-app
cd my-twenty-app
yarn install
ownward auth login --url https://your-workspace.ownward.agency
ownward app dev --create
```

Keep `twenty-sdk` installed in each app. The global `twenty` package owns scaffolding, builds, authentication, sync, and publishing.

## Documentation

- [CLI reference](https://www.ownward.agency/developers/extend/apps/operations/cli)
- [Testing apps](https://www.ownward.agency/developers/extend/apps/operations/testing)
- [Logic function inputs](./docs/logic-function-inputs.md)

## Contributing

```bash
yarn install
npx nx build twenty-sdk
npx nx run twenty-sdk:test:unit
```

To work on CLI behavior, use `packages/twenty-cli` and `npx nx build twenty-cli`.
