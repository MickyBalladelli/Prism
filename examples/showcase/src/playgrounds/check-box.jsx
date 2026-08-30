import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function CheckBoxPlayground() {
  const checked = signal(true)
  const disabled = signal(false)
  const label = signal('Send me design updates')
  const javascript = computed(() => codeLines(
    'html`',
    '  <div class="checkbox-playground">',
    `    \${CheckBox({ checked: ${checked.value}, disabled: ${disabled.value}, children: ${JSON.stringify(label.value)} })}`,
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="checkbox-playground">',
    '    ${CheckBox({ checked, disabled, children: label })}',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, checked, disabled, label })

  return {
    javascript,
    jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="checkbox-label">Label</label>
        <TextField id="checkbox-label" value={label} placeholder="Checkbox label" />
        <CheckBox checked={checked}>Checked</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}
