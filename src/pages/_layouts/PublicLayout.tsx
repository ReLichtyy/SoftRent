import { Suspense, lazy } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { PageTransition } from '../../components/layout/PageTransition'
import Footer from '../../components/sections/Footer'
import NavBar from '../../components/sections/NavBar'

/* Carga diferida del chatbot (3.5): no afecta la carga inicial. */
const Chat = lazy(() => import('../../components/chatbot/Chat'))

/** Marco del sitio público: barra superior y pie del landing,
 * con el contenido de cada ruta en el Outlet. */
export function PublicLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-clip bg-bg text-ink">
      <NavBar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer compact={pathname === '/'} />
      <ScrollRestoration />
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </div>
  )
}
