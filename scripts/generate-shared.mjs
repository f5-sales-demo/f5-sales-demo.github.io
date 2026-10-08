import { createHash } from 'node:crypto';
import { lstat, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { items } from '../ecosystem/menu.mjs';
import { searchSources } from '../ecosystem/search.mjs';

const theme = resolve(process.argv[2] || '../docs-theme');
const output = resolve('shared');
const fromTheme = async (file) => import(pathToFileURL(join(theme, file)).href);
const { ROOT, validatePointer, validateManifest, validateData } = await fromTheme('src/shared/contract.mjs');
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const json = (value) => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
async function immutable(file, bytes) {
  try {
    if (!(await readFile(file)).equals(bytes)) throw new Error(`Immutable shared asset changed: ${file}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await mkdir(resolve(file, '..'), { recursive: true });
    await writeFile(file, bytes, { flag: 'wx' });
  }
}
async function asset(bytes, extension) {
  bytes = Buffer.from(bytes);
  const sha256 = sha(bytes);
  await immutable(join(output, `assets/${sha256}.${extension}`), bytes);
  return { url: `${ROOT}assets/${sha256}.${extension}`, sha256, bytes: bytes.length, extension };
}
const { resolveMegaMenuIcon } = await fromTheme('src/utils/resolve-icon.ts');
const { mobileLabels } = JSON.parse(await readFile('ecosystem/labels.json'));
const menu = structuredClone({ items, mobileLabels });
async function icons(value) {
  if (!value || typeof value !== 'object') return;
  if (value.icon?.name) value.icon = resolveMegaMenuIcon(value.icon.name);
  if (value.icon?.asset) {
    const icon = value.icon;
    value.icon = {
      body: (await readFile(join(theme, 'assets', icon.asset), 'utf8')).replace(/<svg[^>]*>|<\/svg>/g, ''),
      width: icon.width,
      height: icon.height,
      mode: 'original',
    };
  }
  await Promise.all(Object.values(value).map(icons));
}
await icons(menu);
const routing = JSON.parse(await readFile('ecosystem/locales.json'));
const data = validateData({ menu, searchSources, routing });
const assets = {};
let fonts = await readFile(join(theme, 'fonts/font-face.css'), 'utf8');
for (const match of [...fonts.matchAll(/url\("\.\/(.*?)"\)/g)]) {
  const receipt = await asset(await readFile(join(theme, 'fonts', match[1])), 'woff2');
  assets[`font:${match[1]}`] = receipt;
  fonts = fonts.replace(match[0], `url("${receipt.url}")`);
}
for (const file of [
  'f5-distributed-cloud.svg',
  'f5-logo.svg',
  'canada-flag.svg',
  'canada-favicon.svg',
  'github-avatar.png',
  'flag-icons-LICENSE.txt',
]) {
  assets[file === 'f5-distributed-cloud.svg' ? 'logo' : file === 'f5-logo.svg' ? 'favicon' : file] = await asset(
    await readFile(join(theme, 'assets', file)),
    file.split('.').at(-1),
  );
}
const menuCss = await readFile(join(theme, 'node_modules/@f5-sales-demo/starlight-mega-menu/components/mega-menu.css'));
assets.css = await asset(
  Buffer.concat([
    Buffer.from(fonts),
    menuCss,
    await readFile(join(theme, 'styles/custom.css')),
    await readFile(join(theme, 'styles/shell.css')),
  ]),
  'css',
);
const { build } = await fromTheme('node_modules/esbuild/lib/main.js');
const result = await build({
  entryPoints: [join(theme, 'src/shared/runtime.tsx')],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  minify: true,
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [
    {
      name: 'root-locale-routing',
      setup(builder) {
        builder.onResolve({ filter: /localize-ecosystem-href(?:\.ts)?$/ }, (args) =>
          args.importer.includes('starlight-mega-menu') ? { path: join(theme, 'src/shared/localize.mjs') } : null,
        );
      },
    },
  ],
});
assets.runtime = await asset(result.outputFiles[0].contents, 'js');
assets.data = await asset(json(data), 'json');
const manifest = validateManifest({ contract: 'v1', assets });
const bytes = json(manifest);
const digest = sha(bytes);
await immutable(join(output, `v1/releases/${digest}.json`), bytes);
const pointer = validatePointer({
  contract: 'v1',
  release: { url: `${ROOT}v1/releases/${digest}.json`, sha256: digest, bytes: bytes.length },
});
// Verify the entire retained tree before updating the sole mutable pointer.
async function validateTree(directory) {
  for (const entry of await readdir(directory)) {
    const path = join(directory, entry);
    const stat = await lstat(path);
    if (stat.isSymbolicLink()) throw new Error('Shared tree cannot contain symlinks');
    if (stat.isDirectory()) await validateTree(path);
    else if (/^[a-f0-9]{64}\./.test(entry) && sha(await readFile(path)) !== entry.split('.')[0])
      throw new Error(`Invalid retained asset hash: ${path}`);
  }
}
await validateTree(output);
for (const file of await readdir(join(output, 'v1/releases'))) {
  const release = validateManifest(JSON.parse(await readFile(join(output, 'v1/releases', file))));
  for (const receipt of Object.values(release.assets)) {
    const bytes = await readFile(join(output, 'assets', receipt.url.split('/').at(-1)));
    if (sha(bytes) !== receipt.sha256 || bytes.length !== receipt.bytes)
      throw new Error('Missing or invalid retained release reference');
  }
}
await writeFile(join(output, 'v1/current.json'), json(pointer));
console.log(
  JSON.stringify({
    release: digest,
    assetBytes: Object.values(assets).reduce((sum, item) => sum + item.bytes, 0),
    assets: Object.keys(assets).length,
  }),
);
