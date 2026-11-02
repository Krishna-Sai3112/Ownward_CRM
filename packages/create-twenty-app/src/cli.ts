#!/usr/bin/env node

console.error(`create-twenty-app has been retired. Use the standalone Ownward Labs CLI:

  npm install -g ownward-cli
  ownward app init my-app
  cd my-app
  yarn install
  ownward auth login --url https://your-workspace.ownward.agency
  ownward app apply --create

For an existing app, run ownward app dev from its directory.
Keep twenty-sdk installed for application definitions and runtime helpers.`);
process.exitCode = 1;
