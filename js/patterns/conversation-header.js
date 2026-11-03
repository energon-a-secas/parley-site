export default {
  id: 'conversation-header',
  name: 'Conversation header with rename, model badge and a temporary toggle',
  category: 'Shell',
  description: 'An auto-generated title that renames on click, a model badge, Share and more-menu buttons, and a Temporary chat toggle that frames the window and states the retention period.',
  tags: ['header', 'title', 'temporary', 'incognito', 'share'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'A ghost icon top-right of a new chat starts an incognito chat; the window gets a black border and an "Incognito chat" label top-left; kept 30 days by default and cannot be converted to a regular chat', url: 'https://support.claude.com/en/articles/12260368-using-incognito-chats', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'A chat with memory turned off shows a crossed-out memory icon next to its title', url: 'https://support.claude.com/en/articles/11817273-using-memory', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'A pill-shaped Temporary button top-right of a new chat; copies are kept up to 30 days; a newer article says a temporary chat can be saved into a regular one (help-centre snippet)', url: 'https://help.openai.com/en/articles/8914046', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Temporary chat control next to New chat top-left on web, a dashed-outline icon in the Android side panel; temporary chats are kept up to 72 hours', url: 'https://blog.google/products/gemini/temporary-chats-privacy-controls/', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Model selector, a Temporary Chat toggle, a user setting "Temporary Chat by Default", an admin "Enforce Temporary Chat" and a "Title Auto-Generation" setting', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
    { product: 'LibreChat', note: 'An export-and-share menu and a bookmark menu in the header; temporary chat on Ctrl/Cmd+Shift+Y', url: 'https://github.com/danny-avila/LibreChat', checked: '2026-11-02' },
  ],
  anatomy: [
    'Title as an h1 wrapping a button; clicking swaps in an input',
    'Model or agent badge with a chevron (opens a picker)',
    'Temporary toggle, a button with aria-pressed, offered only while the chat has no messages',
    'Share button and an overflow menu (export, rename, pin, archive, delete)',
    'Status chips: memory off, project breadcrumb',
    'Mode banner and a 2px frame around the app while temporary is on',
  ],
  states: [
    'New: placeholder title, toggle available',
    'Titling: muted placeholder until the model returns a title',
    'Renaming: input in place of the title; Enter saves, Escape cancels',
    'Temporary on: frame plus a label naming the mode and the retention period',
    'Shared: a chip next to the title',
    'Ended: composer disabled (see error-states)',
  ],
  behavior: [
    'The temporary choice is made before the first message; Claude also locks the per-chat memory switch after the first message',
    'Claude incognito cannot be saved to history; ChatGPT temporary reportedly can',
    'The frame is drawn on the app root, not the header, so the cue stays visible while scrolling',
    'Auto-titling sends content to a model; Open WebUI makes it a user setting',
  ],
  microcopy: [
    { text: 'Once closed, incognito chats cannot be reopened.', source: 'Claude help, incognito chats' },
    { text: 'This chat won\'t appear in history and your messages will not be saved.', source: 'Open WebUI' },
    { text: 'kept for up to 72 hours', source: 'Google, Gemini temporary chats' },
  ],
  variants: [
    'Claude: black frame plus an "Incognito chat" label',
    'ChatGPT: a pill toggle, chat can be saved later',
    'Gemini: an icon beside New chat, 72-hour retention',
    'Open WebUI: an admin can force temporary mode for everyone',
  ],
  pitfalls: [
    'A small badge is easy to forget mid-conversation; a full-window frame is the stronger cue',
    '"Temporary" still means retained: 30 days at Claude and ChatGPT, 72 hours at Gemini; never imply deletion',
    'Feature gaps inside private modes (Claude incognito has no file creation or code execution) surprise users',
    'Replacing the h1 with an input and back without restoring focus strands keyboard users',
  ],
  refs: [
    { label: 'Claude: using incognito chats', url: 'https://support.claude.com/en/articles/12260368-using-incognito-chats' },
    { label: 'LibreChat: ExportAndShareMenu.tsx', url: 'https://github.com/danny-avila/LibreChat' },
  ],
  spec: 'Render a header with an h1 containing a button that shows the title; on click replace it with an input prefilled with the title, select the text, save on Enter or blur and cancel on Escape, then restore the button and its focus. Next to it place a model button with aria-haspopup="listbox", then a Share button, an overflow button with aria-haspopup="menu", and a Temporary button with aria-pressed that is rendered only while the chat has zero messages. When pressed, set data-temporary on the app root, draw a 2px outline around it, and show a visible label naming the mode and its retention period (for example "kept 30 days for safety"); announce the change in a polite status region.',
  html: `<div class="pl pl-conversation-header" data-temporary="false">
  <header class="pl-conversation-header__bar">
    <h1 class="pl-conversation-header__h1"><button type="button" class="pl-conversation-header__title" title="Rename chat">Lisbon offsite: venue shortlist</button></h1>
    <button type="button" class="pl-conversation-header__model" aria-haspopup="listbox" aria-expanded="false">Atlas 2 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
    <div class="pl-conversation-header__actions">
      <button type="button" class="pl-conversation-header__temp" aria-pressed="false">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21v-9a7 7 0 0 1 14 0v9l-2.3-2-2.4 2-2.3-2-2.3 2-2.4-2z"/><circle cx="9.5" cy="11" r="1"/><circle cx="14.5" cy="11" r="1"/></svg>
        <span>Temporary</span>
      </button>
      <button type="button" class="pl-conversation-header__btn" aria-label="Share chat"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 15V3m-4 4 4-4 4 4"/></svg></button>
      <button type="button" class="pl-conversation-header__btn" aria-label="More options" aria-haspopup="menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button>
    </div>
  </header>
  <p class="pl-conversation-header__mode">Temporary chat: not saved to history, kept 30 days for safety, then deleted.</p>
  <div class="pl-conversation-header__body"><p>No messages yet. The Temporary toggle is available only before the first message.</p></div>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-conversation-header { max-width: 720px; min-height: 220px; background: var(--pl-bg); border: 1px solid var(--pl-border); border-radius: var(--pl-radius); overflow: hidden; transition: outline-color 160ms ease-out; outline: 2px solid transparent; outline-offset: -2px; }
.pl-conversation-header[data-temporary="true"] { outline-color: var(--pl-text); }
.pl-conversation-header__bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-height: 56px; padding: 8px 10px 8px 12px; border-bottom: 1px solid var(--pl-border); }
.pl-conversation-header__h1 { flex: 1 1 160px; min-width: 0; margin: 0; font-size: 15px; font-weight: 600; }
.pl-conversation-header__title, .pl-conversation-header__input { display: block; max-width: 100%; min-height: 36px; padding: 0 10px; border: 1px solid transparent; border-radius: var(--pl-radius-sm); background: transparent; font: inherit; text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pl-conversation-header__title:hover { background: var(--pl-surface); }
.pl-conversation-header__input { width: 100%; border-color: var(--pl-accent); background: var(--pl-surface); outline: none; }
.pl-conversation-header__model { display: inline-flex; align-items: center; gap: 4px; min-height: 32px; padding: 0 8px 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface); font-size: 13px; color: var(--pl-muted); white-space: nowrap; }
.pl-conversation-header__model:hover { color: var(--pl-text); border-color: var(--pl-muted); }
.pl-conversation-header__actions { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.pl-conversation-header__btn, .pl-conversation-header__temp { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-width: 36px; min-height: 36px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); font-size: 13px; }
.pl-conversation-header__temp { padding: 0 10px; border: 1px dashed var(--pl-border); border-radius: 999px; }
.pl-conversation-header__btn:hover, .pl-conversation-header__temp:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-conversation-header__temp[aria-pressed="true"] { border-style: solid; border-color: var(--pl-text); background: var(--pl-text); color: var(--pl-bg); }
.pl-conversation-header__mode { display: none; margin: 0; padding: 8px 14px; background: var(--pl-surface); border-bottom: 1px solid var(--pl-border); font-size: 13px; }
.pl-conversation-header[data-temporary="true"] .pl-conversation-header__mode { display: block; }
.pl-conversation-header__body { padding: 28px 16px; text-align: center; }
.pl-conversation-header__body p { margin: 0; font-size: 14px; color: var(--pl-muted); }`,
  mount: function (root) {
    var h1 = root.querySelector('.pl-conversation-header__h1');
    var titleBtn = root.querySelector('.pl-conversation-header__title');
    var temp = root.querySelector('.pl-conversation-header__temp');
    var status = root.querySelector('[role="status"]');
    titleBtn.addEventListener('click', function () {
      var input = document.createElement('input');
      input.className = 'pl-conversation-header__input';
      input.value = titleBtn.textContent; input.setAttribute('aria-label', 'Chat title');
      h1.replaceChild(input, titleBtn); input.focus(); input.select();
      function finish(save) {
        if (!input.isConnected) return;
        if (save && input.value.trim()) titleBtn.textContent = input.value.trim();
        h1.replaceChild(titleBtn, input); titleBtn.focus();
        status.textContent = save ? 'Renamed to ' + titleBtn.textContent : 'Rename cancelled';
      }
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); });
      input.addEventListener('blur', function () { finish(true); });
    });
    temp.addEventListener('click', function () {
      var on = temp.getAttribute('aria-pressed') !== 'true';
      temp.setAttribute('aria-pressed', String(on));
      root.dataset.temporary = String(on);
      status.textContent = on ? 'Temporary chat on. Not saved to history, kept 30 days.' : 'Temporary chat off. This chat will be saved.';
    });
  },
};
