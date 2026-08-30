import { computed, html, jsx, Fragment, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, SettingsIcon, SparkIcon, Table, TextField, TreeView, serializeTableSettings } from 'prism-ui'
import { ShowcaseShell } from '../showcase-shell.jsx'
import { compileJsx, jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

const componentInfo = {
  background: {
    eyebrow: 'Layout',
    title: 'Background',
    description: 'Shape a reusable animated backdrop with named motion recipes, dark palettes, and an overlay content slot.'
  },
  label: {
    eyebrow: 'Layout',
    title: 'Label',
    description: 'Set size, typeface, and weight, then outline each character so the words stay readable over any motion behind them.'
  },
  header: {
    eyebrow: 'Layout',
    title: 'Header',
    description: 'A sticky application bar with a leading slot and a trailing slot for tools like theme controls.'
  },
  box: {
    eyebrow: 'Layout',
    title: 'Box',
    description: 'Tune layout props and see the wrapper update live.'
  },
  'text-field': {
    eyebrow: 'Forms',
    title: 'TextField',
    description: 'Play with the value, placeholder, required, and disabled props.'
  },
  select: {
    eyebrow: 'Forms',
    title: 'Select',
    description: 'Choose one option from a list while keeping the selected value reactive.'
  },
  'check-box': {
    eyebrow: 'Forms',
    title: 'CheckBox',
    description: 'Change the label and toggle the reactive checked state.'
  },
  card: {
    eyebrow: 'Layout',
    title: 'Card',
    description: 'Explore semantic markup and the Card action area.'
  },
  button: {
    eyebrow: 'Forms',
    title: 'Button',
    description: 'Compose text and icons, choose their order, then tune size, shape, state, width, variant, and palette.'
  },
  badge: {
    eyebrow: 'Status',
    title: 'Badge',
    description: 'Show compact counts and states, with an optional pulse when a reactive value changes.'
  },
  pulse: {
    eyebrow: 'Status',
    title: 'Pulse',
    description: 'Tune a living status marker for healthy, informative, cautionary, and failing states.'
  },
  'tree-view': {
    eyebrow: 'Navigation',
    title: 'TreeView',
    description: 'Inspect nested navigation, active states, metadata chips, branch expansion, and custom item rendering.'
  },
  'code-viewer': {
    eyebrow: 'Data & Code',
    title: 'CodeViewer',
    description: 'Edit source directly, inspect syntax colors, and copy polished code from a live editor.'
  },
  table: {
    eyebrow: 'Data & Code',
    title: 'Table',
    description: 'Shape, search, sort, resize, reorder, select, export, paginate, and persist rich data.'
  },
  popup: {
    eyebrow: 'Overlay',
    title: 'Popup',
    description: 'Focus attention in an accessible dialog with flexible placement, sizing, content, and dismissal.'
  }
}

const createDetails = (visible, message) => computed(() => visible.value
  ? html`<p class="playground-note">${message}</p>`
  : null)

const codeLines = (...lines) => lines.join('\n')

const playgroundRuntime = {
  AlertIcon,
  Background,
  Badge,
  Box,
  Button,
  Card,
  CheckBox,
  CodeViewer,
  DownloadIcon,
  FileIcon,
  FolderIcon,
  Header,
  ImageIcon,
  Label,
  MoreHorizontalIcon,
  PlusIcon,
  Popup,
  Pulse,
  Select,
  SendIcon,
  SettingsIcon,
  SparkIcon,
  Table,
  TextField,
  TreeView,
  computed,
  html,
  signal
}

function createCodePreview(initialCode, scope = {}) {
  const javascript = signal(initialCode)
  let jsxSource = initialCode
  try {
    jsxSource = jsRecipeToJsx(initialCode)
  } catch {
    jsxSource = initialCode
  }
  const jsxCode = signal(jsxSource)
  const recipeLanguage = signal('jsx')

  // Showcase recipes are bundled trusted examples. Keep evaluation one-time so
  // text shown in the editor never becomes executable preview code.
  const preview = (() => {
    try {
      const names = Object.keys(scope)
      const values = Object.values(scope)
      const source = compileJsx(jsxSource)
      return Function('jsx', 'Fragment', ...names, `'use strict'; return (${source})`)(jsx, Fragment, ...values)
    } catch (error) {
      return html`<div class="playground-code-error"><strong>Preview paused</strong><span>${String(error?.message ?? error)}</span></div>`
    }
  })()

  return { javascript, jsxCode, recipeLanguage, preview, code: javascript }
}

function BackgroundPlayground() {
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

function LabelPlayground() {
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

function HeaderPlayground() {
  const title = signal('prism ui')
  const eyebrow = signal('Component explorer')
  const sticky = signal(true)
  const stickyTop = signal('0px')
  const showTrailing = signal(true)
  const trailingLabel = computed(() => showTrailing.value ? 'Theme model' : 'Hidden')
  const trailing = computed(() => showTrailing.value
    ? html`<span class="header-demo-chip">${trailingLabel}</span>`
    : null)
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="playground-header-frame">',
    '    ${Header({',
    '      sticky,',
    '      stickyTop,',
    '      trailing,',
    '      children: html`<span class="header-demo-brand"><strong>${title}</strong><small>${eyebrow}</small></span>`',
    '    })}',
    '    <article class="header-demo-panel"><strong>Scroll the preview</strong><span>The Header stays pinned to the top of this frame while the rest of the surface moves.</span></article>',
    '    <article class="header-demo-panel"><strong>Trailing slot</strong><span>Put tools, theme pickers, or actions in trailing. The bar stays readable over motion.</span></article>',
    '    <article class="header-demo-panel"><strong>App chrome</strong><span>This is the same Header used at the top of the showcase.</span></article>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, Header, title, eyebrow, sticky, stickyTop, trailing, trailingLabel })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="header-title">Title</label>
        <TextField id="header-title" value={title} placeholder="Title" />
        <label class="setting-label" htmlFor="header-eyebrow">Eyebrow</label>
        <TextField id="header-eyebrow" value={eyebrow} placeholder="Eyebrow" />
        <CheckBox checked={sticky}>Sticky to top</CheckBox>
        <label class="setting-label" htmlFor="header-sticky-top">Sticky top</label>
        <Select
          id="header-sticky-top"
          value={stickyTop}
          options={[
            { value: '0px', label: '0px — flush to top' },
            { value: '.75rem', label: '.75rem — compact offset' },
            { value: '1.5rem', label: '1.5rem — roomy offset' }
          ]}
        />
        <CheckBox checked={showTrailing}>Show trailing slot</CheckBox>
        <p class="playground-note">Sticky is on by default. Scroll the live preview to keep the bar in view.</p>
      </div>
    )
  }
}

function BoxPlayground() {
  const content = signal('Live Box content')
  const tone = signal('lavender')
  const density = signal('comfortable')
  const showRole = signal(false)
  const sticky = signal(false)
  const stickyTop = signal('1rem')
  const boxClass = computed(() => `playground-box ${tone.value} ${density.value}`)
  const boxRole = computed(() => showRole.value ? 'region' : undefined)
  const stickyState = computed(() => sticky.value ? 'Sticky inside parent' : 'Static flow')
  const stickySections = [
    { title: 'Signals stay in reach', copy: 'Sticky keeps an important surface visible while the parent continues to scroll.' },
    { title: 'Parent bounds still win', copy: 'The Box remains pinned only until this preview container reaches its end.' },
    { title: 'Top offset is configurable', copy: 'Use stickyTop when you need breathing room below a header or toolbar.' },
    { title: 'Layout still looks normal', copy: 'This is still just a Box. Sticky is additive, so class and role keep working.' }
  ]
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="playground-box-frame">',
    '    <div class="playground-box-stack">',
    '      ${Box({',
    '        class: boxClass,',
    '        role: boxRole,',
    '        sticky,',
    '        stickyTop,',
    '        children: [',
    '          html`<span class="playground-box-status">${stickyState}</span>`,',
    '          html`<strong>${content}</strong>`,',
    '          html`<span>Scroll this preview to test sticky layout inside a bounded parent.</span>`',
    '        ]',
    '      })}',
    '      ${stickySections.map(section => html`<article class="playground-box-block"><strong>${section.title}</strong><span>${section.copy}</span></article>`)}',
    '    </div>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, boxClass, boxRole, content, sticky, stickyTop, stickySections, stickyState })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="box-content">Content</label>
        <TextField id="box-content" value={content} placeholder="Box content" />
        <label class="setting-label" htmlFor="box-tone">Tone</label>
        <Select
          id="box-tone"
          value={tone}
          options={[
            { value: 'lavender', label: 'Lavender' },
            { value: 'mint', label: 'Mint' },
            { value: 'peach', label: 'Peach' }
          ]}
        />
        <label class="setting-label" htmlFor="box-density">Density</label>
        <Select
          id="box-density"
          value={density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'airy', label: 'Airy' }
          ]}
        />
        <CheckBox checked={showRole}>Add role="region"</CheckBox>
        <CheckBox checked={sticky}>Enable sticky</CheckBox>
        <label class="setting-label" htmlFor="box-sticky-top">Sticky top</label>
        <Select
          id="box-sticky-top"
          value={stickyTop}
          options={[
            { value: '0px', label: '0px — flush to top' },
            { value: '.75rem', label: '.75rem — compact offset' },
            { value: '1rem', label: '1rem — default offset' },
            { value: '1.5rem', label: '1.5rem — roomy offset' }
          ]}
        />
        <p class="playground-note">Turn on sticky, then scroll inside the live preview to see the Box stay pinned within its parent.</p>
      </div>
    )
  }
}

