import { html } from 'matrix'

function getIconProps(props = {}) {
  const {
    class: classValue = '',
    size = '1em',
    ariaLabel
  } = props

  const iconClass = classValue
    ? `prism-icon ${classValue}`
    : 'prism-icon'

  return {
    iconClass,
    size,
    ariaHidden: ariaLabel === undefined ? 'true' : 'false',
    role: ariaLabel === undefined ? undefined : 'img',
    ariaLabel
  }
}

function createIconTemplate(content) {
  const strings = [
    '<svg class="',
    '" width="',
    '" height="',
    '" viewBox="0 0 24 24" fill="none" aria-hidden="',
    '" role="',
    '" aria-label="',
    `" focusable="false">${content}</svg>`
  ]

  Object.defineProperty(strings, 'raw', { value: strings.slice() })
  return strings
}

function createIcon(content) {
  const template = createIconTemplate(content)

  return (props = {}) => {
    const {
      iconClass,
      size,
      ariaHidden,
      role,
      ariaLabel
    } = getIconProps(props)

    return html(template, iconClass, size, size, ariaHidden, role, ariaLabel)
  }
}

export const PrismMarkIcon = createIcon('<circle cx="12" cy="12" r="5.5" fill="currentColor" />')

export const EyeIcon = createIcon('<path d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><circle cx="12" cy="12" r="2.25" fill="currentColor" />')

export const TreeToggleIcon = createIcon('<path class="prism-tree-toggle-bar prism-tree-toggle-bar-horizontal" d="M7 12h10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /><path class="prism-tree-toggle-bar prism-tree-toggle-bar-vertical" d="M12 7v10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />')

export const TreeBranchIcon = createIcon('<circle cx="12" cy="12" r="3.25" fill="currentColor" />')

export const TreeLeafIcon = createIcon('<circle cx="12" cy="12" r="2.75" fill="currentColor" />')

export const LiveStatusIcon = createIcon('<circle cx="12" cy="12" r="4" fill="currentColor" />')

export const ListBulletIcon = createIcon('<circle cx="12" cy="12" r="3" fill="currentColor" />')

export const PlusIcon = createIcon('<g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14" /><path d="M5 12h14" /></g>')

export const MinusIcon = createIcon('<path d="M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />')

export const CloseIcon = createIcon('<g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m7 7 10 10" /><path d="m17 7-10 10" /></g>')

export const SearchIcon = createIcon('<g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.8" cy="10.8" r="5.8" /><path d="m15.2 15.2 4.3 4.3" /></g>')

export const FilterIcon = createIcon('<path d="M4.5 6h15l-5.8 6.6v4.5L10.3 19v-6.4L4.5 6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />')

export const MoreHorizontalIcon = createIcon('<g fill="currentColor"><circle cx="6" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="18" cy="12" r="1.7" /></g>')

export const ArrowUpIcon = createIcon('<path d="M12 19V5m0 0-5 5m5-5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />')

export const ArrowDownIcon = createIcon('<path d="M12 5v14m0 0-5-5m5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />')

export const ArrowLeftIcon = createIcon('<path d="M19 12H5m0 0 5-5m-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />')

export const ArrowRightIcon = createIcon('<path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />')

export const ChevronDownIcon = createIcon('<path d="m6.5 9.5 5.5 5 5.5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />')

export const ChevronRightIcon = createIcon('<path d="m9.5 6.5 5 5.5-5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />')

export const MailIcon = createIcon('<g stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="6.5" width="16" height="11" rx="2" /><path d="m5 8 7 5 7-5" /></g>')

export const ChatIcon = createIcon('<path d="M6 5.5h12a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-5.2L8 19.5v-3H6a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />')

export const BellIcon = createIcon('<g stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10a6 6 0 0 0-12 0c0 5-2 5-2 6h16c0-1-2-1-2-6Z" /><path d="M10 20h4" /></g>')

