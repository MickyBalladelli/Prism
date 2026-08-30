import { test, expect } from '@playwright/test'
import { componentRegistry } from '../src/component-registry.js'
import { exampleRegistry } from '../src/example-registry.js'

const themes = ['prism', 'aurora', 'nocturne', 'editorial', 'terminal']
const routes = [
  { key: 'overview', path: '/' },
  { key: 'api', path: '/api' },
  { key: 'icons', path: '/icons' },
  ...componentRegistry.map(component => ({ key: component.key, path: component.path })),
  ...exampleRegistry.map(example => ({ key: `example-${example.key}`, path: example.path }))
]

test.describe('showcase visual matrix', () => {
  test.describe.configure({ mode: 'parallel' })

  for (const route of routes) {
    for (const theme of themes) {
      test(`${route.key} · ${theme} · reduced motion`, async ({ page }) => {
        await page.addInitScript(selectedTheme => {
          localStorage.setItem('prism-showcase-settings', JSON.stringify({
            theme: selectedTheme,
            animation: 'theme',
            animated: false
          }))
        }, theme)
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto(route.path)
        await expect(page).toHaveScreenshot(`${route.key}-${theme}-reduced-motion.png`, {
          fullPage: true,
          animations: 'disabled'
        })
      })
    }
  }
})
