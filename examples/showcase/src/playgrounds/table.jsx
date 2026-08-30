import { computed, html, keyed, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function TablePlayground() {
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
      <span class="table-sparkline" aria-hidden="true">${keyed(row.trend.map((point, index) => {
        const trendPoint = html`<i style="height: ${point}%"></i>`
        trendPoint.key = `${row.id}-trend-${index}`
        return trendPoint
      }), trendPoint => trendPoint.key)}</span>
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
  const javascript = computed(() => codeLines(
    'Table({',
    '  class: "creator-table",',
    '  title: "Creator pulse",',
    '  description: "24 campaigns · live performance",',
    '  rows: tableRows,',
    '  columns: tableColumns,',
    `  density: "${density.value}",`,
    `  pageSize: ${JSON.stringify(pageSize.value)},`,
    '  pageSizeOptions: [5, 10, 20, "all"],',
    `  striped: ${striped.value},`,
    `  loading: ${loading.value},`,
    '  selectable: true,',
    '  exportable: true,',
    '  storageKey: "prism-creator-table",',
    '  onSelectionChange: keys => selectedCount.value = keys.length,',
    '  onSettingsChange: updateSettings',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
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
    javascript,
    jsxCode,
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
