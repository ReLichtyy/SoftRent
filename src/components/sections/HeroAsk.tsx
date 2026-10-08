import { useEffect, useRef, useState } from 'react'
import { CheckCircle, PaperPlaneTilt, Sparkle } from '@phosphor-icons/react'
import { cn } from '../../lib/cn'

/* Vista "Preguntar" del demo del hero: el administrador le habla al
 * sistema en lenguaje normal y recibe la respuesta con sus propios
 * datos. Las preguntas son fijas (demo); las cifras son ilustrativas
 * y coinciden con la agenda y los clientes del resto del demo. */

type Respuesta = {
  texto: string
  /** Barras por día (valor relativo) cuando la respuesta es un conteo. */
  barras?: { dia: string; valor: number; max?: boolean }[]
  /** Lista corta de personas o elementos. */
  lista?: { principal: string; detalle: string }[]
  /** Acción que el sistema ofrece ejecutar a continuación. */
  accion?: { etiqueta: string; hecho: string }
}

type Pregunta = { id: string; texto: string; respuesta: Respuesta }

const PREGUNTAS: Pregunta[] = [
  {
    id: 'semana',
    texto: '¿Cuántas citas tengo esta semana?',
    respuesta: {
      texto:
        'Tiene 14 citas esta semana. El martes está casi vacío: solo 1.',
      barras: [
        { dia: 'L', valor: 4 },
        { dia: 'M', valor: 1 },
        { dia: 'X', valor: 3 },
        { dia: 'J', valor: 4, max: true },
        { dia: 'V', valor: 2 },
      ],
    },
  },
  {
    id: 'inactivos',
    texto: '¿Quién no ha vuelto en dos meses?',
    respuesta: {
      texto: 'Hay 3 clientes que no vuelven desde julio:',
      lista: [
        { principal: 'Marco Díaz', detalle: 'Última visita 12 jul' },
        { principal: 'Sofía Chaves', detalle: 'Última visita 28 jul' },
        { principal: 'Elena Brenes', detalle: 'Última visita 3 ago' },
      ],
      accion: {
        etiqueta: 'Escribirles por WhatsApp',
        hecho: 'Listo: mensaje enviado a los 3 clientes.',
      },
    },
  },
  {
    id: 'hora',
    texto: '¿A qué hora se llena más mi agenda?',
    respuesta: {
      texto:
        'Entre las 10:00 y las 11:00, casi siempre. Las 15:00 son su hueco más libre.',
      barras: [
        { dia: '9h', valor: 2 },
        { dia: '10h', valor: 5, max: true },
        { dia: '11h', valor: 4 },
        { dia: '14h', valor: 2 },
        { dia: '15h', valor: 1 },
      ],
    },
  },
]

type Turno =
  | { tipo: 'pregunta'; texto: string }
  | { tipo: 'respuesta'; id: string }