function TextFieldPlayground() {
  const value = signal('Ada Lovelace')
  const required = signal(false)
  const disabled = signal(false)
  const size = signal('medium')
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="field-playground">',
    '    ${TextField({ value, placeholder: "Type your name", required, disabled, size })}',
    '    <p class="playground-note">Current value: <strong>${value}</strong></p>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, value, required, disabled, size })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="field-size">Size</label>
        <Select
          id="field-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <CheckBox checked={required}>Required</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}

function SelectPlayground() {
  const value = signal('spirited-away')
  const size = signal('medium')
  const placement = signal('bottom')
  const renderMode = signal('text')
  const options = [
    { value: 'spirited-away', label: 'Spirited Away' },
    { value: 'moonlight', label: 'Moonlight' },
    { value: 'midsommar', label: 'Midsommar' },
    { value: 'mulholland-drive', label: 'Mulholland Drive' },
    { value: 'parasite', label: 'Parasite' },
    { value: 'arrival', label: 'Arrival' },
    { value: 'grand-budapest-hotel', label: 'The Grand Budapest Hotel' }
  ]
  const movieDetails = {
    'spirited-away': { year: '2001', genre: 'Fantasy', rating: '8.6', icon: SparkIcon, poster: 'coral' },
    moonlight: { year: '2016', genre: 'Drama', rating: '7.4', icon: ClockIcon, poster: 'violet' },
    midsommar: { year: '2019', genre: 'Folk horror', rating: '7.1', icon: SparkIcon, poster: 'gold' },
    'mulholland-drive': { year: '2001', genre: 'Mystery', rating: '7.9', icon: ImageIcon, poster: 'blue' },
    parasite: { year: '2019', genre: 'Thriller', rating: '8.5', icon: AlertIcon, poster: 'gold' },
    arrival: { year: '2016', genre: 'Sci-Fi', rating: '7.9', icon: ImageIcon, poster: 'blue' },
    'grand-budapest-hotel': { year: '2014', genre: 'Comedy', rating: '8.1', icon: SparkIcon, poster: 'peach' }
  }
  const selectedLabel = computed(() => options.find(option => option.value === value.value)?.label ?? 'Nothing selected')
  const renderModeLabel = computed(() => ({
    text: 'Text',
    'icon-text': 'Icon + Text',
    'film-card': 'Film card'
  }[renderMode.value] ?? 'Text'))
  const renderMovieOption = option => {
    if (renderMode.value === 'text') {
      return option.label
    }

    const details = movieDetails[option.value] ?? movieDetails.arrival
    const Icon = details.icon

    if (renderMode.value === 'film-card') {
      return html`<span class="select-film-option"><span class="select-film-poster select-film-poster-${details.poster}" aria-hidden="true">${Icon({ size: '1.05em' })}</span><span class="select-film-copy"><span class="select-film-title">${option.label}</span><span class="select-film-meta">${details.year} · ${details.genre}</span></span><span class="select-film-rating">★ ${details.rating}</span></span>`
    }

    return html`<span class="select-rendered-option">${Icon({ class: 'select-rendered-icon', size: '1em' })}<span>${option.label}</span></span>`
  }
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="select-playground">',
    '    <div class="select-demo-card">',
    '      <p class="select-demo-label">Movie night</p>',
    '      ${Select({ value, options, size, placement, onRender: renderMovieOption })}',
    '      <p class="playground-note">Selected movie: <strong>${selectedLabel}</strong></p>',
    '      <p class="playground-note">Option rendering: <strong>${renderModeLabel}</strong></p>',
    '    </div>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, value, options, size, placement, renderMovieOption, selectedLabel, renderModeLabel })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="select-size">Size</label>
        <Select
          id="select-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <label class="setting-label" htmlFor="select-placement">Menu placement</label>
        <Select
          id="select-placement"
          value={placement}
          options={[
            { value: 'bottom', label: 'Bottom — default' },
            { value: 'top', label: 'Top' },
            { value: 'right', label: 'Right' },
            { value: 'left', label: 'Left' }
          ]}
        />
        <label class="setting-label" htmlFor="select-render-mode">Custom option rendering</label>
        <Select
          id="select-render-mode"
          value={renderMode}
          options={[
            { value: 'text', label: 'Text' },
            { value: 'icon-text', label: 'Icon + Text' },
            { value: 'film-card', label: 'Film card' }
          ]}
        />
        <p class="playground-note">The live movie Select uses <code>onRender</code> to follow this choice.</p>
        <p class="playground-note">Keyboard: ↑↓ move, type a letter to cycle, Enter accepts.</p>
      </div>
    )
  }
}

