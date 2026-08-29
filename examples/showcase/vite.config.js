import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const prismRoot = fileURLToPath(new URL('../..', import.meta.url))

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@mickyballadelli/matrix'
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
