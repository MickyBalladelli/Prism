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

const animations = Object.freeze({
  veil: 0,
  sanctum: 1,
  mist: 2,
  silk: 3,
  halo: 4,
  ember: 5,
  orbit: 6,
  gossamer: 7,
  meridian: 8,
  bloom: 9,
  current: 10,
  opal: 11,
  zephyr: 12
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
uniform float uMode;
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

float lumaPow(float x, float k) {
  return pow(clamp(x, 0.0, 1.0), k);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = (frag * 2.0 - uResolution.xy) / max(uResolution.y, 1.0);
  vec3 ray = normalize(vec3(frag * 2.0, 0.0) - vec3(uResolution.xy, uResolution.y));
  vec4 color = vec4(0.0);
  float z = 0.0;

  if (uMode < 0.5) {
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
  } else if (uMode < 1.5) {
    for (int i = 0; i < 10; i++) {
      float depth = float(i) * 0.3;
      vec3 p = vec3(uv * (1.12 + depth * 0.1), depth + uTime * 0.11);
      float d = 4.0;
      for (int j = 0; j < 6; j++) {
        d /= 0.8;
        p += sin(p.yzx * d + depth + uTime) / d;
      }
      float dens = 0.42 + abs(p.y) * 0.38 + abs(sin(p.x * 2.1 + p.z * 0.8));
      color += vec4(9.0, 7.0, 4.0, 1.0) / dens * (0.085 - float(i) * 0.004);
    }
    color = cubicTanh(color / 11.0);
  } else if (uMode < 2.5) {
    for (int i = 0; i < 8; i++) {
      float depth = float(i) * 0.34;
      vec3 p = vec3(uv * (1.08 + depth * 0.16), depth + uTime * 0.12);
      float d = 4.0;
      for (int j = 0; j < 6; j++) {
        d += d;
        p = p.yzx + sin(p * d - uTime) / d;
      }
      vec3 sheets = 2.0 - sin(p * 5.0);
      float dens = 0.18 + abs(p.x) + length(sin(p * 33.0) / 99.0);
      color += vec4(sheets, 0.0) / dens * (0.1 - float(i) * 0.007);
    }
    color = cubicTanh(color / 16.0);
  } else if (uMode < 3.5) {
    vec2 p = uv * vec2(1.18, 0.96);
    float c = 0.0;
    for (int i = 0; i < 6; i++) {
      p = vec2(p.x + sin(p.y + uTime * 0.29 + float(i) * 0.4), p.y + cos(p.x - uTime * 0.24)) * 0.86 + p * 0.18;
      c += 1.0 / (0.72 + abs(p.x * p.y));
    }
    float fold = lumaPow(c * 0.078, 1.65);
    color = vec4(fold, lumaPow(c * 0.05, 2.35), 0.0, 1.0);
  } else if (uMode < 4.5) {
    vec3 p = vec3(uv * vec2(1.08, 0.92), uTime * 0.09);
    float mist = 0.0;
    float gleam = 0.0;
    for (int i = 0; i < 6; i++) {
      p = p.yzx + 0.22 * sin(p * (1.55 + float(i) * 0.28) + uTime * 0.31);
      mist += 1.0 / (0.85 + abs(p.x) * 1.15 + abs(sin(p.y * 2.4 + p.z)));
      gleam += exp(-abs(p.y + sin(p.x * 1.6) * 0.35) * 2.2);
    }
    color = vec4(lumaPow(mist * 0.11, 1.35), lumaPow(gleam * 0.18, 1.9), 0.0, 1.0);
  } else if (uMode < 5.5) {
    vec3 p = vec3(uv * 1.28, uTime * 0.18);
    float ember = 0.0;
    float ash = 0.0;
    for (int i = 0; i < 7; i++) {
      p += 0.19 * sin(p.zxy * (2.1 + float(i) * 0.35) + uTime * 0.4);
      ember += exp(-abs(p.y) * 2.05) * (0.45 + 0.55 * sin(p.x * 2.8 + uTime));
      ash += exp(-abs(p.x * 0.7 + p.z * 0.2) * 2.4) * 0.35;
    }
    color = vec4(lumaPow(ember * 0.22, 1.4), lumaPow(ash * 0.28, 1.8), 0.0, 1.0);
  } else if (uMode < 6.5) {
    vec2 a = uv * vec2(1.22, 0.88) + vec2(uTime * 0.06, 0.0);
    vec2 b = uv * vec2(0.82, 1.28) - vec2(0.0, uTime * 0.05);
    for (int i = 0; i < 5; i++) {
      a = vec2(a.x + 0.2 * sin(a.y * 2.15 + uTime * 0.27), a.y + 0.16 * cos(a.x * 1.9));
      b = vec2(b.x + 0.16 * cos(b.y * 1.85 - uTime * 0.22), b.y + 0.2 * sin(b.x * 2.05));
    }
    float weave = 1.0 / (0.55 + 4.2 * abs(a.x) * abs(b.y));
    float ribbon = 1.0 / (0.7 + 3.4 * abs(a.y * b.x));
    color = vec4(lumaPow(weave, 1.2), lumaPow(ribbon, 1.85), 0.0, 1.0);
  } else if (uMode < 7.5) {
    vec2 p = uv * 2.15;
    vec2 q = uv * 2.05 + 0.35;
    for (int i = 0; i < 4; i++) {
      p.x += 0.14 * sin(p.y * 3.1 + uTime * 0.33);
      q.y += 0.14 * cos(q.x * 2.8 - uTime * 0.29);
    }
    float film = abs(sin(p.x * 7.5) * sin(q.y * 6.8 + p.x * 0.4));
    float veil = abs(sin((p.x + q.y) * 3.4 - uTime * 0.2));
    color = vec4(lumaPow(film, 0.42) * 0.58, lumaPow(veil, 1.8) * 0.5, 0.0, 1.0);
  } else if (uMode < 8.5) {
    vec3 p = vec3(uv.x * 0.92, uv.y * 1.55, uTime * 0.11);
    for (int i = 0; i < 5; i++) {
      p.x += 0.24 * sin(p.y * 1.7 + uTime * 0.28);
      p.z += 0.14 * cos(p.x * 1.3);
    }
    float curtain = exp(-abs(p.x) * 1.55);
    float bands = 0.5 + 0.5 * sin(p.y * 4.4 + p.z * 2.1);
    color = vec4(curtain * lumaPow(bands, 2.6), curtain * lumaPow(1.0 - bands, 3.4) * 0.72, 0.0, 1.0);
  } else if (uMode < 9.5) {
    float ang = atan(uv.y, uv.x);
    float r = length(uv);
    ang = mod(ang + 3.141593, 2.094395) - 1.047197;
    vec2 p = vec2(cos(ang), sin(ang)) * r;
    for (int i = 0; i < 5; i++) {
      p += 0.16 * sin(p.yx * 3.05 + uTime * 0.23);
    }
    float blade = exp(-abs(p.x) * 2.7) * exp(-r * 0.72);
    float glow = 0.16 * exp(-r * 0.48);
    color = vec4(blade + glow, lumaPow(blade, 2.2) + glow * 0.6, 0.0, 1.0);
  } else if (uMode < 10.5) {
    vec2 p = uv * vec2(1.55, 1.12) + vec2(uTime * 0.07, 0.0);
    for (int i = 0; i < 5; i++) {
      p = 0.84 * vec2(sin(p.y + uTime * 0.31), cos(p.x - uTime * 0.26)) + p * 0.52;
    }
    float caustic = 1.0 / (1.0 + 7.5 * abs(p.x * p.y));
    color = vec4(lumaPow(caustic, 1.15), lumaPow(caustic, 2.7), 0.0, 1.0) * 0.92;
  } else if (uMode < 11.5) {
    float s = sin(uTime * 0.07);
    float c = cos(uTime * 0.07);
    vec2 p = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y) * 1.15;
    float f1 = abs(sin(p.x * 3.15 + p.y * 0.35));
    float f2 = abs(sin(p.y * 3.45 - p.x * 0.42));
    float facet = lumaPow(f1 * f2, 0.48);
    float edge = lumaPow(abs(sin((p.x + p.y) * 2.15)), 5.5);
    color = vec4(facet * 0.62, edge * 0.7, 0.0, 1.0);
  } else {
    vec2 p = vec2(uv.x * 0.68 + uTime * 0.11, uv.y * 1.72);
    for (int i = 0; i < 5; i++) {
      p.x += 0.26 * sin(p.y * 1.55 + uTime * 0.2);
    }
    float streak = lumaPow(0.5 + 0.5 * sin(p.y * 5.8 + p.x * 1.1), 9.0);
    float wash = 0.22 * exp(-abs(uv.y) * 0.85);
    color = vec4(streak * 0.85 + wash, wash * 0.9 + streak * 0.25, 0.0, 1.0);
  }

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

const normalizeAnimation = value => Object.prototype.hasOwnProperty.call(animations, value)
  ? value
  : 'veil'

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

function prefersReducedMotion() {
  return typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isMotionEnabled(animated) {
  return Boolean(readValue(animated, true)) && !prefersReducedMotion()
}

function readAnimationState(props) {
  const colors = props.colors?.value ?? { base: '#071427', accent: '#3657d6', glow: '#7ac7ff' }

  return {
    animation: normalizeAnimation(readValue(props.animation, 'veil')),
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
  const sanctum = options.animation === 'sanctum'
  const mist = options.animation === 'mist'

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, width, height)
  context.scale(ratio, ratio)
  context.fillStyle = options.base
  context.fillRect(0, 0, logicalWidth, logicalHeight)

  const driftX = sanctum
    ? 0.5 + Math.sin(pulse * 0.55) * 0.08
    : mist
      ? 0.38 + Math.sin(pulse * 0.45) * 0.28
      : 0.52 + Math.sin(pulse) * 0.22
  const driftY = sanctum
    ? 0.42 + Math.cos(pulse * 0.4) * 0.06
    : mist
      ? 0.48 + Math.cos(pulse * 0.38) * 0.22
      : 0.38 + Math.cos(pulse * 0.85) * 0.2
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
  const modeLocation = gl.getUniformLocation(program, 'uMode')
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
    gl.uniform1f(modeLocation, animations[options.animation])
    gl.uniform3f(baseLocation, base[0], base[1], base[2])
    gl.uniform3f(accentLocation, accent[0], accent[1], accent[2])
    gl.uniform3f(glowLocation, glow[0], glow[1], glow[2])
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
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
      renderer.render(time)
      return
    }
    renderFallback(canvas, time, readAnimationState(props))
  }

  let frame = 0
  const tick = time => {
    render(time)
    frame = requestAnimationFrame(tick)
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
    animation = 'veil',
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
    `${baseClassName}-${normalizeAnimation(readValue(animation, 'veil'))}`,
    isMotionEnabled(animated) ? `${baseClassName}-live` : `${baseClassName}-static`,
    classValue
  ].filter(Boolean).join(' '))

  const contentClassNames = computed(() => [
    `${baseClassName}-content`,
    contentClass
  ].filter(Boolean).join(' '))

  const motionLayer = computed(() => isMotionEnabled(animated)
    ? component(BackgroundCanvas, { animation, speed, intensity, grain, colors })
    : null)

  const washLayer = computed(() => isMotionEnabled(animated)
    ? html`<span class="${baseClassName}-wash" aria-hidden="true"></span>`
    : null)

  return html`
    <section class="${classNames}" id="${id}" role="${role}" style="${styleValue}" aria-label="${ariaLabel}">
      ${motionLayer}
      ${washLayer}
      <div class="${contentClassNames}" style="${contentStyleValue}">${children}</div>
    </section>
  `
}

export const BackgroundComponent = props => component(Background, props)
