import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from './pages/_layouts/AdminLayout'
import { AppLayout } from './pages/_layouts/AppLayout'
import { PublicLayout } from './pages/_layouts/PublicLayout'
import { AdminClientes } from './pages/admin/Clientes'
import { AdminBriefs } from './pages/admin/Briefs'
import { AdminConsumo } from './pages/admin/Consumo'
import { AdminFlujos } from './pages/admin/Flujos'
import { AdminOnboarding } from './pages/admin/Onboarding'
import { AdminPlantillas } from './pages/admin/Plantillas'
import { AppAgenda } from './pages/app/Agenda'
import { AppAjustes } from './pages/app/Ajustes'
import { AppAsistente } from './pages/app/Asistente'
import { AppAutomatizaciones } from './pages/app/Automatizaciones'
import { AppBandeja } from './pages/app/Bandeja'
import { AppCobros } from './pages/app/Cobros'
import { AppContactos } from './pages/app/Contactos'
import { AppInicio } from './pages/app/Inicio'
import { AppPlan } from './pages/app/Plan'
import { NotFound } from './pages/NotFound'
import { Casos } from './pages/public/Casos'
import { Comenzar } from './pages/public/Comenzar'
import { Demos } from './pages/public/Demos'
import { Home } from './pages/public/Home'
import { Industrias } from './pages/public/Industrias'
import { Nosotros } from './pages/public/Nosotros'
import { Precios } from './pages/public/Precios'
import { Privacidad } from './pages/public/Privacidad'
import { Soluciones } from './pages/public/Soluciones'
import { Terminos } from './pages/public/Terminos'

/* Mapa de pantallas (sección 2.6): 23 páginas en tres superficies. */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'soluciones', element: <Soluciones /> },
      { path: 'industrias', element: <Industrias /> },
      { path: 'precios', element: <Precios /> },
      { path: 'comenzar', element: <Comenzar /> },
      { path: 'casos', element: <Casos /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'demos', element: <Demos /> },
      { path: 'privacidad', element: <Privacidad /> },
      { path: 'terminos', element: <Terminos /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <AppInicio /> },
      { path: 'bandeja', element: <AppBandeja /> },
      { path: 'contactos', element: <AppContactos /> },
      { path: 'agenda', element: <AppAgenda /> },
      { path: 'cobros', element: <AppCobros /> },
      { path: 'automatizaciones', element: <AppAutomatizaciones /> },
      { path: 'asistente', element: <AppAsistente /> },
      { path: 'plan', element: <AppPlan /> },
      { path: 'ajustes', element: <AppAjustes /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/clientes" replace /> },
      { path: 'clientes', element: <AdminClientes /> },
      { path: 'onboarding', element: <AdminOnboarding /> },
      { path: 'plantillas', element: <AdminPlantillas /> },
      { path: 'flujos', element: <AdminFlujos /> },
      { path: 'consumo', element: <AdminConsumo /> },
      { path: 'briefs', element: <AdminBriefs /> },
    ],
  },
])
