import type { ComponentResult, Signal, StyleDefinition } from 'matrix'

export interface BoxProps {
  children?: unknown
  class?: string
  id?: string
  role?: string
  style?: string | Record<string, string>
}

export interface CardProps extends BoxProps {
  actions?: unknown
}

export interface PrismThemeValues {
  readonly colors: Readonly<Record<string, string>>
  readonly fontSizes: Readonly<Record<string, string>>
  readonly radii: Readonly<Record<string, string>>
  readonly shadows: Readonly<Record<string, string>>
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'information' | 'success'

export interface ButtonProps {
  children?: unknown
  class?: string
  id?: string
  type?: 'button' | 'submit' | 'reset'
  name?: string
  value?: string
  variant?: ButtonVariant | Signal<ButtonVariant>
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface TextFieldProps {
  value?: string | Signal<string>
  onInput?: (event: Event) => void
  onChange?: (event: Event) => void
  id?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: 'small' | 'medium' | 'large' | Signal<'small' | 'medium' | 'large'>
}

export interface CheckBoxProps {
  checked?: boolean | Signal<boolean>
  children?: unknown
  onChange?: (event: Event) => void
  id?: string
  name?: string
  value?: string
  disabled?: boolean
}

export interface IconProps {
  class?: string
  size?: string | number
  ariaLabel?: string
}

export type BadgeTone = 'neutral' | 'success' | 'info' | 'warning' | 'error'
export type BadgeSize = 'small' | 'medium' | 'large'

export interface BadgeProps {
  value?: string | number | Signal<string | number>
  children?: unknown
  tone?: BadgeTone | Signal<BadgeTone>
  size?: BadgeSize | Signal<BadgeSize>
  pulseOnChange?: boolean
  class?: string
  ariaLabel?: string
}

export type PulseStatus = 'success' | 'info' | 'warning' | 'error' | 'off'
export type PulseSize = 'small' | 'medium' | 'large'
export type PulseAnimation = 'once' | 'continuous'

export interface PulseProps {
  status?: PulseStatus | Signal<PulseStatus>
  size?: PulseSize | Signal<PulseSize>
  animation?: PulseAnimation | Signal<PulseAnimation>
  class?: string
  ariaLabel?: string
  children?: unknown
}

export interface TreeViewItem {
  label: string
  href?: string
  onClick?: (event: MouseEvent) => void
  active?: boolean
  expanded?: boolean
  meta?: string | number | Signal<string | number>
  children?: TreeViewItem[]
}

export interface TreeViewProps {
  items?: TreeViewItem[] | Signal<TreeViewItem[]>
  class?: string
  id?: string
  ariaLabel?: string
}

export function Box(props?: BoxProps): unknown
export function Button(props?: ButtonProps): unknown
export function Card(props?: CardProps): unknown
export function Badge(props?: BadgeProps): unknown
export function TextField(props?: TextFieldProps): unknown
export function CheckBox(props?: CheckBoxProps): unknown
export function TreeView(props?: TreeViewProps): unknown
export function PrismMarkIcon(props?: IconProps): unknown
export function EyeIcon(props?: IconProps): unknown
export function TreeToggleIcon(props?: IconProps): unknown
export function TreeBranchIcon(props?: IconProps): unknown
export function TreeLeafIcon(props?: IconProps): unknown
export function LiveStatusIcon(props?: IconProps): unknown
export function ListBulletIcon(props?: IconProps): unknown
export function PlusIcon(props?: IconProps): unknown
export function MinusIcon(props?: IconProps): unknown
export function CloseIcon(props?: IconProps): unknown
export function SearchIcon(props?: IconProps): unknown
export function FilterIcon(props?: IconProps): unknown
export function MoreHorizontalIcon(props?: IconProps): unknown
export function ArrowUpIcon(props?: IconProps): unknown
export function ArrowDownIcon(props?: IconProps): unknown
export function ArrowLeftIcon(props?: IconProps): unknown
export function ArrowRightIcon(props?: IconProps): unknown
export function ChevronDownIcon(props?: IconProps): unknown
export function ChevronRightIcon(props?: IconProps): unknown
export function MailIcon(props?: IconProps): unknown
export function ChatIcon(props?: IconProps): unknown
export function BellIcon(props?: IconProps): unknown
export function LinkIcon(props?: IconProps): unknown
export function ShareIcon(props?: IconProps): unknown
export function SendIcon(props?: IconProps): unknown
export function CheckIcon(props?: IconProps): unknown
export function AlertIcon(props?: IconProps): unknown
export function InfoIcon(props?: IconProps): unknown
export function HelpIcon(props?: IconProps): unknown
export function LoadingIcon(props?: IconProps): unknown
export function LockIcon(props?: IconProps): unknown
export function UnlockIcon(props?: IconProps): unknown
export function FileIcon(props?: IconProps): unknown
export function FolderIcon(props?: IconProps): unknown
export function GroupIcon(props?: IconProps): unknown
export function ImageIcon(props?: IconProps): unknown
export function DownloadIcon(props?: IconProps): unknown
export function UploadIcon(props?: IconProps): unknown
export function CopyIcon(props?: IconProps): unknown
export function CalendarIcon(props?: IconProps): unknown
export function ClockIcon(props?: IconProps): unknown
export function MapPinIcon(props?: IconProps): unknown
export function UserIcon(props?: IconProps): unknown
export function SettingsIcon(props?: IconProps): unknown
export function SparkIcon(props?: IconProps): unknown
export function GridIcon(props?: IconProps): unknown
export function ListIcon(props?: IconProps): unknown
export function CodeIcon(props?: IconProps): unknown
export function TerminalIcon(props?: IconProps): unknown
export function EyeOffIcon(props?: IconProps): unknown
export function Pulse(props?: PulseProps): unknown
export function BoxComponent(props?: BoxProps): ComponentResult
export function ButtonComponent(props?: ButtonProps): ComponentResult
export function CardComponent(props?: CardProps): ComponentResult
export function BadgeComponent(props?: BadgeProps): ComponentResult
export function TextFieldComponent(props?: TextFieldProps): ComponentResult
export function CheckBoxComponent(props?: CheckBoxProps): ComponentResult
export function TreeViewComponent(props?: TreeViewProps): ComponentResult
export function PulseComponent(props?: PulseProps): ComponentResult
export const prismTheme: StyleDefinition
export const prismThemeValues: PrismThemeValues
