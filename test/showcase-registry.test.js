import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { componentGroups, componentRegistry } from '../examples/showcase/src/component-registry.js'
import { exampleRegistry } from '../examples/showcase/src/example-registry.js'

const examplePagesDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../examples/showcase/src/pages/examples')

test('showcase registry has unique routes and keys', () => {
  const keys = componentRegistry.map(component => component.key)
  const paths = componentRegistry.map(component => component.path)

  assert.equal(new Set(keys).size, componentRegistry.length)
  assert.equal(new Set(paths).size, componentRegistry.length)
  assert.ok(componentRegistry.every(component => component.path === `/components/${component.key}`))
})

test('showcase registry covers every declared component group', () => {
  const groups = new Set(componentRegistry.map(component => component.eyebrow))

  assert.ok(componentGroups.every(group => groups.has(group.label)))
  assert.ok(componentRegistry.every(component => component.title && component.description))
})

test('each application registry entry has a Prism page source', () => {
  for (const example of exampleRegistry) {
    const fileName = `${example.key}-page.jsx`
    const source = readFileSync(resolve(examplePagesDirectory, fileName), 'utf8')
    assert.match(source, /from ['"]prism-ui['"]$/m)
    assert.match(source, /ExamplePageShell/)
  }
})
