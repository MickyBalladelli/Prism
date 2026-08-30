import { Select } from 'prism-ui'

export const selectOptions = values => values.map(value => ({ value, label: value[0].toUpperCase() + value.slice(1) }))

export const menuItems = [
  { id: 'rename', label: 'Rename', shortcut: 'R' },
  { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D' },
  { type: 'separator' },
  { type: 'group', label: 'Danger zone', items: [
    { id: 'archive', label: 'Archive', disabled: true },
    { id: 'delete', label: 'Delete project' }
  ] }
]

export function SettingLabel({ children, htmlFor }) {
  return <label class="setting-label" htmlFor={htmlFor}>{children}</label>
}

export function SelectForP2({ id, value, options }) {
  return <Select id={id} value={value} options={options} />
}
