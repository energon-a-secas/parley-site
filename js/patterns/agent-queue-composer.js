export default {
  id: 'agent-queue-composer',
  name: 'Agent composer with a message queue',
  category: 'Composer',
  description: 'While the agent works, Enter queues the message as a "Queued" chip instead of interrupting; Stop is its own control reached by click or Escape, and Cmd+Enter sends now.',
  tags: ['composer', 'agent', 'queue', 'keyboard', 'states'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Cursor', note: 'Enter queues a message while Agent works; Cmd+Enter sends now so the agent reads it at the next tool call', url: 'https://cursor.com/docs/agent/overview', checked: '2026-11-02' },
    { product: 'Claude Code', note: 'Enter queues while a turn runs and the queued message shows greyed until processed; Esc stops the turn but keeps the work done', url: 'https://code.claude.com/docs/en/interactive-mode', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'Cancel replaces Send when the composer can cancel; a steer chord (Cmd or Ctrl+Shift+Enter) sends into a running thread that supports a queue', url: 'https://www.assistant-ui.com/docs/ui/Thread', checked: '2026-11-02' },
    { product: 'CopilotKit', note: 'Enter sends when there is text; Enter is routed to Stop only when the composer is empty, a fix for an earlier bug that aborted runs mid-typing', url: 'https://github.com/CopilotKit/CopilotKit', checked: '2026-11-02' },
  ],
  anatomy: [
    'Run status row: spinner, current step label, and a step list that ticks off as the agent progresses',
    'Queue list between the run and the composer: each item shows the text, a "Queued" badge, Send now and Remove',
    'Textarea whose placeholder changes while a run is active',
    'Stop button, separate from Send, visible only while running',
    'Send button whose label reads "Queue message" while running and "Send message" when idle',
    'Polite live region for run start, step changes, queueing and stop',
  ],
  states: [
    'Idle: no run, Enter sends and starts a run',
    'Running: Enter queues, Stop visible, Esc stops',
    'Queued: one or more chips waiting; the first starts when the run ends',
    'Sent now: the message is handed to the running agent at its next step',
    'Stopped: run ends, work so far is kept, queue stays for the user to decide',
  ],
  behavior: [
    'Enter with text while running queues; Enter with empty text does nothing',
    'Cmd or Ctrl+Enter while running sends now and marks the item as read at the next step',
    'Escape or the Stop button aborts the run; queued items remain and can be removed',
    'When a run finishes, the next queued item becomes the next run automatically',
    'The send button is never re-created; only its label and icon change',
  ],
  microcopy: [
    { text: 'Send now', source: 'Cursor Agent' },
  ],
  variants: [
    'Chat products keep one button that morphs Send into Stop; see the send-stop pattern',
    'Claude Code moves Stop to Esc and keeps Enter for queueing',
    'CopilotKit sends on Enter with text and routes Enter on an empty composer to Stop',
    'assistant-ui exposes a steer chord instead of a Send now button',
  ],
  pitfalls: [
    'Routing Enter to Stop while the user types a follow-up aborts the run; CopilotKit documents this exact bug',
    'A queued message with no visible chip feels lost; show it greyed with its position',
    'Stopping must keep the work done so far; a stop that reverts files punishes the interrupt',
    'Sending now without saying when the agent reads it makes users resend',
  ],
  refs: [
    { label: 'Cursor: Agent overview (queueing)', url: 'https://cursor.com/docs/agent/overview' },
    { label: 'Claude Code: interactive mode', url: 'https://code.claude.com/docs/en/interactive-mode' },
    { label: 'assistant-ui Thread (steer and cancel)', url: 'https://www.assistant-ui.com/docs/ui/Thread' },
  ],
  spec: 'Hold state.running and state.queue. On Enter in the textarea: if not running, start a run with the text; if running and the text is not empty, push it to the queue and render a chip with a "Queued" badge, a Send now button and a Remove button; if Cmd or Ctrl is held, mark it "sent now" instead. Render a separate Stop button only while running and bind Escape to the same abort; never route Enter to Stop. When a run ends, shift the next queued item into a new run. Swap the send button\'s aria-label between "Send message" and "Queue message" without replacing the node, and announce run, queue and stop events in a polite live region. Pair with the send-stop pattern when a plain chat without a queue is enough.',
  html: `<form class="pl pl-agent-queue-composer" data-running="false" aria-label="Agent composer">
  <div class="pl-agent-queue-composer__run">
    <span class="pl-agent-queue-composer__spinner" aria-hidden="true"></span>
    <div class="pl-agent-queue-composer__run-body">
      <p class="pl-agent-queue-composer__task">Fix the 3 failing tests in cart.test.ts</p>
      <ol class="pl-agent-queue-composer__steps">
        <li>Read cart.test.ts and checkout.ts</li>
        <li>Reset the coupon mock between cases</li>
        <li>Run the suite</li>
      </ol>
    </div>
  </div>
  <ul class="pl-agent-queue-composer__queue" aria-label="Queued messages"></ul>
  <div class="pl-agent-queue-composer__card">
    <textarea class="pl-agent-queue-composer__input" rows="1" aria-label="Message" placeholder="Ask the agent to do something"></textarea>
    <button type="button" class="pl-agent-queue-composer__stop" aria-label="Stop the run"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg></button>
    <button type="submit" class="pl-agent-queue-composer__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
  </div>
  <p class="pl-agent-queue-composer__hint">Enter sends. While running, Enter queues, Cmd+Enter sends now, Esc stops.</p>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-agent-queue-composer { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-agent-queue-composer__run { display: none; gap: 12px; padding: 12px 14px; margin-bottom: 10px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); background: var(--pl-surface); }
.pl-agent-queue-composer[data-running="true"] .pl-agent-queue-composer__run { display: flex; }
.pl-agent-queue-composer__spinner { flex: none; width: 16px; height: 16px; margin-top: 3px; border: 2px solid var(--pl-border); border-top-color: var(--pl-accent); border-radius: 50%; animation: pl-agent-queue-composer-spin 0.9s linear infinite; }
.pl-agent-queue-composer__task { margin: 0 0 4px; font-size: 14px; font-weight: 600; }
.pl-agent-queue-composer__steps { margin: 0; padding: 0 0 0 18px; font-size: 13px; color: var(--pl-muted); line-height: 1.6; }
.pl-agent-queue-composer__steps li[data-done="true"] { color: var(--pl-success); }
.pl-agent-queue-composer__steps li[data-active="true"] { color: var(--pl-text); }
.pl-agent-queue-composer__queue { display: flex; flex-direction: column; gap: 6px; margin: 0 0 10px; padding: 0; list-style: none; }
.pl-agent-queue-composer__queue:empty { display: none; }
.pl-agent-queue-composer__item { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px 8px 8px 12px; border: 1px dashed var(--pl-border); border-radius: var(--pl-radius-sm); font-size: 13.5px; color: var(--pl-muted); }
.pl-agent-queue-composer__item[data-mode="now"] { border-style: solid; border-color: var(--pl-accent); color: var(--pl-text); }
.pl-agent-queue-composer__text { flex: 1; min-width: 120px; }
.pl-agent-queue-composer__badge { padding: 1px 8px; border-radius: 999px; background: var(--pl-surface-2); font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.pl-agent-queue-composer__item[data-mode="now"] .pl-agent-queue-composer__badge { background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-agent-queue-composer__item button { height: 28px; padding: 0 10px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; font-size: 12px; color: var(--pl-text); }
.pl-agent-queue-composer__item button:hover { background: var(--pl-surface-2); }
.pl-agent-queue-composer__card { display: flex; align-items: flex-end; gap: 8px; padding: 8px 8px 8px 16px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 24px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-agent-queue-composer__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-agent-queue-composer__input { flex: 1; min-width: 0; min-height: 36px; max-height: 176px; padding: 7px 0; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-agent-queue-composer__input::placeholder { color: var(--pl-muted); }
.pl-agent-queue-composer__stop, .pl-agent-queue-composer__send { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; transition: background 160ms ease-out; }
.pl-agent-queue-composer__stop { display: none; background: var(--pl-text); color: var(--pl-bg); }
.pl-agent-queue-composer[data-running="true"] .pl-agent-queue-composer__stop { display: grid; }
.pl-agent-queue-composer__send { background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-agent-queue-composer[data-running="true"] .pl-agent-queue-composer__send { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-agent-queue-composer__send:hover { filter: brightness(1.08); }
.pl-agent-queue-composer__hint { margin: 8px 12px 0; font-size: 12px; color: var(--pl-muted); }
@keyframes pl-agent-queue-composer-spin { to { transform: rotate(360deg); } }`,
  mount: function (root) {
    var input = root.querySelector('.pl-agent-queue-composer__input');
    var send = root.querySelector('.pl-agent-queue-composer__send');
    var stop = root.querySelector('.pl-agent-queue-composer__stop');
    var task = root.querySelector('.pl-agent-queue-composer__task');
    var steps = Array.prototype.slice.call(root.querySelectorAll('.pl-agent-queue-composer__steps li'));
    var queue = root.querySelector('.pl-agent-queue-composer__queue');
    var live = root.querySelector('[aria-live]');
    var timers = [], reads = [];
    function running() { return root.dataset.running === 'true'; }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function setRunning(on) {
      root.dataset.running = String(on);
      send.setAttribute('aria-label', on ? 'Queue message' : 'Send message');
      input.placeholder = on ? 'Queue a message for after this run' : 'Ask the agent to do something';
    }
    function finish(reason) {
      clear();
      setRunning(false);
      live.textContent = reason === 'stopped' ? 'Run stopped. Edits so far are kept.' : 'Run finished.';
      var next = queue.firstElementChild;
      if (next && reason !== 'stopped') { var text = next.querySelector('.pl-agent-queue-composer__text').textContent; next.remove(); start(text); }
    }
    function start(text) {
      clear();
      task.textContent = text;
      steps.forEach(function (s) { s.dataset.done = 'false'; s.dataset.active = 'false'; });
      setRunning(true);
      live.textContent = 'Running: ' + text;
      steps.forEach(function (s, i) {
        timers.push(setTimeout(function () {
          if (i > 0) steps[i - 1].dataset.done = 'true';
          s.dataset.active = 'true';
        }, 200 + i * 1300));
      });
      timers.push(setTimeout(function () { steps[steps.length - 1].dataset.done = 'true'; finish('done'); }, 200 + steps.length * 1300 + 500));
    }
    function enqueue(text, now) {
      var li = document.createElement('li');
      li.className = 'pl-agent-queue-composer__item';
      li.dataset.mode = now ? 'now' : 'queued';
      li.innerHTML = '<span class="pl-agent-queue-composer__text"></span><span class="pl-agent-queue-composer__badge"></span><button type="button" data-act="now">Send now</button><button type="button" data-act="remove">Remove</button>';
      li.children[0].textContent = text;
      li.children[1].textContent = now ? 'Sent now' : 'Queued';
      if (now) li.children[2].remove();
      queue.appendChild(li);
      if (now) consume(li); else live.textContent = 'Queued, position ' + queue.children.length;
    }
    function consume(li) {
      live.textContent = 'Sent now. The agent reads it at its next step.';
      reads.push(setTimeout(function () { li.remove(); live.textContent = 'The agent read your message.'; }, 1600));
    }
    function submit(now) {
      var text = input.value.trim();
      if (!text) return;
      input.value = '';
      if (running()) enqueue(text, now); else start(text);
    }
    input.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); submit(ev.metaKey || ev.ctrlKey); }
      if (ev.key === 'Escape' && running()) finish('stopped');
    });
    root.addEventListener('submit', function (ev) { ev.preventDefault(); submit(false); });
    stop.addEventListener('click', function () { finish('stopped'); });
    queue.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button');
      if (!btn) return;
      var li = btn.closest('li');
      if (btn.dataset.act === 'remove') { li.remove(); live.textContent = 'Removed from queue'; }
      else { li.dataset.mode = 'now'; li.querySelector('.pl-agent-queue-composer__badge').textContent = 'Sent now'; btn.remove(); consume(li); }
    });
    start('Fix the 3 failing tests in cart.test.ts');
    return function () { clear(); reads.forEach(clearTimeout); };
  },
};
