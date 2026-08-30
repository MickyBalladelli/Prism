import { computed, html, signal } from '@mickyballadelli/matrix'
import { AlertIcon, Background, Badge, Box, Button, Card, CheckBox, ClockIcon, CodeViewer, DownloadIcon, FileIcon, FolderIcon, Header, ImageIcon, Label, MoreHorizontalIcon, PlusIcon, Popup, Pulse, Select, SendIcon, serializeTableSettings, SettingsIcon, SparkIcon, Table, TextField, TreeView } from '@mickyballadelli/prism'
import { codeLines, createCodePreview, playgroundRuntime } from '../playground-runtime.js'
import { showcaseThemeModel } from '../theme-picker.jsx'

export function PopupPlayground() {
  const popupOpen = signal(false)
  const popupSize = signal('medium')
  const popupPlacement = signal('center')
  const closeOnBackdrop = signal(true)
  const closeOnEscape = signal(true)
  const showClose = signal(true)
  const lastClose = signal('Not closed yet')
  const popupContent = html`
    <div class="popup-demo-content">
      <span class="popup-demo-orbit" aria-hidden="true">${SparkIcon({ size: '1.25em' })}</span>
      <div><p>Launch sequence</p><h3>Your new workspace is ready.</h3></div>
      <p>Invite the crew now, or keep exploring and share it when everything feels right.</p>
      <div class="popup-demo-stats">
        <span><strong>12</strong><small>components</small></span>
        <span><strong>5</strong><small>themes</small></span>
        <span><strong>∞</strong><small>possibilities</small></span>
      </div>
    </div>
  `
  const popupFooter = ({ close }) => html`
    ${Button({ variant: 'secondary', onClick: event => close('maybe-later', event), children: 'Maybe later' })}
    ${Button({ onClick: event => close('invite-crew', event), children: 'Invite the crew' })}
  `
  const codePreview = createCodePreview(codeLines(
    'html`',
    '  <div class="popup-playground">',
    '    ${Button({ onClick: () => popupOpen.value = true, children: "Open Popup" })}',
    '    <p class="playground-note">Last dismissal: <strong>${lastClose}</strong></p>',
    '    ${Popup({',
    '      open: popupOpen,',
    '      eyebrow: "Ready to launch",',
    '      title: "A bright new beginning",',
    '      ariaDescription: "Review this workspace before inviting collaborators.",',
    '      size: popupSize,',
    '      placement: popupPlacement,',
    '      closeOnBackdrop,',
    '      closeOnEscape,',
    '      showClose,',
    '      children: popupContent,',
    '      footer: popupFooter,',
    '      onClose: reason => lastClose.value = reason',
    '    })}',
    '  </div>',
    '`'
  ), {
    ...playgroundRuntime,
    popupOpen,
    popupSize,
    popupPlacement,
    closeOnBackdrop,
    closeOnEscape,
    showClose,
    popupContent,
    popupFooter,
    lastClose
  })

  return {
    javascript: codePreview.javascript,
    jsxCode: codePreview.jsxCode,
    recipeLanguage: codePreview.recipeLanguage,
    preview: codePreview.preview,
    controls: (
      <div class="settings-list">
        <label class="setting-label" htmlFor="popup-size">Size</label>
        <Select
          id="popup-size"
          value={popupSize}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'full', label: 'Full' }
          ]}
        />
        <label class="setting-label" htmlFor="popup-placement">Placement</label>
        <Select
          id="popup-placement"
          value={popupPlacement}
          options={[
            { value: 'center', label: 'Center' },
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' }
          ]}
        />
        <CheckBox checked={showClose}>Show close button</CheckBox>
        <CheckBox checked={closeOnBackdrop}>Close on backdrop</CheckBox>
        <CheckBox checked={closeOnEscape}>Close with Escape</CheckBox>
        <Button onClick={() => popupOpen.value = true}>Open Popup</Button>
        <p class="playground-note">Tab stays inside the Popup. Closing restores focus to the button that opened it.</p>
      </div>
    )
  }
}
