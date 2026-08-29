import test from 'node:test'
import assert from 'node:assert/strict'
import { Button, CheckBox, TextField } from '../src/index.js'
import { signal } from 'matrix'

test('components expose Matrix templates', () => {
  const text = TextField({ placeholder: 'Name' })
  const checkbox = CheckBox({ children: 'Ready' })
  const button = Button({ children: 'Press me' })
  const secondaryButton = Button({ children: 'Later', variant: 'secondary' })
  const tertiaryButton = Button({ children: 'Soon', variant: 'tertiary' })
  const errorButton = Button({ children: 'Delete', variant: 'error' })
  const successButton = Button({ children: 'Saved', variant: 'success' })

  assert.equal(typeof text, 'object')
  assert.equal(typeof checkbox, 'object')
  assert.equal(typeof button, 'object')
  assert.equal(typeof secondaryButton, 'object')
  assert.equal(typeof tertiaryButton, 'object')
  assert.equal(typeof errorButton, 'object')
  assert.equal(typeof successButton, 'object')
  assert.equal(text.values.length, 9)
  assert.equal(button.values.includes('primary'), true)
  assert.equal(secondaryButton.values.includes('secondary'), true)
  assert.equal(tertiaryButton.values.includes('tertiary'), true)
  assert.equal(errorButton.values.includes('error'), true)
  assert.equal(successButton.values.includes('success'), true)
})

test('components accept writable signals', () => {
  const value = signal('Ada')
  const checked = signal(false)

  assert.equal(TextField({ value }).values.includes(value), true)
  assert.equal(CheckBox({ checked }).values.some(value => value?.values?.includes(checked)), true)
})
