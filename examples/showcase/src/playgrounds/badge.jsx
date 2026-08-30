import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function BadgePlayground() {
  const count = signal(12)
  const tone = signal('info')
  const size = signal('large')
  const javascript = computed(() => codeLines(
    'html`',
    '  <div class="badge-playground">',
    '    <div class="badge-live-card">',
    '      <div class="badge-live-copy">',
    '        <p class="badge-mode-label">Reactive count</p>',
    '        <p class="badge-live-title">Unread messages</p>',
    '        <p class="badge-live-description">Change the number to see the badge respond.</p>',
    `      <span class="badge-value-slot">\${Badge({ value: ${count.value}, tone: "${tone.value}", size: "${size.value}", pulseOnChange: true })}</span>`,
    '      ${Button({ variant: "secondary", onClick: () => count.update(value => value + 1), children: "Add message" })}',
    '    </div>',
    '    <div class="badge-variant-strip" role="group" aria-label="Badge tone examples">',
    '      ${Badge({ tone: "neutral", children: "Neutral" })}',
    '      ${Badge({ tone: "success", children: "Ready" })}',
    '      ${Badge({ tone: "info", children: "Info" })}',
    '      ${Badge({ tone: "warning", children: "Review" })}',
    '      ${Badge({ tone: "error", children: "Alert" })}',
    '    </div>',
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="badge-playground">',
    '    <div class="badge-live-card">',
    '      <div class="badge-live-copy">',
    '        <p class="badge-mode-label">Reactive count</p>',
    '        <p class="badge-live-title">Unread messages</p>',
    '        <p class="badge-live-description">Change the number to see the badge respond.</p>',
    '      </div>',
    '      <span class="badge-value-slot">${Badge({ value: count, tone, size, pulseOnChange: true })}</span>',
    '      ${Button({ variant: "secondary", onClick: () => count.update(value => value + 1), children: "Add message" })}',
    '    </div>',
    '    <div class="badge-variant-strip" role="group" aria-label="Badge tone examples">',
    '      ${Badge({ tone: "neutral", children: "Neutral" })}',
    '      ${Badge({ tone: "success", children: "Ready" })}',
    '      ${Badge({ tone: "info", children: "Info" })}',
    '      ${Badge({ tone: "warning", children: "Review" })}',
    '      ${Badge({ tone: "error", children: "Alert" })}',
    '    </div>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, count, tone, size })

  return {
    javascript,
    jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="badge-tone">Tone</label>
        <Select
          id="badge-tone"
          value={tone}
          options={[
            { value: 'neutral', label: 'Neutral' },
            { value: 'success', label: 'Success' },
            { value: 'info', label: 'Info' },
            { value: 'warning', label: 'Warning' },
            { value: 'error', label: 'Error' }
          ]}
        />
        <label class="setting-label" htmlFor="badge-size">Size</label>
        <Select
          id="badge-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
      </div>
    )
  }
}
