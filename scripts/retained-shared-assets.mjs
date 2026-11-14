import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function readCurrentAssets(root, validatePointer, validateManifest) {
  const pointer = validatePointer(JSON.parse(await readFile(join(root, 'v1/current.json'), 'utf8')));
  const bytes = await readFile(join(root, 'v1/releases', pointer.release.url.split('/').at(-1)));
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (sha256 !== pointer.release.sha256 || bytes.length !== pointer.release.bytes) {
    throw new Error('Current shared manifest identity mismatch');
  }
  return structuredClone(validateManifest(JSON.parse(bytes)).assets);
}
