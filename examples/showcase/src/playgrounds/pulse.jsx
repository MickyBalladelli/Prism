import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function PulsePlayground() {
  const size = signal('large')
  const oncePulseTrigger = signal(0)
  const oncePulse = computed(() => {
    oncePulseTrigger.value
    return <Pulse status="success" animation="once" size={size}>Connected</Pulse>
  })
  const javascript = computed(() => codeLines(
    'html`',
    '  <div class="pulse-playground">',
    '    <div class="pulse-mode-examples" role="group" aria-label="Pulse animation examples">',
    '      <div class="pulse-mode-card">',
    '        <p class="pulse-mode-label">Once</p>',
    '        <span class="pulse-example-slot">${oncePulse}</span>',
    '        ${Button({ variant: "secondary", onClick: () => oncePulseTrigger.update(value => value + 1), children: "Pulse once" })}',
    '        <p class="pulse-mode-description">One signal on mount or button press.</p>',
    '      </div>',
    '      <div class="pulse-mode-card">',
    '        <p class="pulse-mode-label">Continuous</p>',
    `        \${Pulse({ status: "info", animation: "continuous", size: "${size.value}", children: "Syncing" })}`,
    '        <p class="pulse-mode-description">A repeating signal for live activity.</p>',
    '      </div>',
    '    </div>',
    '    <div class="pulse-status-strip" role="group" aria-label="Pulse status examples">',
    `      \${Pulse({ status: "success", size: "${size.value}", children: "Healthy" })}`,
    `      \${Pulse({ status: "info", size: "${size.value}", children: "Syncing" })}`,
    `      \${Pulse({ status: "warning", size: "${size.value}", children: "Review" })}`,
    `      \${Pulse({ status: "error", size: "${size.value}", children: "Offline" })}`,
    `      \${Pulse({ status: "off", size: "${size.value}", children: "Off" })}`,
    '    </div>',
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="pulse-playground">',
    '    <div class="pulse-mode-examples" role="group" aria-label="Pulse animation examples">',
    '      <div class="pulse-mode-card">',
    '        <p class="pulse-mode-label">Once</p>',
    '        <span class="pulse-example-slot">${oncePulse}</span>',
    '        ${Button({ variant: "secondary", onClick: () => oncePulseTrigger.update(value => value + 1), children: "Pulse once" })}',
    '        <p class="pulse-mode-description">One signal on mount or button press.</p>',
    '      </div>',
    '      <div class="pulse-mode-card">',
    '        <p class="pulse-mode-label">Continuous</p>',
    '        ${Pulse({ status: "info", animation: "continuous", size, children: "Syncing" })}',
    '        <p class="pulse-mode-description">A repeating signal for live activity.</p>',
    '      </div>',
    '    </div>',
    '    <div class="pulse-status-strip" role="group" aria-label="Pulse status examples">',
    '      ${Pulse({ status: "success", size, children: "Healthy" })}',
    '      ${Pulse({ status: "info", size, children: "Syncing" })}',
    '      ${Pulse({ status: "warning", size, children: "Review" })}',
    '      ${Pulse({ status: "error", size, children: "Offline" })}',
    '      ${Pulse({ status: "off", size, children: "Off" })}',
    '    </div>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, size, oncePulse, oncePulseTrigger })

  return {
    javascript,
    jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="pulse-size">Size</label>
        <Select
          id="pulse-size"
          value={size}
          options={[
            { value: 'small', label: 'Small — dense UI' },
            { value: 'medium', label: 'Medium — default' },
            { value: 'large', label: 'Large — hero status' }
          ]}
        />
      </div>
    )
  }
}
