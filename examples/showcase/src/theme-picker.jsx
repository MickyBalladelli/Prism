import { computed, signal } from 'matrix'
import { Select, treeViewModels } from 'prism-ui'

export const showcaseThemeModel = signal('nocturne')
export const showcaseThemeClass = computed(() => `showcase-app prism-theme-model-${showcaseThemeModel.value}`)

const themeOptions = Object.entries(treeViewModels).map(([value, definition]) => ({
  value,
  label: definition.label
}))

const selectedThemeName = computed(() => treeViewModels[showcaseThemeModel.value]?.label ?? treeViewModels.prism.label)

export function ThemePicker() {
  return (
    <div class="showcase-theme-picker">
      <div class="showcase-theme-copy">
        <span class="showcase-theme-label">Theme model</span>
        <strong>{selectedThemeName}</strong>
      </div>
      <Select
        id="showcase-theme-model"
        value={showcaseThemeModel}
        options={themeOptions}
        ariaLabel="Theme model"
      />
    </div>
  )
}
