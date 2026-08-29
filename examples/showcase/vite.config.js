import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const prismRoot = fileURLToPath(new URL('../..', import.meta.url))
const matrixJsx = {
  runtime: 'automatic',
  importSource: '@mickyballadelli/matrix'
}

export default defineConfig({
  oxc: {
    jsx: matrixJsx
  },
  optimizeDeps: {
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
      }
    ]
  },
  server: {
    fs: {
      allow: [prismRoot]
    }
  }
})
