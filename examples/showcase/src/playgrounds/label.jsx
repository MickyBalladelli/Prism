import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function LabelPlayground() {
  const copy = signal('Always in focus')
  const size = signal('large')
  const font = signal('sans')
  const weight = signal('medium')
  const alwaysVisible = signal(true)
  const animation = signal('sanctum')
  const outlineColor = signal('#f3eee4')
  const backgroundColor = signal('#0a1020')
  const codePreview = createCodePreview(codeLines(
    'Background({',
    '  palette: "midnight",',
    '  animation,',
    '  minHeight: "22rem",',
    '  children: html`<div class="label-demo-stage">',
    '    ${Label({',
    '      size: "small",',
    '      alwaysVisible: true,',
    '      outlineColor,',
    '      backgroundColor,',
    '      children: "Over the motion"',
    '    })}',
    '    ${Label({',
    '      size,',
    '      font,',
    '      weight,',
    '      alwaysVisible,',
    '      outlineColor,',
    '      backgroundColor,',
    '      children: copy',
    '    })}',
    '    <p class="label-demo-copy">Tune the glyph fill and the character outline. There is no plate behind the type.</p>',
    '  </div>`',
    '})'
  ), { ...playgroundRuntime, copy, size, font, weight, alwaysVisible, animation, outlineColor, backgroundColor })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="label-copy">Copy</label>
        <TextField id="label-copy" value={copy} placeholder="Label copy" />
        <label class="setting-label" htmlFor="label-size">Size</label>
        <Select
          id="label-size"
          value={size}
          options={[
            { value: 'small', label: 'Small — caption' },
            { value: 'medium', label: 'Medium — body title' },
            { value: 'large', label: 'Large — section' },
            { value: 'display', label: 'Display — hero' }
          ]}
        />
        <label class="setting-label" htmlFor="label-font">Font</label>
        <Select
          id="label-font"
          value={font}
          options={[
            { value: 'sans', label: 'Sans — interface' },
            { value: 'serif', label: 'Serif — editorial' },
            { value: 'mono', label: 'Mono — technical' }
          ]}
        />
        <label class="setting-label" htmlFor="label-weight">Weight</label>
        <Select
          id="label-weight"
          value={weight}
          options={[
            { value: 'regular', label: 'Regular' },
            { value: 'medium', label: 'Medium' },
            { value: 'semibold', label: 'Semibold' },
            { value: 'bold', label: 'Bold' }
          ]}
        />
        <label class="setting-label" htmlFor="label-background-color">Character background</label>
        <Select
          id="label-background-color"
          value={backgroundColor}
          options={[
            { value: '#0a1020', label: 'Night — #0a1020' },
            { value: '#1d2638', label: 'Ink — #1d2638' },
            { value: '#f6f3ec', label: 'Ivory — #f6f3ec' },
            { value: '#3657d6', label: 'Prism blue — #3657d6' },
            { value: '#ef685a', label: 'Accent — #ef685a' }
          ]}
        />
        <TextField id="label-background-color-custom" value={backgroundColor} placeholder="#0a1020" />
        <label class="setting-label" htmlFor="label-outline-color">Character outline</label>
        <Select
          id="label-outline-color"
          value={outlineColor}
          options={[
            { value: '#f3eee4', label: 'Cream — #f3eee4' },
            { value: '#ffffff', label: 'White — #ffffff' },
            { value: '#0a1020', label: 'Night — #0a1020' },
            { value: '#7ac7ff', label: 'Glow — #7ac7ff' },
            { value: '#f2c14e', label: 'Gold — #f2c14e' }
          ]}
        />
        <TextField id="label-outline-color-custom" value={outlineColor} placeholder="#f3eee4" />
        <label class="setting-label" htmlFor="label-animation">Backdrop recipe</label>
        <Select
          id="label-animation"
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
        <CheckBox checked={alwaysVisible}>Always visible</CheckBox>
        <p class="playground-note">Character background fills the glyphs. Outline color strokes each letter. Always visible turns the outline on, with no box behind the type.</p>
      </div>
    )
  }
}
