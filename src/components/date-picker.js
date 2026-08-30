import { component } from '@mickyballadelli/matrix'
import { createDateInput } from './date-input.js'

export function DatePicker(props = {}) {
  return createDateInput(props, {
    baseClassName: 'date-picker',
    dateTime: false,
    defaultLabel: 'Date'
  })
}

export const DatePickerComponent = props => component(DatePicker, props)
