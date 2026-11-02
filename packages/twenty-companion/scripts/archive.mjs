import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import './package.mjs';

const { version } = JSON.parse(await readFile('package.json', 'utf8'));
const outputDirectory = resolve(
  process.env.OWNWARD_COMPANION_OUTPUT_DIR ??
    process.env.TWENTY_COMPANION_OUTPUT_DIR ??
    'release',
);
const archive = resolve(outputDirectory, `Ownward-Labs-${version}-macos-arm64.zip`);
execFileSync('ditto', [
  '-c',
  '-k',
  '--sequesterRsrc',
  '--keepParent',
  resolve(outputDirectory, 'Ownward Labs-darwin-arm64/Ownward Labs.app'),
  archive,
]);
const checksum = createHash('sha256');
for await (const chunk of createReadStream(archive)) checksum.update(chunk);
await writeFile(
  `${archive}.sha256`,
  `${checksum.digest('hex')}  ${basename(archive)}\n`,
);
console.log(archive);
