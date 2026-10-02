import type { Icon } from '@phosphor-icons/react'
import {
  Buildings,
  CheckCircle,
  FileText,
  Gauge,
  Pulse,
  SquaresFour,
} from '@phosphor-icons/react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Container } from '../../components/layout/Container'
import { PageTransition } from '../../components/layout/PageTransition'
import { ThemeToggle } from '../../components/ThemeToggle'
import { cn } from '../../lib/cn'

type NavItem = {
  to: string
  label: string
  icon: Icon
}

const adminNav: NavItem[] = [
  { to: '/admin/clientes', label: 'Clientes', icon: Buildings },
  { to: '/admin/onboarding', label: 'Onboarding', icon: CheckCircle },
  { to: '/admin/plantillas', label: 'Plantillas', icon: SquaresFour },
  { to: '/admin/flujos', label: 'Flujos', icon: Pulse },
  { to: '/admin/consumo', label: 'Consumo', icon: Gauge },
  { to: '/admin/briefs', label: 'Briefs', icon: FileText },
]

/** Marco del panel interno de SoftRent: encabezado "Admin SoftRent",
 * barra horizontal en móvil y barra lateral desde md. */
export function AdminLayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg text-ink">
      <header className="sticky top-0 z-40 border-b border-border bg-bg">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link to="/admin/clientes" className="flex min-w-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-surface-inverse text-ink-inverse"
            >
              <Gauge className="h-5 w-5" />
            </span>
            <span className="truncate text-heading-md font-bold tracking-tight">
              Admin SoftRent
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/"
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Ir al sitio
            </Link>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <nav
        aria-label="Menú de administración"
        className="border-b border-border bg-bg md:hidden"
      >
        <ul className="flex gap-1 overflow-x-auto px-3 py-2">
          {adminNav.map((item) => (
            <li key={item.to} className="shrink-0">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent-soft text-accent-text'
                      : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-1">
        <nav
          aria-label="Menú de administración, escritorio"
          className="hidden w-60 shrink-0 flex-col gap-1 border-e border-border bg-surface p-4 md:flex"
        >
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent-soft text-accent-text'
                    : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1 pb-10">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
