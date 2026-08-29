import {
  AlertIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  CloseIcon,
  CodeIcon,
  CopyIcon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileIcon,
  FilterIcon,
  FolderIcon,
  GroupIcon,
  GridIcon,
  HelpIcon,
  ImageIcon,
  InfoIcon,
  LinkIcon,
  ListIcon,
  LoadingIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  MatrixIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  PrismIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShareIcon,
  SparkIcon,
  TerminalIcon,
  UnlockIcon,
  UploadIcon,
  UserIcon
} from 'prism-ui'

function iconEntry(name, component, description) {
  return {
    name,
    component,
    description,
    example: `import { ${name} } from 'prism-ui'

<${name} size="20" />`
  }
}

function iconCategory(key, label, description, icons) {
  return { key, label, description, icons }
}

export const iconCategories = [
  iconCategory('actions', 'Actions', 'Controls for creating, changing, finding, and dismissing things.', [
    iconEntry('EyeIcon', EyeIcon, 'Preview or inspect a detail view.'),
    iconEntry('PlusIcon', PlusIcon, 'Add a new item or expand a choice.'),
    iconEntry('MinusIcon', MinusIcon, 'Remove, collapse, or reduce a value.'),
    iconEntry('CloseIcon', CloseIcon, 'Dismiss a surface or cancel an action.'),
    iconEntry('SearchIcon', SearchIcon, 'Find content inside a view.'),
    iconEntry('FilterIcon', FilterIcon, 'Narrow a collection of results.'),
    iconEntry('MoreHorizontalIcon', MoreHorizontalIcon, 'Reveal secondary actions.')
  ]),
  iconCategory('navigation', 'Navigation', 'Directional marks and tree controls for moving through a product.', [
    iconEntry('ArrowUpIcon', ArrowUpIcon, 'Move or navigate upward.'),
    iconEntry('ArrowDownIcon', ArrowDownIcon, 'Move or navigate downward.'),
    iconEntry('ArrowLeftIcon', ArrowLeftIcon, 'Move or navigate to the left.'),
    iconEntry('ArrowRightIcon', ArrowRightIcon, 'Move or navigate to the right.'),
    iconEntry('ChevronDownIcon', ChevronDownIcon, 'Show a downward menu or section.'),
    iconEntry('ChevronRightIcon', ChevronRightIcon, 'Show a forward menu or section.')
  ]),
  iconCategory('communication', 'Communication', 'Human signals for messages, sharing, and notifications.', [
    iconEntry('MailIcon', MailIcon, 'Email, inbox, or written message.'),
    iconEntry('ChatIcon', ChatIcon, 'Conversation or support thread.'),
    iconEntry('BellIcon', BellIcon, 'Notification or alert center.'),
    iconEntry('LinkIcon', LinkIcon, 'Attached or connected resource.'),
    iconEntry('ShareIcon', ShareIcon, 'Send a resource to another place.'),
    iconEntry('SendIcon', SendIcon, 'Submit or send a message.')
  ]),
  iconCategory('status', 'Status', 'Feedback marks that explain state, progress, and access.', [
    iconEntry('CheckIcon', CheckIcon, 'Completed, valid, or selected state.'),
    iconEntry('AlertIcon', AlertIcon, 'Important warning that needs attention.'),
    iconEntry('InfoIcon', InfoIcon, 'Helpful context or supporting information.'),
    iconEntry('HelpIcon', HelpIcon, 'Question, guidance, or support.'),
    iconEntry('LoadingIcon', LoadingIcon, 'Work currently in progress.'),
    iconEntry('LockIcon', LockIcon, 'Protected or restricted content.'),
    iconEntry('UnlockIcon', UnlockIcon, 'Available or unlocked content.')
  ]),
  iconCategory('files', 'Files', 'Marks for documents, folders, media, and file movement.', [
    iconEntry('FileIcon', FileIcon, 'A document or generic file.'),
    iconEntry('FolderIcon', FolderIcon, 'A collection of files or resources.'),
    iconEntry('ImageIcon', ImageIcon, 'A photo, illustration, or media file.'),
    iconEntry('DownloadIcon', DownloadIcon, 'Move a file onto the device.'),
    iconEntry('UploadIcon', UploadIcon, 'Move a file into the product.'),
    iconEntry('CopyIcon', CopyIcon, 'Duplicate a value, file, or resource.')
  ]),
  iconCategory('workspace', 'Workspace', 'Everyday objects that orient people inside a product.', [
    iconEntry('PrismIcon', PrismIcon, 'Faceted Prism brand mark with a split-light signature.'),
    iconEntry('MatrixIcon', MatrixIcon, 'Connected Matrix runtime mark built from composable nodes.'),
    iconEntry('CalendarIcon', CalendarIcon, 'Date, schedule, or event.'),
    iconEntry('ClockIcon', ClockIcon, 'Time, duration, or recent activity.'),
    iconEntry('MapPinIcon', MapPinIcon, 'Place, location, or address.'),
    iconEntry('UserIcon', UserIcon, 'Person, account, or profile.'),
    iconEntry('GroupIcon', GroupIcon, 'People, team, or shared workspace.'),
    iconEntry('SettingsIcon', SettingsIcon, 'Preferences or configuration.'),
    iconEntry('SparkIcon', SparkIcon, 'New, smart, or elevated capability.')
  ]),
  iconCategory('data', 'Data & Code', 'Tools for scanning, reading, and manipulating structured information.', [
    iconEntry('GridIcon', GridIcon, 'Grid or card layout switcher.'),
    iconEntry('ListIcon', ListIcon, 'List layout switcher or collection.'),
    iconEntry('CodeIcon', CodeIcon, 'Code, developer content, or syntax.'),
    iconEntry('TerminalIcon', TerminalIcon, 'Command line or runtime surface.'),
    iconEntry('EyeOffIcon', EyeOffIcon, 'Hidden or private content.')
  ])
]

export const allIcons = iconCategories.flatMap(category => category.icons.map(icon => ({
  ...icon,
  category: category.label,
  categoryKey: category.key
})))

export const iconCount = allIcons.length
