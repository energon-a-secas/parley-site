# Pattern module contract

One file per pattern in `js/patterns/<id>.js`, registered in `js/patterns/index.js`.
`node scripts/check-patterns.mjs` enforces everything below.

```js
export default {
  id: 'send-stop',                      // kebab-case, equals the file name
  name: 'Send button that becomes Stop',
  category: 'Composer',                 // one of CATEGORIES in categories.js
  description: 'One sentence for the card. No em dashes.',
  tags: ['button', 'states'],           // 2 to 6 lowercase tags
  added: '2026-11-02',
  seenIn: [                             // 2 to 6 real products, each with what was observed
    { product: 'ChatGPT', note: 'Arrow button turns into a square stop while streaming', url: 'https://help.openai.com/...', checked: '2026-11-02' },
  ],
  anatomy: ['Textarea', 'Send/stop button'],   // 3 to 8 parts
  states: ['Empty: disabled', 'Ready', 'Generating: stop'],
  behavior: ['Enter sends, Shift+Enter inserts a newline', 'aria-label swaps with the state'],
  microcopy: [{ text: 'Stop generating', source: 'ChatGPT' }],   // under 15 words each
  variants: ['Perplexity keeps the arrow and adds a separate stop'],
  pitfalls: ['Disabling the button on empty input hides the shortcut from screen readers'],
  refs: [{ label: 'assistant-ui Composer', url: 'https://www.assistant-ui.com/docs/...' }],
  spec: 'Two to five sentences a coding agent follows to build it with plain HTML, CSS and JS.',
  html: `<div class="pl pl-send-stop"> ... </div>`,
  css: `.pl-send-stop { ... }`,
  mount: function (root) { /* optional */ },
};
```

Rules:

- **Root element** carries `class="pl pl-<id>"`. Every CSS selector starts with
  `.pl-<id>` (or `.pl[data-pl-theme]` for a theme hook). Nothing leaks.
- **Colors and type** come from the `--pl-*` tokens in `tokens.js`. Plain values are
  fine for sizes and radii. Never read the site's `--accent` or CDN tokens.
- **`mount`** is `mount: function (root) { ... }` (a function expression, not method
  shorthand). It references nothing outside itself: no imports, no module variables,
  no globals except `document`, `window`, `setTimeout`, `requestAnimationFrame`.
  The copyable snippet is `(mount.toString())(root)`, so anything else breaks the copy.
  Return a cleanup function if you start a timer or an observer.
- **Self-contained visuals.** No external images, fonts or icon libraries. Inline SVG
  for icons (16 or 20 px, `stroke="currentColor"`, `aria-hidden="true"`).
- **Fixtures, not lorem.** Demo copy reads like a real chat about a real task.
- **Accessibility is part of the pattern.** Buttons have names, live regions are
  declared, focus is visible, interactive targets are at least 32 px in a snippet and
  44 px where the real product uses 44.
- **Size.** Target 150 lines per module, 220 at most. A pattern that needs more is
  two patterns.
- **No em dashes** anywhere, including inside HTML strings.
