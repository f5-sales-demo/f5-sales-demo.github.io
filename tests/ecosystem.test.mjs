import assert from 'node:assert/strict';
import { test as it } from 'node:test';
import { items as defaultMegaMenuItems } from '../ecosystem/menu.mjs';
import { searchSources as federatedSearchSites } from '../ecosystem/search.mjs';

const links = defaultMegaMenuItems.flatMap((item) => item.content?.categories?.flatMap((c) => c.items) || []);
it('preserves audience taxonomy and canonical project destinations', () => {
  assert.deepEqual(
    defaultMegaMenuItems.map((item) => item.label),
    ['Demos', 'Demo environment', 'Operations', 'Developer tools', 'Ecosystem', 'F5 services'],
  );
  assert.equal(new Set(links.map((item) => item.href)).size, links.length);
  for (const repo of [
    'canada',
    'statistics',
    'multi-cloud-networking',
    'webapp-api-protection',
    'api-protection',
    'custom-responses',
    'xcsh-action',
  ]) {
    assert.ok(links.some((item) => item.href.includes(`/${repo}/`)));
  }
  for (const repo of ['waf', 'mcn', 'mvp', 'devcontainer'])
    assert.ok(!links.some((item) => item.href.includes(`/${repo}/`)));
  assert.ok(federatedSearchSites.some((item) => item.repo === 'f5-sales-demo.github.io'));
  assert.ok(federatedSearchSites.some((item) => item.repo === 'xcsh-action'));
  const networking = defaultMegaMenuItems[0].content.categories.find(
    (c) => c.title === 'Networking and performance',
  ).items;
  const canada = networking[networking.findIndex((item) => item.label === 'Multi-Cloud Networking') + 1];
  assert.equal(canada.label, 'Canada topology');
  assert.equal(canada.icon.asset, 'canada-flag.svg');
  assert.ok(links.find((item) => item.href.includes('/html-to-markdown/')));
});
