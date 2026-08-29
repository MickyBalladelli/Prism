import test from 'node:test'
import assert from 'node:assert/strict'
import { Background, Box, Button, Card, CheckBox, CodeViewer, Label, TextField, TreeView } from '../src/index.js'
import { signal } from 'matrix'

test('components expose Matrix templates', () => {
  const background = Background({ children: 'Backdrop' })
  const text = TextField({ placeholder: 'Name' })
  const checkbox = CheckBox({ children: 'Ready' })
  const button = Button({ children: 'Press me' })
  const secondaryButton = Button({ children: 'Later', variant: 'secondary' })
  const tertiaryButton = Button({ children: 'Soon', variant: 'tertiary' })
  const errorButton = Button({ children: 'Delete', variant: 'error' })
  const successButton = Button({ children: 'Saved', variant: 'success' })
  const treeView = TreeView({ items: [{ label: 'Overview' }, { label: 'Forms', children: [{ label: 'Button' }] }] })

  assert.equal(typeof background, 'object')
  assert.equal(typeof text, 'object')
  assert.equal(typeof checkbox, 'object')
  assert.equal(typeof button, 'object')
  assert.equal(typeof secondaryButton, 'object')
  assert.equal(typeof tertiaryButton, 'object')
  assert.equal(typeof errorButton, 'object')
  assert.equal(typeof successButton, 'object')
  assert.equal(typeof treeView, 'object')
  assert.equal(text.values.length, 9)
  assert.equal(button.values.includes('primary'), true)
  assert.equal(secondaryButton.values.includes('secondary'), true)
  assert.equal(tertiaryButton.values.includes('tertiary'), true)
  assert.equal(errorButton.values.includes('error'), true)
  assert.equal(successButton.values.includes('success'), true)
  assert.equal(treeView.values.includes('Tree view'), true)
})

test('components accept writable signals', () => {
  const value = signal('Ada')
  const checked = signal(false)

  assert.equal(TextField({ value }).values.includes(value), true)
  assert.equal(CheckBox({ checked }).values.some(value => value?.values?.includes(checked)), true)
})

test('CodeViewer uses themed class names and supports line number toggles', () => {
  const viewer = CodeViewer({ code: 'const answer = 42', language: 'js', lineNumbers: false })

  assert.equal(viewer.values.includes('prism-code-viewer'), true)
  assert.equal(viewer.values.includes('prism-code'), true)

  const gutterClass = viewer.values.find(value => value?.kind === 'computed' && typeof value.value === 'string' && value.value.includes('prism-code-gutter'))
  assert.equal(gutterClass?.value, 'prism-code-gutter prism-code-gutter-hidden')

  const normalizedLanguage = viewer.values.find(value => value?.kind === 'computed' && value.value === 'javascript')
  assert.equal(Boolean(normalizedLanguage), true)

  const highlightedTokens = viewer.values.find(value => value?.kind === 'computed'
    && Array.isArray(value.value)
    && value.value.some(item => item?.values?.includes?.('keyword')))
  assert.equal(Boolean(highlightedTokens), true)
})

test('Box and Card support sticky layout props', () => {
  const box = Box({ children: 'Sticky box', sticky: true, stickyTop: '1.5rem' })
  const card = Card({ children: 'Sticky card', sticky: true, stickyTop: '2rem' })

  const boxStyle = box.values.find(value => value?.kind === 'computed' && typeof value.value === 'object' && value.value.position === 'sticky')
  const cardStyle = card.values.find(value => value?.kind === 'computed' && typeof value.value === 'object' && value.value.position === 'sticky')

  assert.equal(boxStyle?.value.position, 'sticky')
  assert.equal(boxStyle?.value.top, '1.5rem')
  assert.equal(boxStyle?.value.alignSelf, 'start')
  assert.equal(cardStyle?.value.position, 'sticky')
  assert.equal(cardStyle?.value.top, '2rem')
  assert.equal(cardStyle?.value.alignSelf, 'start')
})

test('Background exposes a reusable animated surface', () => {
  const background = Background({
    palette: 'aurora',
    intensity: 1.4,
    children: 'Backdrop'
  })

  const styleValue = background.values.find(value => value?.kind === 'computed' && typeof value.value === 'object' && value.value['--prism-background-accent'])
  assert.equal(styleValue?.value['--prism-background-accent'], '#6d5ef7')

  const classNames = background.values.find(value => value?.kind === 'computed' && typeof value.value === 'string' && value.value.includes('prism-background-live'))
  assert.equal(classNames?.value.includes('prism-background'), true)
  assert.equal(classNames?.value.includes('prism-background-aurora'), true)

  const canvasLayer = background.values.find(value => value?.kind === 'computed' && value.value?.render)
  assert.equal(typeof canvasLayer?.value.render, 'function')
  assert.equal(canvasLayer?.value.props.intensity, 1.4)
  assert.equal(classNames?.value.includes('prism-background-veil'), true)
})

test('Background can switch named motion recipes', () => {
  const sanctum = Background({
    animation: 'sanctum',
    children: 'Backdrop'
  })
  const mist = Background({
    animation: 'mist',
    children: 'Backdrop'
  })

  const sanctumClass = sanctum.values.find(value => value?.kind === 'computed' && typeof value.value === 'string' && value.value.includes('prism-background-sanctum'))
  assert.equal(sanctumClass?.value.includes('prism-background-sanctum'), true)

  const mistClass = mist.values.find(value => value?.kind === 'computed' && typeof value.value === 'string' && value.value.includes('prism-background-mist'))
  assert.equal(mistClass?.value.includes('prism-background-mist'), true)

  const canvasLayer = mist.values.find(value => value?.kind === 'computed' && value.value?.render)
  assert.equal(canvasLayer?.value.props.animation, 'mist')
})

test('Background removes the motion layer when animation is off', () => {
  const background = Background({
    palette: 'aurora',
    animated: false,
    children: 'Backdrop'
  })

  const classNames = background.values.find(value => value?.kind === 'computed' && typeof value.value === 'string' && value.value.includes('prism-background-static'))
  assert.equal(classNames?.value.includes('prism-background-aurora'), true)

  assert.equal(background.values.some(value => value?.kind === 'computed' && value.value?.render), false)
})

test('Label supports typography props and an always-visible lock', () => {
  const label = Label({
    children: 'Over the motion',
    size: 'display',
    font: 'serif',
    weight: 'bold',
    alwaysVisible: true,
    outlineColor: '#f3eee4',
    backgroundColor: '#0a1020'
  })

  const classNames = label.values.find(value => value?.kind === 'computed' && typeof value.value === 'string' && value.value.includes('prism-label'))
  assert.equal(classNames?.value.includes('prism-label-size-display'), true)
  assert.equal(classNames?.value.includes('prism-label-font-serif'), true)
  assert.equal(classNames?.value.includes('prism-label-weight-bold'), true)
  assert.equal(classNames?.value.includes('prism-label-always-visible'), true)

  const styleValue = label.values.find(value => value?.kind === 'computed' && typeof value.value === 'object' && value.value['--prism-label-stroke'])
  assert.equal(styleValue?.value['--prism-label-stroke'], '#f3eee4')
  assert.equal(styleValue?.value['--prism-label-color'], '#0a1020')
})

test('Label can associate with a control', () => {
  const label = Label({ htmlFor: 'name', children: 'Name' })
  assert.equal(label.values.includes('name'), true)
})
