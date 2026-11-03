export default {
  id: 'voice-input',
  name: 'Voice input: dictation mic and live voice entry',
  category: 'Composer',
  description: 'A mic button that turns the composer into a recording strip with a waveform, timer, cancel and confirm, inserts the transcript for review, and a separate sound-wave button that enters live voice mode.',
  tags: ['composer', 'voice', 'dictation', 'states'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude.ai', note: 'The microphone is dictation; a sound-wave icon starts voice mode, hands-free by default with push-to-talk optional, interrupt by speaking, end with Stop', url: 'https://support.claude.com/en/articles/11101966-use-voice-mode', checked: '2026-11-02' },
    { product: 'ChatGPT', note: 'Inline dictation replaces the field with a waveform and confirm or cancel; a separate full-screen voice session exists (third-party teardown, June 2026)', url: 'https://aiuxplayground.com/teardowns/chatgpt/composer', checked: '2026-11-02' },
    { product: 'Claude Code', note: 'Hold Space to dictate, or /voice tap for tap-to-toggle; the binding is configurable', url: 'https://code.claude.com/docs/en/interactive-mode', checked: '2026-11-02' },
    { product: 'Microsoft Copilot', note: 'The microphone icon in the composer starts Copilot Voice; clicking it again mutes (search snippet only)', url: 'https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-voice-with-microsoft-copilot', checked: '2026-11-02' },
    { product: 'assistant-ui', note: 'The mic swaps for a stop control while dictating (useComposerDictate)', url: 'https://www.assistant-ui.com/docs/ui/Thread', checked: '2026-11-02' },
  ],
  anatomy: [
    'Mic button on the right of the bar with aria-pressed, shown only when SpeechRecognition exists',
    'Separate live-voice button with a sound-wave icon and its own label',
    'Recording strip replacing the textarea row: animated bars, elapsed timer, cancel and confirm',
    'Interim transcript streamed into the textarea as a draft, finalized when recognition ends',
    'Live-voice surface with a listening label and a Stop control',
    'Inline error slot next to the mic for permission and no-speech failures',
  ],
  states: [
    'Idle: mic and sound-wave visible, textarea editable',
    'Recording: strip visible, bars animate, timer counts, mic aria-pressed="true"',
    'Transcribing: bars stop, timer freezes, draft text appears',
    'Review: transcript in the textarea, nothing sent until the user confirms',
    'Live listening: voice surface replaces the bar, Stop ends it',
    'Permission denied or no speech: inline error names the cause',
  ],
  behavior: [
    'Dictation inserts editable text; sending is a separate, explicit action',
    'Second click on the mic, the confirm button, or Escape stops recording and keeps the draft',
    'Cancel discards the recording and restores the previous draft',
    'Live voice is a different control with a different icon, so the two are not confused',
    'Recording start and stop are announced through a polite live region',
  ],
  microcopy: [
    { text: 'Stop', source: 'Claude.ai voice mode end control' },
    { text: 'Separate mode', source: 'ChatGPT voice setting, snippet only' },
  ],
  variants: [
    'Dictation only (Claude Code, AI Elements, ChatKit)',
    'Dictation plus live voice side by side (Claude, ChatGPT, Perplexity)',
    'Voice note sent as audio with hold-to-record and slide-to-lock (iMessage, WhatsApp, Stream)',
    'Push-to-talk (hold Space in Claude Code) versus tap-to-toggle',
  ],
  pitfalls: [
    'Mic and waveform icons look the same until tapped; give them distinct glyphs and labels',
    'The bar mic does not reveal that a fuller voice mode exists',
    'Browser or OS permission failures look like a broken button; show a specific error',
    'Web Speech API support varies; feature-detect SpeechRecognition or webkitSpeechRecognition before rendering the mic',
  ],
  refs: [
    { label: 'Claude: Use voice mode', url: 'https://support.claude.com/en/articles/11101966-use-voice-mode' },
    { label: 'assistant-ui Thread (dictation swap)', url: 'https://www.assistant-ui.com/docs/ui/Thread' },
  ],
  spec: 'Render the mic button only if window.SpeechRecognition or window.webkitSpeechRecognition exists. On click, start recognition with interimResults true, set aria-pressed="true" on the mic, set data-state="recording" on the root to swap the textarea row for a strip with animated bars, a timer and cancel and confirm buttons, and stream interim results into the textarea; finalize on result.isFinal. A second click, the confirm button or Escape stops recognition and leaves the text for review; cancel restores the previous draft. Handle error events (not-allowed, no-speech) with an inline message next to the mic. Give live voice its own button and icon that opens a separate surface with a Stop control. Pair with the send-stop pattern for sending the reviewed text.',
  html: `<form class="pl pl-voice-input" data-state="idle" aria-label="Message composer">
  <div class="pl-voice-input__card">
    <textarea class="pl-voice-input__input" rows="1" aria-label="Message" placeholder="Message, or tap the mic to dictate"></textarea>
    <div class="pl-voice-input__strip" aria-label="Recording">
      <span class="pl-voice-input__dot" aria-hidden="true"></span>
      <span class="pl-voice-input__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span class="pl-voice-input__timer">0:00</span>
      <button type="button" class="pl-voice-input__cancel" aria-label="Cancel recording"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <button type="button" class="pl-voice-input__confirm" aria-label="Finish and insert transcript"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg></button>
    </div>
    <div class="pl-voice-input__live">
      <span class="pl-voice-input__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span class="pl-voice-input__live-label">Listening. Speak to interrupt.</span>
      <button type="button" class="pl-voice-input__stop">Stop</button>
    </div>
    <div class="pl-voice-input__bar">
      <span class="pl-voice-input__error" role="status"></span>
      <button type="button" class="pl-voice-input__mic" aria-label="Dictate" aria-pressed="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
      <button type="button" class="pl-voice-input__wave" aria-label="Start voice mode"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/></svg></button>
      <button type="submit" class="pl-voice-input__send" aria-label="Send message"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
    </div>
  </div>
  <p class="pl-sr" aria-live="polite"></p>
</form>`,
  css: `.pl-voice-input { max-width: 720px; padding: 16px; background: var(--pl-bg); }
.pl-voice-input__card { display: flex; flex-direction: column; gap: 8px; padding: 10px 10px 8px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: 20px; transition: border-color 160ms ease-out, box-shadow 160ms ease-out; }
.pl-voice-input__card:focus-within { border-color: var(--pl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--pl-accent) 20%, transparent); }
.pl-voice-input[data-state="recording"] .pl-voice-input__card { border-color: var(--pl-danger); }
.pl-voice-input__input { width: 100%; min-height: 24px; max-height: 176px; padding: 2px 4px; border: 0; background: transparent; resize: none; outline: none; line-height: 22px; }
.pl-voice-input__input::placeholder { color: var(--pl-muted); }
.pl-voice-input__strip, .pl-voice-input__live { display: none; align-items: center; gap: 10px; min-height: 40px; padding: 0 4px; }
.pl-voice-input[data-state="recording"] .pl-voice-input__strip, .pl-voice-input[data-state="live"] .pl-voice-input__live { display: flex; }
.pl-voice-input[data-state="recording"] .pl-voice-input__input, .pl-voice-input[data-state="live"] .pl-voice-input__input, .pl-voice-input[data-state="live"] .pl-voice-input__bar { display: none; }
.pl-voice-input__dot { width: 10px; height: 10px; border-radius: 50%; background: var(--pl-danger); animation: pl-voice-input-blink 1.2s ease-in-out infinite; }
.pl-voice-input__bars { display: flex; flex: 1; align-items: center; justify-content: center; gap: 3px; height: 28px; }
.pl-voice-input__bars i { width: 3px; height: 30%; border-radius: 2px; background: var(--pl-accent); animation: pl-voice-input-bar 0.9s ease-in-out infinite; }
.pl-voice-input__bars i:nth-child(2n) { animation-delay: 0.15s; height: 60%; }
.pl-voice-input__bars i:nth-child(3n) { animation-delay: 0.3s; height: 90%; }
.pl-voice-input__bars i:nth-child(5n) { animation-delay: 0.45s; height: 45%; }
.pl-voice-input[data-state="transcribing"] .pl-voice-input__bars i { animation-play-state: paused; }
.pl-voice-input__timer { font-family: var(--pl-mono); font-size: 13px; color: var(--pl-muted); min-width: 36px; text-align: right; }
.pl-voice-input__bar { display: flex; align-items: center; gap: 4px; }
.pl-voice-input__error { flex: 1; min-width: 0; font-size: 12px; color: var(--pl-danger); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pl-voice-input__mic, .pl-voice-input__wave, .pl-voice-input__send, .pl-voice-input__cancel, .pl-voice-input__confirm { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-muted); transition: background 160ms ease-out, color 160ms ease-out; }
.pl-voice-input__mic:hover, .pl-voice-input__wave:hover, .pl-voice-input__cancel:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-voice-input__mic[aria-pressed="true"] { background: var(--pl-danger); color: var(--pl-bg); }
.pl-voice-input__send, .pl-voice-input__confirm { background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-voice-input__send:hover, .pl-voice-input__confirm:hover { filter: brightness(1.08); }
.pl-voice-input__live-label { flex: 1; font-size: 14px; }
.pl-voice-input__stop { height: 36px; padding: 0 16px; border: 0; border-radius: 999px; background: var(--pl-text); color: var(--pl-bg); font-size: 14px; font-weight: 600; }
@keyframes pl-voice-input-bar { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1.4); } }
@keyframes pl-voice-input-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`,
  mount: function (root) {
    var input = root.querySelector('.pl-voice-input__input');
    var mic = root.querySelector('.pl-voice-input__mic');
    var wave = root.querySelector('.pl-voice-input__wave');
    var stop = root.querySelector('.pl-voice-input__stop');
    var cancel = root.querySelector('.pl-voice-input__cancel');
    var confirm = root.querySelector('.pl-voice-input__confirm');
    var timerEl = root.querySelector('.pl-voice-input__timer');
    var error = root.querySelector('.pl-voice-input__error');
    var live = root.querySelector('[aria-live]');
    var transcript = 'Remind me to send the signed lease back by Friday and copy Mara on the email.';
    var words = transcript.split(' ');
    var previous = '', started = 0, timers = [];
    function clear() { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; }
    function setState(state) {
      root.dataset.state = state;
      mic.setAttribute('aria-pressed', String(state === 'recording' || state === 'transcribing'));
    }
    function finish(keep) {
      clear();
      if (!keep) input.value = previous;
      setState('idle');
      live.textContent = keep ? 'Dictation inserted. Review, then send.' : 'Recording cancelled';
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
    function start() {
      clear();
      error.textContent = '';
      previous = input.value;
      started = Date.now();
      setState('recording');
      timerEl.textContent = '0:00';
      live.textContent = 'Recording. Speak now.';
      timers.push(setInterval(function () {
        var s = Math.round((Date.now() - started) / 1000);
        timerEl.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
      }, 250));
      words.forEach(function (w, i) {
        timers.push(setTimeout(function () {
          input.value = (previous ? previous.trimEnd() + ' ' : '') + words.slice(0, i + 1).join(' ');
          if (i === words.length - 1) { setState('transcribing'); timers.push(setTimeout(function () { finish(true); }, 700)); }
        }, 500 + i * 220));
      });
    }
    mic.addEventListener('click', function () {
      if (root.dataset.state === 'recording' || root.dataset.state === 'transcribing') finish(true); else start();
    });
    confirm.addEventListener('click', function () { finish(true); });
    cancel.addEventListener('click', function () { finish(false); });
    wave.addEventListener('click', function () { clear(); setState('live'); live.textContent = 'Voice mode on. Listening.'; stop.focus(); });
    stop.addEventListener('click', function () { setState('idle'); live.textContent = 'Voice mode ended'; wave.focus(); });
    root.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Escape') return;
      if (root.dataset.state === 'live') stop.click();
      else if (root.dataset.state !== 'idle') finish(true);
    });
    root.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!input.value.trim()) { error.textContent = 'Nothing to send yet.'; return; }
      live.textContent = 'Sent';
      input.value = '';
    });
    return clear;
  },
};
