import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from 'prism-ui'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from 'prism-ui'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function TabsPlayground() {
  const activeTab = signal('activity')
  const orientation = signal('horizontal')
  const items = [
    { id: 'activity', label: 'Activity', icon: SparkIcon({ size: '1em' }), content: html`<div class="p2-tab-panel"><strong>Everything is moving.</strong><span>Live workspace activity appears here.</span></div>` },
    { id: 'people', label: 'People', icon: BellIcon({ size: '1em' }), content: html`<div class="p2-tab-panel"><strong>12 collaborators</strong><span>See who is shaping this workspace.</span></div>` },
    { id: 'settings', label: 'Settings', disabled: false, content: html`<div class="p2-tab-panel"><strong>Ready to tune.</strong><span>Configuration stays one tab away.</span></div>` }
  ]
  const codePreview = createCodePreview(codeLines(
    'Tabs({',
    '  activeTab,',
    '  orientation,',
    '  items: [',
    '    { id: "activity", label: "Activity", content: "Live activity" },',
    '    { id: "people", label: "People", content: "Collaborators" },',
    '    { id: "settings", label: "Settings", content: "Configuration" }',
    '  ]',
    '})'
  ), { ...playgroundRuntime, activeTab, orientation })

  return {
    ...codePreview,
    preview: component(Tabs, { activeTab, orientation, items, onTabChange: id => activeTab.value = id }),
    controls: <div class="settings-list"><SettingLabel htmlFor="p2-tabs-orientation">Orientation</SettingLabel><SelectForP2 id="p2-tabs-orientation" value={orientation} options={selectOptions(['horizontal', 'vertical'])} /><p class="playground-note">Arrow keys move focus. Automatic activation keeps the panel in sync.</p></div>
  }
}

