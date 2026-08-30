import { component, computed, html, signal } from '@mickyballadelli/matrix'
import { CopyIcon } from './icons.js'
import { copyText } from './clipboard.js'

const rootClassName = 'prism-code-viewer'
const baseClassName = 'prism-code'
const reactiveKinds = new Set(['signal', 'computed'])
const supportedLanguages = new Set(['javascript', 'jsx', 'typescript', 'tsx', 'json', 'css', 'html', 'xml', 'bash', 'text'])
const languageAliases = new Map([
  ['js', 'javascript'],
  ['mjs', 'javascript'],
  ['cjs', 'javascript'],
  ['ts', 'typescript'],
  ['mts', 'typescript'],
  ['cts', 'typescript'],
  ['sh', 'bash'],
  ['shell', 'bash'],
  ['zsh', 'bash'],
  ['plaintext', 'text'],
  ['plain', 'text'],
  ['txt', 'text']
])
const javascriptKeywords = new Set([
  'as', 'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
  'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
  'for', 'from', 'function', 'get', 'if', 'import', 'in', 'instanceof', 'let',
  'new', 'of', 'return', 'set', 'static', 'super', 'switch', 'throw', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield'
])
const typeKeywords = new Set(['boolean', 'interface', 'keyof', 'never', 'number', 'string', 'type', 'unknown', 'void'])
const booleanKeywords = new Set(['false', 'null', 'true', 'undefined'])
const markupLanguages = new Set(['html', 'xml', 'jsx', 'tsx'])

const isReactive = value => reactiveKinds.has(value?.kind)

