import { component, createRouter, effect, html, mount, onMount } from '@mickyballadelli/matrix'
import { Background, prismTheme } from 'prism-ui'
import { ComponentPage } from './pages/component-page.jsx'
import { ExamplePage } from './pages/example-page.jsx'
import { HomePage } from './pages/home-page.jsx'
import { IconsPage } from './pages/icons-page.jsx'
import { NotFoundPage } from './pages/not-found-page.jsx'
import { ApiPage } from './pages/api-page.jsx'
import { showcaseBackgroundAccentColor, showcaseBackgroundAnimated, showcaseBackgroundBaseColor, showcaseBackgroundGlowColor, showcaseBackgroundPalette, showcaseBackgroundRecipe, showcaseThemeClass } from './theme-picker.jsx'
import './style.css'
import './examples-style.css'

let router

const withNavigation = Page => props => (
  <Page
    {...props}
    link={path => router.link(path)}
    navigateTo={path => router.navigate(path, { scroll: false })}
  />
)

router = createRouter([
  { path: '/', view: withNavigation(HomePage) },
  { path: '/api', view: withNavigation(ApiPage) },
  { path: '/icons', view: withNavigation(IconsPage) },
  { path: '/icons/:category', view: withNavigation(IconsPage) },
  { path: '/components/:name', view: withNavigation(ComponentPage) },
  { path: '/examples/:name', view: withNavigation(ExamplePage) },
  { path: '*path', view: withNavigation(NotFoundPage) }
])

router.start()

function AppView() {
  onMount(node => {
    let handle
    let pageKey = ''
    const stop = effect(() => {
      const route = router.current.value
      const nextKey = route && typeof route.view === 'function'
        ? `${router.path.value}\0${JSON.stringify(route.params ?? {})}`
        : ''
      if (nextKey === pageKey) {
        return
      }

      pageKey = nextKey
      handle?.unmount()
      handle = undefined
      if (!route || typeof route.view !== 'function') {
        return
      }

      handle = mount(() => component(route.view, { ...route.params, route }), node)
    })

    return () => {
      stop()
      handle?.unmount()
    }
  })

  return html`<div class="showcase-route"></div>`
}

mount(() => (
  <div class={showcaseThemeClass} use:style={prismTheme}>
    <Background
      class="showcase-app-background"
      palette={showcaseBackgroundPalette}
      animation={showcaseBackgroundRecipe}
      animated={showcaseBackgroundAnimated}
      baseColor={showcaseBackgroundBaseColor}
      accentColor={showcaseBackgroundAccentColor}
      glowColor={showcaseBackgroundGlowColor}
      intensity={0.85}
      overlayOpacity={0.2}
      minHeight="100dvh"
      padding="0"
      radius="0"
      ariaLabel="Prism UI"
    >
      <AppView />
    </Background>
  </div>
), document.querySelector('#app'))
