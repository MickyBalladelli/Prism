import type { ComponentResult, Reactive, Signal, StyleDefinition, TemplateResult } from '@mickyballadelli/matrix'

export type MaybeReactive<T> = T | Reactive<T>
export type StyleObject = Record<string, string | number>
export type StyleValue = string | StyleObject

export interface BoxProps {
  children?: unknown
  class?: string
  id?: string
  role?: string
  style?: StyleValue
  sticky?: boolean | Signal<boolean>
  stickyTop?: string | Signal<string>
}

export type BackgroundPalette = 'midnight' | 'aurora' | 'tide'
export type BackgroundAnimation = 'veil' | 'mist' | 'sanctum' | 'silk' | 'halo' | 'ember' | 'orbit' | 'gossamer' | 'meridian' | 'bloom' | 'current' | 'opal' | 'zephyr'

export type LabelSize = 'small' | 'medium' | 'large' | 'display'
export type LabelFont = 'sans' | 'serif' | 'mono'
export type LabelWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type LabelTone = 'ink' | 'muted' | 'accent' | 'inverse'

export interface LabelProps {
  children?: unknown
  class?: string
  id?: string
  htmlFor?: string | Signal<string>
  size?: LabelSize | Signal<LabelSize>
  font?: LabelFont | Signal<LabelFont>
  weight?: LabelWeight | Signal<LabelWeight>
  tone?: LabelTone | Signal<LabelTone>
  alwaysVisible?: boolean | Signal<boolean>
  outlineColor?: string | Signal<string>
  backgroundColor?: string | Signal<string>
  fontSize?: string | Signal<string>
  fontFamily?: string | Signal<string>
  fontWeight?: string | number | Signal<string | number>
  letterSpacing?: string | Signal<string>
  lineHeight?: string | Signal<string>
  style?: StyleValue
}

export interface BackgroundProps {
  children?: unknown
  class?: string
  contentClass?: string
  id?: string
  role?: string
  style?: StyleValue
  contentStyle?: StyleValue
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
  ariaLabel?: string | Reactive<string>
}

export interface HeaderProps {
  children?: unknown
  trailing?: unknown
  class?: string
  id?: string
  role?: string
  style?: StyleValue
  sticky?: boolean | Signal<boolean>
  stickyTop?: string | Signal<string>
  ariaLabel?: string
}

export interface LayoutProps {
  children?: unknown
  header?: unknown | Reactive<unknown>
  navigator?: unknown | Reactive<unknown>
  footer?: unknown | Reactive<unknown>
  class?: string | Reactive<string>
  id?: string
  role?: string
  bodyClass?: string | Reactive<string>
  contentClass?: string | Reactive<string>
  headerClass?: string | Reactive<string>
  navigatorClass?: string | Reactive<string>
  footerClass?: string | Reactive<string>
}

export interface NavigatorProps {
  children?: unknown
  title?: unknown | Reactive<unknown>
  description?: unknown | Reactive<unknown>
  footer?: unknown | Reactive<unknown>
  class?: string | Reactive<string>
  id?: string
  role?: string
  ariaLabel?: string
  style?: StyleValue
  sticky?: boolean | Signal<boolean>
  stickyTop?: string | Signal<string>
}