function CheckBoxPlayground() {
  const checked = signal(true)
  const disabled = signal(false)
  const label = signal('Send me design updates')
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="checkbox-playground">',
    '    ${CheckBox({ checked, disabled, children: label })}',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, checked, disabled, label })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="checkbox-label">Label</label>
        <TextField id="checkbox-label" value={label} placeholder="Checkbox label" />
        <CheckBox checked={checked}>Checked</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
      </div>
    )
  }
}

function CardPlayground() {
  const actionLabel = signal('Open content')
  const actionDisabled = signal(false)
  const showRole = signal(false)
  const clickCount = signal(0)
  const cardRole = computed(() => showRole.value ? 'region' : undefined)
  const codePreview = createCodePreview(codeLines(
    'Card({',
    '  class: "interactive-card",',
    '  role: cardRole,',
    '  actions: Button({',
    '    class: "card-action",',
    '    disabled: actionDisabled,',
    '    onClick: () => clickCount.update(value => value + 1),',
    '    children: actionLabel',
    '  }),',
    '  children: html`<p class="eyebrow">Interactive Card</p><h3>Card content</h3><p class="card-copy">This Card has a configurable action area.</p><p class="playground-note">Action clicks: <strong>${clickCount}</strong></p>`',
    '})'
  ), { ...playgroundRuntime, actionLabel, actionDisabled, clickCount, cardRole })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="card-action-label">Action label</label>
        <TextField id="card-action-label" value={actionLabel} placeholder="Action label" />
        <CheckBox checked={actionDisabled}>Disable action</CheckBox>
        <CheckBox checked={showRole}>Add role="region"</CheckBox>
      </div>
    )
  }
}

