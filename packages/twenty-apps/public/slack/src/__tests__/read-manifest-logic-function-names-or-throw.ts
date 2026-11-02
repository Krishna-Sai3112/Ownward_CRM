import { z } from 'zod';

import { runOwnwardCLI } from './run-ownward';

const buildResultSchema = z.object({
  manifest: z.object({
    logicFunctions: z.array(z.object({ name: z.string() })),
  }),
});

export const readManifestLogicFunctionNamesOrThrow = async (): Promise<
  string[]
> => {
  const result = await runOwnwardCLI(['app', 'build']);

  if (!result.ok) {
    throw new Error(`App build failed: ${result.error.message}`);
  }

  const { manifest } = buildResultSchema.parse(result.data);

  return manifest.logicFunctions.map((logicFunction) => logicFunction.name);
};
