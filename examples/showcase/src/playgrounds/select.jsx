import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function SelectPlayground() {
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
