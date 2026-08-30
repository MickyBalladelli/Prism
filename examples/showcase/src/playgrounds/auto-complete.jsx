import { computed, html, signal } from '@mickyballadelli/matrix'
import { AutoComplete, Badge } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'

export function AutoCompletePlayground() {
  const value = signal('atlas')
  const options = [
    { value: 'atlas', label: 'Atlas workspace' },
    { value: 'cinder', label: 'Cinder workspace' },
    { value: 'harbor', label: 'Harbor workspace' },
    { value: 'lumen', label: 'Lumen workspace' },
    { value: 'northstar', label: 'Northstar workspace' },
    { value: 'solace', label: 'Solace workspace' }
  ]
  const selectedLabel = computed(() => options.find(option => option.value === value.value)?.label ?? (value.value || 'Nothing selected'))
  const javascript = computed(() => codeLines(
    'html`',
    '  <div class="p2-auto-complete-demo">',
    '    ${AutoComplete({',
    '      label: "Workspace",',
    '      placeholder: "Search workspaces",',
    '      options,',
    `      value: ${JSON.stringify(value.value)}`,
    '    })}',
    '    <span class="playground-note">Selected: ${selectedLabel}</span>',
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="p2-auto-complete-demo">',
    '    ${AutoComplete({',
    '      label: "Workspace",',
    '      placeholder: "Search workspaces",',
    '      options,',
    '      value',
    '    })}',
    '    <span class="playground-note">Selected: ${selectedLabel}</span>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, options, value, selectedLabel })

  return {
    ...codePreview,
    javascript,
    jsxCode,
    controls: <div class="settings-list">
      <p class="playground-note">Type to filter. Use ↑ and ↓ to move, then Enter to select.</p>
      <Badge tone="info" value={selectedLabel} />
    </div>
  }
}