function ButtonPlayground() {
  const label = signal('Launch project')
  const showLabel = signal(true)
  const iconName = signal('spark')
  const iconPosition = signal('start')
  const variant = signal('primary')
  const size = signal('large')
  const shape = signal('rounded')
  const fullWidth = signal(false)
  const loading = signal(false)
  const loadingLabel = signal('Launching project')
  const pressed = signal(false)
  const disabled = signal(false)
  const ariaLabel = signal('Launch project')
  const palette = signal('cobalt')
  const clickCount = signal(0)
  const buttonIcons = {
    spark: SparkIcon,
    plus: PlusIcon,
    send: SendIcon,
    download: DownloadIcon,
    settings: SettingsIcon
  }
  const buttonIcon = computed(() => {
    const Icon = buttonIcons[iconName.value]
    return Icon ? Icon({ size: '1em' }) : undefined
  })
  const variantName = computed(() => ({
    primary: 'Primary',
    secondary: 'Secondary',
    tertiary: 'Tertiary',
    error: 'Error',
    warning: 'Warning',
    information: 'Information',
    success: 'Success'
  })[variant.value] || 'Primary')
  const iconNameLabel = computed(() => ({
    none: 'No icon',
    spark: 'Spark',
    plus: 'Plus',
    send: 'Send',
    download: 'Download',
    settings: 'Settings'
  })[iconName.value] || 'No icon')

  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="button-playground" data-prism-palette="${palette}">',
    '    <section class="button-composer">',
    '      <div class="button-composer-head">',
    '        <div>',
    '          <p class="button-group-label">Live composition</p>',
    '          <h3>One button, every voice.</h3>',
    '          <p>Remove the text, move the icon, or turn the action into a loading state.</p>',
    '        </div>',
    '        <span class="button-click-count"><strong>${clickCount}</strong> clicks</span>',
    '      </div>',
    '      <div class="button-demo-well">',
    '        ${Button({',
    '          class: "button-live-example",',
    '          label,',
    '          showLabel,',
    '          icon: buttonIcon,',
    '          iconPosition,',
    '          variant,',
    '          size,',
    '          shape,',
    '          fullWidth,',
    '          loading,',
    '          loadingLabel,',
    '          pressed,',
    '          disabled,',
    '          ariaLabel,',
    '          onClick: () => clickCount.update(value => value + 1)',
    '        })}',
    '      </div>',
    '      <div class="button-composer-meta" aria-label="Current button configuration">',
    '        <span>${variantName}</span>',
    '        <span>${size}</span>',
    '        <span>${shape}</span>',
    '        <span>${iconNameLabel}</span>',
    '      </div>',
    '      <div class="button-recipe-shelf">',
    '        <p class="button-group-label">Composition recipes</p>',
    '        <div class="button-recipe-row" role="group" aria-label="Button composition examples">',
    '          ${Button({ variant: "secondary", size: "small", label: "Text only" })}',
    '          ${Button({ variant: "tertiary", size: "small", label: "Create", icon: PlusIcon({ size: "1em" }) })}',
    '          ${Button({ variant: "information", size: "small", label: "Send", icon: SendIcon({ size: "1em" }), iconPosition: "end" })}',
    '          ${Button({ variant: "secondary", size: "small", shape: "pill", label: "Settings", showLabel: false, icon: SettingsIcon({ size: "1em" }), ariaLabel: "Settings" })}',
    '        </div>',
    '      </div>',
    '    </section>',
    '  </div>',
    '`'
  ), {
    ...playgroundRuntime,
    ariaLabel,
    buttonIcon,
    clickCount,
    disabled,
    fullWidth,
    iconNameLabel,
    iconPosition,
    label,
    loading,
    loadingLabel,
    palette,
    pressed,
    shape,
    showLabel,
    size,
    variant,
    variantName
  })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="button-label">Label</label>
        <TextField id="button-label" value={label} placeholder="Button label" />
        <CheckBox checked={showLabel}>Show label</CheckBox>
        <label class="setting-label" htmlFor="button-icon">Icon</label>
        <Select
          id="button-icon"
          value={iconName}
          options={[
            { value: 'none', label: 'No icon' },
            { value: 'spark', label: 'Spark' },
            { value: 'plus', label: 'Plus' },
            { value: 'send', label: 'Send' },
            { value: 'download', label: 'Download' },
            { value: 'settings', label: 'Settings' }
          ]}
        />
        <label class="setting-label" htmlFor="button-icon-position">Icon position</label>
        <Select
          id="button-icon-position"
          value={iconPosition}
          options={[
            { value: 'start', label: 'Start' },
            { value: 'end', label: 'End' }
          ]}
        />
        <label class="setting-label" htmlFor="button-variant">Variant</label>
        <Select
          id="button-variant"
          value={variant}
          options={[
            { value: 'primary', label: 'Primary' },
            { value: 'secondary', label: 'Secondary' },
            { value: 'tertiary', label: 'Tertiary' },
            { value: 'success', label: 'Success' },
            { value: 'information', label: 'Information' },
            { value: 'warning', label: 'Warning' },
            { value: 'error', label: 'Error' }
          ]}
        />
        <label class="setting-label" htmlFor="button-size">Size</label>
        <Select
          id="button-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
        <label class="setting-label" htmlFor="button-shape">Shape</label>
        <Select
          id="button-shape"
          value={shape}
          options={[
            { value: 'rounded', label: 'Rounded' },
            { value: 'pill', label: 'Pill' },
            { value: 'square', label: 'Square' }
          ]}
        />
        <label class="setting-label" htmlFor="button-aria-label">Accessible label</label>
        <TextField id="button-aria-label" value={ariaLabel} placeholder="Required for icon-only buttons" />
        <label class="setting-label" htmlFor="button-loading-label">Loading label</label>
        <TextField id="button-loading-label" value={loadingLabel} placeholder="Loading" />
        <CheckBox checked={fullWidth}>Full width</CheckBox>
        <CheckBox checked={loading}>Loading</CheckBox>
        <CheckBox checked={pressed}>Pressed</CheckBox>
        <CheckBox checked={disabled}>Disabled</CheckBox>
        <p class="setting-label button-palette-label">Palette</p>
        <div class="button-palette-selector" role="group" aria-label="Button palette selector">
          <button
            type="button"
            class="button-palette-option button-palette-option-cobalt"
            data-selected={computed(() => palette.value === 'cobalt' ? 'true' : 'false')}
            onClick={() => palette.value = 'cobalt'}
          >
            <span class="button-palette-option-name">Cobalt</span>
            <span class="button-palette-swatches" aria-hidden="true">
              <span class="button-palette-swatch button-palette-swatch-primary"></span>
              <span class="button-palette-swatch button-palette-swatch-secondary"></span>
              <span class="button-palette-swatch button-palette-swatch-tertiary"></span>
            </span>
          </button>
          <button
            type="button"
            class="button-palette-option button-palette-option-iris"
            data-selected={computed(() => palette.value === 'iris' ? 'true' : 'false')}
            onClick={() => palette.value = 'iris'}
          >
            <span class="button-palette-option-name">Iris</span>
            <span class="button-palette-swatches" aria-hidden="true">
              <span class="button-palette-swatch button-palette-swatch-primary"></span>
              <span class="button-palette-swatch button-palette-swatch-secondary"></span>
              <span class="button-palette-swatch button-palette-swatch-tertiary"></span>
            </span>
          </button>
          <button
            type="button"
            class="button-palette-option button-palette-option-teal"
            data-selected={computed(() => palette.value === 'teal' ? 'true' : 'false')}
            onClick={() => palette.value = 'teal'}
          >
            <span class="button-palette-option-name">Teal</span>
            <span class="button-palette-swatches" aria-hidden="true">
              <span class="button-palette-swatch button-palette-swatch-primary"></span>
              <span class="button-palette-swatch button-palette-swatch-secondary"></span>
              <span class="button-palette-swatch button-palette-swatch-tertiary"></span>
            </span>
          </button>
        </div>
      </div>
    )
  }
}

