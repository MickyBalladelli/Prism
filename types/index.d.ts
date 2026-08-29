import type { ComponentResult, Signal, StyleDefinition } from 'matrix'

export interface BoxProps {
  children?: unknown
  class?: string
  id?: string
  role?: string
  style?: string | Record<string, string>
  sticky?: boolean | Signal<boolean>
  stickyTop?: string | Signal<string>
}

export type BackgroundPalette = 'midnight' | 'aurora' | 'tide'
export type BackgroundAnimation = 'veil' | 'sanctum'

export interface BackgroundProps {
  children?: unknown
  class?: string
  contentClass?: string
  id?: string
  role?: string
  style?: string | Record<string, string>
  contentStyle?: string | Record<string, string>
  palette?: BackgroundPalette | Signal<BackgroundPalette>
  animation?: BackgroundAnimation | Signal<BackgroundAnimation>
  animated?: boolean | Signal<boolean>
  speed?: number | Signal<number>
  intensity?: number | Signal<number>
  grain?: number | Signal<number>
  overlayOpacity?: number | Signal<number>
  minHeight?: string | Signal<string>
  height?: string | Signal<string>
  padding?: string | Signal<string>
  radius?: string | Signal<string>
  baseColor?: string | Signal<string>
  accentColor?: string | Signal<string>
  glowColor?: string | Signal<string>
  ariaLabel?: string
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

export type CodeLanguage = 'javascript' | 'jsx' | 'typescript' | 'tsx' | 'json' | 'css' | 'html' | 'xml' | 'bash' | 'text'

export interface CodeViewerProps {
  code?: string | Signal<string>
  language?: CodeLanguage | Signal<CodeLanguage>
  filename?: string | Signal<string>
  lineNumbers?: boolean | Signal<boolean>
  editable?: boolean | Signal<boolean>
  copyable?: boolean | Signal<boolean>
  syntaxColors?: Readonly<Record<string, string>> | Signal<Readonly<Record<string, string>>>
  fontFamily?: string | Signal<string>
  fontSize?: string | Signal<string>
  lineHeight?: string | Signal<string>
  tabSize?: number | Signal<number>
  minHeight?: string | Signal<string>
  maxHeight?: string | Signal<string>
  style?: string | Record<string, string>
  class?: string
  ariaLabel?: string
  onChange?: (event: Event) => void
  onCopy?: (code: string, event: MouseEvent) => void
}

export type PopupSize = 'small' | 'medium' | 'large' | 'full'
export type PopupPlacement = 'center' | 'top' | 'bottom'

export interface PopupSlotContext {
  close: (reason?: string, event?: Event) => void
}

export type PopupContent = string | number | boolean | object | null

export interface PopupProps {
  open?: boolean | Signal<boolean>
  title?: unknown
  eyebrow?: unknown
  children?: PopupContent | ((context: PopupSlotContext) => PopupContent)
  footer?: PopupContent | ((context: PopupSlotContext) => PopupContent)
  size?: PopupSize | Signal<PopupSize>
  placement?: PopupPlacement | Signal<PopupPlacement>
  showClose?: boolean | Signal<boolean>
  closeOnBackdrop?: boolean | Signal<boolean>
  closeOnEscape?: boolean | Signal<boolean>
  restoreFocus?: boolean | Signal<boolean>
  class?: string
  id?: string
  ariaLabel?: string
  ariaDescription?: unknown
  onClose?: (reason: string, event?: Event) => void
}

export interface SelectOption {
  value: string | number
  label?: string
  disabled?: boolean
}

export type SelectOptionInput = SelectOption | string | number
export type SelectPlacement = 'bottom' | 'top' | 'left' | 'right'
export type SelectRenderLocation = 'trigger' | 'option'

export interface SelectRenderContext {
  location: SelectRenderLocation
  selected: boolean
}

export interface SelectProps {
  options?: SelectOptionInput[] | Signal<SelectOptionInput[]>
  value?: string | Signal<string>
  onChange?: (event: Event) => void
  onRender?: (option: SelectOption, context: SelectRenderContext) => unknown
  id?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: 'small' | 'medium' | 'large' | Signal<'small' | 'medium' | 'large'>
  placement?: SelectPlacement | Signal<SelectPlacement>
  ariaLabel?: string
  class?: string
}

export type TableDensity = 'compact' | 'comfortable' | 'spacious'
export type TableSortDirection = 'asc' | 'desc'
export type TablePageSize = number | 'all' | 'max'
export type TableCellAlignment = 'start' | 'center' | 'end'
export type TablePinnedSide = 'left' | 'right'

export interface TableSort {
  key: string
  direction: TableSortDirection
}

export interface TableRenderContext<Row = Record<string, unknown>> {
  rowIndex: number
  column: TableColumn<Row>
  selected: boolean
}

export interface TableColumn<Row = Record<string, unknown>> {
  key: string
  header?: unknown
  accessor?: keyof Row | string | ((row: Row, rowIndex: number) => unknown)
  render?: (value: unknown, row: Row, context: TableRenderContext<Row>) => unknown
  renderHeader?: (column: TableColumn<Row>, context: { sort: TableSortDirection | 'none' }) => unknown
  searchText?: (value: unknown, row: Row) => string
  compare?: (left: unknown, right: unknown, leftRow: Row, rightRow: Row) => number
  filter?: (value: unknown, expected: unknown, row: Row) => boolean
  fallback?: unknown
  width?: number | string
  minWidth?: number
  maxWidth?: number
  align?: TableCellAlignment
  pinned?: TablePinnedSide
  sortable?: boolean
  searchable?: boolean
  resizable?: boolean
  reorderable?: boolean
  pinnable?: boolean
  hideable?: boolean
  exportable?: boolean
  hidden?: boolean
  class?: string
}

export interface TableSettings {
  version?: 1
  columnOrder?: string[]
  columnWidths?: Record<string, number>
  hiddenColumns?: string[]
  pinnedColumns?: Record<string, TablePinnedSide | 'none'>
  sort?: TableSort | null
  pageSize?: number | 'all'
  density?: TableDensity
}

export interface TableProps<Row = Record<string, unknown>> {
  rows?: Row[] | Signal<Row[]>
  columns?: TableColumn<Row>[] | Signal<TableColumn<Row>[]>
  rowKey?: keyof Row | string | ((row: Row, rowIndex: number) => string | number)
  filter?: string | Signal<string>
  filterPlaceholder?: string
  page?: number | Signal<number>
  pageSize?: TablePageSize | Signal<TablePageSize>
  pageSizeOptions?: TablePageSize[]
  sort?: TableSort
  selectedKeys?: Array<string | number> | Signal<Array<string | number>>
  columnFilters?: Record<string, unknown> | Signal<Record<string, unknown>>
  settings?: TableSettings | string
  storageKey?: string
  title?: unknown
  description?: unknown
  toolbar?: unknown
  searchable?: boolean | Signal<boolean>
  sortable?: boolean | Signal<boolean>
  resizable?: boolean | Signal<boolean>
  reorderable?: boolean | Signal<boolean>
  selectable?: boolean | Signal<boolean>
  paginated?: boolean | Signal<boolean>
  exportable?: boolean | Signal<boolean>
  showSettings?: boolean | Signal<boolean>
  stickyHeader?: boolean | Signal<boolean>
  striped?: boolean | Signal<boolean>
  hoverable?: boolean | Signal<boolean>
  loading?: boolean | Signal<boolean>
  density?: TableDensity | Signal<TableDensity>
  emptyMessage?: unknown
  class?: string
  id?: string
  ariaLabel?: string
  onRowClick?: (row: Row, context: { key: string, rowIndex: number, event: MouseEvent | KeyboardEvent }) => void
  onSelectionChange?: (keys: string[], rows: Row[]) => void
  onSortChange?: (sort: TableSort | null) => void
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number | 'all') => void
  onColumnOrderChange?: (keys: string[]) => void
  onColumnResize?: (key: string, width: number) => void
  onSettingsChange?: (settings: TableSettings, serialized: string) => void
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

export type TreeViewRenderLocation = 'item'
export type TreeViewItemType = 'branch' | 'leaf'

export interface TreeViewRenderContext {
  location: TreeViewRenderLocation
  type: TreeViewItemType
  selected: boolean
  expanded?: boolean
  depth: number
}

export type TreeViewModel = 'prism' | 'aurora' | 'nocturne' | 'editorial' | 'terminal'
export type TreeViewItemVariant = 'framed' | 'minimal'

export interface TreeViewModelDefinition {
  label: string
  description: string
}

export const treeViewModels: Readonly<Record<TreeViewModel, TreeViewModelDefinition>>

export interface TreeViewProps {
  items?: TreeViewItem[] | Signal<TreeViewItem[]>
  class?: string
  id?: string
  ariaLabel?: string
  model?: TreeViewModel | Signal<TreeViewModel>
  itemVariant?: TreeViewItemVariant | Signal<TreeViewItemVariant>
  onRender?: (item: TreeViewItem, context: TreeViewRenderContext) => unknown
}

export function Background(props?: BackgroundProps): unknown
export function Box(props?: BoxProps): unknown
export function Button(props?: ButtonProps): unknown
export function Card(props?: CardProps): unknown
export function Badge(props?: BadgeProps): unknown
export function TextField(props?: TextFieldProps): unknown
export function CheckBox(props?: CheckBoxProps): unknown
export function CodeViewer(props?: CodeViewerProps): unknown
export function Popup(props?: PopupProps): unknown
export function Select(props?: SelectProps): unknown
export function Table<Row = Record<string, unknown>>(props?: TableProps<Row>): unknown
export function parseTableSettings(value: TableSettings | string | null | undefined): TableSettings | null
export function serializeTableSettings(settings: TableSettings): string
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
export function BackgroundComponent(props?: BackgroundProps): ComponentResult
export function BoxComponent(props?: BoxProps): ComponentResult
export function ButtonComponent(props?: ButtonProps): ComponentResult
export function CardComponent(props?: CardProps): ComponentResult
export function BadgeComponent(props?: BadgeProps): ComponentResult
export function TextFieldComponent(props?: TextFieldProps): ComponentResult
export function CheckBoxComponent(props?: CheckBoxProps): ComponentResult
export function CodeViewerComponent(props?: CodeViewerProps): ComponentResult
export function PopupComponent(props?: PopupProps): ComponentResult
export function SelectComponent(props?: SelectProps): ComponentResult
export function TableComponent<Row = Record<string, unknown>>(props?: TableProps<Row>): ComponentResult
export function TreeViewComponent(props?: TreeViewProps): ComponentResult
export function PulseComponent(props?: PulseProps): ComponentResult
export const prismTheme: StyleDefinition
export const prismThemeValues: PrismThemeValues
