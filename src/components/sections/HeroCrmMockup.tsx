import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  CalendarBlank,
  CheckCircle,
  ChatsCircle,
  Coins,
  CreditCard,
  SquaresFour,
  Sparkle,
  Users,
} from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'

type Mensaje = {
  autor: 'cliente' | 'ia'
  texto: string
  hora: string
}

/* Conversación de ejemplo (datos ilustrativos de la Barbería Don Luis,
 * misma cuenta que usan Producto y el chat de demo). */
const mensajes: Mensaje[] = [
  {
    autor: 'cliente',
    texto: 'Hola, ¿tienen espacio hoy para tinte y corte?',
    hora: '14:02',
  },
  {
    autor: 'ia',
    texto: 'Hola, María. Hoy tengo 16:30 libre con Jorge. ¿Se lo reservo?',
    hora: '14:02',
  },
  { autor: 'cliente', texto: 'Sí, por favor.', hora: '14:03' },
  {
    autor: 'ia',
    texto: 'Listo, hoy a las 16:30. Para confirmar, un abono de ₡25.000 por SINPE.',
    hora: '14:03',
  },
]

const navegacion = [
  { icono: SquaresFour, etiqueta: 'Inicio', activo: false },
  { icono: ChatsCircle, etiqueta: 'Bandeja', activo: true },
  { icono: CalendarBlank, etiqueta: 'Agenda', activo: false },
  { icono: Users, etiqueta: 'Contactos', activo: false },
  { icono: CreditCard, etiqueta: 'Cobros', activo: false },
]

/** Ventana de un CRM con la IA trabajando adentro: el cliente escribe,
 * la IA responde, agenda y pide el abono. Los mensajes entran uno a uno
 * y, al cerrar, caen las confirmaciones. Corre una sola vez; estático
 * si se prefiere movimiento reducido. */
export function HeroCrmMockup() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = el.querySelectorAll<HTMLElement>('[data-msg]')
    const typing = el.querySelector<HTMLElement>('[data-typing]')
    const floats = el.querySelectorAll<HTMLElement>('[data-float]')
    const filaCita = el.querySelector<HTMLElement>('[data-cita]')
    if (items.length === 0 || !typing) return

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 10 })
      gsap.set(typing, { autoAlpha: 0 })
      gsap.set(floats, { autoAlpha: 0, y: 16 })
      if (filaCita) gsap.set(filaCita, { autoAlpha: 0, y: 8 })

      const tl = gsap.timeline({ delay: 0.9 })
      mensajes.forEach((m, i) => {
        if (m.autor === 'ia') {
          tl.set(typing, { autoAlpha: 1 })
            .to({}, { duration: 0.8 })
            .set(typing, { autoAlpha: 0 })
        } else {
          tl.to({}, { duration: 0.4 })
        }
        tl.to(items[i], { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out' })
      })
      tl.to(floats, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: 'expo.out',
      })
      if (filaCita) {
        tl.to(
          filaCita,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' },
          '<0.15',
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Vista del CRM de SoftRent: el asistente de IA responde a una clienta, agenda su cita y pide el abono por SINPE"
      className="relative w-full"
    >
      <div className="rounded-lg bg-white/5 p-1.5 ring-1 ring-white/10">
        <div className="overflow-hidden rounded-md bg-surface text-ink">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Bandeja</p>
              <p className="truncate text-xs text-ink-muted">Barbería Don Luis</p>
            </div>
            <Badge tone="success" dot className="shrink-0">
              IA activa
            </Badge>
          </div>

          <div className="flex min-h-[22rem]">
            {/* Riel de navegación */}
            <nav
              aria-hidden="true"
              className="hidden w-12 shrink-0 flex-col items-center gap-1.5 border-e border-border bg-surface-sunken py-3 sm:flex"
            >
              {navegacion.map((item) => (
                <span
                  key={item.etiqueta}
                  className={`flex h-8 w-8 items-center justify-center rounded-sm ${
                    item.activo
                      ? 'bg-accent-soft text-accent-text'
                      : 'text-ink-muted'
                  }`}
                >
                  <item.icono className="h-[18px] w-[18px]" weight="regular" />
                </span>
              ))}
            </nav>

            {/* Conversación */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-inverse text-xs text-ink-inverse">
                  MF
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">María Fernández</p>
                  <p className="text-xs text-ink-muted">WhatsApp</p>
                </div>
              </div>

              <ul className="flex-1 space-y-2.5 px-4 py-4">
                {mensajes.map((m, i) => (
                  <li
                    key={i}
                    data-msg={m.autor}
                    className={`max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                      m.autor === 'ia'
                        ? 'bg-surface-sunken text-ink'
                        : 'ms-auto bg-accent text-on-accent'
                    }`}
                  >
                    {m.texto}
                    <span
                      className={`ms-2 align-baseline text-[10px] ${
                        m.autor === 'ia' ? 'text-ink-muted' : 'text-on-accent/75'
                      }`}
                    >
                      {m.hora}
                    </span>
                  </li>
                ))}
                <li
                  data-typing
                  className="flex w-fit items-center gap-1 rounded-sm bg-surface-sunken px-3 py-2.5 opacity-0"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:300ms]" />
                </li>
              </ul>

              <div className="border-t border-border px-4 py-3">
                <div className="flex items-center gap-2 rounded-sm bg-surface-sunken px-3 py-2 text-xs text-ink-muted">
                  <Sparkle
                    className="h-4 w-4 shrink-0 text-accent-text"
                    weight="fill"
                  />
                  Asistente IA respondiendo por usted
                </div>
              </div>
            </div>

            {/* Ficha del cliente */}
            <aside className="hidden w-44 shrink-0 border-s border-border px-4 py-4 md:block">
              <p className="text-sm font-semibold">María Fernández</p>
              <p className="text-xs text-ink-muted">Clienta frecuente</p>

              <dl className="mt-4 space-y-3 text-xs">
                <div>
                  <dt className="text-ink-muted">Última visita</dt>
                  <dd className="mt-0.5 font-medium">12 de setiembre</dd>
                </div>
                <div data-cita>
                  <dt className="text-ink-muted">Próxima cita</dt>
                  <dd className="mt-0.5 font-medium">Hoy, 16:30</dd>
                  <dd className="text-ink-muted">Tinte y corte con Jorge</dd>
                </div>
              </dl>

              <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                La IA agendó y pidió el abono sin intervención.
              </p>
            </aside>
          </div>
        </div>
      </div>

      {/* Confirmaciones que caen al cerrar la conversación */}
      <div
        data-float
        className="absolute -bottom-5 left-3 hidden items-center gap-3 rounded-md bg-surface px-4 py-3 text-ink shadow-md md:flex lg:-left-6"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle className="h-5 w-5" weight="fill" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold">Cita confirmada</p>
          <p className="text-xs text-ink-muted">Hoy, 16:30 con Jorge</p>
        </div>
      </div>

      <div
        data-float
        className="absolute -top-5 right-3 hidden items-center gap-3 rounded-md bg-surface px-4 py-3 text-ink shadow-md md:flex lg:-right-3"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent-text">
          <Coins className="h-5 w-5" weight="fill" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold">SINPE recibido</p>
          <p className="text-xs text-ink-muted">₡25.000 de abono</p>
        </div>
      </div>
    </div>
  )
}
