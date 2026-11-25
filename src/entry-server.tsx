/* eslint-disable react/only-export-components -- entrada del prerender, no se usa con Fast Refresh */
/*
 * Entrada del prerender (scripts/prerender.mjs). Renderiza una ruta a HTML
 * con el mismo árbol de rutas que el navegador; el cliente hidrata encima.
 */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom'
import { routes } from './routes'
import { renderHead, seoForPath } from './seo/site'

export { PUBLIC_PAGES, SITE_URL, renderHead, seoForPath } from './seo/site'

const handler = createStaticHandler(routes)

export async function render(pathname: string): Promise<{ html: string; head: string }> {
  const request = new Request(`http://localhost${pathname}`)
  const context = await handler.query(request)
  if (context instanceof Response) {
    throw new Error(`La ruta ${pathname} respondió con una redirección; no se prerenderiza.`)
  }
  const router = createStaticRouter(handler.dataRoutes, context)
  // prerender espera a que terminen los Suspense (el chat es lazy); con
  // renderToString esos límites quedaban para el cliente y la hidratación
  // del inicio fallaba con el error #419.
  const { prelude } = await prerender(
    <StrictMode>
      {/* Sin loaders no hay datos que pasar: hydrate={false} evita el <script>
       * de hydrationData dentro de #root, que el cliente no renderiza. */}
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
  const html = await new Response(prelude).text()
  return { html, head: renderHead(seoForPath(pathname)) }
}