export const LinkIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m10 14-1.8 1.8a3.3 3.3 0 0 1-4.7-4.7L6 8.6a3.3 3.3 0 0 1 4.7 0" /><path d="m14 10 1.8-1.8a3.3 3.3 0 0 1 4.7 4.7L18 15.4a3.3 3.3 0 0 1-4.7 0" /><path d="m8.5 12h7" /></g>')

export const ShareIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5.5" r="2.4" /><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="18.5" r="2.4" /><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" /></g>')

export const SendIcon = createIcon('<path d="m4 5 16 7-16 7 3.2-6.1L13 12 7.2 11.1 4 5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />')

export const CheckIcon = createIcon('<path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" />')

export const AlertIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 4 9 15H3L12 4Z" /><path d="M12 9v4" stroke-linecap="round" /><circle cx="12" cy="16.5" r=".8" fill="currentColor" stroke="none" /></g>')

export const InfoIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5" /><path d="M12 8h.01" /></g>')

export const HelpIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M9.8 9.3a2.4 2.4 0 1 1 3.7 2c-1 .7-1.5 1.1-1.5 2.2" /><path d="M12 16.5h.01" /></g>')

export const LoadingIcon = createIcon('<path d="M20 12a8 8 0 1 1-2.3-5.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />')

export const LockIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7.8a4 4 0 0 1 8 0V10" /><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" /></g>')

export const UnlockIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7.8a4 4 0 0 1 7.1-2.5" /><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" /></g>')

export const FileIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M7 3.5h7l4 4v13H7v-17Z" /><path d="M14 3.5v4h4" /></g>')

export const FolderIcon = createIcon('<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />')

export const ImageIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="9.5" r="1.4" /><path d="m5 17 4.5-4 3 2.5 2.2-2 4.3 3.5" /></g>')

export const DownloadIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0-4-4m4 4 4-4" /><path d="M5 19h14" /></g>')

export const UploadIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V9m0 0-4 4m4-4 4 4" /><path d="M5 5h14" /></g>')

export const CopyIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2" /></g>')

export const CalendarIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="5.5" width="16" height="15" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" stroke-linecap="round" /></g>')

export const ClockIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></g>')

export const MapPinIcon = createIcon('<path d="M19 10.2c0 4.7-7 10.3-7 10.3S5 14.9 5 10.2a7 7 0 1 1 14 0Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><circle cx="12" cy="10" r="2.2" fill="currentColor" />')

export const UserIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.2" /><path d="M5 20a7 7 0 0 1 14 0" /></g>')

export const GroupIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="2.8" /><circle cx="16.5" cy="9" r="2.2" /><path d="M3.8 19a5.3 5.3 0 0 1 10.5 0M15 14.7a4.4 4.4 0 0 1 5.2 4.3" /></g>')

export const SettingsIcon = createIcon('<path d="m12 3 1.2 2.3 2.5.6 2-1.2 1.7 1.7-1.2 2 .6 2.5L21 12l-2.2 1.1-.6 2.5 1.2 2-1.7 1.7-2-1.2-2.5.6L12 21l-1.1-2.3-2.5-.6-2 1.2-1.7-1.7 1.2-2-.6-2.5L3 12l2.3-1.1.6-2.5-1.2-2 1.7-1.7 2 1.2 2.5-.6L12 3Z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round" /><circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7" />')

export const SparkIcon = createIcon('<path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" fill="currentColor" />')

export const GridIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></g>')

export const ListIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 6h11M8 12h11M8 18h11" /><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" /></g>')

export const CodeIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 8-4 4 4 4M15 8l4 4-4 4M13.5 5l-3 14" /></g>')

export const TerminalIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="m8 10 2 2-2 2M13 14h3" /></g>')

export const EyeOffIcon = createIcon('<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5 20 19" /><path d="M10.5 7.2A9.5 9.5 0 0 1 12 7c5.5 0 8.5 5 8.5 5a15 15 0 0 1-3.1 3.4M6.6 9.1C4.7 10.4 3.5 12 3.5 12s3 5 8.5 5c.7 0 1.4-.1 2-.2" /></g>')
