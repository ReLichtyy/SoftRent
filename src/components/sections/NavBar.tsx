import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/Button'
import { Container } from '../layout/Container'

const links = [
  { href: '#pilares', label: 'Qué hacemos' },
  { href: '#negocio', label: 'Para tu negocio' },
  { href: '#como-funciona', label: 'Cómo funciona' },
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
        <a href="#top" className="flex items-center gap-2.5">
          <Logomark />
          <span className="font-display text-lg font-bold tracking-tight">
            SoftRent
          </span>
        </a>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Principal"
            className="hidden items-center gap-8 text-sm text-ink-soft md:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
          <Button href="#contacto" size="sm">
            Comenzar
          </Button>
        </div>
      </Container>
    </header>
  )
}
