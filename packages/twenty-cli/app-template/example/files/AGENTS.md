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

## Front components

For front component work, follow the official `develop-app` skill when installed. Install the official skills with `npx skills add https://github.com/Krishna-Sai3112/Ownward_CRM/tree/agent-skills --skill '*'`. Apply these essentials even when no skills are installed:

- For every visible front component, use `twenty-ui` components by default. Reuse an equivalent Ownward Labs UI control before writing a custom control or adding another UI library. Plain HTML is appropriate for layout containers and content without a Ownward Labs UI equivalent.
- Import from public family subpaths: `twenty-ui/components/input` for `MainButton` and `LightButton`, `twenty-ui/primitives/input` for foundational controls, `twenty-ui/primitives/typography` for text, and the matching family for other components. Import individual icons from `twenty-ui/icon`, never `IconsProvider` or `useIcons`. Keep `twenty-ui`, `twenty-sdk` and `twenty-client-sdk` pinned to the same version in `devDependencies`.
- The renderer supplies styles and the workspace theme. Use `useTheme()` from `twenty-ui/theme` inside the component for spacing, colors, typography and radii. Do not add a root `ThemeProvider`, force a color scheme, or copy standalone stylesheet setup into a front component. Never dereference theme tokens at module top level, since entity files also run during manifest extraction.
- Use component props before custom styles. Keep layouts compact and responsive to widget width, give inputs visible labels and icon-only actions accessible names, and handle loading, empty, error, disabled and saving states. Verify light and dark themes, narrow widths and long values.
- Use `openCommandConfirmationModal` or `CommandModal` from `twenty-sdk/front-component` for confirmation dialogs and `enqueueSnackbar` for notifications. Do not render `Dialog`, `AlertDialog`, native `dialog` elements or native browser popovers directly. Use Ownward Labs UI `Dropdown` for menus and pickers.
- Components run in a Web Worker with a sandboxed, partial `window` and `document`. Prefer CSS for layout and width-based queries. `canvas` and `scrollIntoView` are unsupported; consult the current runtime limitations before using other browser APIs.
- Keep the `.tsx` entity's direct `export default defineFrontComponent({ ... })` call. The SDK mounts the component, so do not call `react-dom/client` or use browser globals at module top level.
- Read workspace data with `CoreApiClient` from `twenty-client-sdk/core` and selection with `useSelectedRecordIds()` from `twenty-sdk/front-component`. Call third-party APIs from logic functions; secret application variables never reach a front component.

Read the [front component guide](https://www.ownward.agency/developers/extend/apps/layout/front-components.md) before implementation for the renderer setup and runtime limitations. Use [Ownward Labs UI getting started](https://www.ownward.agency/ui/getting-started.md), [components](https://www.ownward.agency/ui/components/overview.md), [primitives](https://www.ownward.agency/ui/primitives/overview.md) and [theming](https://www.ownward.agency/ui/theming.md) to find the relevant component page and check its current props and composition.

## UUID requirement

- All generated UUIDs must be valid UUID v4.

## Common Pitfalls

- Creating a view without a navigationMenuItem associated. This will make the view available on the left sidebar.
- Creating a front component that overflows its widget. Fit the available width and let content determine height, unless the component is the tab's single `heightBehavior: 'TAB_VIEWPORT'` widget and owns internal scrolling.

## Best practice

It's highly recommended to create new app entities using `ownward app add`. These are the options:

| Entity type     | Command                          | Generated file                    |
| --------------- | -------------------------------- | --------------------------------- |
| Object          | `ownward app add object`          | `src/objects/<name>.ts`           |
| Field           | `ownward app add field`           | `src/fields/<name>.ts`            |
| Logic function  | `ownward app add logic-function`  | `src/logic-functions/<name>.ts`   |
| Front component | `ownward app add front-component` | `src/front-components/<name>.tsx` |

These generators create the required UUID v4 identifiers. For roles, skills, agents, views, navigation items, layouts, commands, and connection providers, use the corresponding `twenty-sdk/define` export and generate UUID v4 identifiers.
