import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../src/components/', import.meta.url))
const sources = Object.fromEntries(await Promise.all([
  ['popup', 'popup.js'],
  ['select', 'select.js'],
  ['table', 'table.js'],
  ['tree', 'tree-view.js'],
  ['menu', 'menu.js'],
  ['tabs', 'tabs.js'],
  ['iconButton', 'icon-button.js']
].map(async ([name, file]) => [name, await readFile(new URL(file, `file://${root}/`), 'utf8')])))

const checks = [
  ['Popup dialog semantics', sources.popup, /role="dialog"/],
  ['Popup accessible naming', sources.popup, /aria-labelledby|aria-label/],
  ['Select listbox semantics', sources.select, /role="listbox"/],
  ['Table busy semantics', sources.table, /aria-busy/],
  ['Tree semantics', sources.tree, /role="tree"/],
  ['Menu semantics', sources.menu, /role="menu"/],
  ['Tabs semantics', sources.tabs, /role="tablist"/],
  ['Icon button naming', sources.iconButton, /ariaLabel|aria-label/]
]

for (const [label, source, pattern] of checks) {
  if (!pattern.test(source)) {
    throw new Error(`Accessibility smoke failed: ${label}`)
  }
}

console.log(`Accessibility smoke passed for ${checks.length} contracts`)
