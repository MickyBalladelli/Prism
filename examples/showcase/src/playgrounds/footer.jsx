import { component, html } from '@mickyballadelli/matrix'
import { ArrowRightIcon, Footer } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'

export function FooterPlayground() {
  const codePreview = createCodePreview(codeLines(
    'Footer({',
    '  leading: "Prism UI",',
    '  trailing: "Built with Matrix"',
    '})'
  ), { ...playgroundRuntime })

  return {
    ...codePreview,
    preview: html`<div id="footer-demo" class="p2-footer-demo">${component(Footer, {
      leading: html`<span><strong>Prism UI</strong><small>Stable component system</small></span>`,
      trailing: html`<a href="#footer-demo" class="p2-footer-link">Read the contract ${ArrowRightIcon({ size: '.9em' })}</a>`
    })}</div>`,
    controls: <div class="settings-list"><p class="playground-note">Footer supports a simple content slot or balanced leading and trailing regions.</p></div>
  }
}
