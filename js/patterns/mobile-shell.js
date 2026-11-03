export default {
  id: 'mobile-shell',
  name: 'Mobile shell with a drawer sidebar',
  category: 'Shell',
  description: 'A 360px phone frame: top bar with a menu button, the transcript, a bottom composer with safe-area padding, and the sidebar as a slide-in drawer behind a scrim that Escape closes.',
  tags: ['mobile', 'drawer', 'safe area', 'viewport', 'composer'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Open WebUI', note: 'Edge-swipe drawer: touches within 16px of the edge are ignored, 8px slop, horizontal travel must beat vertical by 1.2x, a flick counts above 0.55 px/ms, settles in 210ms; viewport meta sets viewport-fit=cover and interactive-widget=resizes-content but also maximum-scale=1', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'LibreChat', note: 'Viewport meta with interactive-widget=resizes-content and no zoom block', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'Viewport meta with maximum-scale=1, user-scalable=no; history rows grow from 32px to 40px on small screens', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Chrome on Android', note: 'Since Chrome 108 the default is resizes-visual, so the layout viewport no longer shrinks for the keyboard; interactive-widget picks resizes-visual, resizes-content or overlays-content', url: 'https://developer.chrome.com/blog/viewport-resize-behavior', checked: '2026-11-02' },
    { product: 'CopilotKit', note: 'The popup goes full screen below md and sizes with 100dvh', url: 'https://github.com/CopilotKit/CopilotKit', checked: '2026-11-02' },
  ],
  anatomy: [
    'Top bar: menu button with aria-expanded and aria-controls, title, new chat button',
    'Transcript that scrolls between the bars',
    'Composer row pinned to the bottom with padding-bottom max(12px, env(safe-area-inset-bottom))',
    'Drawer sidebar (aside) translated off-canvas, 280px wide, with a New chat button and history rows of at least 44px',
    'Scrim over the main content while the drawer is open',
    'Viewport meta without maximum-scale or user-scalable',
  ],
  states: [
    'Keyboard closed',
    'Keyboard open: composer stays visible (interactive-widget=resizes-content)',
    'Drawer dragging: follows the finger after 8px of horizontal travel',
    'Drawer open: scrim shown, main content inert, focus inside the drawer',
    'Landscape: same grid, shorter transcript',
  ],
  behavior: [
    'The menu button always works as the non-gesture alternative to the swipe (WCAG 2.5.1)',
    'Escape and a tap on the scrim close the drawer; focus returns to the menu button',
    'The swipe respects a 16px edge dead zone so it does not fight the OS back gesture, locks to the horizontal axis after 8px, and commits on more than 40% travel or a fast flick',
    'Drawer transform animates in about 210ms; under prefers-reduced-motion it snaps',
  ],
  microcopy: [
    { text: 'Open chat window', source: 'Chatwoot launcher title' },
  ],
  variants: [
    'Open WebUI: viewport-fit=cover plus resizes-content, edge swipe',
    'LibreChat: resizes-content without a zoom block',
    'HF chat-ui: blocks zoom and fails axe meta-viewport',
    'Widgets (Chatwoot, CopilotKit): the whole panel goes full screen instead of a drawer',
  ],
  pitfalls: [
    'Disabling zoom (HF chat-ui, Open WebUI) fails axe meta-viewport and WCAG 1.4.4',
    'An edge swipe that fights the OS back gesture',
    'With Chrome\'s default resizes-visual, a composer fixed to the bottom ends up under the keyboard; set resizes-content or position against visualViewport',
    '100vh overshoots behind browser chrome on mobile; use 100dvh',
  ],
  refs: [
    { label: 'Chrome: viewport resize behavior', url: 'https://developer.chrome.com/blog/viewport-resize-behavior' },
    { label: 'axe-core: meta-viewport rule', url: 'https://github.com/dequelabs/axe-core/blob/develop/lib/rules/meta-viewport.json' },
  ],
  spec: 'Use meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" with no maximum-scale and no user-scalable. Lay the app out as a grid of header, scrolling main and composer with height 100dvh; the composer row gets padding-bottom max(12px, env(safe-area-inset-bottom)). The drawer is an aside with translateX(-100%) that becomes none when data-drawer="open" is set on the root, with a scrim button behind it; open it from a visible menu button (aria-expanded, aria-controls) and from a touchstart more than 16px from the left edge that locks to the horizontal axis after 8px and commits on more than 40% travel or a fast flick. While open, set inert on the main content, move focus to the drawer\'s first control, and on Escape or scrim tap close it and return focus to the menu button.',
  html: `<div class="pl pl-mobile-shell" data-drawer="closed">
  <div class="pl-mobile-shell__phone">
    <div class="pl-mobile-shell__app">
      <header class="pl-mobile-shell__top">
        <button type="button" class="pl-mobile-shell__menu" aria-label="Open chats" aria-expanded="false" aria-controls="pl-mobile-shell-drawer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
        <h2>Porto weekend</h2>
        <button type="button" class="pl-mobile-shell__menu" aria-label="New chat"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
      </header>
      <main class="pl-mobile-shell__main">
        <p class="pl-mobile-shell__msg" data-role="user">Two nights in Porto, under 300 for both of us. Where do we stay?</p>
        <p class="pl-mobile-shell__msg" data-role="assistant">Stay in Bonfim or Cedofeita: 10 minutes from the centre on foot and roughly half the price of Ribeira. I found three guesthouses at 55 to 70 a night.</p>
        <p class="pl-mobile-shell__msg" data-role="user">Which one is closest to the station?</p>
      </main>
      <form class="pl-mobile-shell__composer" aria-label="Message composer">
        <textarea rows="1" placeholder="Message" aria-label="Message" enterkeyhint="send"></textarea>
        <button type="submit" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
      </form>
      <span class="pl-mobile-shell__home" aria-hidden="true"></span>
    </div>
    <button type="button" class="pl-mobile-shell__scrim" aria-label="Close chats" tabindex="-1"></button>
    <aside id="pl-mobile-shell-drawer" class="pl-mobile-shell__drawer" aria-label="Chats">
      <button type="button" class="pl-mobile-shell__new">New chat</button>
      <h3>Today</h3>
      <a href="#" aria-current="page">Porto weekend</a>
      <a href="#">Flaky CI: retry on 502 only</a>
      <h3>Yesterday</h3>
      <a href="#">Sourdough: second rise too long</a>
      <a href="#">NDA clause 7: carve-outs</a>
    </aside>
  </div>
</div>`,
  css: `.pl-mobile-shell { display: flex; justify-content: center; max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-mobile-shell__phone { position: relative; width: 360px; max-width: 100%; height: 640px; border: 1px solid var(--pl-border); border-radius: 36px; background: var(--pl-surface); overflow: hidden; box-shadow: var(--pl-shadow); }
.pl-mobile-shell__app { display: grid; grid-template-rows: auto 1fr auto; height: 100%; padding-top: 24px; background: var(--pl-bg); }
.pl-mobile-shell__top { display: flex; align-items: center; gap: 4px; padding: 6px 8px; border-bottom: 1px solid var(--pl-border); }
.pl-mobile-shell__top h2 { flex: 1; min-width: 0; margin: 0; text-align: center; font-size: 15px; font-weight: 600; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pl-mobile-shell__menu { display: grid; place-items: center; width: 44px; height: 44px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-text); }
.pl-mobile-shell__menu:hover { background: var(--pl-surface); }
.pl-mobile-shell__main { display: flex; flex-direction: column; gap: 8px; min-height: 0; padding: 14px; overflow-y: auto; }
.pl-mobile-shell__msg { max-width: 85%; margin: 0; padding: 9px 12px; border-radius: var(--pl-radius); font-size: 14px; line-height: 1.45; }
.pl-mobile-shell__msg[data-role="user"] { align-self: flex-end; background: var(--pl-user); }
.pl-mobile-shell__msg[data-role="assistant"] { align-self: flex-start; background: var(--pl-surface); border: 1px solid var(--pl-border); }
.pl-mobile-shell__composer { display: flex; align-items: flex-end; gap: 6px; padding: 8px 10px max(12px, env(safe-area-inset-bottom)); border-top: 1px solid var(--pl-border); }
.pl-mobile-shell__composer textarea { flex: 1; min-width: 0; min-height: 44px; max-height: 120px; padding: 11px 14px; border: 1px solid var(--pl-border); border-radius: 22px; background: var(--pl-surface); resize: none; line-height: 20px; font-size: 16px; }
.pl-mobile-shell__composer textarea:focus { outline: none; border-color: var(--pl-accent); }
.pl-mobile-shell__composer button { flex: none; width: 44px; height: 44px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-mobile-shell__home { position: absolute; left: 50%; bottom: 6px; width: 120px; height: 4px; border-radius: 2px; background: var(--pl-muted); transform: translateX(-50%); opacity: 0.6; }
.pl-mobile-shell__scrim { position: absolute; inset: 0; border: 0; background: rgba(0, 0, 0, 0.5); opacity: 0; pointer-events: none; transition: opacity 210ms ease-out; cursor: default; }
.pl-mobile-shell__drawer { position: absolute; top: 0; bottom: 0; left: 0; display: flex; flex-direction: column; gap: 4px; width: 280px; padding: 32px 12px 16px; background: var(--pl-surface); border-right: 1px solid var(--pl-border); transform: translateX(-100%); transition: transform 210ms cubic-bezier(0.2, 0.8, 0.2, 1); visibility: hidden; }
.pl-mobile-shell[data-drawer="open"] .pl-mobile-shell__scrim { opacity: 1; pointer-events: auto; }
.pl-mobile-shell[data-drawer="open"] .pl-mobile-shell__drawer { transform: none; visibility: visible; }
.pl-mobile-shell__new { min-height: 44px; margin-bottom: 8px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); font-size: 14px; font-weight: 600; }
.pl-mobile-shell__drawer h3 { margin: 8px 10px 2px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--pl-muted); }
.pl-mobile-shell__drawer a { display: flex; align-items: center; min-height: 44px; padding: 0 10px; border-radius: var(--pl-radius-sm); color: inherit; text-decoration: none; font-size: 14px; }
.pl-mobile-shell__drawer a:hover { background: var(--pl-surface-2); }
.pl-mobile-shell__drawer a[aria-current="page"] { background: var(--pl-surface-2); box-shadow: inset 2px 0 0 var(--pl-accent); }`,
  mount: function (root) {
    var menu = root.querySelector('.pl-mobile-shell__menu[aria-controls]');
    var app = root.querySelector('.pl-mobile-shell__app');
    var drawer = root.querySelector('.pl-mobile-shell__drawer');
    var scrim = root.querySelector('.pl-mobile-shell__scrim');
    var timer = null;
    function setOpen(open) {
      root.dataset.drawer = open ? 'open' : 'closed';
      menu.setAttribute('aria-expanded', String(open));
      app.inert = open;
      clearTimeout(timer);
      if (open) timer = setTimeout(function () { drawer.querySelector('button').focus(); }, 60);
      else menu.focus();
    }
    menu.addEventListener('click', function () { setOpen(root.dataset.drawer !== 'open'); });
    scrim.addEventListener('click', function () { setOpen(false); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.dataset.drawer === 'open') setOpen(false); });
    root.addEventListener('click', function (e) { if (e.target.closest('a')) { e.preventDefault(); setOpen(false); } });
    root.querySelector('.pl-mobile-shell__composer').addEventListener('submit', function (e) { e.preventDefault(); });
    return function () { clearTimeout(timer); app.inert = false; };
  },
};
