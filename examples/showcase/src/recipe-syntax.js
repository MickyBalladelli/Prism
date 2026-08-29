function skipString(source, index) {
  const quote = source[index]
  let cursor = index + 1

  while (cursor < source.length) {
    if (source[cursor] === '\\') {
      cursor += 2
      continue
    }

    if (source[cursor] === quote) {
      return cursor + 1
    }

    cursor += 1
  }

  return source.length
}

function skipTemplate(source, index) {
  let cursor = index + 1

  while (cursor < source.length) {
    if (source[cursor] === '\\') {
      cursor += 2
      continue
    }

    if (source[cursor] === '`') {
      return cursor + 1
    }

    if (source[cursor] === '$' && source[cursor + 1] === '{') {
      cursor = skipBalanced(source, cursor + 1, '{', '}')
      continue
    }

    cursor += 1
  }

  return source.length
}

function skipLineComment(source, index) {
  const end = source.indexOf('\n', index)
  return end === -1 ? source.length : end
}

function skipBlockComment(source, index) {
  const end = source.indexOf('*/', index + 2)
  return end === -1 ? source.length : end + 2
}

function skipBalanced(source, index, open, close) {
  let depth = 0
  let cursor = index

  while (cursor < source.length) {
    const character = source[cursor]

    if (character === '"' || character === "'") {
      cursor = skipString(source, cursor)
      continue
    }

    if (character === '`') {
      cursor = skipTemplate(source, cursor)
      continue
    }

    if (character === '/' && source[cursor + 1] === '/') {
      cursor = skipLineComment(source, cursor)
      continue
    }

    if (character === '/' && source[cursor + 1] === '*') {
      cursor = skipBlockComment(source, cursor)
      continue
    }

    if (character === open) {
      depth += 1
    } else if (character === close) {
      depth -= 1
      if (depth === 0) {
        return cursor + 1
      }
    }

    cursor += 1
  }

  return source.length
}

function skipWhitespace(source, index) {
  let cursor = index
  while (cursor < source.length && /\s/.test(source[cursor])) {
    cursor += 1
  }
  return cursor
}

function indentBlock(value, depth = 1) {
  const pad = '  '.repeat(depth)
  return String(value)
    .split('\n')
    .map(line => line.length ? pad + line : line)
    .join('\n')
}

function splitTopLevel(source, delimiter) {
  const parts = []
  let start = 0
  let cursor = 0

  while (cursor < source.length) {
    const character = source[cursor]

    if (character === '"' || character === "'") {
      cursor = skipString(source, cursor)
      continue
    }

    if (character === '`') {
      cursor = skipTemplate(source, cursor)
      continue
    }

    if (character === '{') {
      cursor = skipBalanced(source, cursor, '{', '}')
      continue
    }

    if (character === '(') {
      cursor = skipBalanced(source, cursor, '(', ')')
      continue
    }

    if (character === '[') {
      cursor = skipBalanced(source, cursor, '[', ']')
      continue
    }

    if (character === delimiter) {
      parts.push(source.slice(start, cursor))
      cursor += 1
      start = cursor
      continue
    }

    cursor += 1
  }

  parts.push(source.slice(start))
  return parts.map(part => part.trim()).filter(Boolean)
}

function findTopLevelColon(source) {
  let cursor = 0

  while (cursor < source.length) {
    const character = source[cursor]

    if (character === '"' || character === "'") {
      cursor = skipString(source, cursor)
      continue
    }

    if (character === '`') {
      cursor = skipTemplate(source, cursor)
      continue
    }

    if (character === '{') {
      cursor = skipBalanced(source, cursor, '{', '}')
      continue
    }

    if (character === '(') {
      cursor = skipBalanced(source, cursor, '(', ')')
      continue
    }

    if (character === '[') {
      cursor = skipBalanced(source, cursor, '[', ']')
      continue
    }

    if (character === ':') {
      return cursor
    }

    cursor += 1
  }

  return -1
}

function matchTaggedTemplate(source, tag = 'html') {
  const match = source.match(new RegExp(`^${tag}\\s*\``))
  if (!match) {
    return null
  }

  const tick = match[0].length - 1
  const end = skipTemplate(source, tick)
  if (source.slice(end).trim()) {
    return null
  }

  return source.slice(tick + 1, end - 1)
}

