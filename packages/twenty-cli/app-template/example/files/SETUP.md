# Setup

Use Node.js from `.nvmrc` and Yarn 4. Install the standalone CLI globally:

```bash
npm install -g ownward-cli
yarn install
```

Connect to your existing Ownward Labs workspace, or start a server using the [local-server guide](https://www.ownward.agency/developers/extend/apps/getting-started/local-server):

```bash
ownward auth login --url https://your-workspace.ownward.agency --name dev
ownward app apply --create
ownward app dev
```

The first apply registers and installs your app. Dev watches and syncs later source changes. `ownward app init` does not authenticate, start containers, or install the app.

## Validation

- `yarn lint`, lint the project.
- `yarn typecheck`, check source and test types.
- `yarn test:unit`, run unit tests.
- `yarn test`, run integration tests against a disposable workspace configured with `OWNWARD_API_URL` and `OWNWARD_API_KEY` (legacy `TWENTY_API_URL` and `TWENTY_API_KEY` are also accepted).

Integration tests install and uninstall the app. Install the CLI globally or set `OWNWARD_CLI` to a local executable path.
