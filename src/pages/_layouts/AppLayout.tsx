import { useState } from 'react'
import type { Icon } from '@phosphor-icons/react'
import {
  CalendarCheck,
  ChatCircleDots,
  CrownSimple,
  DotsThree,
  GearSix,
  HouseSimple,
  Lightning,
  Receipt,
  Sparkle,
  Storefront,
  Users,
} from '@phosphor-icons/react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Container } from '../../components/layout/Container'
import { PageTransition } from '../../components/layout/PageTransition'
import { ThemeToggle } from '../../components/ThemeToggle'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { cn } from '../../lib/cn'

const business = {
  name: 'Barbería Don Luis',
  plan: 'Plan Crecimiento',
}

type NavItem = {
  to: string
  label: string
  icon: Icon
  end?: boolean
}

/* Barra inferior móvil: Inicio, Bandeja y Agenda fijos;
 * el resto vive en el panel "Más". */
const primaryNav: NavItem[] = [
  { to: '/app', label: 'Inicio', icon: HouseSimple, end: true },
  { to: '/app/bandeja', label: 'Bandeja', icon: ChatCircleDots },
  { to: '/app/agenda', label: 'Agenda', icon: CalendarCheck },
]

const moreNav: NavItem[] = [
  { to: '/app/contactos', label: 'Contactos', icon: Users },
  { to: '/app/cobros', label: 'Cobros', icon: Receipt },
  { to: '/app/automatizaciones', label: 'Automatizaciones', icon: Lightning },
  { to: '/app/asistente', label: 'Asistente', icon: Sparkle },
  { to: '/app/plan', label: 'Plan', icon: CrownSimple },
  { to: '/app/ajustes', label: 'Ajustes', icon: GearSix },
]

const desktopNav = [...primaryNav, ...moreNav]

/** Marco de la app del cliente. Barra inferior en móvil
 * (Inicio / Bandeja / Agenda / Más) y barra lateral desde md. */
export function AppLayout() {
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const moreActive = moreNav.some((item) =>
    location.pathname.startsWith(item.to),
  )

  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link to="/app" className="flex min-w-0 items-center gap-2.5">
            <Storefront className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
            <span className="truncate font-display text-lg font-bold tracking-tight">
              {business.name}
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <Badge tone="info" className="hidden sm:inline-flex">
              {business.plan}
            </Badge>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <div className="flex flex-1">
        <nav
          aria-label="Menú de la app"
          className="hidden w-60 shrink-0 flex-col gap-1 border-e border-line bg-surface p-4 md:flex"
        >
          {desktopNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand/10 text-brand'
                    : 'text-ink-soft hover:bg-surface-2 hover:text-ink',
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1 pb-24 md:pb-10">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      {moreOpen && (
        <div
          id="app-more-panel"
          className="fixed inset-x-0 bottom-16 z-40 px-3 md:hidden"
        >
          <Card padded={false} className="overflow-hidden">
            <p className="border-b border-line px-4 py-3 text-sm font-medium text-ink">
              Más secciones
            </p>
            <ul className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-3">
              {moreNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex flex-col items-center gap-1.5 rounded-sm px-2 py-3 text-center text-xs',
                        isActive
                          ? 'bg-brand/10 text-brand'
                          : 'text-ink-soft hover:bg-surface-2 hover:text-ink',
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      <nav
        aria-label="Navegación móvil de la app"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur md:hidden"
      >
        <ul className="grid grid-cols-4">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setMoreOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 py-2.5 text-xs',
                    isActive
                      ? 'text-brand'
                      : 'text-ink-soft hover:text-ink',
                  )
                }
              >
                <item.icon className="h-6 w-6" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-controls="app-more-panel"
              className={cn(
                'flex w-full flex-col items-center gap-1 py-2.5 text-xs',
                moreActive || moreOpen
                  ? 'text-brand'
                  : 'text-ink-soft hover:text-ink',
              )}
            >
              <DotsThree className="h-6 w-6" aria-hidden="true" />
              Más
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