function matchComponentCall(source) {
  const match = source.match(/^([A-Z][A-Za-z0-9]*)\s*\(/)
  if (!match) {
    return null
  }

  const openParen = match[0].length - 1
  let cursor = skipWhitespace(source, openParen + 1)
  if (source[cursor] !== '{') {
    return null
  }

  const objectEnd = skipBalanced(source, cursor, '{', '}')
  cursor = skipWhitespace(source, objectEnd)
  if (source[cursor] !== ')') {
    return null
  }

  if (source.slice(cursor + 1).trim()) {
    return null
  }

  return {
    name: match[1],
    body: source.slice(skipWhitespace(source, openParen + 1) + 1, objectEnd - 1)
  }
}

function convertEmbedded(source) {
  let output = ''
  let cursor = 0

  while (cursor < source.length) {
    if (source.startsWith('html`', cursor) || source.startsWith('html `', cursor)) {
      const tick = source.indexOf('`', cursor)
      const end = skipTemplate(source, tick)
      output += convertHtmlInner(source.slice(tick + 1, end - 1)).trim()
      cursor = end
      continue
    }

    const call = source.slice(cursor).match(/^([A-Z][A-Za-z0-9]*)\s*\(/)
    if (call) {
      const open = cursor + call[0].length - 1
      const inner = skipWhitespace(source, open + 1)
      if (source[inner] === '{') {
        const objectEnd = skipBalanced(source, inner, '{', '}')
        const close = skipWhitespace(source, objectEnd)
        if (source[close] === ')') {
          output += convertComponentCall(call[1], source.slice(inner + 1, objectEnd - 1))
          cursor = close + 1
          continue
        }
      }
    }

    output += source[cursor]
    cursor += 1
  }

  return output
}

function convertHtmlInner(inner) {
  let output = ''
  let cursor = 0

  while (cursor < inner.length) {
    const attrMatch = inner.slice(cursor).match(/^([A-Za-z_:][\w:-]*)(\s*=\s*)(["'])/)
    if (attrMatch) {
      const quote = attrMatch[3]
      const valueStart = cursor + attrMatch[0].length
      let valueEnd = valueStart
      let interpolations = 0

      while (valueEnd < inner.length && inner[valueEnd] !== quote) {
        if (inner.startsWith('${', valueEnd)) {
          interpolations += 1
          valueEnd = skipBalanced(inner, valueEnd + 1, '{', '}')
          continue
        }

        if (inner[valueEnd] === '\\') {
          valueEnd += 2
          continue
        }

        valueEnd += 1
      }

      const rawValue = inner.slice(valueStart, valueEnd)
      const wholeInterp = interpolations === 1 && rawValue.startsWith('${') && skipBalanced(rawValue, 1, '{', '}') === rawValue.length

      if (wholeInterp) {
        const expr = rawValue.slice(2, -1)
        output += `${attrMatch[1]}=${formatJsxExpr(convertExpression(expr.trim()))}`
      } else if (interpolations > 0) {
        output += `${attrMatch[1]}={\`${rawValue.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`}`
      } else {
        output += attrMatch[0] + rawValue + quote
      }

      cursor = valueEnd + (inner[valueEnd] === quote ? 1 : 0)
      continue
    }

    if (inner.startsWith('${', cursor)) {
      const end = skipBalanced(inner, cursor + 1, '{', '}')
      const expr = inner.slice(cursor + 2, end - 1)
      const converted = convertExpression(expr.trim())
      output += converted.startsWith('<') ? converted : `{${converted}}`
      cursor = end
      continue
    }

    output += inner[cursor]
    cursor += 1
  }

  return output
}

function formatJsxExpr(value) {
  const converted = String(value).trim()
  if (converted.startsWith('<') || converted.startsWith('<>')) {
    return `{${converted}}`
  }

  return `{${converted}}`
}

function convertChildrenValue(value) {
  const trimmed = value.trim()

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const items = splitTopLevel(trimmed.slice(1, -1), ',')
    return items.map(item => {
      const converted = convertExpression(item).trim()
      return converted.startsWith('<') ? converted : `{${converted}}`
    }).join('\n')
  }

  const converted = convertExpression(trimmed).trim()
  return converted.startsWith('<') ? converted : `{${converted}}`
}

function convertComponentCall(name, body) {
  const props = splitTopLevel(body, ',').map(part => {
    const colon = findTopLevelColon(part)
    if (colon === -1) {
      return { key: part.trim(), shorthand: true }
    }

    return {
      key: part.slice(0, colon).trim(),
      value: part.slice(colon + 1).trim()
    }
  })

  const childrenProp = props.find(prop => prop.key === 'children' && !prop.shorthand)
  const attrs = props.filter(prop => prop !== childrenProp)
  const attrLines = attrs.map(prop => {
    if (prop.shorthand) {
      return `${prop.key}={${prop.key}}`
    }

    const value = prop.value
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      const unquoted = value.slice(1, -1)
      return `${prop.key}="${unquoted.replace(/"/g, '\\"')}"`
    }

    const converted = convertExpression(value)
    return `${prop.key}=${formatJsxExpr(converted)}`
  })

  const children = childrenProp ? convertChildrenValue(childrenProp.value).trim() : ''

  if (!children) {
    if (attrLines.length === 0) {
      return `<${name} />`
    }

    if (attrLines.length <= 2 && attrLines.every(line => !line.includes('\n') && line.length < 48)) {
      return `<${name} ${attrLines.join(' ')} />`
    }

    return `<${name}\n${indentBlock(attrLines.join('\n'))}\n/>`
  }

  const opening = attrLines.length === 0
    ? `<${name}>`
    : attrLines.length <= 2 && attrLines.every(line => !line.includes('\n') && line.length < 48)
      ? `<${name} ${attrLines.join(' ')}>`
      : `<${name}\n${indentBlock(attrLines.join('\n'))}\n>`

  return `${opening}\n${indentBlock(children)}\n</${name}>`
}

export function jsRecipeToJsx(source) {
  return convertExpression(String(source ?? '').trim()).trim()
}

function convertExpression(source) {
  const trimmed = String(source ?? '').trim()
  if (!trimmed) {
    return trimmed
  }

  const template = matchTaggedTemplate(trimmed)
  if (template !== null) {
    return convertHtmlInner(template).replace(/^\n/, '').replace(/\n$/, '')
  }

  const call = matchComponentCall(trimmed)
  if (call) {
    return convertComponentCall(call.name, call.body)
  }

  return convertEmbedded(trimmed)
}

function isJsxStart(source, index) {
  if (source[index] !== '<') {
    return false
  }

  const next = source[index + 1]
  if (!(next === '>' || next === '/' || /[A-Za-z]/.test(next))) {
    return false
  }

  let previous = index - 1
  while (previous >= 0 && /\s/.test(source[previous])) {
    previous -= 1
  }

  if (previous < 0) {
    return true
  }

  return !/[A-Za-z0-9_$)\]'"]/.test(source[previous])
}

function parseJsxChildren(source, index, stopTag) {
  const children = []
  let cursor = index
  let textStart = index

  const flushText = () => {
    const text = source.slice(textStart, cursor)
    if (!text) {
      return
    }

    if (/^\s*$/.test(text) && children.length === 0) {
      return
    }

    if (/^\s*$/.test(text)) {
      if (text.includes('\n')) {
        return
      }

      children.push(JSON.stringify(text))
      return
    }

    children.push(JSON.stringify(text))
  }

  while (cursor < source.length) {
    if (source.startsWith('</', cursor)) {
      flushText()
      const close = source.slice(cursor).match(/^<\/([A-Za-z][\w.-]*)?\s*>/)
      if (!close) {
        throw new SyntaxError('Unclosed JSX end tag')
      }

      const name = close[1] ?? ''
      if (stopTag !== null && name !== stopTag) {
        throw new SyntaxError(`Expected </${stopTag}>`)
      }

      return { children, index: cursor + close[0].length }
    }

    if (source[cursor] === '{') {
      flushText()
      if (source.startsWith('{/*', cursor)) {
        const end = source.indexOf('*/}', cursor + 3)
        cursor = end === -1 ? source.length : end + 3
        textStart = cursor
        continue
      }

      const end = skipBalanced(source, cursor, '{', '}')
      children.push(compileJsx(source.slice(cursor + 1, end - 1).trim()) || 'null')
      cursor = end
      textStart = cursor
      continue
    }

    if (isJsxStart(source, cursor)) {
      flushText()
      const nested = parseJsxElement(source, cursor)
      children.push(nested.code)
      cursor = nested.index
      textStart = cursor
      continue
    }

    cursor += 1
  }

  flushText()
  return { children, index: cursor }
}

function parseJsxElement(source, index) {
    if (source.startsWith('<>', index)) {
    const parsed = parseJsxChildren(source, index + 2, '')
    return {
      code: jsxCall('Fragment', [], parsed.children),
      index: parsed.index
    }
  }

  const open = source.slice(index).match(/^<([A-Za-z][\w.-]*)/)
  if (!open) {
    throw new SyntaxError('Invalid JSX tag')
  }

  const name = open[1]
  let cursor = index + open[0].length
  const props = []

  while (cursor < source.length) {
    cursor = skipWhitespace(source, cursor)

    if (source.startsWith('/>', cursor)) {
      return { code: jsxCall(name, props, []), index: cursor + 2 }
    }

    if (source[cursor] === '>') {
      const parsed = parseJsxChildren(source, cursor + 1, name)
      return { code: jsxCall(name, props, parsed.children), index: parsed.index }
    }

    if (source.startsWith('{...', cursor)) {
      const end = skipBalanced(source, cursor, '{', '}')
      props.push(`...${source.slice(cursor + 4, end - 1).trim()}`)
      cursor = end
      continue
    }

    const attr = source.slice(cursor).match(/^([A-Za-z_:][\w:-]*)/)
    if (!attr) {
      throw new SyntaxError(`Unexpected JSX attribute near ${source.slice(cursor, cursor + 16)}`)
    }

    cursor += attr[0].length
    cursor = skipWhitespace(source, cursor)

    if (source[cursor] !== '=') {
      props.push(`${jsonPropName(attr[1])}: true`)
      continue
    }

    cursor = skipWhitespace(source, cursor + 1)

    if (source[cursor] === '"' || source[cursor] === "'") {
      const end = skipString(source, cursor)
      props.push(`${jsonPropName(attr[1])}: ${JSON.stringify(source.slice(cursor + 1, end - 1))}`)
      cursor = end
      continue
    }

    if (source[cursor] === '{') {
      const end = skipBalanced(source, cursor, '{', '}')
      props.push(`${jsonPropName(attr[1])}: ${compileJsx(source.slice(cursor + 1, end - 1).trim())}`)
      cursor = end
      continue
    }

    throw new SyntaxError(`Invalid JSX attribute value for ${attr[1]}`)
  }

  throw new SyntaxError('Unclosed JSX tag')
}

function jsonPropName(name) {
  return /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name)
}

