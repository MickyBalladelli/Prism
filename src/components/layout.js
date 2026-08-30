import { component, computed, html } from '@mickyballadelli/matrix'
import { readReactiveValue } from '../reactive.js'

const baseClassName = 'prism-layout'
const readValue = readReactiveValue

export function Layout(props = {}) {
  const {
    children = [],
    class: classValue = '',
    contentClass = '',
    footer,
    footerClass = '',
    header,
    headerClass = '',
    id,
    navigator,
    navigatorClass = '',
    role,
    bodyClass = ''
  } = props

  const classNames = computed(() => [baseClassName, readValue(classValue, '')].filter(Boolean).join(' '))

  return html`
    <div class="${classNames}" id="${id}" role="${role}">
      <div class="prism-layout-header ${readValue(headerClass, '')}">${header}</div>
      <div class="prism-layout-body ${readValue(bodyClass, '')}">
        <div class="prism-layout-navigator ${readValue(navigatorClass, '')}">${navigator}</div>
        <div class="prism-layout-content ${readValue(contentClass, '')}">${children}</div>
      </div>
      <div class="prism-layout-footer ${readValue(footerClass, '')}">${footer}</div>
    </div>
  `
}

export const LayoutComponent = props => component(Layout, props)