function BadgePlayground() {
  const count = signal(12)
  const tone = signal('info')
  const size = signal('large')
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="badge-playground">',
    '    <div class="badge-live-card">',
    '      <div class="badge-live-copy">',
    '        <p class="badge-mode-label">Reactive count</p>',
    '        <p class="badge-live-title">Unread messages</p>',
    '        <p class="badge-live-description">Change the number to see the badge respond.</p>',
    '      </div>',
    '      <span class="badge-value-slot">${Badge({ value: count, tone, size, pulseOnChange: true })}</span>',
    '      ${Button({ variant: "secondary", onClick: () => count.update(value => value + 1), children: "Add message" })}',
    '    </div>',
    '    <div class="badge-variant-strip" role="group" aria-label="Badge tone examples">',
    '      ${Badge({ tone: "neutral", children: "Neutral" })}',
    '      ${Badge({ tone: "success", children: "Ready" })}',
    '      ${Badge({ tone: "info", children: "Info" })}',
    '      ${Badge({ tone: "warning", children: "Review" })}',
    '      ${Badge({ tone: "error", children: "Alert" })}',
    '    </div>',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, count, tone, size })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="badge-tone">Tone</label>
        <Select
          id="badge-tone"
          value={tone}
          options={[
            { value: 'neutral', label: 'Neutral' },
            { value: 'success', label: 'Success' },
            { value: 'info', label: 'Info' },
            { value: 'warning', label: 'Warning' },
            { value: 'error', label: 'Error' }
          ]}
        />
        <label class="setting-label" htmlFor="badge-size">Size</label>
        <Select
          id="badge-size"
          value={size}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ]}
        />
      </div>
    )
  }
}

function PulsePlayground() {
  const size = signal('large')
  const oncePulseTrigger = signal(0)
  const oncePulse = computed(() => {
    oncePulseTrigger.value
    return <Pulse status="success" animation="once" size={size}>Connected</Pulse>
  })
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
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
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

function PopupPlayground() {
  const popupOpen = signal(false)
  const popupSize = signal('medium')
  const popupPlacement = signal('center')
  const closeOnBackdrop = signal(true)
  const closeOnEscape = signal(true)
  const showClose = signal(true)
  const lastClose = signal('Not closed yet')
  const popupContent = html`
    <div class="popup-demo-content">
      <span class="popup-demo-orbit" aria-hidden="true">${SparkIcon({ size: '1.25em' })}</span>
      <div><p>Launch sequence</p><h3>Your new workspace is ready.</h3></div>
      <p>Invite the crew now, or keep exploring and share it when everything feels right.</p>
      <div class="popup-demo-stats">
        <span><strong>12</strong><small>components</small></span>
        <span><strong>5</strong><small>themes</small></span>
        <span><strong>∞</strong><small>possibilities</small></span>
      </div>
    </div>
  `
  const popupFooter = ({ close }) => html`
    ${Button({ variant: 'secondary', onClick: event => close('maybe-later', event), children: 'Maybe later' })}
    ${Button({ onClick: event => close('invite-crew', event), children: 'Invite the crew' })}
  `
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="popup-playground">',
    '    ${Button({ onClick: () => popupOpen.value = true, children: "Open Popup" })}',
    '    <p class="playground-note">Last dismissal: <strong>${lastClose}</strong></p>',
    '    ${Popup({',
    '      open: popupOpen,',
    '      eyebrow: "Ready to launch",',
    '      title: "A bright new beginning",',
    '      ariaDescription: "Review this workspace before inviting collaborators.",',
    '      size: popupSize,',
    '      placement: popupPlacement,',
    '      closeOnBackdrop,',
    '      closeOnEscape,',
    '      showClose,',
    '      children: popupContent,',
    '      footer: popupFooter,',
    '      onClose: reason => lastClose.value = reason',
    '    })}',
    '  </div>',
    '`'
  ), {
    ...playgroundRuntime,
    popupOpen,
    popupSize,
    popupPlacement,
    closeOnBackdrop,
    closeOnEscape,
    showClose,
    popupContent,
    popupFooter,
    lastClose
  })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="popup-size">Size</label>
        <Select
          id="popup-size"
          value={popupSize}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'full', label: 'Full' }
          ]}
        />
        <label class="setting-label" htmlFor="popup-placement">Placement</label>
        <Select
          id="popup-placement"
          value={popupPlacement}
          options={[
            { value: 'center', label: 'Center' },
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' }
          ]}
        />
        <CheckBox checked={showClose}>Show close button</CheckBox>
        <CheckBox checked={closeOnBackdrop}>Close on backdrop</CheckBox>
        <CheckBox checked={closeOnEscape}>Close with Escape</CheckBox>
        <Button onClick={() => popupOpen.value = true}>Open Popup</Button>
        <p class="playground-note">Tab stays inside the Popup. Closing restores focus to the button that opened it.</p>
      </div>
    )
  }
}

