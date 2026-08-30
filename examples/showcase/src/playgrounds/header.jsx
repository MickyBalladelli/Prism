import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function HeaderPlayground() {
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
