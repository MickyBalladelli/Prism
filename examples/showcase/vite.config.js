import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const prismRoot = fileURLToPath(new URL('../..', import.meta.url))
const matrixRoot = fileURLToPath(new URL('../../../Matrix', import.meta.url))

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'matrix'
  },
  resolve: {
    preserveSymlinks: true,
    dedupe: ['matrix'],
    alias: [
      {
        find: 'matrix/jsx-runtime',
        replacement: fileURLToPath(new URL('../../../Matrix/src/jsx-runtime.js', import.meta.url))
      },
      {
        find: 'matrix/jsx-dev-runtime',
        replacement: fileURLToPath(new URL('../../../Matrix/src/jsx-dev-runtime.js', import.meta.url))
      },
      {
        find: 'matrix',
        replacement: fileURLToPath(new URL('../../../Matrix/src/index.js', import.meta.url))
      },
      {
        find: 'prism-ui',
        replacement: fileURLToPath(new URL('../../src/index.js', import.meta.url))
      }
    ]
  },
  server: {
    fs: {
      allow: [prismRoot, matrixRoot]
    }
  }
})