function jsxType(name) {
  if (name === 'Fragment') {
    return 'Fragment'
  }

  return /^[a-z]/.test(name) || name.includes('-') ? JSON.stringify(name) : name
}

function jsxCall(name, props, children) {
  const entries = [...props]
  const meaningful = children.filter(child => child !== '""' && child !== "''")

  if (meaningful.length === 1) {
    entries.push(`children: ${meaningful[0]}`)
  } else if (meaningful.length > 1) {
    entries.push(`children: [${meaningful.join(', ')}]`)
  }

  return `jsx(${jsxType(name)}, {${entries.join(', ')}})`
}

export function compileJsx(source) {
  const input = String(source ?? '')
  let output = ''
  let cursor = 0

  while (cursor < input.length) {
    if (input[cursor] === '"' || input[cursor] === "'") {
      const end = skipString(input, cursor)
      output += input.slice(cursor, end)
      cursor = end
      continue
    }

    if (input[cursor] === '`') {
      const end = skipTemplate(input, cursor)
      output += input.slice(cursor, end)
      cursor = end
      continue
    }

    if (isJsxStart(input, cursor)) {
      const parsed = parseJsxElement(input, cursor)
      output += parsed.code
      cursor = parsed.index
      continue
    }

    output += input[cursor]
    cursor += 1
  }

  return output.trim()
}
