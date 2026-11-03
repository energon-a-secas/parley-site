export default {
  id: 'tool-call-card',
  name: 'Tool call cards with approval, done and error states',
  category: 'Agents & sources',
  description: 'One collapsible card per tool call that moves through pending, running, awaiting approval, done, denied and error, collapses when finished, and tells the truth about edits already on disk.',
  tags: ['agents', 'tools', 'approval', 'state-machine', 'details'],
  added: '2026-11-02',
  seenIn: [
    { product: 'Claude Code', note: 'MCP calls collapse into one line such as "Called slack 3 times"; permission prompts show the command with Yes, "Yes, and don\'t ask again", and No; a denial comment goes to the model as the reason', url: 'https://code.claude.com/docs/en/permissions', checked: '2026-11-02' },
    { product: 'VS Code Copilot Chat', note: 'Tool pills; with persistent progress, completed groups collapse into a "Completed N steps" section; approvals expose expandable inputs and Allow', url: 'https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode', checked: '2026-11-02' },
    { product: 'Cursor', note: 'Run modes decide when an approval card appears; agent diffs offer Keep and Undo although the change is already applied (staff, 2025-12-03)', url: 'https://forum.cursor.com/t/why-does-cursor-apply-diffs-immediately-before-the-user-accepts-them/145070', checked: '2026-11-02' },
    { product: 'Vercel AI Elements', note: 'Tool maps states to Pending, Running, Awaiting Approval, Completed, Denied and Error; Confirmation renders only in the approval-requested state', url: 'https://github.com/vercel/ai-elements', checked: '2026-11-02' },
    { product: 'Cloudscape', note: 'Approval scopes "Allow this time", "Allow for this chat", "Always allow", and resolved stamps Approved, Rejected, Request expired', url: 'https://cloudscape.design/gen-ai/patterns/user-authorized-actions/', checked: '2026-11-02' },
  ],
  anatomy: [
    'Card header: status dot, verb plus target, state label, duration, chevron',
    'Collapsible body with the command or arguments and the output or error text',
    'Approval form: full command in pre, scope select, Allow (primary) and Deny',
    'Resolved stamp left in place of the form after a decision or a timeout',
    'File-edit card with Keep / Undo and a line saying the change is already applied',
    'Group summary row counting completed steps',
  ],
  states: [
    'Pending: muted dot, closed',
    'Running: pulsing dot, open',
    'Awaiting approval: accent dot, open, focus on Allow; expires if ignored',
    'Done: green dot, closed, duration shown',
    'Denied or expired: stamp says nothing ran',
    'Error: red dot, stays open with the error text',
  ],
  behavior: [
    'Finished steps collapse automatically; errors stay open',
    'Denial is information: the reason goes back to the model, the run continues',
    'A pending approval times out and reports that nothing ran',
    'Every state change writes one short stable phrase to a polite status region',
  ],
  microcopy: [
    { text: 'Called slack 3 times', source: 'Claude Code' },
    { text: 'Completed N steps', source: 'VS Code Copilot Chat' },
    { text: 'Awaiting Approval', source: 'Vercel AI Elements' },
    { text: 'Request expired', source: 'Cloudscape' },
  ],
  variants: [
    'Terminal transcript with collapsed lines and a detail view: Claude Code',
    'Pills that collapse into a step group: VS Code',
    'Timeline with restorable checkpoints: Cursor, VS Code checkpoints',
  ],
  pitfalls: [
    'An approval scope that silently covers more than the prompt showed',
    'Keep / Undo that implies a pending decision when the edit is already on disk',
    'Every card left expanded, burying the answer under the run',
    'A pending approval that blocks the UI forever',
  ],
  refs: [
    { label: 'Vercel AI Elements: Tool', url: 'https://ai-sdk.dev/elements/components/tool' },
    { label: 'CopilotKit: useHumanInTheLoop', url: 'https://docs.copilotkit.ai/reference/hooks/useHumanInTheLoop' },
  ],
  spec: 'Model each call as {id, name, args, state, output, startedAt, endedAt} and render it as details.step with data-state. The summary shows a status dot, the verb and target, the state label and the duration. On running, open the card; on done, close it and write the duration; on error, keep it open. For awaiting-approval, render a form with the command in pre, a scope select, Allow and Deny, move focus to Allow, and after a decision or a timeout replace the form with a one-line stamp. For edits that were applied before the card appeared, label the actions Keep / Undo and say "Already applied" next to them. Update a "Completed N steps" row and write each change to a polite status region.',
  html: `<div class="pl pl-tool-call-card">
  <p class="pl-tool-call-card__group">Working through 4 steps</p>
  <details class="pl-tool-call-card__step" data-state="pending" data-kind="read">
    <summary class="pl-tool-call-card__sum"><i class="pl-tool-call-card__dot" aria-hidden="true"></i><span class="pl-tool-call-card__title">Read <code>package.json</code></span><span class="pl-tool-call-card__state">Pending</span><span class="pl-tool-call-card__dur"></span><svg class="pl-tool-call-card__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
    <div class="pl-tool-call-card__body"><pre>"test": "vitest run --reporter=dot"</pre></div>
  </details>
  <details class="pl-tool-call-card__step" data-state="pending" data-kind="run">
    <summary class="pl-tool-call-card__sum"><i class="pl-tool-call-card__dot" aria-hidden="true"></i><span class="pl-tool-call-card__title">Run <code>npm test</code></span><span class="pl-tool-call-card__state">Pending</span><span class="pl-tool-call-card__dur"></span><svg class="pl-tool-call-card__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
    <div class="pl-tool-call-card__body">
      <form class="pl-tool-call-card__approve">
        <p>The agent wants to run this in <code>~/work/retry-lib</code>:</p>
        <pre>npm test</pre>
        <div class="pl-tool-call-card__row">
          <select aria-label="Approval scope"><option>Allow this time</option><option>Allow for this chat</option><option>Always allow npm test</option></select>
          <button type="button" class="pl-tool-call-card__allow">Allow</button>
          <button type="button" class="pl-tool-call-card__deny">Deny</button>
        </div>
      </form>
      <pre class="pl-tool-call-card__out" hidden>14 passed, 0 failed (2.1s)</pre>
    </div>
  </details>
  <details class="pl-tool-call-card__step" data-state="pending" data-kind="fetch">
    <summary class="pl-tool-call-card__sum"><i class="pl-tool-call-card__dot" aria-hidden="true"></i><span class="pl-tool-call-card__title">Fetch <code>registry.npmjs.org/p-retry</code></span><span class="pl-tool-call-card__state">Pending</span><span class="pl-tool-call-card__dur"></span><svg class="pl-tool-call-card__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
    <div class="pl-tool-call-card__body"><pre class="pl-tool-call-card__err">ETIMEDOUT after 8000 ms. The agent will continue without the changelog.</pre></div>
  </details>
  <details class="pl-tool-call-card__step" data-state="pending" data-kind="edit">
    <summary class="pl-tool-call-card__sum"><i class="pl-tool-call-card__dot" aria-hidden="true"></i><span class="pl-tool-call-card__title">Edited <code>src/retry.ts</code></span><span class="pl-tool-call-card__state">Pending</span><span class="pl-tool-call-card__dur"></span><svg class="pl-tool-call-card__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
    <div class="pl-tool-call-card__body">
      <pre>+  await sleep(base * 2 ** attempt)
-  await sleep(base * attempt)</pre>
      <div class="pl-tool-call-card__row"><span class="pl-tool-call-card__note">Already applied to disk</span><button type="button" class="pl-tool-call-card__keep">Keep</button><button type="button" class="pl-tool-call-card__undo">Undo</button></div>
    </div>
  </details>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</div>`,
  css: `.pl-tool-call-card { max-width: 640px; padding: 16px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
.pl-tool-call-card__group { margin: 0 0 4px; font-size: 13px; color: var(--pl-muted); }
.pl-tool-call-card__step { border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); overflow: hidden; }
.pl-tool-call-card__sum { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 8px 12px; list-style: none; cursor: pointer; }
.pl-tool-call-card__sum::-webkit-details-marker { display: none; }
.pl-tool-call-card__sum:hover { background: var(--pl-surface-2); }
.pl-tool-call-card__dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--pl-muted); }
.pl-tool-call-card__step[data-state="running"] .pl-tool-call-card__dot { background: var(--pl-accent); animation: pl-tool-call-card-pulse 1s ease-in-out infinite; }
.pl-tool-call-card__step[data-state="awaiting"] .pl-tool-call-card__dot { background: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 30%, transparent); }
.pl-tool-call-card__step[data-state="done"] .pl-tool-call-card__dot { background: var(--pl-success); }
.pl-tool-call-card__step[data-state="error"] .pl-tool-call-card__dot, .pl-tool-call-card__step[data-state="denied"] .pl-tool-call-card__dot { background: var(--pl-danger); }
@keyframes pl-tool-call-card-pulse { 50% { opacity: 0.3; } }
.pl-tool-call-card__title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-tool-call-card__title code, .pl-tool-call-card__body code { font-family: var(--pl-mono); font-size: 13px; }
.pl-tool-call-card__state { font-size: 12px; color: var(--pl-muted); white-space: nowrap; }
.pl-tool-call-card__step[data-state="awaiting"] .pl-tool-call-card__state { color: var(--pl-accent); }
.pl-tool-call-card__dur { font-size: 12px; color: var(--pl-muted); font-variant-numeric: tabular-nums; }
.pl-tool-call-card__chev { color: var(--pl-muted); transition: transform 160ms ease-out; }
.pl-tool-call-card__step[open] .pl-tool-call-card__chev { transform: rotate(180deg); }
.pl-tool-call-card__body { padding: 0 12px 12px; border-top: 1px solid var(--pl-border); }
.pl-tool-call-card__body p { margin: 10px 0 6px; }
.pl-tool-call-card__body pre { margin: 10px 0 0; padding: 10px 12px; border-radius: var(--pl-radius-sm); background: var(--pl-bg); font-family: var(--pl-mono); font-size: 13px; overflow-x: auto; }
.pl-tool-call-card__err { color: var(--pl-danger); }
.pl-tool-call-card__row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
.pl-tool-call-card__row select { min-height: 36px; padding: 0 8px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface-2); font-size: 13px; }
.pl-tool-call-card__row button { min-height: 36px; padding: 0 14px; border: 1px solid var(--pl-border); border-radius: 999px; background: var(--pl-surface-2); font-size: 13px; }
.pl-tool-call-card__row button:hover { border-color: var(--pl-text); }
.pl-tool-call-card__row .pl-tool-call-card__allow, .pl-tool-call-card__row .pl-tool-call-card__keep { background: var(--pl-accent); color: var(--pl-on-accent); border-color: transparent; }
.pl-tool-call-card__note { font-size: 12px; color: var(--pl-muted); margin-inline-end: auto; }
.pl-tool-call-card__stamp { margin-top: 10px; font-size: 13px; color: var(--pl-muted); }`,
  mount: function (root) {
    var steps = root.querySelectorAll('.pl-tool-call-card__step');
    var group = root.querySelector('.pl-tool-call-card__group');
    var status = root.querySelector('[role="status"]');
    var labels = { pending: 'Pending', running: 'Running', awaiting: 'Awaiting approval', done: 'Completed', denied: 'Denied', error: 'Error', expired: 'Expired' };
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function set(step, state, dur) {
      step.dataset.state = state;
      step.querySelector('.pl-tool-call-card__state').textContent = labels[state];
      step.querySelector('.pl-tool-call-card__dur').textContent = dur || '';
      step.open = state === 'running' || state === 'awaiting' || state === 'error' || (step.dataset.kind === 'edit' && state === 'done');
      status.textContent = step.querySelector('.pl-tool-call-card__title').textContent + ': ' + labels[state];
      var done = root.querySelectorAll('[data-state="done"]').length;
      group.textContent = done === steps.length ? 'Completed ' + done + ' steps' : 'Completed ' + done + ' of ' + steps.length + ' steps';
    }
    function stamp(step, text) {
      var form = step.querySelector('form');
      var p = document.createElement('p');
      p.className = 'pl-tool-call-card__stamp';
      p.textContent = text;
      form.replaceWith(p);
    }
    function runFetchAndEdit() {
      set(steps[2], 'running');
      later(function () { set(steps[2], 'error', '8.0s'); set(steps[3], 'running'); }, 1400);
      later(function () { set(steps[3], 'done', '0.2s'); }, 2200);
    }
    var allow = steps[1].querySelector('.pl-tool-call-card__allow');
    var deny = steps[1].querySelector('.pl-tool-call-card__deny');
    var expiry = null;
    function decide(kind) {
      if (!steps[1].querySelector('form')) return;
      clearTimeout(expiry);
      if (kind === 'allow') {
        stamp(steps[1], 'Approved, ran once');
        set(steps[1], 'running');
        later(function () { steps[1].querySelector('.pl-tool-call-card__out').hidden = false; set(steps[1], 'done', '2.1s'); runFetchAndEdit(); }, 1500);
      } else {
        stamp(steps[1], kind === 'deny' ? 'Rejected, nothing ran. The agent was told why.' : 'Request expired, nothing ran.');
        set(steps[1], kind === 'deny' ? 'denied' : 'expired');
        runFetchAndEdit();
      }
    }
    allow.addEventListener('click', function () { decide('allow'); });
    deny.addEventListener('click', function () { decide('deny'); });
    steps[3].querySelector('.pl-tool-call-card__keep').addEventListener('click', function () { steps[3].querySelector('.pl-tool-call-card__row').innerHTML = '<span class="pl-tool-call-card__note">Kept</span>'; });
    steps[3].querySelector('.pl-tool-call-card__undo').addEventListener('click', function () { steps[3].querySelector('.pl-tool-call-card__row').innerHTML = '<span class="pl-tool-call-card__note">Reverted on disk</span>'; });
    set(steps[0], 'running');
    later(function () { set(steps[0], 'done', '0.4s'); }, 1200);
    later(function () { set(steps[1], 'awaiting'); allow.focus({ preventScroll: true }); expiry = setTimeout(function () { decide('expired'); }, 12000); timers.push(expiry); }, 1700);
    return function () { timers.forEach(clearTimeout); };
  },
};
