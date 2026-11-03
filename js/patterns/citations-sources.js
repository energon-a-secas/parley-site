export default {
  id: 'citations-sources',
  name: 'Inline citations with a preview card and a sources list',
  category: 'Agents & sources',
  description: 'Numbered citation markers at the end of the sentences they support, a hover-and-focus card with title, domain and snippet, and a favicon-stack chip that opens the full sources list.',
  tags: ['citations', 'sources', 'popover', 'search', 'a11y'],
  added: '2026-11-02',
  seenIn: [
    { product: 'ChatGPT', note: 'Favicon-plus-publisher pill at the end of a claim with "+N"; the pill opens a card with publisher, headline and snippet; a Sources entry opens a right panel', url: 'https://www.aiuxplayground.com/teardowns/chatgpt/citations', checked: '2026-11-02' },
    { product: 'Perplexity', note: 'Domain chips with "+N", a popover paged 1/N, a favicon stack reading "10 sources" that opens a right panel', url: 'https://www.aiuxplayground.com/teardowns/perplexity/citations', checked: '2026-11-02' },
    { product: 'Gemini', note: 'A Sources button at the bottom or inline opens a right side panel; no button means no links', url: 'https://support.google.com/gemini/answer/14143489?hl=en', checked: '2026-11-02' },
    { product: 'Microsoft 365 Copilot Chat', note: 'Inline citations; hovering one offers open in side pane and ask about this source; a Sources button lists all', url: 'https://support.microsoft.com/en-us/Microsoft-365-Copilot/control-review-sources-copilot-chat', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'InlineCitation is a badge trigger with a hover card and carousel; Sources is a collapsible "Used N sources" list', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
  ],
  anatomy: [
    'Inline marker: a small numbered button placed right after the supported sentence',
    'Preview card: favicon tile, domain, title, dated snippet',
    'Sources chip under the message: favicon stack plus "N sources"',
    'Sources list: numbered entries with title and domain, a close control',
    'Optional "+N" overflow and paging inside the card',
  ],
  states: [
    'Default: markers only',
    'Hover or focus: card shows under the marker',
    'Pinned: click keeps the card open until Escape or outside click',
    'List open: the chip reads aria-expanded="true" and the matching entry is highlighted',
    'No sources: the chip and markers are absent',
  ],
  behavior: [
    'Markers are buttons with an accessible name that includes the source, never bare superscripts',
    'The card opens on focus as well as hover, so keyboard and touch users get it',
    'Opening the list from a marker scrolls to and highlights the matching entry',
    'Under 700 px the list becomes a full-width sheet; the answer stays visible',
  ],
  microcopy: [
    { text: '10 sources', source: 'Perplexity' },
    { text: 'View sources', source: 'ChatGPT, August 2026' },
    { text: 'Used N sources', source: 'Vercel AI Elements' },
    { text: 'Publisher-first labels build trust faster than footnote numbers.', source: 'AI UX Playground' },
  ],
  variants: [
    'Numbered footnotes: older Perplexity, Copilot superscripts',
    'Publisher chips with "+N": ChatGPT and Perplexity in 2026 teardowns',
    'Whole-response references link at the top: GitHub Copilot Chat',
  ],
  pitfalls: [
    'The panel does not highlight which entry matches the chip you opened',
    '"+N" popovers that never show all N titles at once',
    'Hover-only previews that exclude touch and keyboard users',
    'Implying a link is the generation source when it is only similar content',
  ],
  refs: [
    { label: 'Vercel AI Elements: Inline citation', url: 'https://ai-sdk.dev/elements/components/inline-citation' },
    { label: 'Open WebUI: Citations.svelte', url: 'https://github.com/open-webui/open-webui' },
  ],
  spec: 'Emit each citation as a button.cite with aria-label "Source N: domain" directly after the sentence, wrapped in a span.ref that also holds the card; show the card on :hover and :focus-within via CSS and pin it on click with aria-expanded. Give the card domain, title, snippet and date, and position it under the marker, flipping to the end edge for markers near the right side. Under the message render a button with up to three favicon tiles and "N sources" that toggles a list (aria-expanded, aria-controls); a "View in sources" link inside each card opens the list and highlights the matching entry. Close everything on Escape and return focus to the marker.',
  html: `<article class="pl pl-citations-sources" aria-label="Assistant message">
  <p>Your Faro to Berlin flight was delayed 4h10 on arrival, so EU261 applies: the route is over 1,500 km and inside the EU, which puts the compensation at 400 euros.<span class="pl-citations-sources__ref"><button type="button" class="pl-citations-sources__cite" aria-label="Source 1: europa.eu" aria-expanded="false">1</button><span class="pl-citations-sources__card" role="group" aria-label="Source preview"><span class="pl-citations-sources__site"><i class="pl-citations-sources__fav" aria-hidden="true">E</i>europa.eu</span><strong>Air passenger rights: delays of three hours or more</strong><span class="pl-citations-sources__snip">Flights of more than 1,500 km within the EU: 400 euros, unless the delay was caused by extraordinary circumstances.</span><button type="button" class="pl-citations-sources__view" data-source="1">View in sources</button></span></span> The airline can refuse only for extraordinary circumstances, and a crew scheduling problem does not count.<span class="pl-citations-sources__ref" data-align="end"><button type="button" class="pl-citations-sources__cite" aria-label="Source 2: curia.europa.eu" aria-expanded="false">2</button><span class="pl-citations-sources__card" role="group" aria-label="Source preview"><span class="pl-citations-sources__site"><i class="pl-citations-sources__fav" aria-hidden="true">C</i>curia.europa.eu</span><strong>Judgment C-28/20, Airhelp v SAS</strong><span class="pl-citations-sources__snip">A strike by the carrier's own staff is inherent in the normal exercise of its activity and is not an extraordinary circumstance.</span><button type="button" class="pl-citations-sources__view" data-source="2">View in sources</button></span></span></p>
  <button type="button" class="pl-citations-sources__chip" aria-expanded="false" aria-controls="pl-citations-sources-list">
    <span class="pl-citations-sources__stack" aria-hidden="true"><i class="pl-citations-sources__fav">E</i><i class="pl-citations-sources__fav">C</i><i class="pl-citations-sources__fav">R</i></span>3 sources
  </button>
  <section id="pl-citations-sources-list" class="pl-citations-sources__list" aria-label="Sources" hidden>
    <header><strong>Sources</strong><button type="button" class="pl-citations-sources__close" aria-label="Close sources"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></header>
    <ol>
      <li data-source="1"><a href="#">Air passenger rights: delays of three hours or more</a><span>europa.eu</span></li>
      <li data-source="2"><a href="#">Judgment C-28/20, Airhelp v SAS</a><span>curia.europa.eu</span></li>
      <li data-source="3"><a href="#">Compensation claim form</a><span>ryanair.com</span></li>
    </ol>
  </section>
</article>`,
  css: `.pl-citations-sources { position: relative; max-width: 640px; padding: 20px; line-height: 1.65; }
.pl-citations-sources > p { margin: 0 0 14px; max-width: 65ch; }
.pl-citations-sources__ref { position: relative; display: inline-block; margin-inline-start: 3px; vertical-align: baseline; }
.pl-citations-sources__cite { min-width: 20px; height: 20px; padding: 0 5px; border: 1px solid var(--pl-border); border-radius: 6px; background: var(--pl-surface-2); color: var(--pl-muted); font-size: 11px; font-weight: 600; line-height: 1; vertical-align: 2px; }
.pl-citations-sources__cite:hover, .pl-citations-sources__cite[aria-expanded="true"] { color: var(--pl-text); border-color: var(--pl-accent); }
.pl-citations-sources__card { position: absolute; top: calc(100% + 6px); inset-inline-start: 0; z-index: 2; display: none; flex-direction: column; gap: 6px; width: min(300px, 78vw); padding: 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); box-shadow: var(--pl-shadow); font-size: 13px; line-height: 1.45; }
.pl-citations-sources__ref[data-align="end"] .pl-citations-sources__card { inset-inline-start: auto; inset-inline-end: 0; }
.pl-citations-sources__ref:hover .pl-citations-sources__card, .pl-citations-sources__ref:focus-within .pl-citations-sources__card, .pl-citations-sources__ref.is-pinned .pl-citations-sources__card { display: flex; }
.pl-citations-sources__site { display: flex; align-items: center; gap: 6px; color: var(--pl-muted); font-size: 12px; }
.pl-citations-sources__fav { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 5px; background: var(--pl-accent); color: var(--pl-on-accent); font-style: normal; font-size: 10px; font-weight: 700; }
.pl-citations-sources__snip { color: var(--pl-muted); }
.pl-citations-sources__view { align-self: flex-start; min-height: 32px; padding: 0 8px; margin-inline-start: -8px; border: 0; background: transparent; color: var(--pl-accent); font-size: 13px; }
.pl-citations-sources__chip { display: inline-flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 12px 0 8px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface); color: var(--pl-text); font-size: 13px; }
.pl-citations-sources__chip:hover, .pl-citations-sources__chip[aria-expanded="true"] { border-color: var(--pl-accent); }
.pl-citations-sources__stack { display: inline-flex; }
.pl-citations-sources__stack .pl-citations-sources__fav { margin-inline-end: -5px; border: 2px solid var(--pl-surface); }
.pl-citations-sources__stack .pl-citations-sources__fav:nth-child(2) { background: var(--pl-success); }
.pl-citations-sources__stack .pl-citations-sources__fav:nth-child(3) { background: var(--pl-muted); }
.pl-citations-sources__list { margin-top: 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); font-size: 14px; }
.pl-citations-sources__list header { display: flex; align-items: center; justify-content: space-between; padding: 10px 10px 10px 14px; border-bottom: 1px solid var(--pl-border); }
.pl-citations-sources__close { display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-citations-sources__close:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-citations-sources__list ol { margin: 0; padding: 6px 0; list-style: none; counter-reset: pl-citations-sources; }
.pl-citations-sources__list li { display: grid; grid-template-columns: 24px 1fr; column-gap: 8px; padding: 8px 14px; counter-increment: pl-citations-sources; transition: background 160ms ease-out; }
.pl-citations-sources__list li::before { content: counter(pl-citations-sources); grid-row: 1 / 3; color: var(--pl-muted); font-size: 12px; padding-top: 2px; }
.pl-citations-sources__list li.is-hit { background: color-mix(in srgb, var(--pl-accent) 14%, transparent); }
.pl-citations-sources__list a { color: var(--pl-text); text-decoration: none; }
.pl-citations-sources__list a:hover { text-decoration: underline; }
.pl-citations-sources__list span { font-size: 12px; color: var(--pl-muted); }
@media (max-width: 700px) { .pl-citations-sources__list { position: absolute; inset: auto 0 0 0; z-index: 3; max-height: 70%; overflow-y: auto; border-radius: var(--pl-radius) var(--pl-radius) 0 0; box-shadow: var(--pl-shadow); } }`,
  mount: function (root) {
    var refs = root.querySelectorAll('.pl-citations-sources__ref');
    var chip = root.querySelector('.pl-citations-sources__chip');
    var list = root.querySelector('.pl-citations-sources__list');
    var close = root.querySelector('.pl-citations-sources__close');
    var hitTimer = null;
    function unpin() { refs.forEach(function (r) { r.classList.remove('is-pinned'); r.querySelector('.pl-citations-sources__cite').setAttribute('aria-expanded', 'false'); }); }
    function setList(open) { list.hidden = !open; chip.setAttribute('aria-expanded', String(open)); }
    refs.forEach(function (ref) {
      var cite = ref.querySelector('.pl-citations-sources__cite');
      cite.addEventListener('click', function () {
        var on = !ref.classList.contains('is-pinned');
        unpin();
        ref.classList.toggle('is-pinned', on);
        cite.setAttribute('aria-expanded', String(on));
      });
      ref.querySelector('.pl-citations-sources__view').addEventListener('click', function (e) {
        unpin();
        setList(true);
        var hit = list.querySelector('[data-source="' + e.currentTarget.dataset.source + '"]');
        list.querySelectorAll('li').forEach(function (li) { li.classList.remove('is-hit'); });
        hit.classList.add('is-hit');
        hit.querySelector('a').focus({ preventScroll: true });
        clearTimeout(hitTimer);
        hitTimer = setTimeout(function () { hit.classList.remove('is-hit'); }, 2000);
      });
    });
    chip.addEventListener('click', function () { setList(list.hidden); });
    close.addEventListener('click', function () { setList(false); chip.focus(); });
    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var pinned = root.querySelector('.is-pinned .pl-citations-sources__cite');
      unpin();
      if (pinned) pinned.focus(); else if (!list.hidden) { setList(false); chip.focus(); }
    });
    function onDoc(e) { if (!e.target.closest('.pl-citations-sources__ref')) unpin(); }
    document.addEventListener('click', onDoc);
    return function () { clearTimeout(hitTimer); document.removeEventListener('click', onDoc); };
  },
};
