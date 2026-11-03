#!/usr/bin/env node
// Validates every pattern module against js/patterns/CONTRACT.md.
// Usage: node scripts/check-patterns.mjs                 whole registry (exit 1 on any failure)
//        node scripts/check-patterns.mjs js/patterns/x.js  one or more unregistered modules
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'js', 'patterns');
const { CATEGORIES } = await import(pathToFileURL(join(dir, 'categories.js')));
const only = process.argv.slice(2);
const PATTERNS = only.length
  ? await Promise.all(only.map(async f => (await import(pathToFileURL(join(root, f)))).default))
  : (await import(pathToFileURL(join(dir, 'index.js')))).PATTERNS;
const failures = [];
const fail = (id, msg) => failures.push(`${id}: ${msg}`);
const EM_DASH = String.fromCharCode(0x2014);

const files = readdirSync(dir).filter(f => f.endsWith('.js') && !['index.js', 'tokens.js', 'categories.js'].includes(f));
const registered = new Set(PATTERNS.map(p => p.id));
if (!only.length) for (const f of files) if (!registered.has(f.replace(/\.js$/, ''))) fail(f, 'module exists but is not registered in index.js');

const ids = new Set();
for (const p of PATTERNS) {
  const id = p?.id || '(no id)';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) fail(id, 'id must be kebab-case');
  if (ids.has(id)) fail(id, 'duplicate id'); ids.add(id);
  let source = '';
  try { source = readFileSync(join(dir, `${id}.js`), 'utf8'); } catch { fail(id, `no file js/patterns/${id}.js`); }
  const lines = source.split('\n').length;
  if (lines > 220) fail(id, `${lines} lines, limit is 220`);
  if (source.includes(EM_DASH)) fail(id, 'em dash in module');

  for (const key of ['name', 'category', 'description', 'spec', 'html', 'css', 'added']) {
    if (typeof p[key] !== 'string' || !p[key].trim()) fail(id, `missing string ${key}`);
  }
  if (!CATEGORIES.includes(p.category)) fail(id, `unknown category "${p.category}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.added || '')) fail(id, 'added must be YYYY-MM-DD');
  if (!Array.isArray(p.tags) || p.tags.length < 2 || p.tags.length > 6 || p.tags.some(t => t !== t.toLowerCase())) fail(id, '2 to 6 lowercase tags');
  for (const key of ['anatomy', 'states', 'behavior', 'variants', 'pitfalls']) {
    if (!Array.isArray(p[key]) || p[key].length < 2 || p[key].some(s => typeof s !== 'string' || !s.trim())) fail(id, `${key}: at least 2 strings`);
  }
  if (!Array.isArray(p.seenIn) || p.seenIn.length < 2) fail(id, 'seenIn needs at least 2 products');
  else for (const s of p.seenIn) {
    if (!s.product || !s.note) fail(id, `seenIn entry missing product or note`);
    if (s.url && !/^https?:\/\//.test(s.url)) fail(id, `seenIn url not http(s): ${s.url}`);
  }
  if (!Array.isArray(p.microcopy)) fail(id, 'microcopy must be an array');
  else for (const m of p.microcopy) {
    if (!m.text || !m.source) fail(id, 'microcopy entry needs text and source');
    else if (m.text.split(/\s+/).length > 15) fail(id, `microcopy over 15 words: "${m.text}"`);
  }
  if (!Array.isArray(p.refs)) fail(id, 'refs must be an array');
  else for (const r of p.refs) if (!r.label || !/^https?:\/\//.test(r.url || '')) fail(id, 'ref needs label and http(s) url');

  const rootClass = `class="pl pl-${id}"`;
  if (!(p.html || '').includes(rootClass)) fail(id, `html root must carry ${rootClass}`);
  const selectors = (p.css || '').replace(/\/\*[\s\S]*?\*\//g, '').split('}')
    .map(block => block.split('{')[0].trim()).filter(Boolean)
    .flatMap(sel => sel.split(',').map(s => s.trim())).filter(s => s && !/^(from|to|\d+(\.\d+)?%)$/.test(s));
  for (const sel of selectors) {
    if (sel.startsWith('@')) {
      const kf = sel.match(/^@(?:-webkit-)?keyframes\s+(\S+)/);
      if (kf && !kf[1].startsWith(`pl-${id}`)) fail(id, `keyframes name not scoped: "${kf[1]}"`);
      continue;
    }
    if (!(sel.startsWith(`.pl-${id}`) || sel.startsWith('.pl[data-pl-theme'))) fail(id, `css selector not scoped: "${sel}"`);
  }
  if (/@import|url\(/.test(p.css || '')) fail(id, 'css must not import or reference external resources');
  if (/<img\s[^>]*src=["']https?:/i.test(p.html || '')) fail(id, 'html must not load external images');
  if (p.mount !== undefined) {
    if (typeof p.mount !== 'function') fail(id, 'mount must be a function');
    else {
      const src = p.mount.toString();
      if (!/^function\s*\(/.test(src) && !/^function\s+mount\s*\(/.test(src)) fail(id, 'mount must be a function expression: mount: function (root) { ... }');
      if (/\bimport\b|\brequire\(/.test(src)) fail(id, 'mount must not import');
    }
  }
}

const perCategory = Object.fromEntries(CATEGORIES.map(c => [c, PATTERNS.filter(p => p.category === c).length]));
console.log(`${PATTERNS.length} patterns`, perCategory);
if (failures.length) { console.error(`\n${failures.length} problem(s):`); for (const f of failures) console.error(' - ' + f); process.exit(1); }
console.log('check-patterns: ok');
