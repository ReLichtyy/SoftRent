import { Navigate, createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from './pages/_layouts/PublicLayout'
import { Home } from './pages/public/Home'

/* Las pantallas se cargan por ruta (lazy): cada página baja solo su código.
 * El layout público y el Home quedan en el bundle inicial. */

/* Mapa de pantallas (sección 2.6): 23 páginas en tres superficies. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    HydrateFallback: () => null,
    children: [
      { index: true, element: <Home /> },
      { path: 'soluciones', lazy: () => import('./pages/public/Soluciones').then((m) => ({ Component: m.Soluciones })) },
      /* Una ruta por solución: abre la página en su fila. */
      { path: 'soluciones/:id', lazy: () => import('./pages/public/Soluciones').then((m) => ({ Component: m.Soluciones })) },
      { path: 'industrias', lazy: () => import('./pages/public/Industrias').then((m) => ({ Component: m.Industrias })) },
      { path: 'precios', lazy: () => import('./pages/public/Precios').then((m) => ({ Component: m.Precios })) },
      { path: 'comenzar', lazy: () => import('./pages/public/Comenzar').then((m) => ({ Component: m.Comenzar })) },
      { path: 'casos', lazy: () => import('./pages/public/Casos').then((m) => ({ Component: m.Casos })) },
      { path: 'nosotros', lazy: () => import('./pages/public/Nosotros').then((m) => ({ Component: m.Nosotros })) },
      { path: 'demos', lazy: () => import('./pages/public/Demos').then((m) => ({ Component: m.Demos })) },
      { path: 'privacidad', lazy: () => import('./pages/public/Privacidad').then((m) => ({ Component: m.Privacidad })) },
      { path: 'terminos', lazy: () => import('./pages/public/Terminos').then((m) => ({ Component: m.Terminos })) },
      { path: '*', lazy: () => import('./pages/NotFound').then((m) => ({ Component: m.NotFound })) },
    ],
  },
  {
    path: '/app',
    HydrateFallback: () => null,
    lazy: () => import('./pages/_layouts/AppLayout').then((m) => ({ Component: m.AppLayout })),
    children: [
      { index: true, lazy: () => import('./pages/app/Inicio').then((m) => ({ Component: m.AppInicio })) },
      { path: 'bandeja', lazy: () => import('./pages/app/Bandeja').then((m) => ({ Component: m.AppBandeja })) },
      { path: 'contactos', lazy: () => import('./pages/app/Contactos').then((m) => ({ Component: m.AppContactos })) },
      { path: 'agenda', lazy: () => import('./pages/app/Agenda').then((m) => ({ Component: m.AppAgenda })) },
      { path: 'cobros', lazy: () => import('./pages/app/Cobros').then((m) => ({ Component: m.AppCobros })) },
      { path: 'automatizaciones', lazy: () => import('./pages/app/Automatizaciones').then((m) => ({ Component: m.AppAutomatizaciones })) },
      { path: 'asistente', lazy: () => import('./pages/app/Asistente').then((m) => ({ Component: m.AppAsistente })) },
      { path: 'plan', lazy: () => import('./pages/app/Plan').then((m) => ({ Component: m.AppPlan })) },
      { path: 'ajustes', lazy: () => import('./pages/app/Ajustes').then((m) => ({ Component: m.AppAjustes })) },
    ],
  },
  {
    path: '/admin',
    HydrateFallback: () => null,
    lazy: () => import('./pages/_layouts/AdminLayout').then((m) => ({ Component: m.AdminLayout })),
    children: [
      { index: true, element: <Navigate to="/admin/clientes" replace /> },
      { path: 'clientes', lazy: () => import('./pages/admin/Clientes').then((m) => ({ Component: m.AdminClientes })) },
      { path: 'onboarding', lazy: () => import('./pages/admin/Onboarding').then((m) => ({ Component: m.AdminOnboarding })) },
      { path: 'plantillas', lazy: () => import('./pages/admin/Plantillas').then((m) => ({ Component: m.AdminPlantillas })) },
      { path: 'flujos', lazy: () => import('./pages/admin/Flujos').then((m) => ({ Component: m.AdminFlujos })) },
      { path: 'consumo', lazy: () => import('./pages/admin/Consumo').then((m) => ({ Component: m.AdminConsumo })) },
      { path: 'briefs', lazy: () => import('./pages/admin/Briefs').then((m) => ({ Component: m.AdminBriefs })) },
    ],
  },
])
