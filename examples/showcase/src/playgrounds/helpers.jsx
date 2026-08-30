import { Select } from 'prism-ui'

export const selectOptions = values => values.map(value => ({ value, label: value[0].toUpperCase() + value.slice(1) }))

export function SettingLabel({ children, htmlFor }) {
  return <label class="setting-label" htmlFor={htmlFor}>{children}</label>
}

export function SelectForP2({ id, value, options }) {
  return <Select id={id} value={value} options={options} />
}
