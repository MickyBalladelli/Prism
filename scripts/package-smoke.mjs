const prism = await import('prism-ui')
const requiredExports = ['Button', 'Card', 'Table', 'CodeViewer', 'prismTheme', 'serializeTableSettings']

for (const name of requiredExports) {
  if (!(name in prism)) {
    throw new Error(`Missing package export: ${name}`)
  }
}

console.log(`Package import smoke passed for ${requiredExports.length} exports`)
