import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle'
import { Container } from '../layout/Container'
import { DemoHoverCard } from '../nav/DemoHoverCard'
import { cn } from '../../lib/cn'
import { LinkButton } from '../ui/LinkButton'

const links = [
  { to: '/soluciones', label: 'Soluciones' },
  { to: '/demos', label: 'Demos' },
  { to: '/precios', label: 'Precios' },
  { to: '/nosotros', label: 'Nosotros' },
]

function Logomark() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="var(--brand-deep)" />
      <path
        d="M10 20v-8q0-2 2-2h7q3 0 3 3t-3 3h-5.5"
        stroke="var(--on-deep)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="22" r="2" fill="var(--brand)" />
    </svg>
  )
}

/** Barra superior fija. Un solo CTA primario ("Comenzar"),
 * visible también en móvil. */
export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Logomark />
          <span className="font-display text-lg font-bold tracking-tight">
            SoftRent
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Principal"
            className="hidden items-center gap-8 text-sm md:flex"
          >
            {links.map((link) =>
              link.to === '/demos' ? (
                <DemoHoverCard key={link.to} />
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'transition-colors hover:text-ink',
                      isActive ? 'font-medium text-ink' : 'text-ink-soft',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <ThemeToggle />
          <LinkButton to="/comenzar" size="sm">
            Comenzar
          </LinkButton>
        </div>
      </Container>
    </header>
  )
}
