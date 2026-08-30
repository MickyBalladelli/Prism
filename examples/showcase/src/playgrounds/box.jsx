import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function BoxPlayground() {
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
  const javascript = computed(() => codeLines(
    'html`',
    '  <div class="playground-box-frame">',
    '    <div class="playground-box-stack">',
    '      ${Box({',
    `        class: "playground-box ${tone.value} ${density.value}",`,
    `        role: ${showRole.value ? '"region"' : 'undefined'},`,
    `        sticky: ${sticky.value},`,
    `        stickyTop: "${stickyTop.value}",`,
    '        children: [',
    '          html`<span class="playground-box-status">${stickyState}</span>`,',
    `          html\`<strong>${content.value}</strong>\`,` ,
    '          html`<span>Scroll this preview to test sticky layout inside a bounded parent.</span>`',
    '        ]',
    '      })}',
    '      ${stickySections.map(section => html`<article class="playground-box-block"><strong>${section.title}</strong><span>${section.copy}</span></article>`)}',
    '    </div>',
    '  </div>',
    '`'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
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
    javascript,
    jsxCode,
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
