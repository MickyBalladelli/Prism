import { component, computed, html, onMount } from 'matrix'

const baseClassName = 'prism-background'
const reactiveKinds = new Set(['signal', 'computed'])
const palettes = Object.freeze({
  midnight: Object.freeze({
    base: '#071427',
    accent: '#3657d6',
    glow: '#7ac7ff'
  }),
  aurora: Object.freeze({
    base: '#0a1024',
    accent: '#6d5ef7',
    glow: '#58c9c2'
  }),
  tide: Object.freeze({
    base: '#071a22',
    accent: '#0f766e',
    glow: '#67e8f9'
  })
})

const vertexSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentSource = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uGrain;
uniform vec3 uBase;
uniform vec3 uAccent;
uniform vec3 uGlow;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec4 cubicTanh(vec4 x) {
  vec4 clamped = clamp(x, vec4(-8.0), vec4(8.0));
  vec4 ePos = exp(clamped);
  vec4 eNeg = exp(-clamped);
  return (ePos - eNeg) / (ePos + eNeg);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec3 ray = normalize(vec3(frag * 2.0, 0.0) - vec3(uResolution.xy, uResolution.y));
  vec4 color = vec4(0.0);
  float z = 0.0;
  for (int i = 0; i < 20; i++) {
    vec3 p = z * ray;
    float d = 4.0;
    for (int j = 0; j < 6; j++) {
      d += d;
      p = p.yzx + sin(p * d - uTime) / d;
    }
    z += 0.1 - length(p) / 9.0;
    color += z * z * vec4(2.0 - sin(p * 5.0), 0.0) / (0.001 + length(vec4(sin(p * 33.0) / 99.0, p.x)));
  }
  color = cubicTanh(color / 400.0);
  vec3 shade = max(color.rgb, 0.0) * uIntensity;
  vec3 mapped = uBase + shade.x * uAccent + shade.y * uGlow + shade.z * mix(uAccent, uGlow, 0.45);
  mapped += (hash(frag + uTime * 18.0) - 0.5) * uGrain;
  gl_FragColor = vec4(mapped, 1.0);
}
`

const isReactive = value => reactiveKinds.has(value?.kind)

const readValue = (value, fallback) => isReactive(value)
  ? value.value
  : value === undefined || value === null ? fallback : value

const normalizePalette = value => Object.prototype.hasOwnProperty.call(palettes, value)
  ? value
  : 'midnight'

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

function normalizeNumber(value, fallback, minimum, maximum) {
  const number = Number(readValue(value, fallback))
  if (!Number.isFinite(number)) {
    return fallback
  }
  return clamp(number, minimum, maximum)
}

function parseHex(hex) {
  const value = String(hex ?? '').replace('#', '')
  const normalized = value.length === 3
    ? value.split('').map(part => part + part).join('')
    : value
  if (normalized.length !== 6) {
    return [0.03, 0.08, 0.15]
  }
  return [0, 2, 4].map(index => parseInt(normalized.slice(index, index + 2), 16) / 255)
}

function toRgba(hex, alpha) {
  const [red, green, blue] = parseHex(hex).map(value => Math.round(value * 255))
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function resolveColors(props) {
  return computed(() => {
    const palette = palettes[normalizePalette(readValue(props.palette, 'midnight'))]
    return {
      base: readValue(props.baseColor, palette.base),
      accent: readValue(props.accentColor, palette.accent),
      glow: readValue(props.glowColor, palette.glow)
    }
  })
}

function createStyleValue(props, colors) {
  return computed(() => {
    const customStyle = readValue(props.style)
    const style = typeof customStyle === 'object' && customStyle !== null
      ? { ...customStyle }
      : customStyle

    const variables = {
      '--prism-background-base': colors.value.base,
      '--prism-background-accent': colors.value.accent,
      '--prism-background-glow': colors.value.glow,
      '--prism-background-overlay-opacity': String(normalizeNumber(props.overlayOpacity, 0.22, 0, 0.72)),
      '--prism-background-padding': readValue(props.padding, '1.5rem'),
      '--prism-background-radius': readValue(props.radius, '1.4rem'),
      '--prism-background-min-height': readValue(props.minHeight, '18rem'),
      '--prism-background-height': readValue(props.height)
    }

    if (typeof style === 'string') {
      const variableText = Object.entries(variables)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([name, value]) => `${name}: ${value}`)
        .join('; ')
      return [style, variableText].filter(Boolean).join('; ')
    }

    const nextStyle = style ?? {}
    return Object.fromEntries(Object.entries({ ...nextStyle, ...variables })
      .filter(([, value]) => value !== undefined && value !== null))
  })
}

function createContentStyleValue(props) {
  return computed(() => {
    const customStyle = readValue(props.contentStyle)
    if (typeof customStyle === 'string' || customStyle === undefined || customStyle === null) {
      return customStyle
    }

    if (typeof customStyle === 'object') {
      return Object.fromEntries(Object.entries(customStyle)
        .filter(([, value]) => value !== undefined && value !== null))
    }

    return undefined
  })
}

function readAnimationState(props) {
  const colors = props.colors?.value ?? { base: '#071427', accent: '#3657d6', glow: '#7ac7ff' }
  const prefersReducedMotion = typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    animated: Boolean(readValue(props.animated, true)) && !prefersReducedMotion,
    speed: normalizeNumber(props.speed, 1, 0, 4),
    intensity: normalizeNumber(props.intensity, 1, 0.2, 4),
    grain: normalizeNumber(props.grain, 0.018, 0, 0.12),
    base: colors.base,
    accent: colors.accent,
    glow: colors.glow
  }
}

function resizeCanvas(canvas) {
  const ratio = Math.min(globalThis.devicePixelRatio || 1, 2)
  const width = Math.max(1, Math.floor((canvas.clientWidth || 0) * ratio))
  const height = Math.max(1, Math.floor((canvas.clientHeight || 0) * ratio))
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }
  return { width, height, ratio }
}

function renderFallback(canvas, time, options) {
  const context = canvas.getContext('2d')
  if (!context) {
    return
  }

  const { width, height, ratio } = resizeCanvas(canvas)
  const logicalWidth = width / ratio
  const logicalHeight = height / ratio
  const pulse = time * 0.00032 * (options.speed || 1)

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, width, height)
  context.scale(ratio, ratio)
  context.fillStyle = options.base
  context.fillRect(0, 0, logicalWidth, logicalHeight)

  const driftX = 0.52 + Math.sin(pulse) * 0.22
  const driftY = 0.38 + Math.cos(pulse * 0.85) * 0.2
  const glow = context.createRadialGradient(
    logicalWidth * driftX,
    logicalHeight * driftY,
    0,
    logicalWidth * driftX,
    logicalHeight * driftY,
    logicalWidth * 0.7
  )
  glow.addColorStop(0, toRgba(options.glow, 0.55))
  glow.addColorStop(0.42, toRgba(options.accent, 0.28))
  glow.addColorStop(1, 'transparent')

  const veil = context.createRadialGradient(
    logicalWidth * (0.22 + Math.cos(pulse * 1.15) * 0.12),
    logicalHeight * (0.18 + Math.sin(pulse * 0.7) * 0.1),
    0,
    logicalWidth * 0.28,
    logicalHeight * 0.22,
    logicalWidth * 0.8
  )
  veil.addColorStop(0, toRgba(options.accent, 0.42))
  veil.addColorStop(1, 'transparent')

  context.fillStyle = veil
  context.fillRect(0, 0, logicalWidth, logicalHeight)
  context.globalCompositeOperation = 'screen'
  context.fillStyle = glow
  context.fillRect(0, 0, logicalWidth, logicalHeight)
  context.globalCompositeOperation = 'source-over'
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Shader compilation failed'
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

function createProgram(gl) {
  const program = gl.createProgram()
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || 'Program linking failed'
    gl.deleteProgram(program)
    throw new Error(message)
  }
  return program
}

function startWebglAnimation(canvas, props) {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false
  }) || canvas.getContext('experimental-webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false
  })

  if (!gl) {
    return null
  }

  let program
  try {
    program = createProgram(gl)
  } catch (error) {
    console.error(error)
    return null
  }

  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1
  ]), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
  const timeLocation = gl.getUniformLocation(program, 'uTime')
  const intensityLocation = gl.getUniformLocation(program, 'uIntensity')
  const grainLocation = gl.getUniformLocation(program, 'uGrain')
  const baseLocation = gl.getUniformLocation(program, 'uBase')
  const accentLocation = gl.getUniformLocation(program, 'uAccent')
  const glowLocation = gl.getUniformLocation(program, 'uGlow')

  const render = time => {
    const options = readAnimationState(props)
    const { width, height } = resizeCanvas(canvas)
    const base = parseHex(options.base)
    const accent = parseHex(options.accent)
    const glow = parseHex(options.glow)

    gl.viewport(0, 0, width, height)
    gl.uniform2f(resolutionLocation, width, height)
    gl.uniform1f(timeLocation, time * 0.001 * options.speed)
    gl.uniform1f(intensityLocation, options.intensity)
    gl.uniform1f(grainLocation, options.grain)
    gl.uniform3f(baseLocation, base[0], base[1], base[2])
    gl.uniform3f(accentLocation, accent[0], accent[1], accent[2])
    gl.uniform3f(glowLocation, glow[0], glow[1], glow[2])
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    return options.animated
  }

  return {
    render,
    dispose() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }
}

function attachBackgroundAnimation(canvas, props) {
  if (!canvas || canvas.nodeName !== 'CANVAS') {
    return undefined
  }

  let renderer = startWebglAnimation(canvas, props)
  const render = time => {
    if (renderer) {
      return renderer.render(time)
    }
    const options = readAnimationState(props)
    renderFallback(canvas, time, options)
    return options.animated
  }

  let frame = 0
  const tick = time => {
    const animated = render(time)
    if (animated) {
      frame = requestAnimationFrame(tick)
    }
  }

  const observer = typeof ResizeObserver === 'function'
    ? new ResizeObserver(() => render(performance.now()))
    : null
  observer?.observe(canvas)
  frame = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(frame)
    observer?.disconnect()
    renderer?.dispose()
    renderer = null
  }
}

function BackgroundCanvas(props) {
  onMount(node => attachBackgroundAnimation(node, props))
  return html`<canvas class="${baseClassName}-layer" aria-hidden="true"></canvas>`
}

export function Background(props = {}) {
  const {
    children = null,
    class: classValue = '',
    contentClass = '',
    id,
    role,
    style,
    contentStyle,
    palette = 'midnight',
    animated = true,
    speed = 1,
    intensity = 1,
    grain = 0.018,
    overlayOpacity = 0.22,
    minHeight = '18rem',
    height,
    padding = '1.5rem',
    radius = '1.4rem',
    baseColor,
    accentColor,
    glowColor,
    ariaLabel = 'Animated background'
  } = props

  const colors = resolveColors({ palette, baseColor, accentColor, glowColor })
  const styleValue = createStyleValue({ style, overlayOpacity, minHeight, height, padding, radius }, colors)
  const contentStyleValue = createContentStyleValue({ contentStyle })

  const classNames = computed(() => [
    baseClassName,
    `${baseClassName}-${normalizePalette(readValue(palette, 'midnight'))}`,
    classValue
  ].filter(Boolean).join(' '))

  const contentClassNames = computed(() => [
    `${baseClassName}-content`,
    contentClass
  ].filter(Boolean).join(' '))

  return html`
    <section class="${classNames}" id="${id}" role="${role}" style="${styleValue}" aria-label="${ariaLabel}">
      ${component(BackgroundCanvas, { animated, speed, intensity, grain, colors })}
      <span class="${baseClassName}-wash" aria-hidden="true"></span>
      <div class="${contentClassNames}" style="${contentStyleValue}">${children}</div>
    </section>
  `
}

export const BackgroundComponent = props => component(Background, props)
