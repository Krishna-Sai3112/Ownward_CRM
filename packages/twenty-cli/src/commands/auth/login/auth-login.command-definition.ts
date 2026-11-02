import { type LocalCommandDefinition } from '@/catalog/types/command-definition.type';

export const AUTH_LOGIN_COMMAND_DEFINITION: LocalCommandDefinition = {
  path: ['auth', 'login'],
  description: 'Sign in with your browser or an API key, and save the remote',
  options: [
    {
      flags: '--with-token',
      description: 'Read an API key from standard input',
    },
    {
      flags: '--url <url>',
      description: 'Ownward Labs server URL, for example https://crm.example.com',
    },
    {
      flags: '--name <name>',
      description: 'Name of the remote to save (defaults to "default")',
    },
    { flags: '--use', description: 'Make this remote the default' },
    {
      flags: '--replace',
      description: 'Point an existing remote at a different URL',
    },
  ],
  examples: [
    'ownward auth login --url https://crm.example.com',
    'ownward auth login --url https://crm.example.com --name prod --use',
    'printf \'%s\' "$OWNWARD_API_KEY" | ownward auth login --with-token --url https://crm.example.com --name prod --use',
    'ownward auth login --with-token --remote prod < api-key.txt',
  ],
  outputModes: ['human', 'json'],
  writes: true,
  needsProject: false,
  needsTarget: false,
  load: async () =>
    (await import('@/commands/auth/login/run-auth-login-command'))
      .runAuthLoginCommand,
};
