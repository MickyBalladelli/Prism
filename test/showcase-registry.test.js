import assert from 'node:assert/strict'
import test from 'node:test'
import { componentGroups, componentRegistry } from '../examples/showcase/src/component-registry.js'

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
