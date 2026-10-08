import { createHash } from 'node:crypto';
import { lstat, readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] || 'shared');
const origin = 'https://f5-sales-demo.github.io/shared/';
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const pointer = JSON.parse(await readFile(join(root, 'v1/current.json')));
if (
  pointer.contract !== 'v1' ||
  !/^[a-f0-9]{64}$/.test(pointer.release?.sha256) ||
  pointer.release.url !== `${origin}v1/releases/${pointer.release.sha256}.json`
)
  throw Error('Invalid active shared release');
const selected = await readFile(join(root, 'v1/releases', `${pointer.release.sha256}.json`));
if (hash(selected) !== pointer.release.sha256 || selected.length !== pointer.release.bytes)
  throw Error('Invalid active release receipt');
const files = await readdir(root, { recursive: true });
for (const file of files) {
  const path = join(root, file);
  const stat = await lstat(path);
  if (stat.isSymbolicLink()) throw Error('Shared publication forbids symlinks');
  if (!stat.isFile()) continue;
  if (file === 'v1/current.json') continue;
  const name = file.split('/').at(-1);
  if (
    !/^[a-f0-9]{64}\.(?:json|js|css|svg|png|woff2|txt)$/.test(name) ||
    hash(await readFile(path)) !== name.split('.')[0]
  )
    throw Error(`Invalid immutable file: ${file}`);
}
for (const file of files.filter((file) => file.startsWith('v1/releases/') && file.endsWith('.json'))) {
  const release = JSON.parse(await readFile(join(root, file)));
  if (
    release.contract !== 'v1' ||
    !['css', 'runtime', 'data', 'logo', 'favicon'].every((name) => release.assets?.[name])
  )
    throw Error('Invalid retained release');
  for (const asset of Object.values(release.assets)) {
    if (!/^[a-f0-9]{64}$/.test(asset.sha256) || asset.url !== `${origin}assets/${asset.sha256}.${asset.extension}`)
      throw Error('Noncanonical asset URL');
    const bytes = await readFile(join(root, 'assets', asset.url.split('/').at(-1)));
    if (hash(bytes) !== asset.sha256 || bytes.length !== asset.bytes) throw Error('Invalid retained asset reference');
  }
}
console.log(
  `Verified ${files.filter((file) => file.startsWith('v1/releases/') && file.endsWith('.json')).length} retained shared releases and immutable asset hashes.`,
);
