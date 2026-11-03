export default {
  id: 'support-widget',
  name: 'Embedded support drawer with AI label, handoff and CSAT',
  category: 'Embedded',
  description: 'A 400 by 600 support panel: header with the agent avatar and an "AI agent" label, a pre-chat form, the bot conversation with a "Talk to a person" handoff that switches the header to a human, and a CSAT row at the end.',
  tags: ['widget', 'support', 'handoff', 'csat', 'dialog'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Chatwoot', note: 'Panel at 667px and above is 400px wide, calc(90% - 64px - 20px) tall capped at 640px, 16px radius, 104px from the bottom; full screen below 667px; CSAT is an emoji scale or 5 stars sent when an agent resolves', url: 'https://github.com/chatwoot/chatwoot', checked: '2026-11-02' },
    { product: 'CopilotKit', note: 'Popup 420 by 560px, capped at calc(100vw - 3rem) and calc(100dvh - 7.5rem), 96px from the bottom and 24px from the right; role="dialog" with aria-label, Escape closes, focus moves in', url: 'https://github.com/CopilotKit/CopilotKit', checked: '2026-11-02' },
    { product: 'Intercom Fin', note: 'In "Set AI Agent expectations" mode Fin\'s avatar and name show with a subtext that the AI agent and the team can help; "Match teammate expectations" makes Fin look like a teammate', url: 'https://www.intercom.com/help/en/articles/7837525-customizing-fin-in-the-messenger', checked: '2026-11-02' },
    { product: 'Zendesk messaging', note: 'Header with logo, title and description; bottom-left or right with a 16px default offset; CSAT sent by a trigger when an agent ends the session', url: 'https://support.zendesk.com/hc/en-us/articles/4500747797914-Configuring-the-name-and-appearance-of-the-Web-Widget', checked: '2026-11-02' },
    { product: 'GOV.UK Companies House webchat', note: 'Accessibility statement lists 15 WCAG 2.2 failures: unlabelled message field, prechat fields without autocomplete, iframe without a title, timeouts without warning, a post-chat survey not announced', url: 'https://www.gov.uk/government/publications/companies-house-accessibility-statements/accessibility-statement-for-companies-house-webchat', checked: '2026-11-02' },
  ],
  anatomy: [
    'Panel as role="dialog" labelled by its heading, 400px wide, height min(600px, 100dvh - 120px), full screen below 667px',
    'Header: avatar, name, a text label "AI agent" or "Teammate", minimise and close',
    'Pre-chat form: name, email with autocomplete, question, Start chat',
    'Transcript with bot and human bubbles and system lines for joins',
    'Composer with a labelled field and a "Talk to a person" quick action',
    'CSAT fieldset with a legend and five radio options, announced in a status region',
    'Powered-by line',
  ],
  states: [
    'Pre-chat form',
    'Bot answering, header shows the AI label',
    'Waiting for a human after handoff',
    'Human joined: header avatar, name and label change, a system line records it',
    'Ended: composer replaced by the CSAT row',
    'CSAT submitted: thanks line',
  ],
  behavior: [
    'Escape closes the panel and focus returns to the launcher (CopilotKit closes on Escape); the launcher is its own pattern, widget-launcher',
    'Handoff inserts a system line "{Name} joined" and swaps the header identity, so who is answering is never ambiguous',
    'Mobile is full screen with 100dvh, not 100vh',
    'The pre-chat email field carries autocomplete="email" (a GOV.UK failure otherwise)',
  ],
  microcopy: [
    { text: 'AI Agent and team can help', source: 'Intercom Fin subtext' },
    { text: 'Open chat window', source: 'Chatwoot launcher title' },
  ],
  variants: [
    'Chatwoot: 64px bubble, 400px panel, emoji or star CSAT',
    'CopilotKit: 420 by 560 popup, or a 480px sidebar that pushes the page body',
    'Intercom: two identity modes, one of which hides that Fin is an AI',
    'Zendesk: adjustable radius 0 to 20px, square or round launcher',
  ],
  pitfalls: [
    'The GOV.UK statement is a ready-made list of what goes wrong: unlabelled fields, untitled iframe, unannounced survey',
    'Chatwoot sets no title on its iframe in the SDK code as read, the same 2.4.1 failure',
    'Presenting the AI as a teammate (Intercom "Match teammate expectations") hides the AI identity',
    'A CSAT that appears with no announcement is missed by screen reader users',
  ],
  refs: [
    { label: 'Chatwoot: sdk.css and constants.js', url: 'https://github.com/chatwoot/chatwoot' },
    { label: 'CopilotKit: CopilotPopupView.tsx', url: 'https://github.com/CopilotKit/CopilotKit' },
  ],
  spec: 'Render section role="dialog" aria-labelledby="chat-title" at width 400px, height min(600px, calc(100dvh - 120px)), border-radius 16px, fixed 20px from the right and 100px from the bottom, and inset 0 below 667px. The header shows the avatar, name and a text label "AI agent"; a data-view attribute on the root switches between prechat, chat and ended. The pre-chat form has labelled inputs with autocomplete and a Start chat button. In chat, a "Talk to a person" button inserts a system line, sets a waiting state, then on join swaps the header to the human\'s avatar, name and "Teammate" label and inserts "{Name} joined". End chat replaces the composer with a fieldset of five radio options under a legend and writes "Rate this conversation" into a role="status" region; selection shows a thanks line.',
  html: `<section class="pl pl-support-widget" role="dialog" aria-labelledby="pl-support-widget-title" data-view="prechat">
  <header class="pl-support-widget__head">
    <span class="pl-support-widget__avatar" data-who="bot" aria-hidden="true">N</span>
    <div class="pl-support-widget__who"><h2 id="pl-support-widget-title">Nova</h2><p><span class="pl-support-widget__label">AI agent</span> and the team can help</p></div>
    <button type="button" class="pl-support-widget__icon" aria-label="Minimise"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg></button>
    <button type="button" class="pl-support-widget__icon" aria-label="Close chat"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  </header>
  <form class="pl-support-widget__prechat">
    <p>Tell us who you are so we can find your order.</p>
    <label>Name <input type="text" name="name" autocomplete="name" required></label>
    <label>Email <input type="email" name="email" autocomplete="email" required></label>
    <label>How can we help? <textarea name="question" rows="2" required></textarea></label>
    <button type="submit" class="pl-support-widget__primary">Start chat</button>
  </form>
  <div class="pl-support-widget__log" role="log" aria-label="Conversation">
    <p class="pl-support-widget__msg" data-from="bot">Hi, I am Nova, an AI agent. Order 48213 shipped on Thursday and is with the courier. Do you want the tracking link or a replacement?</p>
    <p class="pl-support-widget__msg" data-from="user">It says delivered but nothing arrived.</p>
    <p class="pl-support-widget__msg" data-from="bot">I can open a missing-parcel claim now, or you can talk to a person.</p>
  </div>
  <div class="pl-support-widget__foot">
    <button type="button" class="pl-support-widget__handoff">Talk to a person</button>
    <div class="pl-support-widget__composer"><input type="text" aria-label="Message" placeholder="Write a message"><button type="button" aria-label="Send"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button></div>
    <button type="button" class="pl-support-widget__end">End chat</button>
  </div>
  <fieldset class="pl-support-widget__csat">
    <legend>How was this conversation?</legend>
    <div class="pl-support-widget__scale">
      <label><input type="radio" name="pl-support-widget-csat" value="1"><span>1</span></label>
      <label><input type="radio" name="pl-support-widget-csat" value="2"><span>2</span></label>
      <label><input type="radio" name="pl-support-widget-csat" value="3"><span>3</span></label>
      <label><input type="radio" name="pl-support-widget-csat" value="4"><span>4</span></label>
      <label><input type="radio" name="pl-support-widget-csat" value="5"><span>5</span></label>
    </div>
    <p class="pl-support-widget__thanks" hidden>Thanks. Your rating was sent to the team.</p>
  </fieldset>
  <p class="pl-support-widget__powered">Powered by Parley</p>
  <p class="pl-sr" role="status" aria-live="polite"></p>
</section>`,
  css: `.pl-support-widget { display: flex; flex-direction: column; width: 400px; max-width: 100%; height: min(600px, calc(100dvh - 120px)); min-height: 420px; border: 1px solid var(--pl-border); border-radius: 16px; background: var(--pl-bg); box-shadow: var(--pl-shadow); overflow: hidden; }
.pl-support-widget__head { display: flex; align-items: center; gap: 10px; padding: 12px 10px 12px 14px; background: var(--pl-surface); border-bottom: 1px solid var(--pl-border); }
.pl-support-widget__avatar { flex: none; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); font-size: 14px; font-weight: 700; }
.pl-support-widget__avatar[data-who="human"] { background: var(--pl-success); color: var(--pl-bg); }
.pl-support-widget__who { flex: 1; min-width: 0; }
.pl-support-widget__who h2 { margin: 0; font-size: 15px; }
.pl-support-widget__who p { margin: 0; font-size: 12px; color: var(--pl-muted); }
.pl-support-widget__label { padding: 1px 6px; border: 1px solid var(--pl-border); border-radius: 999px; font-weight: 600; color: var(--pl-text); }
.pl-support-widget__icon { display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: var(--pl-radius-sm); background: transparent; color: var(--pl-muted); }
.pl-support-widget__icon:hover { background: var(--pl-surface-2); color: var(--pl-text); }
.pl-support-widget__prechat { display: none; flex-direction: column; gap: 10px; padding: 16px; font-size: 14px; }
.pl-support-widget[data-view="prechat"] .pl-support-widget__prechat { display: flex; }
.pl-support-widget__prechat p { margin: 0 0 4px; color: var(--pl-muted); }
.pl-support-widget__prechat label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--pl-muted); }
.pl-support-widget__prechat input, .pl-support-widget__prechat textarea { min-height: 40px; padding: 8px 10px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface); color: var(--pl-text); font-size: 14px; resize: none; }
.pl-support-widget__prechat input:focus, .pl-support-widget__prechat textarea:focus { outline: none; border-color: var(--pl-accent); }
.pl-support-widget__primary { min-height: 44px; border: 0; border-radius: var(--pl-radius-sm); background: var(--pl-accent); color: var(--pl-on-accent); font-size: 14px; font-weight: 600; }
.pl-support-widget__log { display: none; flex: 1; flex-direction: column; gap: 8px; min-height: 0; padding: 14px; overflow-y: auto; }
.pl-support-widget[data-view="chat"] .pl-support-widget__log, .pl-support-widget[data-view="ended"] .pl-support-widget__log { display: flex; }
.pl-support-widget__msg { max-width: 85%; margin: 0; padding: 9px 12px; border-radius: var(--pl-radius); font-size: 14px; line-height: 1.45; }
.pl-support-widget__msg[data-from="bot"], .pl-support-widget__msg[data-from="human"] { align-self: flex-start; background: var(--pl-surface); border: 1px solid var(--pl-border); }
.pl-support-widget__msg[data-from="user"] { align-self: flex-end; background: var(--pl-user); }
.pl-support-widget__msg[data-from="system"] { align-self: center; padding: 2px 8px; font-size: 12px; color: var(--pl-muted); }
.pl-support-widget__foot { display: none; flex-direction: column; gap: 8px; padding: 10px 14px 6px; border-top: 1px solid var(--pl-border); }
.pl-support-widget[data-view="chat"] .pl-support-widget__foot { display: flex; }
.pl-support-widget__handoff, .pl-support-widget__end { align-self: flex-start; min-height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 999px; background: transparent; color: var(--pl-text); font-size: 13px; }
.pl-support-widget__handoff:hover, .pl-support-widget__end:hover { background: var(--pl-surface-2); }
.pl-support-widget__handoff:disabled { opacity: 0.5; cursor: default; }
.pl-support-widget__end { align-self: flex-end; color: var(--pl-muted); border-color: transparent; }
.pl-support-widget__composer { display: flex; gap: 6px; }
.pl-support-widget__composer input { flex: 1; min-width: 0; min-height: 44px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: 22px; background: var(--pl-surface); font-size: 14px; }
.pl-support-widget__composer input:focus { outline: none; border-color: var(--pl-accent); }
.pl-support-widget__composer button { flex: none; width: 44px; height: 44px; border: 0; border-radius: 50%; background: var(--pl-accent); color: var(--pl-on-accent); }
.pl-support-widget__csat { display: none; margin: 0 14px 8px; padding: 12px 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); }
.pl-support-widget[data-view="ended"] .pl-support-widget__csat { display: block; }
.pl-support-widget__csat legend { padding: 0 4px; font-size: 14px; font-weight: 600; }
.pl-support-widget__scale { display: flex; gap: 8px; margin-top: 8px; }
.pl-support-widget__scale label { flex: 1; }
.pl-support-widget__scale input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.pl-support-widget__scale span { display: grid; place-items: center; min-height: 44px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface); font-size: 14px; font-weight: 600; cursor: pointer; }
.pl-support-widget__scale input:checked + span { background: var(--pl-accent); border-color: var(--pl-accent); color: var(--pl-on-accent); }
.pl-support-widget__scale input:focus-visible + span { outline: 2px solid var(--pl-accent); outline-offset: 2px; }
.pl-support-widget__thanks { margin: 10px 0 0; font-size: 13px; color: var(--pl-success); }
.pl-support-widget__powered { margin: 0; padding: 6px; text-align: center; font-size: 11px; color: var(--pl-muted); }`,
  mount: function (root) {
    var log = root.querySelector('.pl-support-widget__log');
    var avatar = root.querySelector('.pl-support-widget__avatar');
    var name = root.querySelector('#pl-support-widget-title');
    var sub = root.querySelector('.pl-support-widget__who p');
    var handoff = root.querySelector('.pl-support-widget__handoff');
    var status = root.querySelector('[role="status"]');
    var timers = [];
    function say(from, text) {
      var p = document.createElement('p');
      p.className = 'pl-support-widget__msg'; p.dataset.from = from; p.textContent = text;
      log.appendChild(p); log.scrollTop = log.scrollHeight;
    }
    root.querySelector('.pl-support-widget__prechat').addEventListener('submit', function (e) {
      e.preventDefault(); root.dataset.view = 'chat'; root.querySelector('.pl-support-widget__composer input').focus();
    });
    handoff.addEventListener('click', function () {
      handoff.disabled = true; handoff.textContent = 'Finding someone';
      say('system', 'Connecting you with a person. Usual wait: about 2 minutes.');
      timers.push(setTimeout(function () {
        avatar.dataset.who = 'human'; avatar.textContent = 'D'; name.textContent = 'Dana';
        sub.innerHTML = '<span class="pl-support-widget__label">Teammate</span> Support, Lisbon';
        say('system', 'Dana joined'); say('human', 'Hi, Dana here. I have your order open. I will file the claim and send a replacement today.');
        handoff.textContent = 'Talking to Dana'; status.textContent = 'Dana joined the conversation';
      }, 1400));
    });
    root.querySelector('.pl-support-widget__end').addEventListener('click', function () {
      root.dataset.view = 'ended'; say('system', 'Conversation ended');
      status.textContent = 'Conversation ended. Rate this conversation from 1 to 5.';
      root.querySelector('.pl-support-widget__scale input').focus();
    });
    root.querySelector('.pl-support-widget__scale').addEventListener('change', function (e) {
      root.querySelector('.pl-support-widget__thanks').hidden = false;
      status.textContent = 'Rated ' + e.target.value + ' of 5. Thanks.';
    });
    return function () { timers.forEach(clearTimeout); };
  },
};
