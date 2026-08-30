import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function TextFieldPlayground() {
  const value = signal('Ada Lovelace')
  const required = signal(false)
  const disabled = signal(false)
  const size = signal('medium')
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="field-playground">',
    '    ${TextField({ value, placeholder: "Type your name", required, disabled, size })}',
    '    <p class="playground-note">Current value: <strong>${value}</strong></p>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, value, required, disabled, size })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="field-size">Size</label>
        <Select
          id="field-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <CheckBox checked={required}>Required</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}
