import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Badge } from '../ui/Badge'

type Mensaje = {
  autor: 'cliente' | 'bot'
  texto: string
  hora: string
}

const mensajes: Mensaje[] = [
  {
    autor: 'cliente',
    texto: 'Hola, ¿hay cupo mañana para un corte?',
    hora: '21:47',
  },
  {
    autor: 'bot',
    texto: 'Sí, don Luis. Mañana tengo 10:30 y 15:00 libres. ¿Cuál le queda mejor?',
    hora: '21:47',
  },
  {
    autor: 'cliente',
    texto: '10:30, por favor.',
    hora: '21:48',
  },
  {
    autor: 'bot',
    texto: 'Listo: mañana 10:30 con Jorge. Le llega el recordatorio 2 horas antes.',
    hora: '21:48',
  },
]

/** Mockup animado de una conversación real de demo (sección 3.4.2):
 * los mensajes entran uno a uno con indicador de escritura y la
 * conversación se repite. Estático si se prefiere movimiento reducido. */
export function ChatMockup() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = el.querySelectorAll<HTMLElement>('[data-msg]')
    const typing = el.querySelector<HTMLElement>('[data-typing]')
    if (items.length === 0 || !typing) return

    const ctx = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0, y: 10 })
      gsap.set(typing, { autoAlpha: 0 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 4.5, delay: 0.5 })
      mensajes.forEach((m, i) => {
        const item = items[i]
        if (m.autor === 'bot') {
          tl.set(typing, { autoAlpha: 1 })
            .to({}, { duration: 0.7 })
            .set(typing, { autoAlpha: 0 })
        } else {
          tl.to({}, { duration: 0.35 })
        }
        tl.to(item, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' })
      })
      tl.to({}, { duration: 1 })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="w-full max-w-sm rounded-lg bg-white/5 p-1.5 ring-1 ring-white/10"
    >
      <div className="overflow-hidden rounded-md bg-surface text-ink">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-deep font-display text-xs text-on-deep"
          >
            BD
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Barbería Don Luis</p>
            <p className="text-xs text-ink-soft">WhatsApp</p>
          </div>
          <Badge tone="info" dot>
            Asistente activo
          </Badge>
        </div>

        <ul className="space-y-2.5 px-4 py-4" aria-label="Conversación de ejemplo">
          {mensajes.map((m, i) => (
            <li
              key={i}
              data-msg={m.autor}
              className={`max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed ${
                m.autor === 'bot'
                  ? 'bg-surface-2 text-ink'
                  : 'ms-auto bg-brand text-on-brand'
              }`}
            >
              {m.texto}
              <span
                className={`ms-2 align-baseline text-[10px] ${
                  m.autor === 'bot' ? 'text-ink-soft' : 'text-on-brand/70'
                }`}
              >
                {m.hora}
              </span>
            </li>
          ))}
          <li
            data-typing
            aria-hidden="true"
            className="flex w-fit items-center gap-1 rounded-md bg-surface-2 px-3 py-2.5 opacity-0"
          >
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft [animation-delay:300ms]" />
          </li>
        </ul>

        <p className="border-t border-line px-4 py-2.5 text-xs text-ink-soft">
          Cita agendada y recordatorio programado, sin intervenir.
        </p>
      </div>
    </div>
  )
}
