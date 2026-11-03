// Shared tokens every snippet relies on. Prepended to every CSS copy, so a
// pattern pasted into another project carries its own palette and nothing
// else. Snippet CSS uses only these variables plus plain values.
export const TOKENS_CSS = `/* Parley snippet tokens: paste once per page. Override --pl-accent to brand it. */
.pl {
  --pl-bg: #0b0d12;
  --pl-surface: #141822;
  --pl-surface-2: #1c2130;
  --pl-border: #2a3042;
  --pl-text: #e6e8ee;
  --pl-muted: #9aa3b5;
  --pl-accent: #f472b6;
  --pl-on-accent: #0b0d12;
  --pl-user: #27304a;
  --pl-danger: #f87171;
  --pl-success: #4ade80;
  --pl-radius: 14px;
  --pl-radius-sm: 8px;
  --pl-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  --pl-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --pl-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-family: var(--pl-font);
  font-size: 15px;
  line-height: 1.5;
  color: var(--pl-text);
  background: var(--pl-bg);
  color-scheme: dark;
  box-sizing: border-box;
}
.pl *, .pl *::before, .pl *::after { box-sizing: inherit; }
.pl button, .pl input, .pl textarea, .pl select { font: inherit; color: inherit; }
.pl button { cursor: pointer; }
.pl :focus-visible { outline: 2px solid var(--pl-accent); outline-offset: 2px; }
.pl .pl-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.pl[data-pl-theme="light"] {
  --pl-bg: #ffffff;
  --pl-surface: #f5f6f8;
  --pl-surface-2: #eceef2;
  --pl-border: #d9dde5;
  --pl-text: #121419;
  --pl-muted: #5c6577;
  --pl-on-accent: #ffffff;
  --pl-user: #eef0f5;
  --pl-shadow: 0 10px 30px rgba(20, 24, 40, 0.12);
  color-scheme: light;
}
@media (prefers-reduced-motion: reduce) {
  .pl *, .pl *::before, .pl *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}`;