function TablePlayground() {
  const density = signal('comfortable')
  const pageSize = signal(5)
  const striped = signal(false)
  const loading = signal(false)
  const selectedCount = signal(0)
  const settingsPreviewOpen = signal(false)
  const settingsSerialized = signal(serializeTableSettings({
    version: 1,
    columnOrder: ['creator', 'campaign', 'status', 'audience', 'momentum', 'revenue', 'tier', 'actions'],
    columnWidths: {},
    hiddenColumns: [],
    pinnedColumns: { creator: 'left' },
    sort: null,
    pageSize: 5,
    density: 'comfortable'
  }))
  const creators = [
    ['Maya Chen', '@mayamakes', 'MC', 'lilac'],
    ['Noah Williams', '@noahframes', 'NW', 'cyan'],
    ['Inez Laurent', '@inezstudio', 'IL', 'coral'],
    ['Leo Okafor', '@leoafterdark', 'LO', 'lime'],
    ['Sofia Reyes', '@sofiawanders', 'SR', 'gold'],
    ['Arlo Kim', '@arlokinetic', 'AK', 'blue'],
    ['Nia Morgan', '@niainmotion', 'NM', 'rose'],
    ['Theo Martin', '@theomakes', 'TM', 'violet']
  ]
  const campaigns = [
    ['Afterglow', 'Beauty', 'sunset'],
    ['Future Form', 'Technology', 'electric'],
    ['Wild Current', 'Travel', 'ocean'],
    ['Midnight Run', 'Fashion', 'midnight'],
    ['Sunday Club', 'Lifestyle', 'citrus'],
    ['Soft Geometry', 'Design', 'violet']
  ]
  const statuses = ['Live', 'Live', 'Review', 'Scheduled', 'Draft']
  const tableRows = Array.from({ length: 24 }, (_, index) => {
    const creator = creators[index % creators.length]
    const campaign = campaigns[index % campaigns.length]
    const momentum = 56 + (index * 17) % 43
    return {
      id: `campaign-${index + 1}`,
      creator: { name: creator[0], handle: creator[1], initials: creator[2], tone: creator[3] },
      campaign: { name: campaign[0], category: campaign[1], artwork: campaign[2] },
      status: statuses[index % statuses.length],
      audience: 18400 + index * 7350 + index % 3 * 2900,
      momentum,
      trend: Array.from({ length: 8 }, (_, point) => 22 + (momentum + point * 13 + index * 7) % 74),
      revenue: 2860 + index * 1375,
      tier: index % 5 === 0 ? 'Spotlight' : index % 3 === 0 ? 'Rising' : 'Core'
    }
  })
  const statusTone = {
    Live: 'success',
    Review: 'warning',
    Scheduled: 'info',
    Draft: 'off'
  }
  const tierTone = {
    Spotlight: 'warning',
    Rising: 'info',
    Core: 'neutral'
  }
  const compactNumber = value => new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
  const money = value => new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  const renderCreator = creator => html`
    <span class="table-creator">
      <span class="table-avatar" data-tone="${creator.tone}">${creator.initials}</span>
      <span class="table-primary-copy"><strong>${creator.name}</strong><small>${creator.handle}</small></span>
    </span>
  `
  const renderCampaign = campaign => html`
    <span class="table-campaign">
      <span class="table-artwork" data-artwork="${campaign.artwork}" aria-hidden="true"><i></i><i></i></span>
      <span class="table-primary-copy"><strong>${campaign.name}</strong><small>${campaign.category}</small></span>
    </span>
  `
  const renderStatus = status => Pulse({
    status: statusTone[status],
    size: 'small',
    animation: status === 'Live' ? 'continuous' : 'once',
    children: status
  })
  const renderMomentum = (value, row) => html`
    <span class="table-momentum">
      <span class="table-sparkline" aria-hidden="true">${row.trend.map(point => html`<i style="height: ${point}%"></i>`)}</span>
      <strong>${value}%</strong>
    </span>
  `
  const tableColumns = [
    { key: 'creator', header: 'Creator', width: 220, minWidth: 190, pinned: 'left', render: renderCreator },
    { key: 'campaign', header: 'Campaign', width: 205, minWidth: 175, render: renderCampaign },
    { key: 'status', header: 'Status', width: 132, render: renderStatus },
    { key: 'audience', header: 'Audience', width: 120, align: 'end', render: compactNumber },
    { key: 'momentum', header: 'Momentum', width: 178, compare: (left, right) => left - right, render: renderMomentum },
    { key: 'revenue', header: 'Revenue', width: 135, align: 'end', render: money },
    {
      key: 'tier',
      header: 'Tier',
      width: 108,
      align: 'center',
      render: value => Badge({ value, tone: tierTone[value], size: 'small' })
    },
    {
      key: 'actions',
      header: '',
      width: 64,
      minWidth: 56,
      maxWidth: 80,
      align: 'center',
      sortable: false,
      searchable: false,
      exportable: false,
      hideable: false,
      render: (_value, row) => html`<button type="button" class="table-row-action" aria-label="Actions for ${row.creator.name}">${MoreHorizontalIcon({ size: '1em' })}</button>`
    }
  ]
  const updateSettings = (_settings, serialized) => settingsSerialized.value = serialized
  const settingsPopup = Popup({
    open: settingsPreviewOpen,
    eyebrow: 'Portable table state',
    title: 'Serialized settings',
    ariaDescription: 'Copy this JSON to restore the same table layout later.',
    size: 'large',
    class: 'table-settings-popup',
    children: CodeViewer({
      code: settingsSerialized,
      language: 'json',
      filename: 'table-settings.json',
      editable: false,
      copyable: true,
      lineNumbers: true,
      ariaLabel: 'Serialized table settings JSON'
    })
  })
  const codePreview = createCodePreview(codeLines(
    'Table({',
    '  class: "creator-table",',
    '  title: "Creator pulse",',
    '  description: "24 campaigns · live performance",',
    '  rows: tableRows,',
    '  columns: tableColumns,',
    '  density,',
    '  pageSize,',
    '  pageSizeOptions: [5, 10, 20, "all"],',
    '  striped,',
    '  loading,',
    '  selectable: true,',
    '  exportable: true,',
    '  storageKey: "prism-creator-table",',
    '  onSelectionChange: keys => selectedCount.value = keys.length,',
    '  onSettingsChange: updateSettings',
    '})'
  ), {
    ...playgroundRuntime,
    tableRows,
    tableColumns,
    density,
    pageSize,
    striped,
    loading,
    selectedCount,
    updateSettings
  })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="table-density">Density</label>
        <Select
          id="table-density"
          value={density}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'spacious', label: 'Spacious' }
          ]}
        />
        <label class="setting-label" htmlFor="table-page-size">Rows per page</label>
        <Select
          id="table-page-size"
          value={pageSize}
          options={[
            { value: 5, label: '5 rows' },
            { value: 10, label: '10 rows' },
            { value: 20, label: '20 rows' },
            { value: 'all', label: 'Max — all rows' }
          ]}
        />
        <CheckBox checked={striped}>Striped rows</CheckBox>
        <CheckBox checked={loading}>Loading skeleton</CheckBox>
        <p class="playground-note">Selected rows: <strong>{selectedCount}</strong></p>
        <Button variant="secondary" onClick={() => settingsPreviewOpen.value = true}>View settings JSON</Button>
        {settingsPopup}
        <p class="playground-note">Drag column headers to reorder. Drag their right edge to resize. The gear controls visibility, pinning, order, density, copy, and reset.</p>
      </div>
    )
  }
}

