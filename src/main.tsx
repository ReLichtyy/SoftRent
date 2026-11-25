import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, matchRoutes } from 'react-router-dom'
import './index.css'
import { routes } from './routes'
import { applyHead, seoForPath } from './seo/site'

async function start() {
  const container = document.getElementById('root')!
  // Las páginas públicas llegan prerenderizadas (scripts/prerender.mjs); /app,
  // /admin y el servidor de desarrollo llegan con el contenedor vacío.
  const prerendered = container.hasChildNodes()

  if (prerendered) {
    // Las rutas lazy de la URL actual se resuelven antes de hidratar: si no,
    // el router pinta su HydrateFallback (vacío) y la hidratación no coincide.
    const matches = matchRoutes(routes, window.location) ?? []
    await Promise.all(
      matches.map(async ({ route }) => {
        if (typeof route.lazy !== 'function') return
        const resolved = await route.lazy()
        Object.assign(route, resolved, { lazy: undefined })
      }),
    )
  }

  const router = createBrowserRouter(routes)

  // El <head> sigue a la ruta también al navegar del lado del cliente.
  let lastPath = window.location.pathname
  applyHead(seoForPath(lastPath))
  router.subscribe((state) => {
    if (state.location.pathname === lastPath) return
    lastPath = state.location.pathname
    applyHead(seoForPath(lastPath))
  })

  const app = (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
  if (prerendered) hydrateRoot(container, app)
  else createRoot(container).render(app)
}

void start()
