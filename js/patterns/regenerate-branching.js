export default {
  id: 'regenerate-branching',
  name: 'Edit, try again and branch',
  category: 'Messages',
  description: 'Editing a sent message turns it into a textarea with Cancel and Send, and the result becomes a sibling version with an in-thread pager; "Try again" does the same for the reply, and "Branch in new chat" forks instead.',
  tags: ['edit', 'regenerate', 'branches', 'versions', 'tree'],
  added: '2026-11-02',
  seenIn: [
    { product: 'ChatGPT', note: 'Regenerate keeps alternates reachable through "< N/N >"; "Branch in new chat" since 2025-09-04; users reported the arrows on edited messages replaced by version history during 2026', url: 'https://community.openai.com/t/chatgpt-web-update-removed-message-version-arrows-cannot-access-edited-message-history/1374666', checked: '2026-11-02' },
    { product: 'Claude.ai', note: 'Editing an earlier message creates a separate version of the chat with its own artifacts; "Try again" generates an alternate with 1/N paging', url: 'https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them', checked: '2026-11-02' },
    { product: 'Gemini', note: 'No version navigation after regenerate, so a prior draft may be lost', url: 'https://www.aiuxplayground.com/teardowns/gemini/output', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'BranchPicker renders previous, count and next beside the action bar; branches come from edits or regenerations', url: 'https://www.assistant-ui.com/docs/primitives/branch-picker', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Regenerate replays the same input and removes all later messages to keep context consistent', url: 'https://cloudscape.design/gen-ai/patterns/response-regeneration/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Edit control on the user turn, which swaps the bubble for a textarea with Cancel and Send',
    'Version pager (prev, "n/N", next) on whichever turn has siblings',
    '"Try again" on the assistant turn',
    '"Branch in new chat" as a fork action',
    'Toast or status line confirming the fork',
  ],
  states: [
    'Single version: no pager',
    'Siblings: pager visible, disabled at the bounds',
    'Editing: textarea shown, other controls hidden',
    'Regenerating: pager disabled, reply shimmers',
    'Forked: toast plus navigation to the new chat',
  ],
  behavior: [
    'Edit adds a sibling of the user message; Try again adds a sibling of the reply; both re-render everything below',
    'The pager says what it pages ("Response 2 of 3") and disables prev and next at the bounds and while generating',
    'After switching a branch, focus moves to the switched turn and the change is announced',
    'Escape in the textarea cancels; Cmd or Ctrl+Enter sends',
  ],
  microcopy: [
    { text: 'Branch in new chat', source: 'ChatGPT' },
    { text: 'Try again', source: 'Claude.ai' },
    { text: 'Please confirm whether this was an intentional removal or a UI bug', source: 'OpenAI community, 2026-02-19' },
  ],
  variants: [
    'Tree in one thread with pagers: Claude.ai, assistant-ui, Open WebUI, HF chat-ui, LibreChat',
    'Fork to a new conversation: ChatGPT "Branch in new chat", LibreChat Fork, Gemini overflow',
    'Linear replace with no history: Cloudscape guidance, Gemini per teardown',
    'Workspace rewind: Claude Code double Esc, Cursor and VS Code checkpoints',
  ],
  pitfalls: [
    'Branch controls that vanish after reload or on mobile',
    'Regenerating without a way back loses a draft',
    'Users cannot tell edit-fork from try-again when both have equal weight',
  ],
  refs: [
    { label: 'assistant-ui: Branch picker', url: 'https://www.assistant-ui.com/docs/primitives/branch-picker' },
    { label: 'HF chat-ui: Alternatives.svelte', url: 'https://github.com/huggingface/chat-ui' },
  ],
  spec: 'Store messages as a tree ({id, parentId, childrenIds, activeChildId}) and render the active path from the root. Edit replaces the user bubble with a form holding a textarea prefilled with the text, Cancel and Send; Send adds a sibling of that message, makes it active and regenerates below. Try again adds a sibling under the reply\'s parent. Each turn with siblings shows nav[aria-label="Versions"] with prev, "n/N" and next; switching sets activeChildId, re-renders the path below, moves focus to the switched turn and writes "Showing version n of N" to a polite status region. Branch in new chat copies the path up to that turn into a new conversation and confirms with a toast.',
  html: `<div class="pl pl-regenerate-branching" role="log" aria-label="Conversation">
  <article class="pl-regenerate-branching__turn" data-role="user" tabindex="-1">
    <h3 class="pl-sr">You said</h3>
    <div class="pl-regenerate-branching__bubble">Draft a two-line reply declining the Thursday meeting.</div>
    <form class="pl-regenerate-branching__edit" hidden>
      <textarea aria-label="Edit your message" rows="2"></textarea>
      <div class="pl-regenerate-branching__row"><button type="button" class="pl-regenerate-branching__cancel">Cancel</button><button type="submit" class="pl-regenerate-branching__send">Send</button></div>
    </form>
    <div class="pl-regenerate-branching__row pl-regenerate-branching__meta">
      <button type="button" class="pl-regenerate-branching__editbtn">Edit</button>
      <nav class="pl-regenerate-branching__pager" aria-label="Versions" hidden><button type="button" data-dir="-1" aria-label="Previous version">&lsaquo;</button><span>1/1</span><button type="button" data-dir="1" aria-label="Next version">&rsaquo;</button></nav>
    </div>
  </article>
  <article class="pl-regenerate-branching__turn" data-role="assistant" tabindex="-1">
    <h3 class="pl-sr">Assistant said</h3>
    <div class="pl-regenerate-branching__body"><p>Thanks for the invite. I can't make Thursday, but I'm free Friday morning if that works.</p></div>
    <div class="pl-regenerate-branching__row pl-regenerate-branching__meta">
      <button type="button" class="pl-regenerate-branching__retry">Try again</button>
      <button type="button" class="pl-regenerate-branching__fork">Branch in new chat</button>
      <nav class="pl-regenerate-branching__pager" aria-label="Response versions" hidden><button type="button" data-dir="-1" aria-label="Previous response">&lsaquo;</button><span>1/1</span><button type="button" data-dir="1" aria-label="Next response">&rsaquo;</button></nav>
    </div>
  </article>
  <p class="pl-regenerate-branching__toast" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-regenerate-branching { max-width: 680px; padding: 20px; display: flex; flex-direction: column; gap: 16px; font-size: 15px; }
.pl-regenerate-branching__turn { display: flex; flex-direction: column; gap: 6px; outline-offset: 6px; }
.pl-regenerate-branching__turn[data-role="user"] { align-items: flex-end; }
.pl-regenerate-branching__bubble { max-width: min(80%, 40rem); padding: 10px 14px; border-radius: var(--pl-radius); border-end-end-radius: 4px; background: var(--pl-user); }
.pl-regenerate-branching__turn.is-editing .pl-regenerate-branching__bubble, .pl-regenerate-branching__turn.is-editing .pl-regenerate-branching__meta { display: none; }
.pl-regenerate-branching__edit { width: 100%; max-width: 40rem; padding: 10px; border: 1px solid var(--pl-accent); border-radius: var(--pl-radius); background: var(--pl-surface); }
.pl-regenerate-branching__edit textarea { width: 100%; border: 0; background: transparent; resize: vertical; outline: none; line-height: 1.5; }
.pl-regenerate-branching__row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.pl-regenerate-branching__edit .pl-regenerate-branching__row { justify-content: flex-end; margin-top: 6px; }
.pl-regenerate-branching__row button { min-height: 32px; padding: 0 12px; border: 1px solid transparent; border-radius: 999px; background: transparent; color: var(--pl-muted); font-size: 13px; transition: background 160ms ease-out, color 160ms ease-out; }
.pl-regenerate-branching__row button:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-regenerate-branching__row .pl-regenerate-branching__send { background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-regenerate-branching__row .pl-regenerate-branching__send:hover { background: var(--pl-accent); color: var(--pl-on-accent); filter: brightness(1.08); }
.pl-regenerate-branching__body { line-height: 1.6; max-width: 65ch; transition: opacity 200ms ease-out; }
.pl-regenerate-branching__body p { margin: 0; }
.pl-regenerate-branching__turn.is-busy .pl-regenerate-branching__body { opacity: 0.4; }
.pl-regenerate-branching__pager { display: inline-flex; align-items: center; font-size: 12px; color: var(--pl-muted); font-variant-numeric: tabular-nums; }
.pl-regenerate-branching__pager button { width: 32px; padding: 0; font-size: 18px; line-height: 1; }
.pl-regenerate-branching__pager button:disabled { opacity: 0.35; cursor: default; background: transparent; }
.pl-regenerate-branching__toast { margin: 0; min-height: 20px; font-size: 13px; color: var(--pl-muted); }`,
  mount: function (root) {
    var userTurn = root.querySelector('[data-role="user"]');
    var botTurn = root.querySelector('[data-role="assistant"]');
    var bubble = userTurn.querySelector('.pl-regenerate-branching__bubble');
    var form = userTurn.querySelector('.pl-regenerate-branching__edit');
    var area = form.querySelector('textarea');
    var body = botTurn.querySelector('.pl-regenerate-branching__body p');
    var toast = root.querySelector('.pl-regenerate-branching__toast');
    var alt = ["Thanks for the invite. Thursday doesn't work for me; could we do Friday at 10 instead?", "Appreciate the invite, but I have to pass on Thursday. Happy to catch up async or Friday morning."];
    var tree = [{ user: bubble.textContent, replies: [body.textContent], active: 0 }];
    var branch = 0, timer = null;
    function pager(turn, i, n) {
      var nav = turn.querySelector('.pl-regenerate-branching__pager');
      nav.hidden = n < 2;
      nav.querySelector('span').textContent = (i + 1) + '/' + n;
      nav.querySelector('[data-dir="-1"]').disabled = i === 0;
      nav.querySelector('[data-dir="1"]').disabled = i === n - 1;
    }
    function render(focusTurn) {
      var b = tree[branch];
      bubble.textContent = b.user;
      body.textContent = b.replies[b.active];
      pager(userTurn, branch, tree.length);
      pager(botTurn, b.active, b.replies.length);
      if (focusTurn) { focusTurn.focus({ preventScroll: true }); toast.textContent = focusTurn === userTurn ? 'Showing version ' + (branch + 1) + ' of ' + tree.length : 'Showing response ' + (b.active + 1) + ' of ' + b.replies.length; }
    }
    function generate(text, done) {
      botTurn.classList.add('is-busy');
      clearTimeout(timer);
      timer = setTimeout(function () { botTurn.classList.remove('is-busy'); done(text); render(botTurn); }, 1200);
    }
    userTurn.querySelector('.pl-regenerate-branching__editbtn').addEventListener('click', function () {
      area.value = tree[branch].user; form.hidden = false; userTurn.classList.add('is-editing'); area.focus();
    });
    function leaveEdit() { form.hidden = true; userTurn.classList.remove('is-editing'); userTurn.querySelector('.pl-regenerate-branching__editbtn').focus(); }
    form.querySelector('.pl-regenerate-branching__cancel').addEventListener('click', leaveEdit);
    area.addEventListener('keydown', function (e) { if (e.key === 'Escape') leaveEdit(); if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) form.requestSubmit(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = area.value.trim(); if (!text) return;
      tree.push({ user: text, replies: [''], active: 0 }); branch = tree.length - 1;
      leaveEdit(); render();
      generate(alt[tree.length % alt.length], function (t) { tree[branch].replies[0] = t; });
    });
    botTurn.querySelector('.pl-regenerate-branching__retry').addEventListener('click', function () {
      generate(alt[tree[branch].replies.length % alt.length], function (t) { tree[branch].replies.push(t); tree[branch].active = tree[branch].replies.length - 1; });
    });
    botTurn.querySelector('.pl-regenerate-branching__fork').addEventListener('click', function () { toast.textContent = 'Branched into a new chat with this reply as the starting point.'; });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('.pl-regenerate-branching__pager button'); if (!b) return;
      var dir = Number(b.dataset.dir);
      if (b.closest('[data-role="user"]')) { branch += dir; render(userTurn); }
      else { tree[branch].active += dir; render(botTurn); }
    });
    render();
    return function () { clearTimeout(timer); };
  },
};
