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

export function Box(props?: BoxProps): unknown
export function Button(props?: ButtonProps): unknown
export function Card(props?: CardProps): unknown
export function TextField(props?: TextFieldProps): unknown
export function CheckBox(props?: CheckBoxProps): unknown
export function BoxComponent(props?: BoxProps): ComponentResult
export function ButtonComponent(props?: ButtonProps): ComponentResult
export function CardComponent(props?: CardProps): ComponentResult
export function TextFieldComponent(props?: TextFieldProps): ComponentResult
export function CheckBoxComponent(props?: CheckBoxProps): ComponentResult
export const prismTheme: StyleDefinition
export const prismThemeValues: PrismThemeValues