export interface FooterProps {
  children?: unknown
  leading?: unknown | Reactive<unknown>
  trailing?: unknown | Reactive<unknown>
  class?: string | Reactive<string>
  id?: string
  role?: string
  ariaLabel?: string
  style?: StyleValue
  sticky?: boolean | Signal<boolean>
  stickyBottom?: string | Signal<string>
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
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonShape = 'rounded' | 'pill' | 'square'
export type ButtonIconPosition = 'start' | 'end'
export type ButtonPalette = 'cobalt' | 'iris' | 'teal'

export interface ButtonProps {
  children?: unknown
  label?: unknown
  showLabel?: boolean | Signal<boolean>
  icon?: unknown
  iconPosition?: ButtonIconPosition | Signal<ButtonIconPosition>
  class?: string
  id?: string
  type?: 'button' | 'submit' | 'reset'
  name?: string
  value?: string
  variant?: ButtonVariant | Signal<ButtonVariant>
  size?: ButtonSize | Signal<ButtonSize>
  shape?: ButtonShape | Signal<ButtonShape>
  palette?: ButtonPalette | Signal<ButtonPalette>
  fullWidth?: boolean | Signal<boolean>
  loading?: boolean | Signal<boolean>
  loadingLabel?: string | Signal<string>
  pressed?: boolean | Signal<boolean>
  disabled?: boolean | Signal<boolean>
  ariaLabel?: string | Signal<string>
  title?: string
  onClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface FormFieldControlContext {
  id: string
  ariaDescribedBy?: string
  ariaInvalid: boolean
  required: boolean
}

export interface FormFieldProps {
  children?: unknown
  control?: (context: FormFieldControlContext) => unknown
  label?: unknown
  hint?: unknown | Reactive<unknown>
  error?: unknown | Reactive<unknown>
  required?: boolean | Reactive<boolean>
  id?: string
  class?: string
  labelClass?: string
  hintClass?: string
  errorClass?: string
  style?: StyleValue
}

export type AlertTone = 'success' | 'info' | 'warning' | 'error'

export interface AlertProps {
  children?: unknown
  description?: unknown
  title?: unknown | Reactive<unknown>
  tone?: AlertTone | Reactive<AlertTone>
  dismissible?: boolean
  onDismiss?: (event: MouseEvent) => void
  role?: 'alert' | 'status'
  ariaLabel?: string
  id?: string
  class?: string
}

export interface ToastItem {
  id: string
  title?: unknown
  description?: unknown
  children?: unknown
  tone?: AlertTone
  duration?: number
  dismissible?: boolean
}

export type ToastInput = Omit<ToastItem, 'id'> & { id?: string }

export interface ToastController {
  toasts: Signal<ToastItem[]>
  push: (toast?: ToastInput) => string
  dismiss: (id: string) => void
  clear: () => void
}

export interface ToastRegionProps {
  toasts?: ToastItem[] | Reactive<ToastItem[]>
  position?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  duration?: number | Reactive<number>
  maxVisible?: number | Reactive<number>
  onDismiss?: (id: string, toast: ToastItem) => void
  ariaLabel?: string
  class?: string
}

export interface MenuItemInput {
  id?: string | number
  type?: 'item' | 'separator' | 'group'
  label?: unknown
  children?: unknown
  icon?: unknown
  shortcut?: string
  href?: string
  disabled?: boolean
  items?: MenuItemInput[]
  onSelect?: (item: MenuItemInput, event: Event) => void
}

export interface MenuProps {
  items?: MenuItemInput[] | Reactive<MenuItemInput[]>
  ariaLabel?: string
  id?: string
  class?: string
  onSelect?: (item: MenuItemInput, event: Event) => void
  onActiveChange?: (index: number) => void
}

export interface DropdownMenuProps extends MenuProps {
  label?: unknown
  trigger?: (context: { open: boolean, toggle: () => void, close: () => void }) => unknown
  placement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  onOpenChange?: (open: boolean) => void
}

export type FloatingPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right'

export interface TooltipProps {
  children?: unknown
  content?: unknown | (() => unknown)
  placement?: FloatingPlacement
  delay?: number
  showDelay?: number
  disabled?: boolean | Reactive<boolean>
  id?: string
  class?: string
}

export interface PopoverProps {
  children?: unknown
  content?: unknown | ((context: { close: () => void, open: boolean }) => unknown)
  trigger?: (context: { open: boolean, toggle: () => void, close: () => void }) => unknown
  open?: boolean | Signal<boolean>
  placement?: FloatingPlacement
  closeOnEscape?: boolean
  closeOnOutside?: boolean
  onOpenChange?: (open: boolean) => void
  ariaLabel?: string
  id?: string
  class?: string
}

export interface TabsItem {
  id: string | number
  label: unknown
  content?: unknown | ((item: TabsItem) => unknown)
  icon?: unknown
  disabled?: boolean
}

export interface TabsProps {
  items?: TabsItem[] | Reactive<TabsItem[]>
  activeTab?: string | number | Signal<string | number>
  activation?: 'automatic' | 'manual'
  orientation?: 'horizontal' | 'vertical'
  ariaLabel?: string
  onTabChange?: (id: string | number) => void
  class?: string
}

export interface ProgressProps {
  value?: number | Reactive<number | null | undefined>
  max?: number | Reactive<number>
  indeterminate?: boolean | Reactive<boolean>
  label?: unknown | Reactive<unknown>
  ariaLabel?: string
  showValue?: boolean | Reactive<boolean>
  tone?: 'accent' | 'success' | 'warning' | 'error' | Reactive<'accent' | 'success' | 'warning' | 'error'>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  gradient?: boolean | Reactive<boolean>
  gradientStart?: string | Reactive<string>
  gradientEnd?: string | Reactive<string>
  class?: string
  style?: StyleValue
}

export interface SpinnerProps {
  ariaLabel?: string | Reactive<string>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  tone?: 'accent' | 'success' | 'warning' | 'error' | Reactive<'accent' | 'success' | 'warning' | 'error'>
  class?: string
}

export interface SkeletonProps {
  width?: string | Reactive<string>
  height?: string | Reactive<string>
  variant?: 'text' | 'circle' | 'rect' | Reactive<'text' | 'circle' | 'rect'>
  radius?: 'small' | 'medium' | 'pill' | Reactive<'small' | 'medium' | 'pill'>
  ariaLabel?: string | Reactive<string>
  class?: string
}

export interface EmptyStateProps {
  title?: unknown | Reactive<unknown>
  description?: unknown | Reactive<unknown>
  children?: unknown
  icon?: unknown
  action?: unknown | (() => unknown)
  onRetry?: (event: MouseEvent) => void
  retryLabel?: string | Reactive<string>
  status?: 'empty' | 'filtered' | 'error' | Reactive<'empty' | 'filtered' | 'error'>
  class?: string
}

export interface IconButtonProps extends ButtonProps {
  label?: unknown
  icon?: unknown
}

export interface PaginationProps {
  page?: number | Signal<number>
  pageCount?: number | Reactive<number>
  totalItems?: number | Reactive<number>
  pageSize?: number | Signal<number>
  pageSizeOptions?: number[] | Reactive<number[]>
  siblingCount?: number | Reactive<number>
  showPageSize?: boolean | Reactive<boolean>
  ariaLabel?: string | Reactive<string>
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  class?: string
}

export interface AvatarProps {
  name?: string | Reactive<string>
  src?: string | Reactive<string>
  alt?: string | Reactive<string>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  variant?: 'circle' | 'square' | Reactive<'circle' | 'square'>
  status?: 'online' | 'away' | 'offline' | string
  statusSize?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  showStatus?: boolean | Reactive<boolean>
  class?: string
}

export interface TagProps {
  children?: unknown
  label?: unknown
  icon?: unknown | Reactive<unknown>
  tone?: 'neutral' | 'success' | 'warning' | 'error' | Reactive<'neutral' | 'success' | 'warning' | 'error'>
  removable?: boolean | Reactive<boolean>
  dismissible?: boolean | Reactive<boolean>
  onRemove?: (event: MouseEvent) => void
  onDismiss?: (event: MouseEvent) => void
  class?: string
}

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical' | Reactive<'horizontal' | 'vertical'>
  decorative?: boolean | Reactive<boolean>
  label?: unknown | Reactive<unknown>
  class?: string
}

export interface StackProps {
  children?: unknown
  direction?: 'row' | 'column' | Reactive<'row' | 'column'>
  gap?: 'none' | 'small' | 'medium' | 'large' | Reactive<'none' | 'small' | 'medium' | 'large'>
  align?: 'left' | 'center' | 'right' | Reactive<'left' | 'center' | 'right'>
  justify?: string
  wrap?: boolean | Reactive<boolean>
  class?: string
  style?: StyleValue
}

export interface GridProps {
  children?: unknown
  columns?: string | number
  minColumnWidth?: string
  gap?: 'none' | 'small' | 'medium' | 'large'
  class?: string
  style?: StyleValue
}

export interface TextFieldProps {
  value?: string | Reactive<string>
  onInput?: (event: Event) => void
  onChange?: (event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  id?: string
  name?: string
  placeholder?: string
  disabled?: boolean | Reactive<boolean>
  required?: boolean | Reactive<boolean>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  type?: string | Reactive<string>
  autocomplete?: string | Reactive<string>
  inputMode?: string | Reactive<string>
  maxLength?: number | Reactive<number>
  minLength?: number | Reactive<number>
  pattern?: string | Reactive<string>
  readOnly?: boolean | Reactive<boolean>
  ariaLabel?: string | Reactive<string>
  ariaDescription?: unknown
  ariaDescribedBy?: string | Reactive<string>
  ariaInvalid?: boolean | Reactive<boolean>
  error?: unknown
  class?: string
  style?: StyleValue
}

export interface CheckBoxProps {
  checked?: boolean | Reactive<boolean>
  children?: unknown
  onChange?: (event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  id?: string
  name?: string
  value?: string | number | Reactive<string | number>
  disabled?: boolean | Reactive<boolean>
  required?: boolean | Reactive<boolean>
  ariaLabel?: string | Reactive<string>
  ariaDescription?: unknown
  ariaDescribedBy?: string | Reactive<string>
  ariaInvalid?: boolean | Reactive<boolean>
  error?: unknown
  class?: string
  style?: StyleValue
}

export interface ColorPickerProps {
  value?: string | Reactive<string>
  label?: unknown | Reactive<unknown>
  ariaLabel?: string | Reactive<string>
  showValue?: boolean | Reactive<boolean>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  disabled?: boolean | Reactive<boolean>
  required?: boolean | Reactive<boolean>
  id?: string
  name?: string
  class?: string
  style?: StyleValue
  onInput?: (event: InputEvent) => void
  onChange?: (event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface DatePickerProps {
  value?: string | Reactive<string>
  label?: unknown | Reactive<unknown>
  ariaLabel?: string | Reactive<string>
  min?: string | Reactive<string>
  max?: string | Reactive<string>
  step?: number | Reactive<number>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  disabled?: boolean | Reactive<boolean>
  required?: boolean | Reactive<boolean>
  id?: string
  name?: string
  class?: string
  style?: StyleValue
  onInput?: (event: InputEvent) => void
  onChange?: (event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
}

export interface DateTimePickerProps extends DatePickerProps {}

export type CodeLanguage = 'javascript' | 'jsx' | 'typescript' | 'tsx' | 'json' | 'css' | 'html' | 'xml' | 'bash' | 'text'

export interface CodeViewerTab {
  id?: string
  label?: string
  language?: CodeLanguage | Reactive<CodeLanguage>
  filename?: string | Reactive<string>
  code?: string | Reactive<string>
}

export interface CodeViewerProps {
  code?: string | Reactive<string>
  language?: CodeLanguage | Reactive<CodeLanguage>
  filename?: string | Reactive<string>
  tabs?: ReadonlyArray<CodeViewerTab> | Reactive<ReadonlyArray<CodeViewerTab>>
  activeTab?: string | Reactive<string>
  defaultTab?: string
  lineNumbers?: boolean | Reactive<boolean>
  editable?: boolean | Reactive<boolean>
  copyable?: boolean | Reactive<boolean>
  syntaxColors?: Readonly<Record<string, string>> | Reactive<Readonly<Record<string, string>>>
  fontFamily?: string | Reactive<string>
  fontSize?: string | Reactive<string>
  lineHeight?: string | Reactive<string>
  tabSize?: number | Reactive<number>
  minHeight?: string | Reactive<string>
  maxHeight?: string | Reactive<string>
  style?: StyleValue
  class?: string
  id?: string
  ariaLabel?: string | Reactive<string>
  onChange?: (event: Event) => void
  onCopy?: (code: string, event: MouseEvent) => void
  onTabChange?: (tabId: string) => void
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
  options?: SelectOptionInput[] | Reactive<SelectOptionInput[]>
  value?: string | number | Reactive<string | number>
  onChange?: (event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onRender?: (option: SelectOption, context: SelectRenderContext) => unknown
  id?: string
  name?: string
  placeholder?: string
  disabled?: boolean | Reactive<boolean>
  required?: boolean | Reactive<boolean>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  placement?: SelectPlacement | Reactive<SelectPlacement>
  ariaLabel?: string | Reactive<string>
  ariaDescription?: unknown
  ariaDescribedBy?: string | Reactive<string>
  ariaInvalid?: boolean | Reactive<boolean>
  error?: unknown
  style?: StyleValue
  class?: string
}

export interface AutoCompleteOption extends SelectOption {}
export type AutoCompleteOptionInput = AutoCompleteOption | string | number
export type AutoCompleteRenderLocation = 'option'

export interface AutoCompleteRenderContext {
  location: AutoCompleteRenderLocation
  selected: boolean
  active: boolean
}

export interface AutoCompleteProps {
  options?: AutoCompleteOptionInput[] | Reactive<AutoCompleteOptionInput[]>
  value?: string | number | Reactive<string | number>
  label?: unknown | Reactive<unknown>
  placeholder?: string | Reactive<string>
  onInput?: (event: Event) => void
  onChange?: (event: Event) => void
  onSelect?: (option: AutoCompleteOption, event: MouseEvent | KeyboardEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onRender?: (option: AutoCompleteOption, context: AutoCompleteRenderContext) => unknown
  id?: string
  name?: string
  disabled?: boolean | Reactive<boolean>
  required?: boolean | Reactive<boolean>
  size?: 'small' | 'medium' | 'large' | Reactive<'small' | 'medium' | 'large'>
  placement?: 'bottom' | 'top' | Reactive<'bottom' | 'top'>
  openOnFocus?: boolean | Reactive<boolean>
  loading?: boolean | Reactive<boolean>
  loadingText?: string | Reactive<string>
  noOptionsText?: string | Reactive<string>
  minChars?: number | Reactive<number>
  ariaLabel?: string | Reactive<string>
  ariaDescription?: unknown
  ariaDescribedBy?: string | Reactive<string>
  ariaInvalid?: boolean | Reactive<boolean>
  error?: unknown
  style?: StyleValue
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

export interface TableQuery {
  filter?: string
  columnFilters?: Record<string, unknown>
  sort?: TableSort | null
  page?: number
  pageSize?: TablePageSize
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
  sort?: TableSort | Reactive<TableSort | null>
  selectedKeys?: Array<string | number> | Signal<Array<string | number>>
  columnFilters?: Record<string, unknown> | Signal<Record<string, unknown>>
  serverSide?: boolean | Signal<boolean>
  query?: TableQuery | Reactive<TableQuery>
  totalRows?: number | Reactive<number>
  error?: unknown | Reactive<unknown>
  filterDebounce?: number | Reactive<number>
  virtualized?: boolean | Reactive<boolean>
  virtualizationThreshold?: number | Reactive<number>
  virtualRowHeight?: number | Reactive<number>
  virtualOverscan?: number | Reactive<number>
  settings?: TableSettings | string | Reactive<TableSettings | string>
  storageKey?: string | Reactive<string>
  title?: unknown
  description?: unknown
  toolbar?: unknown | Reactive<unknown>
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
  emptyMessage?: unknown | Reactive<unknown>
  class?: string
  id?: string
  ariaLabel?: string | Reactive<string>
  onRowClick?: (row: Row, context: { key: string, rowIndex: number, event: MouseEvent | KeyboardEvent }) => void
  onSelectionChange?: (keys: string[], rows: Row[]) => void
  onFilterChange?: (filter: string, query: TableQuery) => void
  onSortChange?: (sort: TableSort | null) => void
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number | 'all') => void
  onQueryChange?: (query: TableQuery) => void | PromiseLike<unknown>
  onError?: (error: unknown, query: TableQuery) => void
  onRetry?: (query: TableQuery) => void | PromiseLike<unknown>
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
  id?: string
  href?: string
  onClick?: (event: MouseEvent) => void
  active?: boolean
  expanded?: boolean | Reactive<boolean>
  hasChildren?: boolean
  meta?: string | number | Reactive<string | number>
  children?: TreeViewItem[] | Reactive<TreeViewItem[]>
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

export interface ThemeBackgroundRecipe {
  palette: BackgroundPalette
  animation: BackgroundAnimation
  baseColor: string
  accentColor: string
  glowColor: string
}

export interface TreeViewModelDefinition {
  label: string
  description: string
  background: ThemeBackgroundRecipe
}

export const treeViewModels: Readonly<Record<TreeViewModel, TreeViewModelDefinition>>

export interface TreeViewProps {
  items?: TreeViewItem[] | Reactive<TreeViewItem[]>
  class?: string
  id?: string
  ariaLabel?: string
  model?: TreeViewModel | Reactive<TreeViewModel>
  itemVariant?: TreeViewItemVariant | Reactive<TreeViewItemVariant>
  expanded?: Readonly<Record<string, boolean>> | Reactive<Readonly<Record<string, boolean>>>
  filter?: boolean | Reactive<boolean>
  filterLabel?: string | Reactive<string>
  filterPlaceholder?: string | Reactive<string>
  expandCollapse?: boolean | Reactive<boolean>
  expandAllLabel?: string | Reactive<string>
  collapseAllLabel?: string | Reactive<string>
  onExpandedChange?: (expanded: Record<string, boolean>, item: TreeViewItem, expandedValue: boolean) => void
  onRender?: (item: TreeViewItem, context: TreeViewRenderContext) => unknown
}

export function Label(props?: LabelProps): TemplateResult
export function Background(props?: BackgroundProps): TemplateResult
export function Header(props?: HeaderProps): TemplateResult
export function Layout(props?: LayoutProps): TemplateResult
export function Navigator(props?: NavigatorProps): TemplateResult
export function Footer(props?: FooterProps): TemplateResult
export function Box(props?: BoxProps): TemplateResult
export function Button(props?: ButtonProps): TemplateResult
export function FormField(props?: FormFieldProps): TemplateResult
export function Alert(props?: AlertProps): TemplateResult
export function Notice(props?: AlertProps): TemplateResult
export function AutoComplete(props?: AutoCompleteProps): TemplateResult
export function Toast(props?: ToastInput): TemplateResult
export function ToastRegion(props?: ToastRegionProps): TemplateResult
export function createToastController(initial?: ToastItem[]): ToastController
export function Menu(props?: MenuProps): TemplateResult
export function DropdownMenu(props?: DropdownMenuProps): TemplateResult
export function Tooltip(props?: TooltipProps): TemplateResult
export function Popover(props?: PopoverProps): TemplateResult
export function Tabs(props?: TabsProps): TemplateResult
export function Progress(props?: ProgressProps): TemplateResult
export function Spinner(props?: SpinnerProps): TemplateResult
export function Skeleton(props?: SkeletonProps): TemplateResult
export function EmptyState(props?: EmptyStateProps): TemplateResult
export function IconButton(props?: IconButtonProps): TemplateResult
export function Pagination(props?: PaginationProps): TemplateResult
export function Avatar(props?: AvatarProps): TemplateResult
export function Tag(props?: TagProps): TemplateResult
export function Separator(props?: SeparatorProps): TemplateResult
export function Stack(props?: StackProps): TemplateResult
export function Grid(props?: GridProps): TemplateResult
export function Card(props?: CardProps): TemplateResult
export function Badge(props?: BadgeProps): TemplateResult
export function TextField(props?: TextFieldProps): TemplateResult
export function CheckBox(props?: CheckBoxProps): TemplateResult
export function ColorPicker(props?: ColorPickerProps): TemplateResult
export function CodeViewer(props?: CodeViewerProps): TemplateResult
export function DatePicker(props?: DatePickerProps): TemplateResult
export function DateTimePicker(props?: DateTimePickerProps): TemplateResult
export function Popup(props?: PopupProps): TemplateResult
export function Select(props?: SelectProps): TemplateResult
export function Table<Row = Record<string, unknown>>(props?: TableProps<Row>): TemplateResult
export function parseTableSettings(value: TableSettings | string | null | undefined): TableSettings | null
export function serializeTableSettings(settings: TableSettings): string
export function TreeView(props?: TreeViewProps): TemplateResult
export function PrismIcon(props?: IconProps): TemplateResult
export function MatrixIcon(props?: IconProps): TemplateResult
export function PrismMarkIcon(props?: IconProps): TemplateResult
export function EyeIcon(props?: IconProps): TemplateResult
export function TreeToggleIcon(props?: IconProps): TemplateResult
export function TreeBranchIcon(props?: IconProps): TemplateResult
export function TreeLeafIcon(props?: IconProps): TemplateResult
export function LiveStatusIcon(props?: IconProps): TemplateResult
export function ListBulletIcon(props?: IconProps): TemplateResult
export function PlusIcon(props?: IconProps): TemplateResult
export function MinusIcon(props?: IconProps): TemplateResult
export function CloseIcon(props?: IconProps): TemplateResult
export function SearchIcon(props?: IconProps): TemplateResult
export function FilterIcon(props?: IconProps): TemplateResult
export function MoreHorizontalIcon(props?: IconProps): TemplateResult
export function ArrowUpIcon(props?: IconProps): TemplateResult
export function ArrowDownIcon(props?: IconProps): TemplateResult
export function ArrowLeftIcon(props?: IconProps): TemplateResult
export function ArrowRightIcon(props?: IconProps): TemplateResult
export function ChevronDownIcon(props?: IconProps): TemplateResult
export function ChevronRightIcon(props?: IconProps): TemplateResult
export function MailIcon(props?: IconProps): TemplateResult
export function ChatIcon(props?: IconProps): TemplateResult
export function BellIcon(props?: IconProps): TemplateResult
export function LinkIcon(props?: IconProps): TemplateResult
export function ShareIcon(props?: IconProps): TemplateResult
export function SendIcon(props?: IconProps): TemplateResult
export function CheckIcon(props?: IconProps): TemplateResult
export function AlertIcon(props?: IconProps): TemplateResult
export function InfoIcon(props?: IconProps): TemplateResult
export function HelpIcon(props?: IconProps): TemplateResult
export function LoadingIcon(props?: IconProps): TemplateResult
export function LockIcon(props?: IconProps): TemplateResult
export function UnlockIcon(props?: IconProps): TemplateResult
export function FileIcon(props?: IconProps): TemplateResult
export function FolderIcon(props?: IconProps): TemplateResult
export function GroupIcon(props?: IconProps): TemplateResult
export function ImageIcon(props?: IconProps): TemplateResult
export function DownloadIcon(props?: IconProps): TemplateResult
export function UploadIcon(props?: IconProps): TemplateResult
export function CopyIcon(props?: IconProps): TemplateResult
export function CalendarIcon(props?: IconProps): TemplateResult
export function ClockIcon(props?: IconProps): TemplateResult
export function MapPinIcon(props?: IconProps): TemplateResult
export function UserIcon(props?: IconProps): TemplateResult
export function SettingsIcon(props?: IconProps): TemplateResult
export function SparkIcon(props?: IconProps): TemplateResult
export function GridIcon(props?: IconProps): TemplateResult
export function ListIcon(props?: IconProps): TemplateResult
export function CodeIcon(props?: IconProps): TemplateResult
export function TerminalIcon(props?: IconProps): TemplateResult
export function EyeOffIcon(props?: IconProps): TemplateResult
export function Pulse(props?: PulseProps): TemplateResult
export function isReactiveValue(value: unknown): boolean
export function readProp<T>(value: T | Reactive<T>, fallback?: T): T | undefined
export function normalizeBoolean(value: boolean | Reactive<boolean> | undefined, fallback?: boolean): boolean
export function normalizeString(value: string | Reactive<string> | undefined, fallback?: string): string
export function normalizeNumber(value: number | Reactive<number> | undefined, fallback: number, options?: { min?: number, max?: number }): number
export function normalizeChoice<T>(value: T | Reactive<T> | undefined, allowed: ReadonlySet<T>, fallback: T): T
export function normalizeArray<T>(value: T[] | Reactive<T[]> | undefined, fallback?: T[]): T[]
export function LabelComponent(props?: LabelProps): ComponentResult
export function BackgroundComponent(props?: BackgroundProps): ComponentResult
export function HeaderComponent(props?: HeaderProps): ComponentResult
export function LayoutComponent(props?: LayoutProps): ComponentResult
export function NavigatorComponent(props?: NavigatorProps): ComponentResult
export function FooterComponent(props?: FooterProps): ComponentResult
export function BoxComponent(props?: BoxProps): ComponentResult
export function ButtonComponent(props?: ButtonProps): ComponentResult
export function FormFieldComponent(props?: FormFieldProps): ComponentResult
export function AlertComponent(props?: AlertProps): ComponentResult
export function NoticeComponent(props?: AlertProps): ComponentResult
export function AutoCompleteComponent(props?: AutoCompleteProps): ComponentResult
export function ToastComponent(props?: ToastInput): ComponentResult
export function ToastRegionComponent(props?: ToastRegionProps): ComponentResult
export function MenuComponent(props?: MenuProps): ComponentResult
export function DropdownMenuComponent(props?: DropdownMenuProps): ComponentResult
export function TooltipComponent(props?: TooltipProps): ComponentResult
export function PopoverComponent(props?: PopoverProps): ComponentResult
export function TabsComponent(props?: TabsProps): ComponentResult
export function ProgressComponent(props?: ProgressProps): ComponentResult
export function SpinnerComponent(props?: SpinnerProps): ComponentResult
export function SkeletonComponent(props?: SkeletonProps): ComponentResult
export function EmptyStateComponent(props?: EmptyStateProps): ComponentResult
export function IconButtonComponent(props?: IconButtonProps): ComponentResult
export function PaginationComponent(props?: PaginationProps): ComponentResult
export function AvatarComponent(props?: AvatarProps): ComponentResult
export function TagComponent(props?: TagProps): ComponentResult
export function SeparatorComponent(props?: SeparatorProps): ComponentResult
export function StackComponent(props?: StackProps): ComponentResult
export function GridComponent(props?: GridProps): ComponentResult
export function CardComponent(props?: CardProps): ComponentResult
export function BadgeComponent(props?: BadgeProps): ComponentResult
export function TextFieldComponent(props?: TextFieldProps): ComponentResult
export function CheckBoxComponent(props?: CheckBoxProps): ComponentResult
export function ColorPickerComponent(props?: ColorPickerProps): ComponentResult
export function CodeViewerComponent(props?: CodeViewerProps): ComponentResult
export function DatePickerComponent(props?: DatePickerProps): ComponentResult
export function DateTimePickerComponent(props?: DateTimePickerProps): ComponentResult
export function PopupComponent(props?: PopupProps): ComponentResult
export function SelectComponent(props?: SelectProps): ComponentResult
export function TableComponent<Row = Record<string, unknown>>(props?: TableProps<Row>): ComponentResult
export function TreeViewComponent(props?: TreeViewProps): ComponentResult
export function PulseComponent(props?: PulseProps): ComponentResult
export const prismTheme: StyleDefinition
export const prismThemeValues: PrismThemeValues
export function readStorageValue(key: string, fallback?: string | null): string | null
export function writeStorageValue(key: string, value: unknown): boolean
export function removeStorageValue(key: string): boolean
