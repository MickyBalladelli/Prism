import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function TreeViewPlayground() {
  const showMeta = signal(true)
  const expanded = signal(true)
  const renderMode = signal('text')
  const itemVariant = signal('minimal')
  const selectedItem = signal('Button')
  const showFilter = signal(true)
  const showExpandCollapse = signal(true)

  const items = computed(() => {
    const leaf = (label, details = {}) => ({
      ...details,
      id: details.id ?? label.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label,
      active: selectedItem.value === label,
      onClick: () => {
        selectedItem.value = label
      }
    })

    const branch = (label, details = {}) => ({
      ...details,
      id: details.id ?? label.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
    'html`',
    '  <div class="tree-view-playground">',
    '    ${TreeView({',
    '      class: "component-tree-preview",',
    '      ariaLabel: "Tree view playground",',
    '      items,',
    '      model,',
    '      itemVariant,',
    '      filter: showFilter,',
    '      expandCollapse: showExpandCollapse,',
    '      onRender: renderTreeItem',
    '    })}',
    '  </div>',
    '`'
  ), { ...playgroundRuntime, items, model: showcaseThemeModel, itemVariant, showFilter, showExpandCollapse, renderTreeItem })

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
        <CheckBox checked={showFilter}>Show filter field</CheckBox>
        <CheckBox checked={showExpandCollapse}>Show expand/collapse button</CheckBox>
        <CheckBox checked={showMeta}>Show metadata chips</CheckBox>
        <CheckBox checked={expanded}>Expand sections</CheckBox>
        <p class="playground-note">Filter the live tree from the search field above the preview.</p>
        <p class="playground-note">Selected item: <strong>{selectedItem}</strong></p>
        <p class="playground-note">Keyboard: ↑↓ move, type a letter to cycle, ←→ open or close, Enter or Space activates.</p>
      </div>
    )
  }
}