export function HeroAsk({ showcase = false }: { showcase?: boolean }) {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [pensando, setPensando] = useState(false)
  const [hechas, setHechas] = useState<string[]>([])
  const [accionHecha, setAccionHecha] = useState(false)

  const timers = useRef<number[]>([])
  const lista = useRef<HTMLUListElement>(null)
  const reducir = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const programar = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, reducir.current ? 40 : ms))
  }

  const preguntar = (p: Pregunta) => {
    if (pensando || hechas.includes(p.id)) return
    setHechas((h) => [...h, p.id])
    setTurnos((t) => [...t, { tipo: 'pregunta', texto: p.texto }])
    setPensando(true)
    programar(() => {
      setPensando(false)
      setTurnos((t) => [...t, { tipo: 'respuesta', id: p.id }])
    }, 1100)
  }

  /* Arranque: la primera pregunta ya se está respondiendo cuando el
   * visitante llega, para que vea el resultado sin hacer nada. */
  useEffect(() => {
    programar(() => preguntar(PREGUNTAS[0]), 700)
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = lista.current
    if (el) el.scrollTop = el.scrollHeight
  }, [turnos, pensando, accionHecha])

  const pendientes = PREGUNTAS.filter((p) => !hechas.includes(p.id))

  return (
    <div className={cn('demo-enter flex min-h-0 flex-1 flex-col', showcase && 'showcase-ask')}>
      <div className="ask-heading flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
        <Sparkle
          className="h-4 w-4 text-accent-text"
          weight="fill"
          aria-hidden="true"
        />
        <p className="text-sm font-semibold">Pregúntele a su negocio</p>
      </div>

      <ul
        ref={lista}
        aria-live="polite"
        aria-label="Preguntas y respuestas"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {turnos.length === 0 && !pensando && (
          <li className="text-sm text-ink-muted">
            Escriba como le hablaría a un empleado. El sistema busca por usted.
          </li>
        )}
        {turnos.map((t, i) => {
          if (t.tipo === 'pregunta') {
            return (
              <li
                key={i}
                className="ask-question demo-msg ms-auto w-fit max-w-[85%] rounded-sm bg-accent px-3 py-2 text-sm leading-relaxed text-on-accent"
              >
                {t.texto}
              </li>
            )
          }
          const r = PREGUNTAS.find((p) => p.id === t.id)!.respuesta
          return (
            <li
              key={i}
              className="ask-answer demo-msg w-fit max-w-[92%] rounded-sm bg-surface-sunken px-3.5 py-3 text-sm leading-relaxed"
            >
              {showcase && <p className="answer-source">{r.barras ? 'Agenda' : 'Clientes'} <span>/ Datos de ejemplo</span></p>}
              <p>{r.texto}</p>

              {r.barras && (
                <div
                  role={showcase ? 'img' : undefined}
                  aria-label={showcase ? r.barras.map((b) => `${b.dia}: ${b.valor} citas`).join(', ') : undefined}
                  aria-hidden={showcase ? undefined : true}
                  className="answer-chart mt-3 flex h-16 items-end gap-2"
                >
                  {r.barras.map((b) => (
                    <div
                      key={b.dia}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      {showcase && <span className="chart-value">{b.valor}</span>}
                      <div
                        className={cn(
                          'w-full rounded-xs',
                          b.max ? 'bg-accent' : 'bg-border-strong/50',
                        )}
                        style={{ height: `${b.valor * (showcase ? 12 : 9)}px` }}
                      />
                      <span className="text-[10px] text-ink-muted">
                        {b.dia}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {r.lista && (
                <ul className="mt-3 space-y-1.5">
                  {r.lista.map((x) => (
                    <li
                      key={x.principal}
                      className="flex items-center justify-between gap-3 rounded-xs bg-surface px-2.5 py-1.5"
                    >
                      <span className="text-sm font-medium">{x.principal}</span>
                      <span className="text-xs text-ink-muted">{x.detalle}</span>
                    </li>
                  ))}
                </ul>
              )}

              {r.accion &&
                (accionHecha ? (
                  <p className="demo-msg mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
                    <CheckCircle
                      className="h-4 w-4"
                      weight="fill"
                      aria-hidden="true"
                    />
                    {r.accion.hecho}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAccionHecha(true)}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-sm bg-surface-inverse px-3 py-1.5 text-xs font-medium text-ink-inverse transition-colors duration-[var(--duration-fast)] hover:bg-ink"
                  >
                    <PaperPlaneTilt
                      className="h-3.5 w-3.5"
                      weight="fill"
                      aria-hidden="true"
                    />
                    {r.accion.etiqueta}
                  </button>
                ))}
            </li>
          )
        })}
        {pensando && (
          <li className="ask-thinking flex w-fit items-center gap-1 rounded-sm bg-surface-sunken px-3 py-2.5">
            {showcase && <span className="mr-2 text-xs">Consultando tu negocio</span>}
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:300ms]" />
          </li>
        )}
      </ul>

      <div className="ask-suggestions shrink-0 border-t border-border px-4 py-3">
        {pendientes.length > 0 ? (
          <div
            role="group"
            aria-label="Preguntas de ejemplo"
            className="flex flex-wrap gap-2"
          >
            {pendientes.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={pensando}
                onClick={() => preguntar(p)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-sunken disabled:opacity-50"
              >
                {p.texto}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-ink-muted">
            Así de simple: pregunta, respuesta y, si quiere, acción.
          </p>
        )}
      </div>
    </div>
  )
}
