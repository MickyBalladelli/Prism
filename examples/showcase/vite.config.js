import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const prismRoot = fileURLToPath(new URL('../..', import.meta.url))
const matrixRoot = fileURLToPath(new URL('../../../Matrix', import.meta.url))
const matrixSrc = fileURLToPath(new URL('../../../Matrix/src', import.meta.url))
const matrixJsx = {
  runtime: 'automatic',
  importSource: '@mickyballadelli/matrix'
}

export default defineConfig({
  oxc: {
    jsx: matrixJsx
  },
  optimizeDeps: {
    exclude: ['prism-ui', '@mickyballadelli/matrix'],
    rolldownOptions: {
      transform: {
        jsx: matrixJsx
      }
    }
  },
  resolve: {
    dedupe: ['@mickyballadelli/matrix'],
    alias: [
      {
        find: 'prism-ui',
        replacement: fileURLToPath(new URL('../../src/index.js', import.meta.url))
      },
      {
        find: '@mickyballadelli/matrix/jsx-dev-runtime',
        replacement: `${matrixSrc}/jsx-dev-runtime.js`
      },
      {
        find: '@mickyballadelli/matrix/jsx-runtime',
        replacement: `${matrixSrc}/jsx-runtime.js`
      },
      {
        find: '@mickyballadelli/matrix',
        replacement: `${matrixSrc}/index.js`
      }
    ]
  },
  server: {
    fs: {
      allow: [prismRoot, matrixRoot]
    }
  }
})
