export default {
  id: 'projects-spaces',
  name: 'Project header above its conversations',
  category: 'Shell',
  description: 'A project page header with the name, an instructions summary, the file count and a memory scope chip, the conversations inside it, and an "Add to project" menu.',
  tags: ['projects', 'folders', 'spaces', 'sidebar', 'memory'],
  added: '2026-11-03',
  seenIn: [
    { product: 'Claude Projects', note: '+ New Project asks for a name and description; project knowledge sits on the right, "Set project instructions" sets instructions; a "Use account memory" toggle isolates memory; Free gets five projects', url: 'https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects', checked: '2026-11-02' },
    { product: 'ChatGPT Projects', note: 'New project in the sidebar with a name, icon and colour; project instructions override global custom instructions; sharing turns on project-only memory (help-centre snippet, not loaded first-hand)', url: 'https://help.openai.com/en/articles/10169521', checked: '2026-11-02' },
    { product: 'Perplexity Spaces', note: 'Spaces group threads by topic; a new thread is not in a Space until you add it. Secondary sources report a rename to Projects on 2026-07-30, unverified', url: 'https://www.createwith.com/tool/perplexity/updates/perplexity-unveils-projects-an-evolution-of-spaces-for-persistent-ai-collaborati', checked: '2026-11-02' },
    { product: 'Gemini Gems', note: 'Gems and My Gems in the sidebar; New Gem takes a name, instructions and optional knowledge files, a persona rather than a folder of chats', url: 'https://support.google.com/gemini/answer/15146780', checked: '2026-11-02' },
    { product: 'Open WebUI', note: 'Nested folders via parent_id, shared folders, and an admin enable_folders switch', url: 'https://github.com/open-webui/open-webui', checked: '2026-11-02' },
  ],
  anatomy: [
    'Icon tile with the project colour and a starred toggle',
    'Project name and description',
    'Meta chips: instructions set, file count, memory scope, member count',
    'Instructions summary with an Edit affordance',
    'Primary "New chat in project" and an "Add to project" menu (chat, files, instructions)',
    'The project\'s conversation list, same rows as the sidebar',
    'A plain-text note on what is and is not shared between chats',
  ],
  states: [
    'Empty: no chats yet, a create call to action replaces the list',
    'Populated: header plus the chat list',
    'Archived: moved to the bottom of the project list, read-only',
    'Shared: member avatars or a role chip (Can view / Can edit)',
    'Limit reached: Claude Free stops at five projects',
  ],
  behavior: [
    'Chats in a Claude project do not share context with each other unless it is added to project knowledge',
    'Both Claude and ChatGPT add a memory isolation toggle per project',
    'A new chat started from the header carries the projectId',
    'Retrieval over project knowledge switches on automatically near the context limit (Claude)',
  ],
  microcopy: [
    { text: 'Set project instructions', source: 'Claude Projects' },
    { text: 'Use account memory', source: 'Claude Projects toggle' },
    { text: 'New Gem', source: 'Gemini' },
  ],
  variants: [
    'Claude: knowledge files, instructions and per-project memory',
    'ChatGPT: adds an icon and colour per project',
    'Perplexity: research threads plus connectors, Spaces reportedly renamed Projects',
    'Gemini: Gems are reusable personas, not containers of chats',
    'Open WebUI: plain nested folders with no instructions',
  ],
  pitfalls: [
    'Users assume chats in one project share context; say on the page that only project knowledge is shared',
    'Memory leaking across projects is why Claude and ChatGPT both added isolation toggles',
    'A setting that can only be chosen at creation (ChatGPT project-only memory, per a third party) traps users',
    'Renames break documentation: Perplexity\'s article reportedly still sits at its old "spaces" URL',
  ],
  refs: [
    { label: 'Claude: create and manage projects', url: 'https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects' },
    { label: 'Gemini: Gems', url: 'https://support.google.com/gemini/answer/15146780' },
  ],
  spec: 'Model a project as {id, name, icon, colour, instructions, files[], memoryScope: "account" | "project"} in localStorage or the backend, list projects above the history list and route ?p=<id>. The project page renders a header with the icon tile, name, description, meta chips and two buttons: a primary "New chat in project" and an "Add to project" button with aria-haspopup="menu" that offers Existing chat, Files and Instructions. Show the instructions in a collapsed summary with an Edit control that opens a textarea with an explicit Save. List that project\'s chats below, and state in plain text that only project knowledge is shared between them.',
  html: `<section class="pl pl-projects-spaces" aria-labelledby="pl-projects-spaces-name">
  <header class="pl-projects-spaces__head">
    <div class="pl-projects-spaces__tile" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>
    <div class="pl-projects-spaces__id">
      <h2 id="pl-projects-spaces-name">Lisbon offsite <button type="button" class="pl-projects-spaces__star" aria-pressed="true" aria-label="Starred"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z"/></svg></button></h2>
      <p>Three-day team offsite, 14 to 16 May, 22 people, budget in the brief.</p>
      <ul class="pl-projects-spaces__meta" aria-label="Project details">
        <li>Instructions set</li><li>4 files</li><li>Project memory only</li><li>Shared: can edit</li>
      </ul>
    </div>
    <div class="pl-projects-spaces__actions">
      <button type="button" class="pl-projects-spaces__primary">New chat in project</button>
      <div class="pl-projects-spaces__add">
        <button type="button" class="pl-projects-spaces__add-btn" aria-haspopup="menu" aria-expanded="false">Add to project <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
        <ul class="pl-projects-spaces__menu" role="menu" aria-label="Add to project" hidden>
          <li role="none"><button type="button" role="menuitem">Existing chat</button></li>
          <li role="none"><button type="button" role="menuitem">Files</button></li>
          <li role="none"><button type="button" role="menuitem">Instructions</button></li>
        </ul>
      </div>
    </div>
  </header>
  <div class="pl-projects-spaces__instructions">
    <span class="pl-projects-spaces__label">Instructions</span>
    <p>Prefer venues within 40 minutes of the airport. Quote prices in EUR excluding VAT. Flag anything over the per-head budget.</p>
    <button type="button" class="pl-projects-spaces__edit">Edit</button>
  </div>
  <h3 class="pl-projects-spaces__sub">Chats in this project</h3>
  <ul class="pl-projects-spaces__chats">
    <li><a href="#"><span>Venue shortlist, round two</span><time>Today</time></a></li>
    <li><a href="#"><span>Catering: vegetarian default?</span><time>Yesterday</time></a></li>
    <li><a href="#"><span>Airport transfers for 22</span><time>Previous 7 days</time></a></li>
  </ul>
  <p class="pl-projects-spaces__note">Chats here share the project knowledge and instructions, not each other's messages. Add anything every chat should know to the project files.</p>
</section>`,
  css: `.pl-projects-spaces { max-width: 720px; padding: 20px; background: var(--pl-bg); }
.pl-projects-spaces__head { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 14px; }
.pl-projects-spaces__tile { flex: none; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 12px; background: color-mix(in srgb, var(--pl-accent) 22%, var(--pl-surface)); color: var(--pl-accent); }
.pl-projects-spaces__id { flex: 1 1 220px; min-width: 0; }
.pl-projects-spaces__id h2 { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 20px; line-height: 1.2; }
.pl-projects-spaces__id p { margin: 4px 0 8px; font-size: 14px; color: var(--pl-muted); }
.pl-projects-spaces__star { display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: 50%; background: transparent; color: var(--pl-accent); }
.pl-projects-spaces__star[aria-pressed="false"] { color: var(--pl-muted); }
.pl-projects-spaces__star:hover { background: var(--pl-surface); }
.pl-projects-spaces__meta { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
.pl-projects-spaces__meta li { padding: 3px 9px; border: 1px solid var(--pl-border); border-radius: 999px; font-size: 12px; color: var(--pl-muted); }
.pl-projects-spaces__actions { display: flex; flex-wrap: wrap; gap: 8px; }
.pl-projects-spaces__primary, .pl-projects-spaces__add-btn { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 0 14px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: var(--pl-surface); font-size: 14px; font-weight: 600; white-space: nowrap; }
.pl-projects-spaces__primary { background: var(--pl-accent); border-color: var(--pl-accent); color: var(--pl-on-accent); }
.pl-projects-spaces__primary:hover { filter: brightness(1.08); }
.pl-projects-spaces__add-btn:hover { background: var(--pl-surface-2); }
.pl-projects-spaces__add { position: relative; }
.pl-projects-spaces__menu { position: absolute; z-index: 2; top: calc(100% + 4px); right: 0; min-width: 160px; margin: 0; padding: 6px; list-style: none; background: var(--pl-surface-2); border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); box-shadow: var(--pl-shadow); }
.pl-projects-spaces__menu button { display: block; width: 100%; padding: 8px 10px; border: 0; border-radius: 6px; background: transparent; font-size: 14px; text-align: left; }
.pl-projects-spaces__menu button:hover, .pl-projects-spaces__menu button:focus-visible { background: var(--pl-surface); }
.pl-projects-spaces__instructions { display: grid; grid-template-columns: 1fr auto; gap: 2px 12px; margin-top: 18px; padding: 12px 14px; background: var(--pl-surface); border: 1px solid var(--pl-border); border-radius: var(--pl-radius); }
.pl-projects-spaces__label { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--pl-muted); }
.pl-projects-spaces__instructions p { grid-column: 1; margin: 0; font-size: 14px; color: var(--pl-text); }
.pl-projects-spaces__edit { grid-column: 2; grid-row: 1 / span 2; align-self: start; min-height: 32px; padding: 0 12px; border: 1px solid var(--pl-border); border-radius: var(--pl-radius-sm); background: transparent; font-size: 13px; color: var(--pl-muted); }
.pl-projects-spaces__edit:hover { color: var(--pl-text); background: var(--pl-surface-2); }
.pl-projects-spaces__sub { margin: 20px 0 6px; font-size: 13px; font-weight: 600; color: var(--pl-muted); }
.pl-projects-spaces__chats { margin: 0; padding: 0; list-style: none; border: 1px solid var(--pl-border); border-radius: var(--pl-radius); overflow: hidden; }
.pl-projects-spaces__chats li + li { border-top: 1px solid var(--pl-border); }
.pl-projects-spaces__chats a { display: flex; justify-content: space-between; gap: 12px; min-height: 44px; padding: 10px 14px; color: inherit; text-decoration: none; font-size: 14px; }
.pl-projects-spaces__chats a:hover { background: var(--pl-surface); }
.pl-projects-spaces__chats time { flex: none; font-size: 12px; color: var(--pl-muted); }
.pl-projects-spaces__note { margin: 12px 2px 0; font-size: 13px; color: var(--pl-muted); }`,
  mount: function (root) {
    var btn = root.querySelector('.pl-projects-spaces__add-btn');
    var menu = root.querySelector('.pl-projects-spaces__menu');
    var star = root.querySelector('.pl-projects-spaces__star');
    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      if (open) menu.querySelector('[role="menuitem"]').focus();
    }
    btn.addEventListener('click', function () { setOpen(menu.hidden); });
    star.addEventListener('click', function () {
      var on = star.getAttribute('aria-pressed') !== 'true';
      star.setAttribute('aria-pressed', String(on));
      star.setAttribute('aria-label', on ? 'Starred' : 'Not starred');
    });
    root.addEventListener('click', function (e) {
      if (e.target.closest('a')) e.preventDefault();
      if (e.target.closest('[role="menuitem"]')) { setOpen(false); btn.focus(); return; }
      if (!menu.hidden && !e.target.closest('.pl-projects-spaces__add')) setOpen(false);
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
    });
  },
};
