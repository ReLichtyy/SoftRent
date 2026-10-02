import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight } from '@phosphor-icons/react'
import { demos } from '../../content/demos'
import type { DemoId } from '../../content/types'
import type { BadgeTone } from '../ui/Badge'
import { CardImage } from '../ui/CardImage'
import { cn } from '../../lib/cn'

/* Copia de vista previa para el panel de navegación, por demo.
 * Agregar una demo nueva = una entrada aquí; el panel solo
 * muestra las "publicada" con demoUrl del catálogo. */
const previews: Record<
  DemoId,
  { titulo: string; descripcion: string; imagen: string; alt: string }
> = {
  citas: {
    titulo: 'Sistema de Reservas y Citas 24/7',
    descripcion:
      'Vea cómo sus clientes eligen horario, confirman y reciben recordatorios automáticos sin esperas.',
    imagen: 'https://picsum.photos/seed/softrent-demo-citas/960/600',
    alt: 'Vista previa del sistema de reservas en línea',
  },
  pedidos: {
    titulo: 'Sistema de Pedidos por WhatsApp',
    descripcion:
      'Cada pedido queda registrado, confirmado y cobrado sin anotar a mano.',
    imagen: 'https://picsum.photos/seed/softrent-demo-pedidos/960/600',
    alt: 'Vista previa del sistema de pedidos en línea',
  },
  servicios: {
    titulo: 'Sistema de Visitas y Servicios',
    descripcion: 'Cada visita queda con su fecha, su técnico y su comprobante.',
    imagen: 'https://picsum.photos/seed/softrent-demo-servicios/960/600',
    alt: 'Vista previa del sistema de visitas técnicas',
  },
}

type PanelCard = {
  id: string
  titulo: string
  descripcion: string
  imagen: string
  alt: string
  href: string
  external: boolean
  badgeLabel: string
  badgeTone: BadgeTone
  badgeDot: boolean
}

/* Cascarones: solo estructura, para dimensionar el panel con
 * más demos de las que existen hoy. Al publicarse una demo real
 * se elimina su cascarón y entra por el catálogo (previews). */
const cascarones: Array<Omit<PanelCard, 'href' | 'external' | 'badgeLabel' | 'badgeTone' | 'badgeDot'>> = [
  {
    id: 'cascaron-1',
    titulo: 'Sistema de demo 1',
    descripcion: 'Cascarón de vista previa: contenido pendiente de la demo real.',
    imagen: 'https://picsum.photos/seed/softrent-demo-shell-1/960/600',
    alt: 'Vista previa pendiente de una demo futura',
  },
  {
    id: 'cascaron-2',
    titulo: 'Sistema de demo 2',
    descripcion: 'Cascarón de vista previa: contenido pendiente de la demo real.',
    imagen: 'https://picsum.photos/seed/softrent-demo-shell-2/960/600',
    alt: 'Vista previa pendiente de una demo futura',
  },
  {
    id: 'cascaron-3',
    titulo: 'Sistema de demo 3',
    descripcion: 'Cascarón de vista previa: contenido pendiente de la demo real.',
    imagen: 'https://picsum.photos/seed/softrent-demo-shell-3/960/600',
    alt: 'Vista previa pendiente de una demo futura',
  },
  {
    id: 'cascaron-4',
    titulo: 'Sistema de demo 4',
    descripcion: 'Cascarón de vista previa: contenido pendiente de la demo real.',
    imagen: 'https://picsum.photos/seed/softrent-demo-shell-4/960/600',
    alt: 'Vista previa pendiente de una demo futura',
  },
  {
    id: 'cascaron-5',
    titulo: 'Sistema de demo 5',
    descripcion: 'Cascarón de vista previa: contenido pendiente de la demo real.',
    imagen: 'https://picsum.photos/seed/softrent-demo-shell-5/960/600',
    alt: 'Vista previa pendiente de una demo futura',
  },
]

/* Tarjetas del panel: primero las demos publicadas del catálogo,
 * después los cascarones. */
const tarjetas: PanelCard[] = [
  ...demos
    .filter((demo) => demo.estado === 'publicada' && demo.demoUrl)
    .map((demo) => {
      const preview = previews[demo.id]
      return {
        id: demo.id,
        titulo: preview.titulo,
        descripcion: preview.descripcion,
        imagen: preview.imagen,
        alt: preview.alt,
        href: demo.demoUrl!,
        external: true,
        badgeLabel: 'Demo en vivo',
        badgeTone: 'success',
        badgeDot: true,
      } satisfies PanelCard
    }),
  ...cascarones.map<PanelCard>((cascaron) => ({
    ...cascaron,
    href: '#',
    external: false,
    badgeLabel: 'Próximamente',
    badgeTone: 'neutral',
    badgeDot: false,
  })),
]

/* Vista del panel: 4 tarjetas por fila (horizontales entre sí),
 * las demás filas quedan abajo y se alcanzan bajando el scroll
 * interno. Altura de tarjeta fija para que la ventana sea
 * exactamente una fila. */
const CARD_H = 'h-[20rem]'

/* Margen antes de cerrar: permite mover el cursor del enlace
 * a la tarjeta sin que el menú parpadee. */
const CLOSE_GRACE_MS = 150

/** Enlace "Demos" con panel flotante de vistas previas.
 * Se abre por hover o foco (teclado) y cierra limpiamente al
 * salir, con una tolerancia breve que evita el parpadeo. */
export function DemoHoverCard() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
  }, [])

  const openNow = useCallback(() => {
    cancelClose()
    setOpen(true)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
    }, CLOSE_GRACE_MS)
  }, [])

  useEffect(() => cancelClose, [cancelClose])

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) scheduleClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          cancelClose()
          setOpen(false)
        }
      }}
    >
      <NavLink
        to="/demos"
        className={({ isActive }) =>
          cn(
            'transition-colors hover:text-ink',
            isActive ? 'font-medium text-ink' : 'text-ink-muted',
            open && 'text-ink',
          )
        }
      >
        Demos
      </NavLink>

      {/* El pt-3 hace de puente: el cursor pasa del enlace al panel
       * sin salir del contenedor ni disparar el cierre. */}
      <div
        inert={!open}
        className={cn(
          'absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3',
          tarjetas.length > 1 ? 'w-[48rem]' : 'w-[17rem]',
          'transition-[opacity,translate] duration-200 ease-[var(--ease-out)]',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div className="rounded-md border border-border bg-surface p-3 shadow-[0_16px_48px_rgb(64_5_23/0.22)]">
          <div
            className={cn(
              'grid grid-cols-1 gap-3 overflow-y-auto overscroll-contain',
              tarjetas.length > 1 && 'grid-cols-4',
              tarjetas.length > 1 &&
                'max-h-[min(20rem, calc(100dvh - 7rem))]',
            )}
          >
            {tarjetas.map((tarjeta) => (
              <CardImage
                key={tarjeta.id}
                compact
                overlay
                imageSrc={tarjeta.imagen}
                imageAlt={tarjeta.alt}
                badge={{
                  label: tarjeta.badgeLabel,
                  tone: tarjeta.badgeTone,
                  dot: tarjeta.badgeDot,
                }}
                title={tarjeta.titulo}
                description={tarjeta.descripcion}
                href={tarjeta.href}
                ctaLabel="Ver demo"
                external={tarjeta.external}
                className={CARD_H}
              />
            ))}
          </div>

          <div className="mt-3 border-t border-border pt-2.5">
            <Link
              to="/demos"
              className="inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Ver todas las demos
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