function CodeViewerPlayground() {
  const language = signal('javascript')
  const showLineNumbers = signal(true)
  const sampleCode = signal(codeLines(
    'const status = "ready"',
    '',
    'function announce(message) {',
    '  return `${message} · ${status}`',
    '}',
    '',
    'announce("Prism is live")'
  ))
  const codePreview = createCodePreview(codeLines(
    'CodeViewer({',
    '  code: sampleCode,',
    '  language,',
    '  filename: "status.js",',
    '  lineNumbers: showLineNumbers,',
    '  copyable: true,',
    '  syntaxColors: {',
    '    keyword: "#a8b5ff",',
    '    string: "#9ee4bf",',
    '    function: "#8bd9ff"',
    '  }',
    '})'
  ), { ...playgroundRuntime, sampleCode, language, showLineNumbers })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="code-viewer-language">Language</label>
        <Select
          id="code-viewer-language"
          value={language}
          options={[
            { value: 'javascript', label: 'JavaScript' },
            { value: 'jsx', label: 'JSX' },
            { value: 'css', label: 'CSS' },
            { value: 'json', label: 'JSON' },
            { value: 'bash', label: 'Bash' }
          ]}
        />
        <CheckBox checked={showLineNumbers}>Show line numbers</CheckBox>
        <p class="playground-note">Edit the nested editor to change its displayed source. Use the controls to change how CodeViewer is configured.</p>
      </div>
    )
  }
}

