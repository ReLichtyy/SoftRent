import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { cn } from '../../lib/cn'

/* Radio de tolerancia: el menú sigue abierto mientras el cursor esté
 * sobre las opciones o apenas fuera de ellas. */
const RADIO_PX = 28

/* Con otro menú abierto, este espera a que el cursor se detenga sobre
 * su enlace: ir en diagonal hacia una opción roza los enlaces vecinos
 * y no debe cambiar de menú. */
const RELEVO_MS = 180
const EVENTO_ABRIR = 'nav-mega:abrir'
let menuAbierto: string | null = null

export type NavMegaMenuProps = {
  /** Ruta del enlace de la barra. */
  to: string
  /** Texto del enlace de la barra. */
  label: string
  /** Nombre accesible del panel. */
  titulo: string
  /** Punto que parpadea junto al enlace, como aviso de novedad. */
  aviso?: boolean
  /** Texto para lectores de pantalla que acompaña al aviso. */
  avisoTexto?: string
  /** Texto del enlace al pie del panel, hacia `to`. Sin él no hay pie. */
  pie?: string
  /** Opciones del menú; `close` cierra el panel al elegir una. */
  children: (close: () => void) => ReactNode
}

/** Enlace de la barra con menú a pantalla completa sobre la página
 * desenfocada. Se abre por hover o foco; se cierra al alejar el
 * cursor más de RADIO_PX de las opciones, al abrirse otro menú, con
 * Escape o al elegir una opción. Con teclado, flecha
 * abajo entra a la lista. Va en un portal: dentro de la píldora de
 * vidrio, `fixed` quedaría atado a ella. */
export function NavMegaMenu({ to, label, titulo, aviso, avisoTexto, pie, children }: NavMegaMenuProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const relevo = useRef<number | undefined>(undefined)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const zonaRef = useRef<HTMLDivElement>(null)
  /* Escape devuelve el foco al enlace; ese foco no debe reabrir. */
  const omitirFoco = useRef(false)

  const close = useCallback(() => setOpen(false), [])

  /* Un solo menú a la vez: al abrir avisa a los demás, que se cierran. */
  useEffect(() => {
    if (open) {
      menuAbierto = id
      window.dispatchEvent(new CustomEvent(EVENTO_ABRIR, { detail: id }))
    } else if (menuAbierto === id) {
      menuAbierto = null
    }
  }, [open, id])
  useEffect(() => {
    const onAbrir = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) setOpen(false)
    }
    window.addEventListener(EVENTO_ABRIR, onAbrir)
    return () => {
      window.removeEventListener(EVENTO_ABRIR, onAbrir)
      window.clearTimeout(relevo.current)
    }
  }, [id])

  useEffect(() => {
    if (!open) return

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const enlace = triggerRef.current
      const zona = zonaRef.current?.getBoundingClientRect()
      if (!enlace || !zona) return
      const lejos = (r: DOMRect, margen: number) => {
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right)
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom)
        return Math.hypot(dx, dy) > margen
      }
      /* El enlace y la franja de la barra sobre las opciones cuentan como
       * zona segura: se puede bajar en diagonal a cualquier columna. */
      const caja = enlace.getBoundingClientRect()
      const franja = new DOMRect(zona.left, caja.top, zona.width, Math.max(0, zona.top - caja.top))
      if (lejos(zona, RADIO_PX) && lejos(caja, 12) && lejos(franja, 0)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const dentro = panelRef.current?.contains(document.activeElement)
      setOpen(false)
      if (dentro) {
        omitirFoco.current = true
        triggerRef.current?.focus()
      }
    }
    /* Con teclado: cierra cuando el foco sale del enlace y del panel. */
    const onFocusIn = (e: FocusEvent) => {
      const destino = e.target as Node
      if (!triggerRef.current?.contains(destino) && !panelRef.current?.contains(destino)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open])

  return (
    <>
      <NavLink
        ref={triggerRef}
        to={to}
        onClick={close}
        onMouseEnter={() => {
          window.clearTimeout(relevo.current)
          if (menuAbierto && menuAbierto !== id) {
            relevo.current = window.setTimeout(() => setOpen(true), RELEVO_MS)
          } else {
            setOpen(true)
          }
        }}
        onMouseLeave={() => window.clearTimeout(relevo.current)}
        onFocus={() => {
          if (omitirFoco.current) omitirFoco.current = false
          else setOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            panelRef.current?.querySelector('a')?.focus()
          }
        }}
        aria-haspopup="true"
        aria-expanded={open}
        className="nav-beam-link"
      >
        {label}
        {aviso && <span className="nav-dot" aria-hidden="true" />}
        {aviso && avisoTexto && <span className="sr-only">, {avisoTexto}</span>}
      </NavLink>

      {createPortal(
        <div
          ref={panelRef}
          inert={!open}
          aria-label={titulo}
          className={cn(
            'nav-mega fixed inset-0 z-30 hidden overflow-y-auto overscroll-contain pt-[88px] pb-10 md:block',
            'transition-opacity duration-200 ease-[var(--ease-out)]',
            open ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div
              ref={zonaRef}
              className={cn(
                'transition-[translate] duration-300 ease-[var(--ease-out)]',
                open ? 'translate-y-0' : '-translate-y-2',
              )}
            >
              {children(close)}

              {pie && (
                <div className="mt-6 border-t border-border pt-4 text-sm">
                  <Link
                    to={to}
                    onClick={close}
                    className="inline-flex items-center gap-1.5 text-ink-muted transition-colors hover:text-ink"
                  >
                    {pie}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

/** Opción del menú: número discreto y título, sobre un filete que la
 * separa de la siguiente. */
export function NavMegaLink({
  to,
  numero,
  titulo,
  onClick,
}: {
  to: string
  numero: number
  titulo: string
  onClick: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="nav-mega-link flex items-baseline gap-4 border-b border-border py-3 outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      <span className="nav-mega-num" aria-hidden="true">{String(numero).padStart(2, '0')}</span>
      <span className="text-base leading-snug font-medium tracking-[-0.015em] text-pretty text-ink lg:text-lg">
        {titulo}
      </span>
    </Link>
  )
}
