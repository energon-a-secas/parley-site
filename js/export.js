// Copy and download formats. Everything an agent or a project needs comes from the module itself.
import { TOKENS_CSS } from './patterns/tokens.js';

export function snippetJs(p) {
  if (!p.mount) return '';
  return `(${p.mount.toString()})(document.querySelector('.pl-${p.id}'));`;
}

export function snippetCss(p) {
  return `${TOKENS_CSS}\n\n/* ${p.name} */\n${p.css}`;
}

export function singleFile(p, theme = 'dark') {
  const html = theme === 'light' ? p.html.replace('class="pl pl-', 'data-pl-theme="light" class="pl pl-') : p.html;
  const js = snippetJs(p);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.name}</title>
<!-- From Parley, parley.neorgon.com/?p=${p.id} -->
<style>
${snippetCss(p)}
body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: ${theme === 'light' ? '#ffffff' : '#0b0d12'}; }
</style>
</head>
<body>
${html}
${js ? `<script>\n${js}\n</script>` : ''}
</body>
</html>
`;
}

const bullets = list => list.map(s => `- ${s}`).join('\n');

/** Markdown an agent can act on: the spec first, then evidence, then code. */
export function agentMarkdown(p, { withCode = true } = {}) {
  const seen = p.seenIn.map(s => `- ${s.product}: ${s.note}${s.url ? ` (${s.url}${s.checked ? `, checked ${s.checked}` : ''})` : ''}`).join('\n');
  const micro = p.microcopy.map(m => `- "${m.text}" (${m.source})`).join('\n');
  const refs = p.refs.map(r => `- ${r.label}: ${r.url}`).join('\n');
  const parts = [
    `# ${p.name}`,
    `Category: ${p.category}. Tags: ${p.tags.join(', ')}. Source: https://parley.neorgon.com/?p=${p.id}`,
    '', p.description, '',
    '## Build spec', p.spec, '',
    '## Anatomy', bullets(p.anatomy), '',
    '## States', bullets(p.states), '',
    '## Behavior and accessibility', bullets(p.behavior), '',
    '## Seen in', seen, '',
  ];
  if (micro) parts.push('## Microcopy', micro, '');
  if (p.variants.length) parts.push('## Variants', bullets(p.variants), '');
  parts.push('## Pitfalls', bullets(p.pitfalls), '');
  if (refs) parts.push('## References', refs, '');
  if (withCode) {
    parts.push('## Reference implementation', 'Plain HTML, CSS and JS. The `.pl` tokens block is shared by every Parley snippet; include it once per page.', '',
      '```html', p.html, '```', '', '```css', snippetCss(p), '```');
    const js = snippetJs(p);
    if (js) parts.push('', '```js', js, '```');
  }
  return parts.join('\n') + '\n';
}

export function catalogMarkdown(patterns, categories) {
  const parts = [
    '# Parley: chat UI pattern catalog',
    `${patterns.length} patterns observed in shipping chat and assistant products. Each entry gives the build spec and its evidence.`,
    'Reference code for any pattern: https://parley.neorgon.com/js/patterns/<id>.js (an ES module exporting html, css and mount). Live demo: https://parley.neorgon.com/preview.html?p=<id>',
    '',
  ];
  for (const category of categories) {
    const group = patterns.filter(p => p.category === category);
    if (!group.length) continue;
    parts.push(`## ${category}`, '');
    for (const p of group) {
      parts.push(`### ${p.name} (id: ${p.id})`, p.description, '', `**Spec.** ${p.spec}`, '',
        `**Seen in.** ${p.seenIn.map(s => s.product).join(', ')}.`, '',
        '**Pitfalls.**', bullets(p.pitfalls), '');
    }
  }
  return parts.join('\n');
}
