export default {
  id: 'widget-launcher',
  name: 'Embedded widget: launcher bubble and drawer',
  category: 'Embedded',
  description: 'A 60px launcher 20px from the bottom right with an unread badge that opens a 400 by 560 drawer with header, message list and composer, going full screen on narrow viewports.',
  tags: ['embedded', 'widget', 'launcher', 'dialog', 'drawer'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Chatwoot', note: '64px round launcher at bottom 20px, right 20px; panel 400px wide, max-height 640px, bottom 104px, 16px radius; full screen at 667px and below', url: 'https://github.com/chatwoot/chatwoot', checked: '2026-11-02' },
    { product: 'CopilotKit', note: 'CopilotPopupView defaults to 420 by 560px, capped at calc(100vw - 3rem) by calc(100dvh - 7.5rem), role="dialog" with an aria-label, Escape closes', url: 'https://github.com/CopilotKit/CopilotKit', checked: '2026-11-02' },
    { product: 'Zendesk Web Widget', note: 'zE messenger open, close, show and hide; position side left or right with web and mobile offsets (16px default); launcherShape square, circle or none', url: 'https://developer.zendesk.com/api-reference/widget-messaging/web/core/', checked: '2026-11-02' },
    { product: 'Intercom Messenger', note: 'alignment left or right, horizontal and vertical padding (minimum 20, not applied on mobile), hide_default_launcher and custom_launcher_selector', url: 'https://developers.intercom.com/installing-intercom/web/attributes-objects', checked: '2026-11-02' },
  ],
  anatomy: [
    'Fixed launcher button, 56 to 64px, with aria-expanded and aria-controls pointing at the panel',
    'Unread badge on the launcher that clears on open',
    'Panel with role="dialog" and aria-label, anchored above the launcher on the same side',
    'Panel header: title, availability line, close button',
    'Message list with flex 1 and overflow-y auto',
    'Composer pinned to the panel bottom',
    'Full-screen rule below about 640px: inset 0, no radius',
  ],
  states: [
    'Launcher idle',
    'Unread: badge with a count, launcher pulses once',
    'Opening: opacity and translateY transition, focus moves to the composer',
    'Open: launcher icon becomes a close X',
    'Full screen on narrow viewports',
    'Hidden by the host page through an API call',
  ],
  behavior: [
    'Launcher click, Escape inside the panel and the header close button all call one toggle function',
    'Focus moves into the composer on open and returns to the launcher on close',
    'The launcher icon rotates into an X while open, so the same control closes',
    'A documented z-index that the host can lower, instead of a hard-coded maximum',
    'A new message while closed increments the badge and announces it politely',
  ],
  microcopy: [],
  variants: [
    'Floating versus embedded into a host container (Zendesk render modes)',
    'Fixed size (Intercom, by staff answer) versus configurable width and height (CopilotKit) versus scale only (Zendesk contentScale)',
    'Square, circle or no launcher at all with a custom trigger (Zendesk, Intercom)',
  ],
  pitfalls: [
    'Maximum z-index values (Chatwoot 2147483000, Zendesk 999999) cover page modals and cookie banners',
    'A launcher on the bottom right can cover the page\'s own primary button',
    'Fixed minimum widths (Intercom 342px) crop inside narrow embedded apps',
    'Users find the default panel small on desktop; cap by viewport, not by a fixed pixel height',
  ],
  refs: [
    { label: 'chatwoot sdk.css', url: 'https://github.com/chatwoot/chatwoot' },
    { label: 'Zendesk messaging Web Widget API', url: 'https://developer.zendesk.com/api-reference/widget-messaging/web/core/' },
    { label: 'Intercom Messenger attributes', url: 'https://developers.intercom.com/installing-intercom/web/attributes-objects' },
  ],
  spec: 'Render a 60px button fixed at bottom 20px, right 20px with aria-expanded="false" and aria-controls="chat-panel", and a section id="chat-panel" role="dialog" aria-label="Chat" fixed at bottom 96px, right 20px, width min(400px, calc(100vw - 32px)), height min(560px, calc(100dvh - 120px)), 16px radius. Below 640px wide set the panel to inset 0 with no radius. Toggle with one function that flips aria-expanded, animates opacity and translateY, moves focus to the composer textarea on open and back to the launcher on close or Escape, and clears the unread badge. Expose the z-index as a CSS variable the host can lower. Reuse the send-stop pattern for the panel composer.',
  html: `<div class="pl pl-widget-launcher" data-open="false">
  <div class="pl-widget-launcher__page">
    <h2 class="pl-widget-launcher__h">Lisbon weekend, booked</h2>
    <p class="pl-widget-launcher__p">Your tickets for the 14:10 train and the Alfama apartment are confirmed. Check-in opens at 15:00.</p>
    <p class="pl-widget-launcher__p">Questions about the booking? Open the chat.</p>
    <button type="button" class="pl-widget-launcher__cta">Download tickets</button>
  </div>
  <section class="pl-widget-launcher__panel" role="dialog" aria-label="Chat with support" aria-hidden="true">
    <header class="pl-widget-launcher__head">
      <span class="pl-widget-launcher__avatar" aria-hidden="true"></span>
      <div class="pl-widget-launcher__who"><strong>Parley support</strong><span>Usually replies in minutes</span></div>
      <button type="button" class="pl-widget-launcher__close" aria-label="Close chat"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </header>
    <div class="pl-widget-launcher__list">
      <p class="pl-widget-launcher__msg">Hi. Your apartment check-in is at 15:00. Anything I can help with before Saturday?</p>
      <p class="pl-widget-launcher__msg pl-widget-launcher__msg--user">Can we leave bags earlier?</p>
      <p class="pl-widget-launcher__msg">Yes, the host accepts bags from 11:00 at the same address. I have noted it on the booking.</p>
    </div>
    <form class="pl-widget-launcher__composer" aria-label="Message composer">
      <textarea class="pl-widget-launcher__input" rows="1" aria-label="Message" placeholder="Write a message"></textarea>
      <button type="submit" class="pl-widget-launcher__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </form>
  </section>
  <button type="button" class="pl-widget-launcher__bubble" aria-label="Open chat, 1 unread message" aria-expanded="false">
    <svg class="pl-widget-launcher__ico-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>
    <svg class="pl-widget-launcher__ico-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
    <span class="pl-widget-launcher__badge" aria-hidden="true">1</span>
  </button>
  <p class="pl-sr" aria-live="polite"></p>
</div>`,
  css: `.pl-widget-launcher { --pl-widget-z: 40; position: relative; max-width: 720px; height: 620px; overflow: hidden; background: var(--pl-bg); container-type: inline-size; }
.pl-widget-launcher__page { padding: 28px 24px; max-width: 46ch; }
.pl-widget-launcher__h { margin: 0 0 10px; font-size: 22px; font-weight: 600; letter-spacing: -0.01em; }
.pl-widget-launcher__p { margin: 0 0 10px; font-size: 14.5px; line-height: 1.55; color: var(--pl-muted); }
.pl-widget-launcher__cta { margin-top: 8px; height: 40px; padding: 0 18px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface); font-size: 14px; font-weight: 600; color: var(--pl-text); }
.pl-widget-launcher__cta:hover { background: var(--pl-surface-2); }
.pl-widget-launcher__bubble { position: absolute; right: 20px; bottom: 20px; z-index: calc(var(--pl-widget-z) + 1); display: grid; place-items: center; width: 60px; height: 60px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); box-shadow: var(--pl-shadow); transition: transform 160ms ease-out; }
.pl-widget-launcher__bubble:hover { transform: scale(1.05); }
.pl-widget-launcher__bubble svg { grid-area: 1 / 1; transition: transform 200ms ease-out, opacity 160ms ease-out; }
.pl-widget-launcher__ico-close { opacity: 0; transform: rotate(-45deg); }
.pl-widget-launcher[data-open="true"] .pl-widget-launcher__ico-chat { opacity: 0; transform: rotate(45deg); }
.pl-widget-launcher[data-open="true"] .pl-widget-launcher__ico-close { opacity: 1; transform: none; }
.pl-widget-launcher__badge { position: absolute; top: -2px; right: -2px; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 10px; border: 2px solid var(--pl-bg); background: var(--pl-danger); font-size: 11px; font-weight: 700; line-height: 16px; color: var(--pl-bg); }
.pl-widget-launcher__badge:empty { display: none; }
.pl-widget-launcher__panel { position: absolute; right: 20px; bottom: 96px; z-index: var(--pl-widget-z); display: flex; flex-direction: column; width: min(400px, calc(100% - 40px)); height: min(560px, calc(100% - 120px)); border: 1px solid var(--pl-border); border-radius: 16px; background: var(--pl-surface); box-shadow: var(--pl-shadow); overflow: hidden; opacity: 0; transform: translateY(12px); pointer-events: none; visibility: hidden; transition: opacity 180ms ease-out, transform 180ms ease-out, visibility 0s 180ms; }
.pl-widget-launcher[data-open="true"] .pl-widget-launcher__panel { opacity: 1; transform: none; pointer-events: auto; visibility: visible; transition-delay: 0s; }
.pl-widget-launcher__head { display: flex; align-items: center; gap: 10px; padding: 12px 12px 12px 16px; border-bottom: 1px solid var(--pl-border); }
.pl-widget-launcher__avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--pl-accent), var(--pl-surface-2)); }
.pl-widget-launcher__who { display: flex; flex: 1; flex-direction: column; line-height: 1.3; font-size: 14px; }
.pl-widget-launcher__who span { font-size: 12px; color: var(--pl-muted); }
.pl-widget-launcher__close { display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); }
.pl-widget-launcher__close:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-widget-launcher__list { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: 14px; }
.pl-widget-launcher__msg { margin: 0; max-width: 85%; padding: 8px 12px; border-radius: 16px 16px 16px 4px; background: var(--pl-surface-2); font-size: 14px; line-height: 1.45; }
.pl-widget-launcher__msg--user { align-self: flex-end; border-radius: 16px 16px 4px 16px; background: var(--pl-user); }
.pl-widget-launcher__composer { display: flex; align-items: flex-end; gap: 6px; padding: 10px 10px 10px 14px; border-top: 1px solid var(--pl-border); }
.pl-widget-launcher__input { flex: 1; min-width: 0; min-height: 36px; max-height: 110px; padding: 7px 0; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; font-size: 14px; }
.pl-widget-launcher__input::placeholder { color: var(--pl-muted); }
.pl-widget-launcher__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
@container (max-width: 480px) { .pl-widget-launcher__panel { inset: 0; width: auto; height: auto; border-radius: 0; } }`,
  mount: function (root) {
    var bubble = root.querySelector('.pl-widget-launcher__bubble');
    var panel = root.querySelector('.pl-widget-launcher__panel');
    var close = root.querySelector('.pl-widget-launcher__close');
    var badge = root.querySelector('.pl-widget-launcher__badge');
    var list = root.querySelector('.pl-widget-launcher__list');
    var input = root.querySelector('.pl-widget-launcher__input');
    var form = root.querySelector('.pl-widget-launcher__composer');
    var live = root.querySelector('[aria-live]');
    var uid = 'pl-wl-' + Math.random().toString(36).slice(2, 7);
    var unread = 1, timer = null;
    panel.id = uid;
    bubble.setAttribute('aria-controls', uid);
    function label() { bubble.setAttribute('aria-label', root.dataset.open === 'true' ? 'Close chat' : 'Open chat' + (unread ? ', ' + unread + ' unread' : '')); }
    function setOpen(open) {
      root.dataset.open = String(open);
      bubble.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
      if (open) { unread = 0; badge.textContent = ''; list.scrollTop = list.scrollHeight; setTimeout(function () { input.focus(); }, 60); }
      else bubble.focus();
      label();
    }
    function arrive(text) {
      var p = document.createElement('p');
      p.className = 'pl-widget-launcher__msg';
      p.textContent = text;
      list.appendChild(p);
      list.scrollTop = list.scrollHeight;
      if (root.dataset.open !== 'true') { unread += 1; badge.textContent = String(unread); live.textContent = 'New message from support'; label(); }
    }
    bubble.addEventListener('click', function () { setOpen(root.dataset.open !== 'true'); });
    close.addEventListener('click', function () { setOpen(false); });
    panel.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { ev.preventDefault(); setOpen(false); } });
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!input.value.trim()) return;
      var p = document.createElement('p');
      p.className = 'pl-widget-launcher__msg pl-widget-launcher__msg--user';
      p.textContent = input.value.trim();
      list.appendChild(p);
      input.value = '';
      list.scrollTop = list.scrollHeight;
      clearTimeout(timer);
      timer = setTimeout(function () { arrive('Noted. I will pass that to the host and confirm here.'); }, 1400);
    });
    input.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); form.requestSubmit(); } });
    timer = setTimeout(function () { arrive('One more thing: tram 15 is replaced by a bus on Sunday morning.'); }, 2500);
    label();
    return function () { clearTimeout(timer); };
  },
};