function TreeViewPlayground() {
  const showMeta = signal(true)
  const expanded = signal(true)
  const renderMode = signal('text')
  const itemVariant = signal('minimal')
  const selectedItem = signal('Button')

  const items = computed(() => {
    const leaf = (label, details = {}) => ({
      ...details,
      label,
      active: selectedItem.value === label,
      onClick: () => {
        selectedItem.value = label
      }
    })

    const branch = (label, details = {}) => ({
      ...details,
      label,
      active: selectedItem.value === label
    })

    return [
      leaf('Overview', {
        meta: showMeta.value ? 'Home' : undefined
      }),
      branch('Components', {
        expanded: expanded.value,
        meta: showMeta.value ? '7' : undefined,
        children: [
          branch('Layout', {
            expanded: expanded.value,
            meta: showMeta.value ? '2' : undefined,
            children: [leaf('Box'), leaf('Card')]
          }),
          branch('Forms', {
            expanded: expanded.value,
            meta: showMeta.value ? '4' : undefined,
            children: [leaf('TextField'), leaf('Select'), leaf('CheckBox'), leaf('Button')]
          }),
          branch('Navigation', {
            expanded: expanded.value,
            meta: showMeta.value ? '1' : undefined,
            children: [leaf('TreeView')]
          })
        ]
      })
    ]
  })

  const renderTreeItem = (item, context) => {
    if (renderMode.value === 'text') {
      return item.label
    }

    const Icon = context.type === 'branch' ? FolderIcon : FileIcon
    const icon = Icon({ size: '1.05em' })

    if (renderMode.value === 'icon-text') {
      return html`<span class="tree-rendered-copy"><span class="tree-rendered-icon" aria-hidden="true">${icon}</span><span>${item.label}</span></span>`
    }

    const detail = context.type === 'branch'
      ? `${item.children?.length ?? 0} items`
      : 'Component'

    return html`<span class="tree-rendered-rich"><span class="tree-rendered-icon" aria-hidden="true">${icon}</span><span class="tree-rendered-rich-copy"><strong>${item.label}</strong><small>${detail}</small></span></span>`
  }
  const codePreview = createCodePreview(codeLines(
    'TreeView({',
    '  class: "component-tree-preview",',
    '  ariaLabel: "Tree view playground",',
    '  items,',
    '  model,',
    '  itemVariant,',
    '  onRender: renderTreeItem',
    '})'
  ), { ...playgroundRuntime, items, model: showcaseThemeModel, itemVariant, renderTreeItem })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="tree-item-variant">Item treatment</label>
        <Select
          id="tree-item-variant"
          value={itemVariant}
          options={[
            { value: 'minimal', label: 'Minimal — best for dense trees' },
            { value: 'framed', label: 'Framed — stronger separation' }
          ]}
        />
        <label class="setting-label" htmlFor="tree-render-mode">Custom item rendering</label>
        <Select
          id="tree-render-mode"
          value={renderMode}
          options={[
            { value: 'text', label: 'Text' },
            { value: 'icon-text', label: 'Icon + Text' },
            { value: 'rich', label: 'Rich row' }
          ]}
        />
        <CheckBox checked={showMeta}>Show metadata chips</CheckBox>
        <CheckBox checked={expanded}>Expand sections</CheckBox>
        <p class="playground-note">Selected item: <strong>{selectedItem}</strong></p>
        <p class="playground-note">Keyboard: ↑↓ move, type a letter to cycle, ←→ open or close, Enter or Space activates.</p>
      </div>
    )
  }
}

const playgrounds = {
  background: BackgroundPlayground,
  label: LabelPlayground,
  header: HeaderPlayground,
  box: BoxPlayground,
  'text-field': TextFieldPlayground,
  select: SelectPlayground,
  'check-box': CheckBoxPlayground,
  card: CardPlayground,
  button: ButtonPlayground,
  badge: BadgePlayground,
  pulse: PulsePlayground,
  popup: PopupPlayground,
  table: TablePlayground,
  'code-viewer': CodeViewerPlayground,
  'tree-view': TreeViewPlayground
}

export function ComponentPage({ name, link }) {
  const info = componentInfo[name]
  const createPlayground = playgrounds[name]

  if (!info || !createPlayground) {
    return (
      <ShowcaseShell link={link}>
        <main class="app-shell empty-page">
          <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
          <h1>Component not found</h1>
          <p class="hero-copy">Prism does not have a page for this component yet.</p>
        </main>
      </ShowcaseShell>
    )
  }

  const playground = createPlayground()

  return (
    <ShowcaseShell activeKey={name} link={link}>
      <main class="app-shell detail-page">
        <a class="back-link" href="/" onClick={link('/')}>← Back to components</a>
        <header class="detail-header">
          <p class="eyebrow">{info.eyebrow}</p>
          <h1>{info.title}</h1>
          <p class="hero-copy">{info.description}</p>
        </header>

        <section class={`detail-layout detail-layout-${name}`} aria-label={`${info.title} playground`}>
          <Card class="detail-stage">
            <div class="stage-heading">
              <div>
                <p class="eyebrow">Live preview</p>
                <h2>{info.title} in action</h2>
              </div>
              <span class="live-dot">Live</span>
            </div>
            <div class="preview-surface">
              {playground.preview}
            </div>
          </Card>

          <Box class="detail-settings-rail">
            <Card class="settings-card">
              <p class="eyebrow">Props & settings</p>
              <h2>Play with it</h2>
              <p class="settings-copy">Change a setting. Preview updates instantly.</p>
              {playground.controls}
            </Card>
          </Box>

          <Card class="detail-code-card">
            <div class="detail-code-heading">
              <div>
                <p class="eyebrow">Source recipe</p>
                <h2>Inspect the recipe</h2>
              </div>
              <span class="detail-code-hint">Preview follows</span>
            </div>
            <CodeViewer
              class="detail-code-viewer"
              activeTab={playground.recipeLanguage}
              tabs={[
                { id: 'jsx', label: 'JSX', language: 'jsx', filename: `${info.title}.recipe.jsx`, code: playground.jsxCode },
                { id: 'javascript', label: 'JavaScript', language: 'javascript', filename: `${info.title}.recipe.js`, code: playground.javascript }
              ]}
              editable={false}
              ariaLabel={`${info.title} source recipe`}
            />
            <p class="playground-note">Read the recipe above. Use the controls to change the safe live preview.</p>
          </Card>
        </section>
      </main>
    </ShowcaseShell>
  )
}
