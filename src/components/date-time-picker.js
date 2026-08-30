import { component } from '@mickyballadelli/matrix'
import { createDateInput } from './date-input.js'

export function DateTimePicker(props = {}) {
  return createDateInput(props, {
    baseClassName: 'date-time-picker',
    dateTime: true,
    defaultLabel: 'Date and time'
  })
}

export const DateTimePickerComponent = props => component(DateTimePicker, props)
