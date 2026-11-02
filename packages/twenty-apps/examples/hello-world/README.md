This is a [Ownward Labs](https://www.ownward.agency) application project developed with the [Ownward Labs CLI](https://www.npmjs.com/package/twenty).

## Getting Started

First, authenticate to your workspace:

```bash
ownward auth login --url http://localhost:2020 --name local
```

Then, start development mode to sync your app and watch for changes:

```bash
ownward app dev
```

Open your Ownward Labs instance and go to `/settings/applications` section to see the result.

## Available Commands

Run `twenty --help` to list all available commands. Common commands:

```bash
# Remotes & Authentication
ownward auth login --url http://localhost:2020 --name local     # Authenticate with Ownward Labs
ownward auth status         # Check auth status
ownward remote use            # Set default remote
ownward remote list           # List all configured remotes
ownward remote remove <name>  # Remove a remote

# Application
ownward app dev            # Start dev mode (watch, build, sync, and auto-generate typed client)
ownward app add        # Scaffold a new entity (object, field, function, front-component, role, view, navigation-menu-item)
ownward app logs    # Stream function logs
ownward app exec    # Execute a function with JSON payload
ownward app uninstall  # Uninstall app from workspace
```

## Integration Tests

If your project includes the example integration test (`src/__tests__/app-install.integration-test.ts`), you can run it with:

```bash
# Make sure a Ownward Labs server is running at http://localhost:3000
yarn test
```

The test builds and installs the app, then verifies it appears in the applications list. Test configuration (API URL and API key) is defined in `vitest.config.ts`.

## LLMs instructions

Main docs and pitfalls are available in LLMS.md file.

## Learn More

To learn more about Ownward Labs applications, take a look at the following resources:

- [twenty-sdk](https://www.npmjs.com/package/twenty-sdk) - learn about `twenty-sdk` tool.
- [Ownward Labs doc](https://www.ownward.agency/) - Ownward Labs's documentation.
- Join our [Discord](https://discord.gg/cx5n4Jzs57)

You can check out [the Ownward Labs GitHub repository](https://github.com/Krishna-Sai3112/Ownward_CRM) - your feedback and contributions are welcome!
