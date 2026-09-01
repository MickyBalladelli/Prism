import { computed, html, signal } from '@mickyballadelli/matrix'
import { CheckBox, FilePicker } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'

export function FilePickerPlayground() {
  const multiple = signal(true)
  const selection = signal('No assets selected')
  const handleSelection = event => {
    selection.value = Array.from(event.currentTarget?.files ?? [])
      .map(file => file.name)
      .join(', ') || 'No assets selected'
  }
  const recipe = codeLines(
    'html`',
    '  <div class="p2-file-picker-demo">',
    '    ${FilePicker({',
    '      label: "Brand assets",',
    '      accept: "image/*,.svg",',
    '      multiple,',
    '      buttonLabel: "Browse assets",',
    '      onChange: event => selection.value = Array.from(event.currentTarget.files ?? []).map(file => file.name).join(", ") || "No assets selected"',
    '    })}',
    '    <span class="playground-note">Selected: ${selection}</span>',
    '  </div>',
    '`'
  )
  const codePreview = createCodePreview(recipe, { ...playgroundRuntime, multiple, selection })
  const javascript = computed(() => recipe)
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))

  return {
    ...codePreview,
    javascript,
    jsxCode,
    preview: html`<div class="p2-file-picker-demo">${FilePicker({ label: 'Brand assets', accept: 'image/*,.svg', multiple, buttonLabel: 'Browse assets', onChange: handleSelection })}<span class="playground-note">Selected: ${selection}</span></div>`,
    controls: <div class="settings-list">
      <CheckBox checked={multiple}>Allow multiple files</CheckBox>
      <p class="playground-note">The browser keeps file access private. The component exposes the native event, while the preview shows the selected names.</p>
    </div>
  }
}
