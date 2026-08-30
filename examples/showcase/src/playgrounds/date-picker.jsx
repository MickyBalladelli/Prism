import { computed, html, signal } from '@mickyballadelli/matrix'
import { DatePicker } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'

export function DatePickerPlayground() {
  const today = new Date()
  const value = signal([
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-'))
  const javascript = computed(() => codeLines(
    'html`',
    '  <div class="p2-date-picker-demo">',
    '    ${DatePicker({',
    '      label: "Launch date",',
    `      value: ${JSON.stringify(value.value)}`,
    '    })}',
    '    <span class="playground-note">Selected: ${value}</span>',
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="p2-date-picker-demo">',
    '    ${DatePicker({',
    '      label: "Launch date",',
    '      value',
    '    })}',
    '    <span class="playground-note">Selected: ${value}</span>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, value })

  return {
    ...codePreview,
    javascript,
    jsxCode,
    controls: <div class="settings-list">
      <p class="playground-note">Open the live picker to choose a launch date. The value is writable and stays in sync with the recipe.</p>
    </div>
  }
}
