## Base documentation

- Documentation: https://www.ownward.agency/developers/extend/apps/getting-started
- Rich app example: https://github.com/Krishna-Sai3112/Ownward_CRM/tree/main/packages/twenty-apps/examples/postcard

## UUID requirement

- All generated UUIDs must be valid UUID v4.

## Common Pitfalls

- Creating a view without a navigationMenuItem associated. This will make the view available on the left sidebar.
- Creating a front-end component that has a scroll instead of being responsive to its fixed widget height and width, unless it is specifically meant to be used in a canvas tab.
