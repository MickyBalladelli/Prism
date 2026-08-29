import { computed, effect, signal } from 'matrix'
import { Button, CheckBox, Popup, Select, SettingsIcon, treeViewModels } from 'prism-ui'

const storageKey = 'prism-showcase-settings'
const animationIds = new Set([
  'theme', 'veil', 'mist', 'sanctum', 'silk', 'halo', 'ember', 'orbit',
  'gossamer', 'meridian', 'bloom', 'current', 'opal', 'zephyr'
])

function readStoredSettings() {
  if (typeof localStorage === 'undefined') {
    return {}
  }

  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const storedSettings = readStoredSettings()
const initialTheme = Object.prototype.hasOwnProperty.call(treeViewModels, storedSettings.theme)
  ? storedSettings.theme
  : 'nocturne'
const initialAnimation = animationIds.has(storedSettings.animation)
  ? storedSettings.animation
  : 'theme'
const initialAnimated = storedSettings.animated !== false

export const showcaseThemeModel = signal(initialTheme)
export const showcaseThemeClass = computed(() => `showcase-app prism-theme-model-${showcaseThemeModel.value}`)
export const showcaseBackgroundAnimation = signal(initialAnimation)
export const showcaseBackgroundAnimated = signal(initialAnimated)

const settingsOpen = signal(false)

const themeOptions = Object.entries(treeViewModels).map(([value, definition]) => ({
  value,
  label: definition.label
}))

const animationOptions = [
  { value: 'theme', label: 'Match theme' },
  { value: 'veil', label: 'Veil' },
  { value: 'mist', label: 'Mist' },
  { value: 'sanctum', label: 'Sanctum' },
  { value: 'silk', label: 'Silk' },
  { value: 'halo', label: 'Halo' },
  { value: 'ember', label: 'Ember' },
  { value: 'orbit', label: 'Orbit' },
  { value: 'gossamer', label: 'Gossamer' },
  { value: 'meridian', label: 'Meridian' },
  { value: 'bloom', label: 'Bloom' },
  { value: 'current', label: 'Current' },
  { value: 'opal', label: 'Opal' },
  { value: 'zephyr', label: 'Zephyr' }
]

function themeBackgroundRecipe() {
  return treeViewModels[showcaseThemeModel.value]?.background ?? treeViewModels.prism.background
}

export const showcaseBackground = computed(() => {
  const recipe = themeBackgroundRecipe()
  const selected = showcaseBackgroundAnimation.value
  const animation = selected === 'theme' ? recipe.animation : selected

  return {
    palette: recipe.palette,
    animation,
    animated: showcaseBackgroundAnimated.value,
    baseColor: recipe.baseColor,
    accentColor: recipe.accentColor,
    glowColor: recipe.glowColor
  }
})

export const showcaseBackgroundPalette = computed(() => showcaseBackground.value.palette)
export const showcaseBackgroundRecipe = computed(() => showcaseBackground.value.animation)
export const showcaseBackgroundBaseColor = computed(() => showcaseBackground.value.baseColor)
export const showcaseBackgroundAccentColor = computed(() => showcaseBackground.value.accentColor)
export const showcaseBackgroundGlowColor = computed(() => showcaseBackground.value.glowColor)

if (typeof localStorage !== 'undefined') {
  effect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        theme: showcaseThemeModel.value,
        animation: showcaseBackgroundAnimation.value,
        animated: showcaseBackgroundAnimated.value
      }))
    } catch {
      // Ignore quota or private-mode failures.
    }
  })
}

const settingsExpanded = computed(() => String(settingsOpen.value))

export function ThemePicker() {
  return (
    <button
      type="button"
      class="showcase-settings-button"
      aria-label="Settings"
      title="Settings"
      aria-haspopup="dialog"
      aria-expanded={settingsExpanded}
      onClick={() => { settingsOpen.value = true }}
    >
      {SettingsIcon({ size: '1.2em' })}
    </button>
  )
}

export function SettingsPopup() {
  return (
    <Popup
      class="showcase-settings-popup"
      open={settingsOpen}
      eyebrow="Appearance"
      title="Settings"
      ariaDescription="Choose a theme model and the motion behind the explorer."
      size="small"
      footer={({ close }) => Button({ children: 'Done', onClick: event => close('done', event) })}
    >
      <div class="settings-list showcase-settings-list">
        <label class="setting-label" htmlFor="showcase-theme-model">Theme model</label>
        <Select
          id="showcase-theme-model"
          value={showcaseThemeModel}
          options={themeOptions}
          placement="top"
          ariaLabel="Theme model"
        />
        <label class="setting-label" htmlFor="showcase-background-animation">Background motion</label>
        <Select
          id="showcase-background-animation"
          value={showcaseBackgroundAnimation}
          options={animationOptions}
          placement="top"
          ariaLabel="Background animation"
        />
        <CheckBox checked={showcaseBackgroundAnimated}>Animate background</CheckBox>
      </div>
    </Popup>
  )
}
