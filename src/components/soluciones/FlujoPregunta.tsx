import { useEffect, useRef, useState } from 'react'
import { ChatCircleText, CheckCircle, Sparkle } from '@phosphor-icons/react'
import { Container } from '../layout/Container'
import type { Solucion } from '../../content/types'
import { cn } from '../../lib/cn'

const INTERVALO = 5200

/** Banda "mensaje → respuesta → acción": recorre sola las soluciones
 * para mostrar que todas siguen el mismo camino. Se pausa al pasar el
 * cursor o con foco dentro, y no avanza sola con movimiento reducido. */
export function FlujoPregunta({ items }: { items: Solucion[] }) {
  const [indice, setIndice] = useState(0)
  const [pausa, setPausa] = useState(false)
  const reducir = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (pausa || reducir.current) return
    const t = window.setInterval(
      () => setIndice((i) => (i + 1) % items.length),
      INTERVALO,
    )
    return () => window.clearInterval(t)
  }, [pausa, items.length])

  const item = items[indice]
  const [intercambio] = item.conversacion
  const habla =
    (item.area === 'clientes' ? 'Su cliente ' : 'Usted ') +
    (item.tipo === 'instruccion' ? 'lo pide' : 'pregunta')

  const pasos = [
    {
      icono: ChatCircleText,
      titulo: habla,
      contenido: (
        <p className="w-fit rounded-sm bg-accent px-3 py-2 text-sm leading-relaxed text-on-accent">
          {intercambio.pregunta}
        </p>
      ),
    },
    {
      icono: Sparkle,
      titulo: 'La IA responde con sus datos',
      contenido: (
        <p className="w-fit rounded-sm bg-white/10 px-3 py-2 text-sm leading-relaxed text-ink-inverse">
          {intercambio.contestacion}
        </p>
      ),
    },
    {
      icono: CheckCircle,
      titulo: 'Y lo deja hecho',
      contenido: (
        <div>
          <p className="text-heading-md text-ink-inverse">{item.accion}</p>
          <p className="mt-1 text-sm text-ink-inverse/70">{item.beneficio}</p>
        </div>
      ),
    },
  ]

  return (
    <section
      className="bg-surface-inverse py-20 text-ink-inverse sm:py-28"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onFocus={() => setPausa(true)}
      onBlur={() => setPausa(false)}
    >
      <Container>
        <h2 className="max-w-2xl text-balance font-display text-display-sm sm:text-display-md">
          Cada problema sigue el mismo camino: un mensaje.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-inverse/75">
          Usted o su cliente escriben como le hablarían a una persona: una
          pregunta o una instrucción. El sistema contesta con los datos del
          negocio y deja el proceso hecho.
        </p>

        <ol
          key={item.id}
          aria-live="polite"
          className="mt-12 grid gap-4 lg:grid-cols-3"
        >
          {pasos.map((paso, i) => (
            <li
              key={paso.titulo}
              style={{ animationDelay: `${i * 140}ms` }}
              className="demo-enter flex flex-col rounded-lg bg-white/5 p-6 ring-1 ring-white/10"
            >
              <span className="flex items-center gap-2.5 text-sm text-ink-inverse/70">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-ink-inverse">
                  {i + 1}
                </span>
                <paso.icono className="h-4 w-4" aria-hidden="true" />
                {paso.titulo}
              </span>
              <div className="mt-5">{paso.contenido}</div>
            </li>
          ))}
        </ol>

        <div
          role="group"
          aria-label="Elegir un problema"
          className="mt-8 flex flex-wrap gap-2"
        >
          {items.map((s, i) => {
            const activo = i === indice
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={activo}
                onClick={() => setIndice(i)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium outline-none transition-colors duration-[var(--duration-base)] focus-visible:ring-2 focus-visible:ring-focus',
                  activo
                    ? 'bg-ink-inverse text-surface-inverse'
                    : 'bg-white/5 text-ink-inverse/70 ring-1 ring-white/10 hover:text-ink-inverse',
                )}
              >
                {s.beneficio}
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
