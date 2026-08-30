import assert from 'node:assert/strict'
import test from 'node:test'
import { compileJsx, jsRecipeToJsx } from '../examples/showcase/src/recipe-syntax.js'

test('converts a component recipe with string props and children', () => {
  const source = jsRecipeToJsx('Button({ children: "Save", variant: "primary" })')

  assert.match(source, /^<Button variant="primary">/)
  assert.match(source, /\{"Save"\}/)
  assert.match(source, /<\/Button>$/)
})

test('converts nested component calls and tagged templates', () => {
  const source = jsRecipeToJsx('html`<Card>${Button({ children: "Open" })}</Card>`')

  assert.match(source, /^<Card>/)
  assert.match(source, /<Button>/)
  assert.match(source, /<\/Card>$/)
})

test('preserves arrays, expressions, and JSX attributes', () => {
  const source = compileJsx('<List items={[1, 2, 3]} aria-label={label}>{items.map(item => <span>{item}</span>)}</List>')

  assert.match(source, /items: \[1, 2, 3\]/)
  assert.match(source, /"aria-label": label/)
  assert.match(source, /items\.map\(item => jsx\(span/)
})

test('reports malformed JSX with a useful closing-tag error', () => {
  assert.throws(() => compileJsx('<Card><Button>Save</Card>'), /Expected <\/Button>/)
  assert.throws(() => compileJsx('<Button disabled={}>Save</Button>'), /Unexpected|Invalid JSX/)
})
