import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { Logo } from '../brand/Logo'
import { Container } from '../layout/Container'
import { cn } from '../../lib/cn'
import { LinkButton } from '../ui/LinkButton'

/* `foco`: enlace con la lámpara siempre encendida. Demos y Precios
 * son las páginas que más acercan a una venta. */
const links = [
  { to: '/soluciones', label: 'Soluciones', foco: false },
  { to: '/demos', label: 'Demos', foco: true },
  { to: '/precios', label: 'Precios', foco: true },
  { to: '/nosotros', label: 'Nosotros', foco: false },
]

/** Barra superior "dos píldoras" (estilos en styles/navbar.css).
 * Izquierda: una píldora de vidrio con logo y enlaces; en móvil, el
 * menú va a la izquierda del logo. Derecha: Comenzar, la única
 * acción primaria, como píldora propia. El tema se cambia desde el
 * footer. */
export default function NavBar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const pillRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  /* Menú móvil abierto: foco al primer enlace; Escape, clic fuera o
   * pasar a escritorio lo cierran. */
  useEffect(() => {
    if (!open) return
    sheetRef.current?.querySelector('a')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!pillRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 48rem)')
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 pt-3 pb-2">
      <Container className="flex h-[52px] items-center justify-between gap-3">
        {/* El menú móvil es hermano de la píldora, no hijo: dentro de
         * otro backdrop-filter su vidrio no desenfocaría la página. */}
        <div ref={pillRef} className="relative h-full min-w-0">
          <div className="nav-glass nav-glass-liquid relative flex h-full items-center gap-1 rounded-full pr-5 pl-1.5 md:gap-5 md:pr-2 md:pl-5">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-sunken md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <List className="size-5" aria-hidden="true" />
              )}
            </button>

            <Link
              to="/"
              aria-label="SoftRent, inicio"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center rounded-full"
            >
              <Logo size={26} textClassName="max-[22rem]:hidden" />
            </Link>

            <span aria-hidden="true" className="hidden h-5 w-px bg-border md:block" />

            <nav
              aria-label="Principal"
              className="hidden h-full items-center gap-1 text-sm md:flex"
            >
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  data-foco={link.foco || undefined}
                  className="nav-beam-link"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Menú móvil: pieza de vidrio bajo la píldora. */}
          <div
            id={menuId}
            ref={sheetRef}
            inert={!open}
            className={cn(
              'nav-glass nav-glass-strong absolute top-[calc(100%+10px)] left-0 w-[min(20rem,calc(100vw-2.5rem))] rounded-lg px-5 pt-2 pb-3 md:hidden',
              'transition-[opacity,translate] duration-200 ease-[var(--ease-out)]',
              open
                ? 'visible translate-y-0 opacity-100'
                : 'pointer-events-none invisible -translate-y-1 opacity-0',
            )}
          >
            <nav aria-label="Principal, móvil">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-[52px] items-center border-b border-border text-lg font-medium last:border-b-0',
                      isActive ? 'text-accent-text' : 'text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Comenzar es la píldora; el envoltorio sostiene el halo detrás. */}
        <span className="nav-cta-wrap relative isolate inline-flex shrink-0 rounded-full">
          <span className="nav-cta-halo" aria-hidden="true" />
          <LinkButton
            to="/comenzar"
            className="nav-cta h-[52px] rounded-full px-5 text-[0.9375rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),var(--elev-sm)] sm:px-6"
          >
            Comenzar
          </LinkButton>
        </span>
      </Container>
    </header>
  )
}
