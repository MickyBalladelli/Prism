import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function CardPlayground() {
  const actionLabel = signal('Open content')
  const actionDisabled = signal(false)
  const showRole = signal(false)
  const clickCount = signal(0)
  const cardRole = computed(() => showRole.value ? 'region' : undefined)
  const codePreview = createCodePreview(codeLines(
    'Card({',
    '  class: "interactive-card",',
    '  role: cardRole,',
    '  actions: Button({',
    '    class: "card-action",',
    '    disabled: actionDisabled,',
    '    onClick: () => clickCount.update(value => value + 1),',
    '    children: actionLabel',
    '  }),',
    '  children: html`<p class="eyebrow">Interactive Card</p><h3>Card content</h3><p class="card-copy">This Card has a configurable action area.</p><p class="playground-note">Action clicks: <strong>${clickCount}</strong></p>`',
    '})'
  ), { ...playgroundRuntime, actionLabel, actionDisabled, clickCount, cardRole })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="card-action-label">Action label</label>
        <TextField id="card-action-label" value={actionLabel} placeholder="Action label" />
        <CheckBox checked={actionDisabled}>Disable action</CheckBox>
        <CheckBox checked={showRole}>Add role="region"</CheckBox>
      </div>
    )
  }
}
