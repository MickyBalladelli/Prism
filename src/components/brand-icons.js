import { html } from 'matrix'

function brandIconProps(props = {}, name) {
  const {
    class: classValue = '',
    size = '1em',
    ariaLabel
  } = props

  return {
    className: [`prism-icon`, `prism-brand-icon`, `prism-${name}-icon`, classValue].filter(Boolean).join(' '),
    size,
    ariaHidden: ariaLabel === undefined ? 'true' : 'false',
    role: ariaLabel === undefined ? undefined : 'img',
    ariaLabel
  }
}

export function PrismIcon(props = {}) {
  const icon = brandIconProps(props, 'prism')

  return html`
    <svg class="${icon.className}" width="${icon.size}" height="${icon.size}" viewBox="0 0 32 32" fill="none" aria-hidden="${icon.ariaHidden}" role="${icon.role}" aria-label="${icon.ariaLabel}" focusable="false">
      <path d="M2 11.25h7.15" stroke="#8ED9FF" stroke-width="2.2" stroke-linecap="round"></path>
      <path d="m9.15 11.25 6.4-7.75 7.3 21.9H7.15l2-14.15Z" fill="#6D5EF7"></path>
      <path d="m15.55 3.5-1.8 10.15-4.6-2.4 6.4-7.75Z" fill="#D7D1FF"></path>
      <path d="m13.75 13.65 1.8-10.15 2.1 10.15h-3.9Z" fill="#A99DFF"></path>
      <path d="m7.15 25.4 6.6-11.75 1.8 11.75h-8.4Z" fill="#5141C2"></path>
      <path d="m13.75 13.65 3.9 0 5.2 11.75h-7.3l-1.8-11.75Z" fill="#8878F4"></path>
      <path d="m18.2 14.75 11-5" stroke="#FF8876" stroke-width="2.1" stroke-linecap="round"></path>
      <path d="m18.65 16.2 11.7-.15" stroke="#FFC45D" stroke-width="2.1" stroke-linecap="round"></path>
      <path d="m18.2 17.65 11 5" stroke="#68D4C3" stroke-width="2.1" stroke-linecap="round"></path>
      <path d="m9.15 11.25 6.4-7.75 7.3 21.9H7.15l2-14.15Z" stroke="rgb(255 255 255 / 62%)" stroke-width=".8" stroke-linejoin="round"></path>
    </svg>
  `
}

export function MatrixIcon(props = {}) {
  const icon = brandIconProps(props, 'matrix')

  return html`
    <svg class="${icon.className}" width="${icon.size}" height="${icon.size}" viewBox="0 0 32 32" fill="none" aria-hidden="${icon.ariaHidden}" role="${icon.role}" aria-label="${icon.ariaLabel}" focusable="false">
      <rect x="2.25" y="2.25" width="27.5" height="27.5" rx="8" fill="#111A32"></rect>
      <path d="M7.25 24.75V7.5L16 16l8.75-8.5v17.25" stroke="#8A7BF5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M7.25 7.5 16 16l8.75-8.5" stroke="#83D9FF" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"></path>
      <rect x="5" y="5.25" width="4.5" height="4.5" rx="1.35" fill="#A99DFF"></rect>
      <rect x="13.75" y="13.75" width="4.5" height="4.5" rx="1.35" fill="#68D4C3"></rect>
      <rect x="22.5" y="5.25" width="4.5" height="4.5" rx="1.35" fill="#FF8876"></rect>
      <rect x="5" y="22.25" width="4.5" height="4.5" rx="1.35" fill="#6D5EF7"></rect>
      <rect x="22.5" y="22.25" width="4.5" height="4.5" rx="1.35" fill="#FFC45D"></rect>
      <rect x="2.65" y="2.65" width="26.7" height="26.7" rx="7.6" stroke="rgb(153 174 255 / 32%)" stroke-width=".8"></rect>
    </svg>
  `
}
