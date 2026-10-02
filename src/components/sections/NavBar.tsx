import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../ThemeToggle'
import { Logo } from '../brand/Logo'
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

/** Barra superior fija. Un solo CTA primario ("Comenzar"),
 * visible también en móvil. */
export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" aria-label="SoftRent, inicio" className="flex items-center">
          <Logo />
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
                      isActive ? 'font-medium text-ink' : 'text-ink-muted',
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