const readValue = (value, fallback) => isReactive(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

function normalizeLanguage(value) {
  const language = String(value ?? 'javascript').toLocaleLowerCase()
  const normalizedLanguage = languageAliases.get(language) ?? language
  return supportedLanguages.has(normalizedLanguage) ? normalizedLanguage : 'text'
}

function pushToken(tokens, type, value) {
  if (!value) {
    return
  }

  const previous = tokens[tokens.length - 1]
  if (previous?.type === type) {
    previous.value += value
    return
  }

  tokens.push({ type, value })
}

function readQuoted(source, start, quote) {
  let index = start + 1

  while (index < source.length) {
    if (source[index] === '\\') {
      index += 2
      continue
    }

    if (source[index] === quote) {
      return index + 1
    }

    index += 1
  }

  return source.length
}

function readWord(source, start) {
  const match = source.slice(start).match(/^[A-Za-z_$][\w$-]*/)
  return match ? match[0] : ''
}

function readNumber(source, start) {
  const match = source.slice(start).match(/^(?:0[xob][\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?n?)/i)
  return match ? match[0] : ''
}

function readOperator(source, start) {
  const match = source.slice(start).match(/^(?:===|!==|=>|==|!=|<=|>=|&&|\|\||\?\?|\+\+|--|\+=|-=|\*=|\/=|\.\.\.|[=+\-*%!?<>:&|^~])/)
  return match ? match[0] : ''
}

function tokenizeCode(source, language) {
  const tokens = []
  const isMarkup = markupLanguages.has(language)
  const isCss = language === 'css'
  const isJavaScript = ['javascript', 'jsx', 'typescript', 'tsx', 'json'].includes(language)
  let index = 0
  let inMarkupTag = false
  let expectsTagName = false

  while (index < source.length) {
    if ((isJavaScript || isCss) && source.startsWith('//', index)) {
      const end = source.indexOf('\n', index)
      const nextIndex = end === -1 ? source.length : end
      pushToken(tokens, 'comment', source.slice(index, nextIndex))
      index = nextIndex
      continue
    }

    if (source.startsWith('/*', index)) {
      const end = source.indexOf('*/', index + 2)
      const nextIndex = end === -1 ? source.length : end + 2
      pushToken(tokens, 'comment', source.slice(index, nextIndex))
      index = nextIndex
      continue
    }

    const character = source[index]

    if (isMarkup && character === '<' && /[\w/>]/.test(source[index + 1] ?? '')) {
      const closing = source[index + 1] === '/'
      pushToken(tokens, 'tag', closing ? '</' : '<')
      index += closing ? 2 : 1
      inMarkupTag = true
      expectsTagName = true
      continue
    }

    if (isMarkup && character === '>' && inMarkupTag) {
      pushToken(tokens, 'punctuation', character)
      index += 1
      inMarkupTag = false
      expectsTagName = false
      continue
    }

    if (character === '`' || character === '"' || character === "'") {
      const nextIndex = readQuoted(source, index, character)
      pushToken(tokens, 'string', source.slice(index, nextIndex))
      index = nextIndex
      continue
    }

    const word = readWord(source, index)
    if (word) {
      const afterWord = source.slice(index + word.length)
      const nextCharacter = afterWord.match(/^\s*(.)/)?.[1]
      let type = 'plain'

      if (expectsTagName) {
        type = 'tag-name'
        expectsTagName = false
      } else if (inMarkupTag && /^\s*=/.test(afterWord)) {
        type = 'attribute'
      } else if (booleanKeywords.has(word)) {
        type = 'boolean'
      } else if (javascriptKeywords.has(word) || (language === 'typescript' || language === 'tsx') && typeKeywords.has(word)) {
        type = 'keyword'
      } else if (isCss && /^\s*:/.test(afterWord)) {
        type = 'property'
      } else if (source.slice(0, index).match(/\.\s*$/)) {
        type = 'property'
      } else if (nextCharacter === '(') {
        type = 'function'
      } else if (language === 'json' && /^\s*:/.test(afterWord)) {
        type = 'property'
      }

      pushToken(tokens, type, word)
      index += word.length
      continue
    }

    const number = readNumber(source, index)
    if (number) {
      pushToken(tokens, 'number', number)
      index += number.length
      continue
    }

    const operator = readOperator(source, index)
    if (operator) {
      pushToken(tokens, 'operator', operator)
      index += operator.length
      continue
    }

    if ('{}[]();,.:'.includes(character)) {
      pushToken(tokens, 'punctuation', character)
    } else {
      pushToken(tokens, 'plain', character)
    }
    index += 1
  }

  return tokens
}

function highlightCode(source, language) {
  return tokenizeCode(String(source ?? ''), language).map(token => token.type === 'plain'
    ? token.value
    : html`<span class="${baseClassName}-token ${baseClassName}-token-${token.type}">${token.value}</span>`)
}

function createCodeStyle(props) {
  return computed(() => {
    const syntaxColors = readValue(props.syntaxColors, {})
    const customStyle = readValue(props.style)
    const style = typeof customStyle === 'object' && customStyle !== null
      ? { ...customStyle }
      : customStyle

    const variables = {
      '--prism-code-font-family': readValue(props.fontFamily),
      '--prism-code-font-size': readValue(props.fontSize),
      '--prism-code-line-height': readValue(props.lineHeight),
      '--prism-code-tab-size': readValue(props.tabSize),
      '--prism-code-min-height': readValue(props.minHeight),
      '--prism-code-max-height': readValue(props.maxHeight)
    }

    for (const [name, value] of Object.entries(syntaxColors ?? {})) {
      variables[`--prism-code-${name}`] = value
    }

    if (typeof style === 'string') {
      const variableText = Object.entries(variables)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([name, value]) => `${name}: ${value}`)
        .join('; ')
      return [style, variableText].filter(Boolean).join('; ')
    }

    const nextStyle = style ?? {}
    return Object.fromEntries(Object.entries({ ...nextStyle, ...variables }).filter(([, value]) => value !== undefined && value !== null))
  })
}

function toCodeSignal(value, fallback = '') {
  return value?.kind === 'signal' ? value : signal(String(readValue(value, fallback)))
}

function tabLabel(tab) {
  if (tab.label) {
    return tab.label
  }

  const language = normalizeLanguage(tab.language)
  if (language === 'javascript') {
    return 'JavaScript'
  }

  if (language === 'jsx') {
    return 'JSX'
  }

  return language
}

function createTabs(props) {
  const tabs = readValue(props.tabs)
  if (Array.isArray(tabs) && tabs.length > 0) {
    return tabs.map((tab, index) => ({
      id: String(tab.id ?? tab.language ?? index),
      label: tabLabel(tab),
      language: tab.language ?? 'javascript',
      filename: tab.filename ?? props.filename ?? 'untitled.js',
      code: toCodeSignal(tab.code, '')
    }))
  }

  return [{
    id: 'source',
    label: tabLabel({ language: props.language }),
    language: props.language ?? 'javascript',
    filename: props.filename ?? 'untitled.js',
    code: toCodeSignal(props.code, '')
  }]
}

export function CodeViewer(props = {}) {
  const {
    lineNumbers = true,
    editable = true,
    copyable = true,
    syntaxColors = {},
    fontFamily,
    fontSize,
    lineHeight,
    tabSize,
    minHeight,
    maxHeight,
    style,
    class: classValue = '',
    ariaLabel = 'Code viewer',
    onChange,
    onCopy,
    onTabChange
  } = props

  const tabs = createTabs(props)
  const showTabs = tabs.length > 1
  const defaultTabId = tabs.some(tab => tab.id === 'jsx')
    ? 'jsx'
    : tabs[0].id
  const activeTabId = props.activeTab?.kind === 'signal'
    ? props.activeTab
    : signal(String(readValue(props.activeTab, readValue(props.defaultTab, defaultTabId))))
  const activeTab = computed(() => tabs.find(tab => tab.id === activeTabId.value) ?? tabs[0])
  const codeValue = computed(() => activeTab.value.code.value)
  const languageValue = computed(() => normalizeLanguage(readValue(activeTab.value.language, 'javascript')))
  const filenameValue = computed(() => readValue(activeTab.value.filename, 'untitled.js'))
  const highlightedCode = computed(() => highlightCode(codeValue.value, languageValue.value))
  const lineNumberMarkup = computed(() => Array.from(
    { length: String(codeValue.value ?? '').split('\n').length },
    (_, index) => html`<span class="${baseClassName}-gutter-line">${index + 1}</span>`
  ))
  const gutterClass = computed(() => readValue(lineNumbers, true)
    ? `${baseClassName}-gutter`
    : `${baseClassName}-gutter ${baseClassName}-gutter-hidden`)
  const styleValue = createCodeStyle({ syntaxColors, fontFamily, fontSize, lineHeight, tabSize, minHeight, maxHeight, style })
  const copyState = signal('ready')

  const selectTab = id => {
    activeTabId.value = id
    onTabChange?.(id)
  }

  const handleInput = event => {
    const tab = tabs.find(item => item.id === activeTabId.value) ?? tabs[0]
    tab.code.value = event.currentTarget.value
    onChange?.(event)
  }

  const syncScroll = event => {
    const input = event.currentTarget
    const body = input.parentElement
    const highlight = body?.querySelector(`.${baseClassName}-highlight`)
    const gutterLines = body?.parentElement?.querySelector(`.${baseClassName}-gutter-lines`)

    if (highlight) {
      highlight.style.transform = `translate(${-input.scrollLeft}px, ${-input.scrollTop}px)`
    }

    if (gutterLines) {
      gutterLines.style.transform = `translateY(${-input.scrollTop}px)`
    }
  }

  const handleCopy = async event => {
    const text = String(codeValue.value ?? '')

    try {
      await copyText(text)
      copyState.value = 'copied'
      onCopy?.(text, event)
    } catch {
      copyState.value = 'error'
    }

    setTimeout(() => {
      copyState.value = 'ready'
    }, 1400)
  }

  const copyLabel = computed(() => {
    if (copyState.value === 'copied') {
      return 'Code copied'
    }

    if (copyState.value === 'error') {
      return 'Copy failed'
    }

    return 'Copy code'
  })

  return html`
    <section class="${rootClassName} ${rootClassName}-language-${languageValue} ${showTabs ? `${rootClassName}-has-tabs` : ''} ${classValue}" style="${styleValue}" aria-label="${ariaLabel}" data-copy-state="${copyState}">
      <header class="${baseClassName}-header">
        <div class="${baseClassName}-file">
          <span class="${baseClassName}-file-dot" aria-hidden="true"></span>
          <span class="${baseClassName}-filename">${filenameValue}</span>
          ${showTabs ? null : html`<span class="${baseClassName}-language">${languageValue}</span>`}
        </div>
        ${showTabs ? html`
          <div class="${baseClassName}-tabs" role="tablist" aria-label="Source language">
            ${tabs.map(tab => html`
              <button
                type="button"
                role="tab"
                class="${baseClassName}-tab"
                aria-selected="${computed(() => activeTabId.value === tab.id ? 'true' : 'false')}"
                @click=${() => selectTab(tab.id)}
              >${tab.label}</button>
            `)}
          </div>
        ` : null}
        <button type="button" class="${baseClassName}-copy" aria-label="${copyLabel}" title="${copyLabel}" ?hidden=${computed(() => !readValue(copyable, true))} @click=${handleCopy}>${CopyIcon({ size: '1em' })}</button>
      </header>
      <div class="${baseClassName}-body">
        <div class="${gutterClass}" aria-hidden="true"><span class="${baseClassName}-gutter-lines">${lineNumberMarkup}</span></div>
        <div class="${baseClassName}-scroll">
          <pre class="${baseClassName}-highlight" aria-hidden="true"><code>${highlightedCode}</code></pre>
          <textarea class="${baseClassName}-input" spellcheck="false" wrap="off" aria-label="${ariaLabel} source" .value=${codeValue} ?readonly=${computed(() => !readValue(editable, true))} @input=${handleInput} @scroll=${syncScroll}></textarea>
        </div>
      </div>
    </section>
  `
}

export const CodeViewerComponent = props => component(CodeViewer, props)
