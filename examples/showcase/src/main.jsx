import { createRouter, mount, routerView } from 'matrix'
import { prismTheme } from 'prism-ui'
import { ComponentPage } from './pages/component-page.jsx'
import { HomePage } from './pages/home-page.jsx'
import { NotFoundPage } from './pages/not-found-page.jsx'
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
  { path: '/components/:name', view: withNavigation(ComponentPage) },
  { path: '*path', view: withNavigation(NotFoundPage) }
])

router.start()

const appView = routerView(router)

mount(() => (
  <div use:style={prismTheme}>
    {appView}
  </div>
), document.querySelector('#app'))
