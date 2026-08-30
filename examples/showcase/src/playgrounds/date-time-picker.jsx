import { html, signal } from '@mickyballadelli/matrix'
import { DateTimePicker } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'

export function DateTimePickerPlayground() {
  const value = signal('2026-09-15T09:30')
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="p2-date-time-picker-demo">',
    '    ${DateTimePicker({',
    '      label: "Review starts",',
    '      value',
    '    })}',
    '    <span class="playground-note">Selected: ${value}</span>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, value })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <p class="playground-note">Open the live picker to choose a review time. The value stays local and remains in sync with the recipe.</p>
    </div>
  }
}
