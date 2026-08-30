import { computed, html, signal } from '@mickyballadelli/matrix'
import { CheckBox, ColorPicker } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { selectOptions, SelectForP2 } from './helpers.jsx'

export function ColorPickerPlayground() {
  const value = signal('#6958de')
  const size = signal('medium')
  const showValue = signal(true)
  const codePreview = createCodePreview(codeLines(
    'ColorPicker({',
    '  label: "Accent color",',
    '  value,',
    '  size,',
    '  showValue',
    '})'
  ), { ...playgroundRuntime, value, size, showValue })
  const javascript = computed(() => codeLines(
    'ColorPicker({',
    '  label: "Accent color",',
    '  value,',
    '  size,',
    `  showValue: ${showValue.value}`,
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))

  return {
    ...codePreview,
    javascript,
    jsxCode,
    preview: html`<div class="p2-color-picker-demo">${ColorPicker({ label: 'Accent color', value, size, showValue })}<span class="playground-note">Use this color in gradients, themes, or product settings.</span></div>`,
    controls: <div class="settings-list">
      <ColorPicker id="p2-color-picker-value" label="Color" value={value} />
      <label class="setting-label" htmlFor="p2-color-picker-size">Size</label>
      <SelectForP2 id="p2-color-picker-size" value={size} options={selectOptions(['small', 'medium', 'large'])} />
      <CheckBox checked={showValue}>Show hex value</CheckBox>
      <p class="playground-note">The value is a writable Matrix signal, so the preview and recipe stay in sync.</p>
    </div>
  }
}
