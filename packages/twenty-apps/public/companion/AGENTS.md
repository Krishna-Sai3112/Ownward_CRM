## Base documentation

- Getting started:
  - https://www.ownward.agency/developers/extend/apps/getting-started/quick-start.md
  - https://www.ownward.agency/developers/extend/apps/getting-started/concepts.md
  - https://www.ownward.agency/developers/extend/apps/getting-started/project-structure.md
  - https://www.ownward.agency/developers/extend/apps/getting-started/local-server.md
  - https://www.ownward.agency/developers/extend/apps/getting-started/scaffolding.md
  - https://www.ownward.agency/developers/extend/apps/getting-started/troubleshooting.md
- Config:
  - https://www.ownward.agency/developers/extend/apps/config/overview.md
  - https://www.ownward.agency/developers/extend/apps/config/application.md
  - https://www.ownward.agency/developers/extend/apps/config/roles.md
  - https://www.ownward.agency/developers/extend/apps/config/install-hooks.md
  - https://www.ownward.agency/developers/extend/apps/config/public-assets.md
- Data:
  - https://www.ownward.agency/developers/extend/apps/data/overview.md
  - https://www.ownward.agency/developers/extend/apps/data/objects.md
  - https://www.ownward.agency/developers/extend/apps/data/extending-objects.md
  - https://www.ownward.agency/developers/extend/apps/data/relations.md
- Logic:
  - https://www.ownward.agency/developers/extend/apps/logic/overview.md
  - https://www.ownward.agency/developers/extend/apps/logic/logic-functions.md
  - https://www.ownward.agency/developers/extend/apps/logic/skills-and-agents.md
  - https://www.ownward.agency/developers/extend/apps/logic/connections.md
- Layout:
  - https://www.ownward.agency/developers/extend/apps/layout/overview.md
  - https://www.ownward.agency/developers/extend/apps/layout/views.md
  - https://www.ownward.agency/developers/extend/apps/layout/navigation-menu-items.md
  - https://www.ownward.agency/developers/extend/apps/layout/page-layouts.md
  - https://www.ownward.agency/developers/extend/apps/layout/front-components.md
  - https://www.ownward.agency/developers/extend/apps/layout/command-menu-items.md
- Operations:
  - https://www.ownward.agency/developers/extend/apps/operations/overview.md
  - https://www.ownward.agency/developers/extend/apps/operations/cli.md
  - https://www.ownward.agency/developers/extend/apps/operations/testing.md
  - https://www.ownward.agency/developers/extend/apps/operations/publishing.md
- Rich app example: https://github.com/Krishna-Sai3112/Ownward_CRM/tree/main/packages/twenty-apps/examples/postcard

## UUID requirement

- All generated UUIDs must be valid UUID v4.

## Common Pitfalls

- Creating a view without a navigationMenuItem associated. This will make the view available on the left sidebar.
- Creating a front-end component that has a scroll instead of being responsive to its fixed widget height and width, unless it is specifically meant to be used in a canvas tab.

## Best practice

Use the standalone Ownward Labs CLI to generate supported entities:

```bash
ownward app add object --name invoice --name-plural invoices --create-view --create-navigation-menu-item --create-page-layout --no-input
ownward app add field --name amount --type NUMBER --object <object-uuid> --no-input
ownward app add logic-function --name send-invoice --no-input
ownward app add front-component --name invoice-panel --no-input
```

For other entity types, use the corresponding `twenty-sdk/define` export and generate UUID v4 identifiers. The SDK no longer supplies a CLI.
