import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function BackgroundPlayground() {
  const headline = signal('Deep focus, soft glow')
  const copy = signal('True mastery of a tool occurs when AI and UI dissolve into pure poetry.')
  const palette = signal('midnight')
  const animation = signal('veil')
  const animated = signal(true)
  const speed = signal(1)
  const intensity = signal(0.85)
  const overlayOpacity = signal(0.22)
  const codePreview = createCodePreview(codeLines(
    'Background({',
    '  palette,',
    '  animation,',
    '  animated,',
    '  speed,',
    '  intensity,',
    '  overlayOpacity,',
    '  minHeight: "20rem",',
    '  children: html`<div class="background-demo-stage">',
    '    <p class="eyebrow">Ambient layer</p>',
    '    ${Label({ size: "large", font: "sans", weight: "medium", alwaysVisible: true, children: headline })}',
    '    ${Label({ class: "background-demo-copy", size: "medium", font: "sans", weight: "regular", alwaysVisible: true, backgroundColor: "#f3eee4", outlineColor: "#0a1020", children: copy })}',
    '    <div class="background-demo-badges">',
    '      <span>Palette: ${palette}</span>',
    '      <span>${animated ? animation : "Solid surface"}</span>',
    '      <span>Intensity × ${intensity}</span>',
    '    </div>',
    '  </div>`',
    '})'
  ), { ...playgroundRuntime, headline, copy, palette, animation, animated, speed, intensity, overlayOpacity })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="background-headline">Headline</label>
        <TextField id="background-headline" value={headline} placeholder="Headline" />
        <label class="setting-label" htmlFor="background-copy">Supporting line</label>
        <TextField id="background-copy" value={copy} placeholder="Supporting line" />
        <label class="setting-label" htmlFor="background-palette">Palette</label>
        <Select
          id="background-palette"
          value={palette}
          options={[
            { value: 'midnight', label: 'Midnight — Prism blue' },
            { value: 'aurora', label: 'Aurora — violet glow' },
            { value: 'tide', label: 'Tide — teal current' }
          ]}
        />
        <label class="setting-label" htmlFor="background-animation">Animation</label>
        <Select
          id="background-animation"
          value={animation}
          options={[
            { value: 'veil', label: 'Veil — sine cloud drift' },
            { value: 'mist', label: 'Mist — open veil, quiet core' },
            { value: 'sanctum', label: 'Sanctum — gilded sheets' },
            { value: 'silk', label: 'Silk — flowing ribbons' },
            { value: 'halo', label: 'Halo — luminous fog sheets' },
            { value: 'ember', label: 'Ember — breathing glow' },
            { value: 'orbit', label: 'Orbit — woven dual currents' },
            { value: 'gossamer', label: 'Gossamer — thin films' },
            { value: 'meridian', label: 'Meridian — vertical dawn' },
            { value: 'bloom', label: 'Bloom — slow radial blossom' },
            { value: 'current', label: 'Current — horizontal drift' },
            { value: 'opal', label: 'Opal — quiet two-tone shift' },
            { value: 'zephyr', label: 'Zephyr — airy layered breeze' }
          ]}
        />
        <CheckBox checked={animated}>Animate background</CheckBox>
        <label class="setting-label" htmlFor="background-speed">Animation speed</label>
        <Select
          id="background-speed"
          value={speed}
          options={[
            { value: '.6', label: '0.6× — slow drift' },
            { value: '1', label: '1× — default' },
            { value: '1.5', label: '1.5× — brighter motion' }
          ]}
        />
        <label class="setting-label" htmlFor="background-intensity">Glow intensity</label>
        <Select
          id="background-intensity"
          value={intensity}
          options={[
            { value: '.85', label: '0.85× — default' },
            { value: '1.15', label: '1.15× — brighter' },
            { value: '1.55', label: '1.55× — vivid' }
          ]}
        />
        <label class="setting-label" htmlFor="background-overlay">Overlay veil</label>
        <Select
          id="background-overlay"
          value={overlayOpacity}
          options={[
            { value: '.14', label: '0.14 — airy' },
            { value: '.22', label: '0.22 — balanced' },
            { value: '.34', label: '0.34 — denser contrast' }
          ]}
        />
        <p class="playground-note">This preview runs the animated surface as a reusable component, with content layered above the effect.</p>
      </div>
    )
  }
}
