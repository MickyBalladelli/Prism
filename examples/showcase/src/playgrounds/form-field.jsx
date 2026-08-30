import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { jsRecipeToJsx } from '../recipe-syntax.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function FormFieldPlayground() {
  const value = signal('Aurora workspace')
  const showError = signal(false)
  const error = computed(() => showError.value ? 'Use at least three characters.' : undefined)
  const javascript = computed(() => codeLines(
    'FormField({',
    '  label: "Workspace name",',
    '  hint: "Shown in the app switcher.",',
    `  error: ${showError.value ? JSON.stringify(error.value) : 'undefined'},`,
    '  required: true,',
    '  control: field => TextField({',
    '    id: field.id,',
    '    ariaDescribedBy: field.ariaDescribedBy,',
    '    ariaInvalid: field.ariaInvalid,',
    '    required: field.required,',
    '    value',
    '  })',
    '})'
  ))
  const jsxCode = computed(() => jsRecipeToJsx(javascript.value))
  const codePreview = createCodePreview(codeLines(
    'FormField({',
    '  label: "Workspace name",',
    '  hint: "Shown in the app switcher.",',
    '  error: showError,',
    '  required: true,',
    '  control: field => TextField({',
    '    id: field.id,',
    '    ariaDescribedBy: field.ariaDescribedBy,',
    '    ariaInvalid: field.ariaInvalid,',
    '    required: field.required,',
    '    value',
    '  })',
    '})'
  ), { ...playgroundRuntime, value, showError: error })

  return {
    ...codePreview,
    javascript,
    jsxCode,
    controls: <div class="settings-list">
      <SettingLabel htmlFor="p2-field-value">Value</SettingLabel>
      <TextField id="p2-field-value" value={value} />
      <CheckBox checked={showError}>Show validation error</CheckBox>
      <p class="playground-note">The field passes one generated ID and one composed description chain into the control.</p>
    </div>
  }
}
