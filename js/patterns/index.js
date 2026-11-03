// Registry of every pattern. Order here is the catalog's "collection order".
import sendStop from './send-stop.js';
import thinkingDisclosure from './thinking-disclosure.js';
import messageLayout from './message-layout.js';
import streamingText from './streaming-text.js';
import workingIndicator from './working-indicator.js';
import toolCallCard from './tool-call-card.js';
import citationsSources from './citations-sources.js';
import codeBlock from './code-block.js';
import richContent from './rich-content.js';
import messageActions from './message-actions.js';
import regenerateBranching from './regenerate-branching.js';
import feedbackFlow from './feedback-flow.js';
import artifactPanel from './artifact-panel.js';
import streamError from './stream-error.js';
import conversationSidebar from './conversation-sidebar.js';
import projectsSpaces from './projects-spaces.js';
import emptyState from './empty-state.js';
import conversationHeader from './conversation-header.js';
import shareExport from './share-export.js';
import errorStates from './error-states.js';
import trustNotices from './trust-notices.js';
import memoryPanel from './memory-panel.js';
import supportWidget from './support-widget.js';
import mobileShell from './mobile-shell.js';
import streamAnnouncer from './stream-announcer.js';
import shortcutsSheet from './shortcuts-sheet.js';
import agentPicker from './agent-picker.js';
import composerAttachments from './composer-attachments.js';
import slashMentions from './slash-mentions.js';
import composerModes from './composer-modes.js';
import modelPicker from './model-picker.js';
import starterChips from './starter-chips.js';
import voiceInput from './voice-input.js';
import composerLimits from './composer-limits.js';
import agentQueueComposer from './agent-queue-composer.js';
import disclaimerLine from './disclaimer-line.js';
import mobileComposer from './mobile-composer.js';
import widgetLauncher from './widget-launcher.js';

export const PATTERNS = [
  sendStop,
  agentQueueComposer,
  composerAttachments,
  slashMentions,
  composerModes,
  modelPicker,
  starterChips,
  voiceInput,
  composerLimits,
  mobileComposer,
  messageLayout,
  codeBlock,
  richContent,
  messageActions,
  regenerateBranching,
  feedbackFlow,
  thinkingDisclosure,
  streamingText,
  workingIndicator,
  toolCallCard,
  citationsSources,
  artifactPanel,
  streamError,
  emptyState,
  conversationSidebar,
  projectsSpaces,
  conversationHeader,
  agentPicker,
  shareExport,
  shortcutsSheet,
  mobileShell,
  errorStates,
  trustNotices,
  memoryPanel,
  disclaimerLine,
  streamAnnouncer,
  widgetLauncher,
  supportWidget,
];
