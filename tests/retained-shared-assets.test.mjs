import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { readCurrentAssets } from '../scripts/retained-shared-assets.mjs';

async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'shared-release-test-'));
  try {
    await mkdir(join(root, 'v1/releases'), { recursive: true });
    const assets = { runtime: { sha256: 'runtime', bytes: 3 }, css: { sha256: 'css', bytes: 4 } };
    const bytes = Buffer.from(JSON.stringify({ assets }));
    const digest = createHash('sha256').update(bytes).digest('hex');
    const file = join(root, 'v1/releases', `${digest}.json`);
    const pointer = {
      release: { url: `https://example.com/shared/v1/releases/${digest}.json`, sha256: digest, bytes: bytes.length },
    };
    await writeFile(file, bytes);
    await writeFile(join(root, 'v1/current.json'), JSON.stringify(pointer));
    await run({ root, assets, bytes, file, pointer });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test('retains the exact deployed assets without overwriting historical release bytes', async () => {
  await fixture(async ({ root, assets, bytes, file }) => {
    const actual = await readCurrentAssets(
      root,
      (value) => value,
      (value) => value,
    );
    assert.deepEqual(actual, assets);
    actual.data = { sha256: 'new-data' };
    assert.ok(!assets.data);
    assert.deepEqual(await readFile(file), bytes);
  });
});

test('rejects a changed release or mismatched pointer size before retaining assets', async () => {
  await fixture(async ({ root, bytes, file, pointer }) => {
    await writeFile(file, Buffer.concat([bytes, Buffer.from('\n')]));
    await assert.rejects(
      readCurrentAssets(
        root,
        (value) => value,
        (value) => value,
      ),
      /identity mismatch/,
    );
    await writeFile(file, bytes);
    pointer.release.bytes += 1;
    await writeFile(join(root, 'v1/current.json'), JSON.stringify(pointer));
    await assert.rejects(
      readCurrentAssets(
        root,
        (value) => value,
        (value) => value,
      ),
      /identity mismatch/,
    );
  });
});
