export default {
  id: 'share-export',
  name: 'Share dialog and export menu',
  category: 'Shell',
  description: 'A native dialog with a public link switch, who can see it, Copy link with a copied state and an attachments toggle, next to a compact Export menu offering Markdown and PDF.',
  tags: ['share', 'export', 'dialog', 'clipboard', 'menu'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'A public link shows a frozen snapshot anyone can open without an account; later messages stay private unless shared again; files and raw tool-call data are excluded; revoking cannot recall copies (help-centre snippet)', url: 'https://support.claude.com/en/articles/10593882-share-and-unshare-chats', checked: '2026-11-02' },
    { product: 'Gemini', note: '"Create public link" produces a g.co/gemini/share URL; Settings > "Your public links" lists them with delete-one and delete-all; links are deleted 6 months after creation by default (snippet)', url: 'https://support.google.com/gemini/answer/13743730', checked: '2026-11-02' },
    { product: 'LibreChat', note: 'Export dialog offers markdown (default), text, json, csv and screenshot; "Export all message branches" applies to json and csv only; the share dialog makes including files an explicit toggle and "Update link" refreshes the snapshot while keeping the URL', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Share, Copy Link, and export as .json, .pdf or .txt', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Share button that opens a native dialog',
    'Public link switch (role="switch") with a one-line explanation of who can see it',
    'Read-only URL input with a Copy button whose label flips to Copied',
    'Include attachments checkbox, off by default',
    'Snapshot note: later messages stay private; revoking does not recall copies',
    'Revoke and Done actions',
    'Export button with a small menu: Markdown, PDF',
  ],
  states: [
    'Not shared: switch off, URL row disabled',
    'Shared: URL shown with the snapshot date',
    'Copied: button reads Copied for about 1.5s and a status region announces it',
    'Outdated snapshot: newer messages exist, an Update link action appears',
    'Revoked or expired (Gemini: 6 months)',
    'Export failed: offer another format',
  ],
  behavior: [
    'Copy writes to the clipboard and announces "Link copied" through a polite status message',
    'LibreChat keeps one URL across updates; Claude needs an unshare and re-share to refresh',
    'The dialog is a native dialog opened with showModal, so Escape closes it and focus is trapped',
    'Markdown export builds a Blob and downloads through a link with the download attribute; PDF is window.print with a print stylesheet',
  ],
  microcopy: [
    { text: 'Create public link', source: 'Gemini' },
    { text: 'Your public links', source: 'Gemini settings' },
    { text: 'Update link', source: 'LibreChat share dialog' },
  ],
  variants: [
    'Claude: snapshot, attachments always excluded, Team and Enterprise share inside the organisation only',
    'LibreChat: attachments opt-in, URL stable across updates, QR code and a shared-links manager',
    'Gemini: links auto-expire after 6 months, Workspace admins have sharing off by default',
    'ChatGPT: whether a recipient can continue the chat is documented inconsistently',
  ],
  pitfalls: [
    'Snapshot-versus-live confusion; print the snapshot date in the dialog and on the public page',
    'Silently excluding files (Claude); LibreChat surfaces it as a toggle with an explanation',
    'Public pages indexed by search engines; add a robots noindex meta unless the user opts in',
    'Revocation cannot recall copies that were already opened; say so before the link is created',
  ],
  refs: [
    { label: 'LibreChat: ExportModal.tsx', url: 'https://github.com/danny-avila/LibreChat' },
    { label: 'MDN: dialog element', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog' },
  ],
  spec: 'Render a Share button that calls showModal on a dialog containing a role="switch" button for the public link, a read-only URL input with a Copy button, a checkbox "Include attachments" unchecked by default, a note that the link is a snapshot and that revoking cannot recall copies, and Revoke and Done buttons. Enable the URL row only while the switch is on; on Copy call navigator.clipboard.writeText, flip the button text to Copied for 1.5s and write "Link copied" into a role="status" region. Beside it, an Export button with aria-haspopup="menu" opens a role="menu" with Markdown (build a Blob and click a temporary link with download) and PDF (window.print with a print stylesheet). Serve the public page with a robots noindex meta and a "Shared snapshot, taken {date}" banner.',
  html: `<div class="pl pl-share-export">
  <div class="pl-share-export__bar">
    <button type="button" class="pl-share-export__share"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3m-4 4 4-4 4 4"/></svg> Share</button>
    <div class="pl-share-export__export">
      <button type="button" class="pl-share-export__export-btn" aria-haspopup="menu" aria-expanded="false">Export <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
      <ul class="pl-share-export__menu" role="menu" aria-label="Export format" hidden>
        <li role="none"><button type="button" role="menuitem" data-format="md">Markdown <span>.md</span></button></li>
        <li role="none"><button type="button" role="menuitem" data-format="pdf">PDF <span>print</span></button></li>
      </ul>
    </div>
  </div>
  <dialog class="pl-share-export__dialog" aria-labelledby="pl-share-export-title">
    <form method="dialog" class="pl-share-export__form">
      <h2 id="pl-share-export-title">Share this chat</h2>
      <div class="pl-share-export__row">
        <div><strong>Public link</strong><p>Anyone with the link can read a snapshot. Later messages stay private.</p></div>
        <button type="button" class="pl-share-export__switch" role="switch" aria-checked="false" aria-label="Public link"><span></span></button>
      </div>
      <div class="pl-share-export__link" data-enabled="false">
        <input type="url" readonly value="https://example.test/share/9f2c-lisbon-offsite" aria-label="Share link">
        <button type="button" class="pl-share-export__copy">Copy link</button>
      </div>
      <label class="pl-share-export__check"><input type="checkbox"> Include attachments (3 files)</label>
      <p class="pl-share-export__note">Snapshot taken when the link is created. Revoking stops new visitors but cannot recall copies already opened.</p>
      <div class="pl-share-export__foot">
        <button type="button" class="pl-share-export__revoke">Revoke link</button>
        <button type="submit" class="pl-share-export__done">Done</button>
      </div>
    </form>
  </dialog>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-share-export { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-share-export__bar { display: flex; flex-wrap: wrap; gap: 8px; }
.pl-share-export__share, .pl-share-export__export-btn, .pl-share-export__copy, .pl-share-export__revoke, .pl-share-export__done { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface); font-size: 14px; font-weight: 600; white-space: nowrap; }
.pl-share-export__share:hover, .pl-share-export__export-btn:hover, .pl-share-export__copy:hover, .pl-share-export__revoke:hover { background: var(--pl-surface-2); }
.pl-share-export__export { position: relative; }
.pl-share-export__menu { position: absolute; z-index: 2; top: calc(100% + 4px); left: 0; min-width: 180px; margin: 0; padding: 6px; list-style: none; background: var(--pl-surface-2); border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); box-shadow: var(--pl-shadow); }
.pl-share-export__menu button { display: flex; justify-content: space-between; width: 100%; padding: 8px 10px; border: 0; border-radius: 6px; background: transparent; font-size: 14px; text-align: left; }
.pl-share-export__menu button span { color: var(--pl-muted); font-size: 12px; }
.pl-share-export__menu button:hover, .pl-share-export__menu button:focus-visible { background: var(--pl-surface); }
.pl-share-export__dialog { width: min(440px, calc(100vw - 32px)); padding: 0; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); color: var(--pl-text); box-shadow: var(--pl-shadow); }
.pl-share-export__dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
.pl-share-export__form { display: flex; flex-direction: column; gap: 14px; padding: 20px; font-family: var(--pl-font); }
.pl-share-export__form h2 { margin: 0; font-size: 17px; }
.pl-share-export__form p { margin: 2px 0 0; font-size: 13px; color: var(--pl-muted); }
.pl-share-export__row { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; }
.pl-share-export__switch { flex: none; position: relative; width: 44px; height: 26px; padding: 0; border: 0; border-radius: 999px; background: var(--pl-border); transition: background 160ms ease-out; }
.pl-share-export__switch span { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--pl-text); transition: transform 160ms ease-out; }
.pl-share-export__switch[aria-checked="true"] { background: var(--pl-accent); }
.pl-share-export__switch[aria-checked="true"] span { transform: translateX(18px); background: var(--pl-on-accent); }
.pl-share-export__link { display: flex; gap: 8px; transition: opacity 160ms ease-out; }
.pl-share-export__link[data-enabled="false"] { opacity: 0.45; pointer-events: none; }
.pl-share-export__link input { flex: 1; min-width: 0; min-height: 36px; padding: 0 10px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-bg); font-family: var(--pl-mono); font-size: 12px; }
.pl-share-export__copy[data-copied="true"] { border-color: var(--pl-success); color: var(--pl-success); }
.pl-share-export__check { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.pl-share-export__check input { width: 16px; height: 16px; accent-color: var(--pl-accent); }
.pl-share-export__note { font-size: 12px; }
.pl-share-export__foot { display: flex; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.pl-share-export__revoke { color: var(--pl-danger); }
.pl-share-export__done { background: var(--pl-accent); border-color: var(--pl-accent); color: var(--pl-on-accent); }`,
  mount: function (root) {
    var dialog = root.querySelector('.pl-share-export__dialog');
    var sw = root.querySelector('.pl-share-export__switch');
    var linkRow = root.querySelector('.pl-share-export__link');
    var copy = root.querySelector('.pl-share-export__copy');
    var revoke = root.querySelector('.pl-share-export__revoke');
    var exportBtn = root.querySelector('.pl-share-export__export-btn');
    var menu = root.querySelector('.pl-share-export__menu');
    var status = root.querySelector('[role="status"]');
    var timer = null;
    function setShared(on) {
      sw.setAttribute('aria-checked', String(on));
      linkRow.dataset.enabled = String(on);
      linkRow.querySelector('input').tabIndex = on ? 0 : -1; copy.tabIndex = on ? 0 : -1;
      status.textContent = on ? 'Public link created' : 'Public link revoked';
    }
    function setMenu(open) { menu.hidden = !open; exportBtn.setAttribute('aria-expanded', String(open)); if (open) menu.querySelector('[role="menuitem"]').focus(); }
    setShared(false);
    root.querySelector('.pl-share-export__share').addEventListener('click', function () { if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', ''); });
    sw.addEventListener('click', function () { setShared(sw.getAttribute('aria-checked') !== 'true'); });
    revoke.addEventListener('click', function () { setShared(false); });
    copy.addEventListener('click', function () {
      var url = linkRow.querySelector('input').value;
      if (window.navigator.clipboard) window.navigator.clipboard.writeText(url).catch(function () {});
      copy.textContent = 'Copied'; copy.dataset.copied = 'true'; status.textContent = 'Link copied';
      clearTimeout(timer);
      timer = setTimeout(function () { copy.textContent = 'Copy link'; delete copy.dataset.copied; }, 1500);
    });
    exportBtn.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('[role="menuitem"]');
      if (!item) return;
      setMenu(false); exportBtn.focus();
      status.textContent = item.dataset.format === 'pdf' ? 'Opening the print dialog' : 'Downloading lisbon-offsite.md';
    });
    root.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('.pl-share-export__export')) setMenu(false); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); exportBtn.focus(); } });
    return function () { clearTimeout(timer); if (dialog.open) dialog.close(); };
  },
};
