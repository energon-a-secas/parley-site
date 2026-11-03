export default {
  id: 'rich-content',
  name: 'Images, files and tables inside a reply',
  category: 'Messages',
  description: 'A reply that mixes prose with an image grid, a downloadable file card and a small data table, each block typed and each with a text fallback.',
  tags: ['images', 'files', 'tables', 'blocks', 'inline'],
  added: '2026-11-02',
  seenIn: [
    { product: 'ChatGPT', note: 'Intelligent UI replies (GPT-6, 2026-10-07) include mid-reply tables, step diagrams, checklists and working mini tools', url: 'https://www.aiuxplayground.com/teardowns/chatgpt/intelligent-ui', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'Inline interactive visuals (beta 2026-03-12) appear in the reply rather than a side panel and are temporary', url: 'https://claude.com/resources/articles/claude-builds-visuals', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Place-heavy answers split into a plan on the left and an embedded map on the right', url: 'https://www.aiuxplayground.com/teardowns/gemini/output', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'Tool UI elements such as a data table that announces sort changes through a polite region', url: 'https://github.com/assistant-ui/assistant-ui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Block container with a data-kind (image-grid, file, table, chart, form)',
    'Image grid: two or more tiles with captions, auto-fit so it stacks at narrow widths',
    'File card: type icon, name, size and a download affordance',
    'Data table with a caption, header row and compact numeric alignment',
    'Text fallback or caption so the reply still reads without the widget',
    'Widget-local actions (download, copy, open larger)',
  ],
  states: [
    'Skeleton: height reserved the moment the block token arrives',
    'Ready: interactive, actions enabled',
    'Submitted: a form becomes a read-only record of what was sent',
    'Stale: an ephemeral visual replaced as the conversation moves on',
  ],
  behavior: [
    'Each block reserves its height early so later text does not jump under the reader',
    'Charts carry a table, maps carry a list, images carry alt text and a caption',
    'The file card is a single link or button whose name includes the file name and size',
  ],
  microcopy: [
    { text: 'They appear in-line, rather than in a side panel', source: 'Anthropic, Claude visuals article' },
  ],
  variants: [
    'Model-composed native components: ChatGPT Intelligent UI',
    'Model-written HTML or SVG rendered inline and ephemeral: Claude visuals',
    'Developer-registered tool UIs: assistant-ui, CopilotKit, AI Elements',
  ],
  pitfalls: [
    'Components arriving mid-stream shift the layout under text the reader is viewing',
    'Ephemeral visuals the user wanted to keep, with no path to save them as an artifact',
    'Charts and image grids with no accessible alternative',
  ],
  refs: [
    { label: 'assistant-ui: UI elements', url: 'https://github.com/assistant-ui/assistant-ui' },
    { label: 'Vercel AI Elements: Image', url: 'https://github.com/vercel/ai-elements' },
  ],
  spec: 'Treat each rich block as a section with data-kind and a min-height, inserted the moment its opening token arrives so later prose does not jump. Build the image grid with grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) and give every tile alt text and a figcaption. Render the file card as one anchor whose accessible name includes name and size, with the icon decorative. Use a real table with a caption and th scope for the data block; if the block is a chart, include the same table as its fallback.',
  html: `<article class="pl pl-rich-content" aria-label="Assistant message">
  <p>Your focaccia plan for Saturday lunch, working back from a 12:30 bake. The two photos show what the dough should look like at the checkpoints.</p>
  <section class="pl-rich-content__block" data-kind="image-grid" aria-label="Two reference photos">
    <figure class="pl-rich-content__tile">
      <div class="pl-rich-content__img pl-rich-content__img--rise" role="img" aria-label="Dough after the first rise, doubled and glossy in a steel bowl"></div>
      <figcaption>After the first rise, about 90 minutes</figcaption>
    </figure>
    <figure class="pl-rich-content__tile">
      <div class="pl-rich-content__img pl-rich-content__img--dimple" role="img" aria-label="Dimpled dough in an oiled tray, sprinkled with salt and rosemary"></div>
      <figcaption>Dimpled and salted, straight into the oven</figcaption>
    </figure>
  </section>
  <section class="pl-rich-content__block" data-kind="table">
    <table class="pl-rich-content__table">
      <caption>Timeline for a 12:30 bake</caption>
      <thead><tr><th scope="col">Time</th><th scope="col">Step</th><th scope="col">Oven</th></tr></thead>
      <tbody>
        <tr><td>09:30</td><td>Mix, rest 20 min</td><td>off</td></tr>
        <tr><td>09:50</td><td>Fold, first rise</td><td>off</td></tr>
        <tr><td>11:20</td><td>Tray, second rise</td><td>preheat 11:50</td></tr>
        <tr><td>12:05</td><td>Dimple, salt, bake 25 min</td><td>230 °C</td></tr>
      </tbody>
    </table>
  </section>
  <section class="pl-rich-content__block" data-kind="file">
    <a class="pl-rich-content__file" href="#" aria-label="Download focaccia-timeline.pdf, 84 KB">
      <span class="pl-rich-content__file-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
      </span>
      <span class="pl-rich-content__file-text"><strong>focaccia-timeline.pdf</strong><span>PDF <span aria-hidden="true">·</span> 84 KB</span></span>
      <svg class="pl-rich-content__dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
    </a>
  </section>
  <p>Printed version attached. If the kitchen is cold, add 20 minutes to the first rise and keep the rest the same.</p>
</article>`,
  css: `.pl-rich-content { max-width: 680px; padding: 20px; line-height: 1.6; }
.pl-rich-content > p { margin: 0 0 14px; max-width: 65ch; }
.pl-rich-content__block { margin: 0 0 14px; }
.pl-rich-content__block[data-kind="image-grid"] { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; min-height: 120px; }
.pl-rich-content__tile { margin: 0; }
.pl-rich-content__img { aspect-ratio: 4 / 3; border-radius: var(--pl-radius); border: 1px solid var(--pl-border); }
.pl-rich-content__img--rise { background: radial-gradient(circle at 50% 55%, #e9c88a 0 38%, #b8884a 39% 60%, var(--pl-surface-2) 61%); }
.pl-rich-content__img--dimple { background: radial-gradient(circle at 30% 35%, #c98c3f 0 7%, transparent 8%), radial-gradient(circle at 70% 40%, #c98c3f 0 7%, transparent 8%), radial-gradient(circle at 50% 70%, #c98c3f 0 7%, transparent 8%), linear-gradient(135deg, #e3b56c, #cf9a4f); }
.pl-rich-content__tile figcaption { margin-top: 6px; font-size: 13px; color: var(--pl-muted); }
.pl-rich-content__table { width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); overflow: hidden; }
.pl-rich-content__table caption { text-align: start; padding: 0 0 6px; font-size: 13px; color: var(--pl-muted); }
.pl-rich-content__table th, .pl-rich-content__table td { padding: 8px 10px; text-align: start; border-top: 1px solid var(--pl-border); }
.pl-rich-content__table th { background: var(--pl-surface); font-weight: 600; border-top: 0; }
.pl-rich-content__table td:first-child { font-variant-numeric: tabular-nums; white-space: nowrap; }
.pl-rich-content__file { display: flex; align-items: center; gap: 12px; max-width: 360px; padding: 10px 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); color: inherit; text-decoration: none; transition: border-color 160ms ease-out, background 160ms ease-out; }
.pl-rich-content__file:hover { border-color: var(--pl-accent); background: var(--pl-surface-2); }
.pl-rich-content__file-icon { flex: none; display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--pl-radius-sm); background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-rich-content__file-text { display: flex; flex-direction: column; min-width: 0; font-size: 14px; line-height: 1.35; }
.pl-rich-content__file-text strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-rich-content__file-text span { font-size: 12px; color: var(--pl-muted); }
.pl-rich-content__dl { margin-inline-start: auto; color: var(--pl-muted); }
.pl-rich-content__file:hover .pl-rich-content__dl { color: var(--pl-text); }`,
};
