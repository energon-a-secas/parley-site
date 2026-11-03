export default {
  id: 'trust-notices',
  name: 'Trust and safety notices around a conversation',
  category: 'Trust & errors',
  description: 'The temporary-chat badge, a dismissible data-use note above the composer, the "Memory updated" indicator under a reply and the caveat line under the composer, placed where products put them.',
  tags: ['trust', 'privacy', 'caveat', 'memory', 'consent'],
  added: '2026-11-03',
  seenIn: [
    { product: 'ChatGPT', note: 'A one-line disclaimer in small text under the composer, "ChatGPT can make mistakes. Check important info." (third-party snippet; no OpenAI page loaded)', url: 'https://www.elpassion.com/glossary/chatgpt-can-make-mistakes.-check-important-info', checked: '2026-11-02' },
    { product: 'Hugging Face chat-ui', note: 'A configurable caveat (PUBLIC_CAVEAT) shown only on an empty chat and hidden on small screens', url: 'https://github.com/huggingface/chat-ui', checked: '2026-11-02' },
    { product: 'Gemini', note: 'Temporary chats do not appear in Recent or Activity, are not used for training or personalisation, and are kept for up to 72 hours', url: 'https://blog.google/products/gemini/temporary-chats-privacy-controls/', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'When Claude saves a memory about a sensitive topic, a notice appears above the message box', url: 'https://support.claude.com/en/articles/11817273-using-memory', checked: '2026-11-02' },
    { product: 'Simon Willison on ChatGPT', note: 'Argues a footer sentence is not enough and proposes inline tips triggered by the prompt, visually distinct from model output, not in the first person, linking to guidance', url: 'https://simonwillison.net/2023/May/30/chatgpt-inline-tips/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Mode badge at the top of the frame naming the mode and its retention period',
    'Memory indicator chip under the reply that saved it, linking to the manager',
    'Inline contextual tip above a reply, in the third person, visually distinct from the answer',
    'Data-use notice above the composer, dismissible, with a link to settings',
    'Caveat line under the composer, 12 to 13px, shown on every screen size',
    'AI identity label (see embedded-support-widget)',
  ],
  states: [
    'First run: the data-use notice shows once until dismissed',
    'Normal: only the caveat line',
    'Private mode: badge plus retention text, memory chip never appears',
    'Sensitive memory saved: notice above the composer with a link to the manager',
  ],
  behavior: [
    'The caveat is static text, not a live region; it is read once in document order',
    'Notices that need action sit above the composer, not in the footer',
    'Dismissing the data-use notice is remembered per account, and the setting it points to stays reachable',
    'The temporary badge disappears only when the chat is closed, not when the user scrolls',
  ],
  microcopy: [
    { text: 'ChatGPT can make mistakes. Check important info.', source: 'ChatGPT, third-party snippet' },
    { text: 'Generated content may be inaccurate or false.', source: 'Hugging Face chat-ui' },
    { text: 'kept for up to 72 hours', source: 'Google, Gemini temporary chats' },
  ],
  variants: [
    'Footer line only (ChatGPT, Claude as reported)',
    'Empty-state-only line (HF chat-ui)',
    'Inline contextual tips (Willison\'s proposal)',
    'Whole-frame mode cue (Claude incognito)',
  ],
  pitfalls: [
    'Footer blindness: the line is ignored after day one, so put consequential notices above the composer',
    'Hiding the caveat on mobile (HF chat-ui) removes it exactly where screens are smallest',
    '"Temporary" or "incognito" without the retention period: 30 days at Claude, up to 30 days at OpenAI, 72 hours at Gemini',
    'First-person disclaimers read as the model speaking; write them in the third person',
  ],
  refs: [
    { label: 'Claude: using memory', url: 'https://support.claude.com/en/articles/11817273-using-memory' },
    { label: 'Simon Willison: ChatGPT should include inline tips', url: 'https://simonwillison.net/2023/May/30/chatgpt-inline-tips/' },
  ],
  spec: 'Put a p.caveat under the composer on every screen size at 12 to 13px with at least 4.5:1 contrast and a link to a help page. In private mode render a badge at the top of the frame reading "Temporary chat: not saved to history, kept N days for safety". When the backend reports a saved memory, add a small button chip "Memory updated" under that reply that opens the memory manager. For domain tips, match keywords client-side (legal, medical, dates) and insert a styled aside above the reply written in the third person with a link. Data-use notices are a dismissible section above the composer with a Settings link; store the dismissal.',
  html: `<div class="pl pl-trust-notices">
  <p class="pl-trust-notices__badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21v-9a7 7 0 0 1 14 0v9l-2.3-2-2.4 2-2.3-2-2.3 2-2.4-2z"/></svg> Temporary chat: not in history, kept 30 days for safety</p>
  <div class="pl-trust-notices__thread">
    <p class="pl-trust-notices__turn" data-role="user">My lease says I owe two months' rent if I leave early. Is that normal?</p>
    <aside class="pl-trust-notices__tip"><strong>Legal question.</strong> Rules vary by country and city. This reply is general information, not advice; a tenants' association can check the actual lease. <a href="#">How this works</a></aside>
    <div class="pl-trust-notices__turn" data-role="assistant">
      <p>Two months is at the high end but common where a fixed-term lease has no break clause. Check whether the clause is capped, whether it applies if the landlord re-lets quickly, and what notice the lease requires.</p>
      <button type="button" class="pl-trust-notices__memory"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a4 4 0 0 0-4 4v1a4 4 0 0 0-3 6 4 4 0 0 0 3 6h8a4 4 0 0 0 3-6 4 4 0 0 0-3-6V7a4 4 0 0 0-4-4Z"/></svg> Memory updated</button>
    </div>
  </div>
  <section class="pl-trust-notices__consent" aria-label="Data use notice">
    <p>Chats may be reviewed to improve the model. Turn this off any time in <a href="#">Settings</a>; temporary chats are never used.</p>
    <button type="button" class="pl-trust-notices__dismiss" aria-label="Dismiss notice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </section>
  <div class="pl-trust-notices__composer"><span>Ask anything</span><span class="pl-trust-notices__send" aria-hidden="true"></span></div>
  <p class="pl-trust-notices__caveat">Replies can be wrong. Check important details. <a href="#">Learn more</a></p>
</div>`,
  css: `.pl-trust-notices { display: flex; flex-direction: column; gap: 12px; max-width: 720px; padding: 14px 16px 16px; background: var(--pl-bg); border: 2px solid var(--pl-text); border-radius: var(--pl-radius); }
.pl-trust-notices__badge { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; margin: 0; padding: 5px 10px; border-radius: 999px; background: var(--pl-text); color: var(--pl-bg); font-size: 12px; font-weight: 600; }
.pl-trust-notices__thread { display: flex; flex-direction: column; gap: 10px; padding: 6px 0; }
.pl-trust-notices__turn { max-width: 85%; margin: 0; padding: 10px 14px; border-radius: var(--pl-radius); font-size: 14px; line-height: 1.55; }
.pl-trust-notices__turn[data-role="user"] { align-self: flex-end; background: var(--pl-user); }
.pl-trust-notices__turn[data-role="assistant"] { background: var(--pl-surface); border: 1px solid var(--pl-border); }
.pl-trust-notices__turn p { margin: 0 0 8px; }
.pl-trust-notices__tip { max-width: 85%; padding: 8px 12px; border-left: 3px solid var(--pl-accent); border-radius: 0 var(--pl-radius-sm) var(--pl-radius-sm) 0; background: color-mix(in srgb, var(--pl-accent) 8%, var(--pl-surface)); font-size: 13px; line-height: 1.5; color: var(--pl-muted); }
.pl-trust-notices__tip strong { color: var(--pl-text); }
.pl-trust-notices__memory { display: inline-flex; align-items: center; gap: 6px; min-height: 28px; padding: 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 12px; color: var(--pl-muted); }
.pl-trust-notices__memory:hover { color: var(--pl-text); border-color: var(--pl-muted); }
.pl-trust-notices__consent { display: flex; align-items: flex-start; gap: 10px; padding: 10px 10px 10px 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); font-size: 13px; }
.pl-trust-notices__consent p { flex: 1; margin: 0; }
.pl-trust-notices__consent[hidden] { display: none; }
.pl-trust-notices__dismiss { flex: none; display: grid; place-items: center; width: 32px; height: 32px; margin: -4px -4px -4px 0; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); }
.pl-trust-notices__dismiss:hover { background: var(--pl-surface); color: var(--pl-text); }
.pl-trust-notices__composer { display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding: 0 8px 0 16px; border: 1px solid var(--pl-border); border-radius: 24px; background: var(--pl-surface); font-size: 14px; color: var(--pl-muted); }
.pl-trust-notices__send { width: 32px; height: 32px; border-radius: 50%; background: var(--pl-surface-2); }
.pl-trust-notices__caveat { margin: 0; text-align: center; font-size: 12px; color: var(--pl-muted); }
.pl-trust-notices a { color: var(--pl-accent); text-underline-offset: 3px; }`,
  mount: function (root) {
    var consent = root.querySelector('.pl-trust-notices__consent');
    root.querySelector('.pl-trust-notices__dismiss').addEventListener('click', function () { consent.hidden = true; });
    root.addEventListener('click', function (e) { if (e.target.closest('a')) e.preventDefault(); });
  },
};
