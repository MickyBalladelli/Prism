import { createRouter, mount, routerView } from '@mickyballadelli/matrix'
import { Background, prismTheme } from 'prism-ui'
import { ComponentPage } from './pages/component-page.jsx'
import { HomePage } from './pages/home-page.jsx'
import { IconsPage } from './pages/icons-page.jsx'
import { NotFoundPage } from './pages/not-found-page.jsx'
import { ApiPage } from './pages/api-page.jsx'
import { showcaseBackgroundAccentColor, showcaseBackgroundAnimated, showcaseBackgroundBaseColor, showcaseBackgroundGlowColor, showcaseBackgroundPalette, showcaseBackgroundRecipe, showcaseThemeClass } from './theme-picker.jsx'
import './style.css'

let router

const withNavigation = Page => props => (
  <Page
    {...props}
    link={path => router.link(path)}
  />
)

router = createRouter([
  { path: '/', view: withNavigation(HomePage) },
  { path: '/api', view: withNavigation(ApiPage) },
  { path: '/icons', view: withNavigation(IconsPage) },
  { path: '/icons/:category', view: withNavigation(IconsPage) },
  { path: '/components/:name', view: withNavigation(ComponentPage) },
  { path: '*path', view: withNavigation(NotFoundPage) }
])

router.start()

const appView = routerView(router)

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
      {appView}
    </Background>
  </div>
), document.querySelector('#app'))
