import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { Alert, AlertIcon, Avatar, Button, Card, CheckBox, DropdownMenu, EmptyState, FormField, Grid, IconButton, Menu, Pagination, Popover, Progress, Select, Separator, Skeleton, Spinner, Stack, Tabs, Tag, TextField, ToastRegion, Tooltip, createToastController } from '@mickyballadelli/prism'
import { BellIcon, CheckIcon, CloseIcon, InfoIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparkIcon } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { selectOptions, SelectForP2, SettingLabel } from './helpers.jsx'

export function ToastPlayground() {
  const controller = createToastController()
  const codePreview = createCodePreview(codeLines(
    'html`<div class="p2-toast-demo">',
    '  ${Button({',
    '    children: "Save changes",',
    '    onClick: () => notices.push({',
    '      tone: "success",',
    '      title: "Saved",',
    '      children: "Your changes are safe."',
    '    })',
    '  })}',
    '  ${ToastRegion({ toasts: notices.toasts, onDismiss: notices.dismiss })}',
    '</div>`'
  ), { ...playgroundRuntime, notices: controller })

  const pushToast = () => controller.push({
    tone: 'success',
    title: 'Saved',
    children: 'Your changes are safe.'
  })

  return {
    ...codePreview,
    controls: <div class="settings-list">
      <Button onClick={pushToast} icon={CheckIcon({ size: '1em' })}>Push success toast</Button>
      <Button variant="secondary" onClick={() => controller.push({ tone: 'info', title: 'Heads up', children: 'This toast pauses while you read it.' })}>Push info toast</Button>
      <Button variant="tertiary" onClick={controller.clear}>Clear queue</Button>
      <p class="playground-note">Hover or focus a toast. Its timeout pauses until you leave.</p>
    </div>
  }
}

