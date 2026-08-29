import { component, html } from '@mickyballadelli/matrix'

export function CheckBox(props = {}) {
  const {
    checked = false,
    onChange,
    children = [],
    id,
    name,
    disabled = false,
    value
  } = props

  const input = checked?.kind === 'signal'
    ? html`<input type="checkbox" id="${id}" name="${name}" value="${value}" ?disabled=${disabled} use:bind=${checked} @change=${onChange}>`
    : html`<input type="checkbox" id="${id}" name="${name}" value="${value}" ?disabled=${disabled} .checked=${checked} @change=${onChange}>`

  return html`
    <label>
      ${input}
      ${children}
    </label>
  `
}

export const CheckBoxComponent = props => component(CheckBox, props)
