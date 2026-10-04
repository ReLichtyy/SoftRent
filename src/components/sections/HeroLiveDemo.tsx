import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CalendarBlank,
  ChatsCircle,
  CheckCircle,
  HouseSimple,
  Sparkle,
  Users,
} from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/cn'
import { HeroAsk } from './HeroAsk'

/* Demo interactivo del hero: una ventana del producto que el visitante
 * puede recorrer. Vocabulario estándar a propósito — negocio, servicio,
 * cita — sin rubros concretos ni cobros. El chat arranca con la reserva
 * ya completa y la cita queda visible en la Agenda y en Clientes. */

type Vista = 'preguntar' | 'inicio' | 'chat' | 'agenda' | 'clientes'
type Paso = 'saludo' | 'inicio' | 'servicio' | 'hora' | 'horarios' | 'listo'

type Mensaje =
  | { autor: 'ia' | 'cliente'; texto: string }
  | { autor: 'sistema'; texto: string }

type Cita = {
  hora: string
  cliente: string
  iniciales: string
  servicio: string
  profesional: string
  nueva?: boolean
}

const SALUDO = '¡Hola! Soy el asistente de citas del negocio. ¿En qué le ayudo?'

const CHIP_CITA = 'Agendar una cita'
const CHIP_HORARIOS = 'Ver horarios'
const CHIP_AGENDA = 'Ver en la agenda'
const CHIP_OTRA = 'Agendar otra cita'
const CHIP_REPETIR = 'Repetir demo'

/* Guion del arranque: la conversación ya completa, como una sesión
 * real que el visitante encuentra en curso — la IA saluda, el cliente
 * pide la cita y queda agendada. Después, el visitante toma el control. */
const GUION_CLIENTE_1 = 'Hola, quiero agendar una cita'
const GUION_CONFIRMACION = 'Listo. Su cita de servicio principal quedó agendada para mañana a las 10:30. Le enviaré el recordatorio por WhatsApp.'

const SERVICIOS = [
  { etiqueta: 'Servicio principal · 45 min', nombre: 'Servicio principal' },
  { etiqueta: 'Servicio adicional · 30 min', nombre: 'Servicio adicional' },
]

const HORAS = ['10:30', '15:00']

const vistas = [
  { id: 'preguntar', icono: Sparkle, etiqueta: 'Preguntar' },
  { id: 'inicio', icono: HouseSimple, etiqueta: 'Inicio' },
  { id: 'chat', icono: ChatsCircle, etiqueta: 'Chat' },
  { id: 'agenda', icono: CalendarBlank, etiqueta: 'Agenda' },
  { id: 'clientes', icono: Users, etiqueta: 'Clientes' },
] as const

const agendaBase: Record<string, Cita[]> = {
  hoy: [
    { hora: '09:30', cliente: 'Carlos Rojas', iniciales: 'CR', servicio: 'Servicio principal', profesional: 'Ana Torres' },
    { hora: '11:00', cliente: 'Paula Méndez', iniciales: 'PM', servicio: 'Servicio adicional', profesional: 'Luis Ramírez' },
    { hora: '14:00', cliente: 'Jorge Vindas', iniciales: 'JV', servicio: 'Servicio principal', profesional: 'Ana Torres' },
    { hora: '16:30', cliente: 'Andrea Solano', iniciales: 'AS', servicio: 'Servicio adicional', profesional: 'Ana Torres' },
  ],
  manana: [
    { hora: '09:00', cliente: 'Sofía Chaves', iniciales: 'SC', servicio: 'Servicio principal', profesional: 'Luis Ramírez' },
    { hora: '13:00', cliente: 'Marco Díaz', iniciales: 'MD', servicio: 'Servicio principal', profesional: 'Ana Torres' },
  ],
  lun: [
    { hora: '10:00', cliente: 'Paula Méndez', iniciales: 'PM', servicio: 'Servicio principal', profesional: 'Ana Torres' },
    { hora: '15:30', cliente: 'Carlos Rojas', iniciales: 'CR', servicio: 'Servicio adicional', profesional: 'Luis Ramírez' },
  ],
  mar: [
    { hora: '09:00', cliente: 'Andrea Solano', iniciales: 'AS', servicio: 'Servicio principal', profesional: 'Ana Torres' },
  ],
}

const dias = [
  { id: 'hoy', corto: 'Hoy' },
  { id: 'manana', corto: 'Mañana' },
  { id: 'lun', corto: 'Lun 5' },
  { id: 'mar', corto: 'Mar 6' },
]

const clientesBase = [
  { nombre: 'Carlos Rojas', iniciales: 'CR', estado: 'Frecuente', ultima: '26 sept', proxima: 'Hoy · 09:30' },
  { nombre: 'Paula Méndez', iniciales: 'PM', estado: 'Nueva', ultima: '29 sept', proxima: 'Lunes · 10:00' },
  { nombre: 'Jorge Vindas', iniciales: 'JV', estado: 'Frecuente', ultima: '20 sept', proxima: 'Hoy · 14:00' },
  { nombre: 'Andrea Solano', iniciales: 'AS', estado: 'Frecuente', ultima: '1 oct', proxima: 'Hoy · 16:30' },
]

/** Ventana del producto en vivo: al cargar, la conversación ya está
 * completa — la IA agendó la cita — y el visitante puede responder,
 * agendar otra, repetir el guion o recorrer las demás vistas, donde
 * la cita queda reflejada al instante. */
export function HeroLiveDemo() {
  const [vista, setVista] = useState<Vista>('preguntar')
  const [paso, setPaso] = useState<Paso>('saludo')
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [chips, setChips] = useState<string[]>([])
  const [escribiendo, setEscribiendo] = useState(true)
  const [servicioSel, setServicioSel] = useState('')
  const [cita, setCita] = useState<{ servicio: string; hora: string } | null>(
    null,
  )
  const [dia, setDia] = useState('hoy')

  const timers = useRef<number[]>([])
  const chatEl = useRef<HTMLUListElement>(null)
  const reducir = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const programar = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, reducir.current ? 60 : ms))
  }

  /* Arranque: la conversación se reproduce sola hasta dejar la cita
   * agendada; con movimiento reducido los pasos son casi instantáneos. */
  useEffect(() => {
    reproducirGuion()
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* La conversación nueva queda siempre a la vista. */
  useEffect(() => {
    const el = chatEl.current
    if (el) el.scrollTop = el.scrollHeight
  }, [mensajes, escribiendo])

  const ia = (texto: string) =>
    setMensajes((m) => [...m, { autor: 'ia', texto }])

  const sistema = (texto: string) =>
    setMensajes((m) => [...m, { autor: 'sistema', texto }])

  /** Reproduce el guion completo: saludo, reserva y confirmación,
   * con sus pausas de escritura. Deja la cita agendada y el turno
   * en el visitante. */
  const reproducirGuion = () => {
    setMensajes([])
    setChips([])
    setCita(null)
    setServicioSel('Servicio principal')
    setDia('hoy')
    setPaso('listo')
    setEscribiendo(true)

    let t = 0
    const at = (ms: number, fn: () => void) => {
      t += ms
      programar(fn, t)
    }

    at(700, () => {
      setEscribiendo(false)
      ia(SALUDO)
    })
    at(1400, () =>
      setMensajes((m) => [...m, { autor: 'cliente', texto: GUION_CLIENTE_1 }]),
    )
    at(450, () => setEscribiendo(true))
    at(1000, () => {
      setEscribiendo(false)
      ia('Con gusto. ¿Qué servicio necesita?')
    })
    at(1500, () =>
      setMensajes((m) => [
        ...m,
        { autor: 'cliente', texto: SERVICIOS[0].etiqueta },
      ]),
    )
    at(450, () => setEscribiendo(true))
    at(1000, () => {
      setEscribiendo(false)
      ia('Perfecto. Para mañana tengo libre 10:30 y 15:00. ¿Cuál le viene mejor?')
    })
    at(1600, () =>
      setMensajes((m) => [...m, { autor: 'cliente', texto: 'Mañana 10:30' }]),
    )
    at(450, () => setEscribiendo(true))
    at(1000, () => {
      setEscribiendo(false)
      setCita({ servicio: 'Servicio principal', hora: '10:30' })
      ia(GUION_CONFIRMACION)
    })
    at(350, () => sistema('Cita agendada · visible en la Agenda'))
    at(450, () =>
      setChips([CHIP_AGENDA, CHIP_OTRA, CHIP_HORARIOS, CHIP_REPETIR]),
    )
  }

  const irAAgenda = () => {
    setVista('agenda')
    setDia('manana')
  }

  const responder = (opcion: string) => {
    if (opcion === CHIP_REPETIR) {
      reproducirGuion()
      return
    }
    if (opcion === CHIP_OTRA) {
      ia('Con gusto. ¿Qué servicio necesita?')
      setChips(SERVICIOS.map((s) => s.etiqueta))
      setPaso('servicio')
      return
    }
    if (opcion === CHIP_AGENDA) {
      irAAgenda()
      setChips([CHIP_OTRA, CHIP_REPETIR])
      return
    }
    switch (paso) {
      case 'inicio':
      case 'horarios':
      case 'listo':
        if (opcion === CHIP_CITA) {
          ia('Con gusto. ¿Qué servicio necesita?')
          setChips(SERVICIOS.map((s) => s.etiqueta))
          setPaso('servicio')
        } else {
          ia('Claro. Mañana tengo libre 10:30 y 15:00; el lunes, 9:00 y 16:00.')
          setChips([CHIP_CITA, CHIP_REPETIR])
          setPaso('horarios')
        }
        break
      case 'servicio': {
        const s = SERVICIOS.find((x) => x.etiqueta === opcion) ?? SERVICIOS[0]
        setServicioSel(s.nombre)
        ia(`Perfecto. Para mañana tengo libre ${HORAS[0]} y ${HORAS[1]}. ¿Cuál le viene mejor?`)
        setChips(HORAS.map((h) => `Mañana ${h}`))
        setPaso('hora')
        break
      }
      case 'hora': {
        const hora = opcion.replace('Mañana ', '')
        setCita({ servicio: servicioSel, hora })
        ia(`Listo. Su cita de ${servicioSel.toLowerCase()} quedó agendada para mañana a las ${hora}. Le enviaré el recordatorio por WhatsApp.`)
        sistema('Cita agendada · visible en la Agenda')
        setChips([CHIP_AGENDA, CHIP_OTRA, CHIP_HORARIOS, CHIP_REPETIR])
        setPaso('listo')
        break
      }
    }
  }

  const elegir = (opcion: string) => {
    if (escribiendo) return
    setMensajes((m) => [...m, { autor: 'cliente', texto: opcion }])
    setChips([])
    setEscribiendo(true)
    programar(() => {
      setEscribiendo(false)
      responder(opcion)
    }, 950)
  }

  const conteo = (id: string) =>
    (agendaBase[id]?.length ?? 0) + (id === 'manana' && cita ? 1 : 0)

  const citasDia = (() => {
    const base = [...(agendaBase[dia] ?? [])]
    if (dia === 'manana' && cita) {
      base.push({
        hora: cita.hora,
        cliente: 'Mariana Quesada',
        iniciales: 'MQ',
        servicio: cita.servicio,
        profesional: 'Ana Torres',
        nueva: true,
      })
    }
    return base.sort((a, b) => a.hora.localeCompare(b.hora))
  })()

  const botonVista = (v: (typeof vistas)[number]) => {
    const activo = vista === v.id
    const novedad = v.id === 'agenda' && cita !== null && vista !== 'agenda'
    return (
      <button
        key={v.id}
        type="button"
        onClick={() => {
          setVista(v.id)
          if (v.id === 'agenda' && cita) setDia('manana')
        }}
        aria-current={activo ? 'page' : undefined}
        className={cn(
          'relative flex flex-1 flex-col items-center gap-1 rounded-sm py-2 text-xs font-medium text-ink-muted transition-colors duration-[var(--duration-fast)] hover:text-ink',
          activo && 'bg-surface text-accent-text hover:text-accent-text',
        )}
      >
        {novedad && (
          <span
            aria-hidden="true"
            className="absolute right-2 top-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-brand"
          />
        )}
        <v.icono
          className="h-[18px] w-[18px]"
          weight={activo ? 'fill' : 'regular'}
          aria-hidden="true"
        />
        {v.etiqueta}
      </button>
    )
  }

  return (
    <div className="relative">
      {/* Halo suave detrás de la ventana, para que flote sobre el fondo
       * inverso sin introducir otro color. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-lg bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]"
      />

      <div className="rounded-lg bg-white/5 p-1.5 ring-1 ring-white/10">
        <div className="flex h-[30rem] flex-col overflow-hidden rounded-md bg-surface text-ink sm:h-[31rem]">
          {/* Encabezado de la ventana */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Su Negocio</p>
              <p className="truncate text-xs text-ink-muted">
                Panel de citas · demo
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-text">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand"
              />
              Demo interactiva
            </span>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* Riel de vistas (escritorio) */}
            <nav
              aria-label="Vistas del demo"
              className="hidden w-16 shrink-0 flex-col gap-1 border-e border-border bg-surface-sunken p-2 sm:flex"
            >
              {vistas.map(botonVista)}
            </nav>

            {/* Contenido de la vista activa */}
            <div key={vista} className="flex min-h-0 min-w-0 flex-1 flex-col">
              {vista === 'preguntar' && <HeroAsk />}

              {vista === 'chat' && (
                <>
                  <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-inverse text-xs text-ink-inverse">
                      MQ
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        Mariana Quesada
                      </p>
                      <p className="text-xs text-ink-muted">
                        WhatsApp · en línea
                      </p>
                    </div>
                  </div>

                  <ul
                    ref={chatEl}
                    aria-live="polite"
                    aria-label="Conversación con el asistente"
                    className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-4 py-4"
                  >
                    {mensajes.map((m, i) =>
                      m.autor === 'sistema' ? (
                        <li
                          key={i}
                          className="demo-msg flex items-center justify-center gap-1.5 text-xs font-medium text-success"
                        >
                          <CheckCircle
                            className="h-3.5 w-3.5"
                            weight="fill"
                            aria-hidden="true"
                          />
                          {m.texto}
                        </li>
                      ) : (
                        <li
                          key={i}
                          className={cn(
                            'demo-msg max-w-[85%] rounded-sm px-3 py-2 text-sm leading-relaxed',
                            m.autor === 'ia'
                              ? 'w-fit bg-surface-sunken text-ink'
                              : 'ms-auto bg-accent text-on-accent',
                          )}
                        >
                          {m.texto}
                        </li>
                      ),
                    )}
                    {escribiendo && (
                      <li className="flex w-fit items-center gap-1 rounded-sm bg-surface-sunken px-3 py-2.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted [animation-delay:300ms]" />
                      </li>
                    )}
                  </ul>

                  {chips.length > 0 && !escribiendo && (
                    <div
                      role="group"
                      aria-label="Respuestas rápidas"
                      className="flex shrink-0 flex-wrap gap-2 border-t border-border px-4 py-3"
                    >
                      {chips.map((c, idx) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => elegir(c)}
                          style={{ animationDelay: `${idx * 70}ms` }}
                          className="demo-enter rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-sunken"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="shrink-0 border-t border-border px-4 py-3">
                    <div className="flex items-center gap-2 rounded-sm bg-surface-sunken px-3 py-2 text-xs text-ink-muted">
                      <Sparkle
                        className="h-4 w-4 shrink-0 text-accent-text"
                        weight="fill"
                        aria-hidden="true"
                      />
                      Asistente IA respondiendo por usted
                    </div>
                  </div>
                </>
              )}

              {vista === 'inicio' && (
                <div className="demo-enter flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5">
                  <p className="text-xs text-ink-muted">Sábado 3 de octubre</p>
                  <p className="mt-1 font-display text-heading-lg italic text-ink">
                    Buenas tardes
                  </p>

                  <dl className="mt-5 grid grid-cols-3 gap-2.5">
                    <div className="rounded-sm bg-surface-sunken px-3 py-3">
                      <dd className="font-display text-2xl text-ink">
                        {agendaBase.hoy.length}
                      </dd>
                      <dt className="mt-0.5 text-xs text-ink-muted">
                        Citas de hoy
                      </dt>
                    </div>
                    <div className="rounded-sm bg-surface-sunken px-3 py-3">
                      <dd className="font-display text-2xl text-ink">82%</dd>
                      <dt className="mt-0.5 text-xs text-ink-muted">
                        Ocupación
                      </dt>
                    </div>
                    <div className="rounded-sm bg-surface-sunken px-3 py-3">
                      <dd className="font-display text-2xl text-ink">2</dd>
                      <dt className="mt-0.5 text-xs text-ink-muted">
                        Nuevos clientes
                      </dt>
                    </div>
                  </dl>

                  {cita && (
                    <button
                      type="button"
                      onClick={irAAgenda}
                      className="mt-5 flex items-center gap-3 rounded-sm border border-success/40 bg-success-soft px-3.5 py-3 text-left transition-colors duration-[var(--duration-fast)] hover:border-success"
                    >
                      <CheckCircle
                        className="h-5 w-5 shrink-0 text-success"
                        weight="fill"
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">
                          La IA agendó una cita
                        </span>
                        <span className="block text-xs text-ink-muted">
                          {cita.servicio} · mañana {cita.hora}
                        </span>
                      </span>
                      <ArrowRight
                        className="ms-auto h-4 w-4 shrink-0 text-ink-muted"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  <p className="mt-6 text-heading-sm text-ink">
                    Próximas citas
                  </p>
                  <ul className="mt-3 space-y-2">
                    {agendaBase.hoy.slice(0, 3).map((c) => (
                      <li
                        key={c.hora}
                        className="flex items-center gap-3 rounded-sm border border-border px-3.5 py-2.5"
                      >
                        <span className="w-11 shrink-0 text-sm font-semibold tabular-nums">
                          {c.hora}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-[10px] font-semibold">
                          {c.iniciales}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {c.cliente}
                          </p>
                          <p className="truncate text-xs text-ink-muted">
                            {c.servicio}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {vista === 'agenda' && (
                <div className="demo-enter flex min-h-0 flex-1 flex-col px-5 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-heading-sm text-ink">Agenda</p>
                    <Badge tone="neutral">{citasDia.length} citas</Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {dias.map((d) => {
                      const activo = dia === d.id
                      return (
                        <button
                          key={d.id}
                          type="button"
                          aria-pressed={activo}
                          onClick={() => setDia(d.id)}
                          className={cn(
                            'relative rounded-sm border py-2 text-xs font-medium transition-colors duration-[var(--duration-fast)]',
                            activo
                              ? 'border-transparent bg-surface-inverse text-ink-inverse'
                              : 'border-border text-ink hover:bg-surface-sunken',
                          )}
                        >
                          {d.corto}
                          {conteo(d.id) > 0 && (
                            <span
                              aria-hidden="true"
                              className={cn(
                                'absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full',
                                activo ? 'bg-ink-inverse' : 'bg-accent-text',
                              )}
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
                    {citasDia.map((c) => (
                      <li
                        key={`${c.hora}-${c.cliente}`}
                        className={cn(
                          'flex items-center gap-3 rounded-sm border border-border px-3.5 py-2.5',
                          c.nueva &&
                            'demo-cita-nueva border-success/40 bg-success-soft',
                        )}
                      >
                        <span className="w-11 shrink-0 text-sm font-semibold tabular-nums">
                          {c.hora}
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-[10px] font-semibold">
                          {c.iniciales}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {c.cliente}
                          </p>
                          <p className="truncate text-xs text-ink-muted">
                            {c.servicio} · {c.profesional.split(' ')[0]}
                          </p>
                        </div>
                        {c.nueva && (
                          <Badge
                            tone="success"
                            className="ms-auto shrink-0"
                          >
                            Agendada por IA
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 shrink-0 text-xs text-ink-muted">
                    Las citas que la IA agenda en el chat aparecen aquí al
                    instante.
                  </p>
                </div>
              )}

              {vista === 'clientes' && (
                <div className="demo-enter flex min-h-0 flex-1 flex-col px-5 py-5">
                  <p className="text-heading-sm text-ink">Clientes</p>
                  <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
                    {cita && (
                      <li className="flex items-center gap-3 rounded-sm border border-success/40 bg-success-soft px-3.5 py-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-[10px] font-semibold">
                          MQ
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            Mariana Quesada
                          </p>
                          <p className="truncate text-xs text-ink-muted">
                            Cita de {cita.servicio.toLowerCase()} · mañana{' '}
                            {cita.hora}
                          </p>
                        </div>
                        <Badge tone="success" className="ms-auto shrink-0">
                          Agendada por IA
                        </Badge>
                      </li>
                    )}
                    {clientesBase.map((c) => (
                      <li
                        key={c.nombre}
                        className="flex items-center gap-3 rounded-sm border border-border px-3.5 py-2.5"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-[10px] font-semibold">
                          {c.iniciales}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {c.nombre}
                          </p>
                          <p className="truncate text-xs text-ink-muted">
                            {c.estado} · última visita {c.ultima}
                          </p>
                        </div>
                        <span className="ms-auto shrink-0 text-xs font-medium">
                          {c.proxima}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Vistas en móvil */}
          <nav
            aria-label="Vistas del demo"
            className="grid shrink-0 grid-cols-5 border-t border-border bg-surface-sunken sm:hidden"
          >
            {vistas.map(botonVista)}
          </nav>
        </div>
      </div>

      {/* Confirmación flotante, como la del diseño original: cae cuando
       * la conversación deja la cita agendada. */}
      {cita && vista !== 'preguntar' && (
        <div
          key={`${cita.servicio}-${cita.hora}`}
          className="demo-enter absolute -bottom-5 left-3 hidden items-center gap-3 rounded-md bg-surface px-4 py-3 text-ink shadow-md md:flex lg:-left-6"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
            <CheckCircle className="h-5 w-5" weight="fill" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">Cita agendada con éxito</p>
            <p className="text-xs text-ink-muted">
              Mañana · {cita.hora} · {cita.servicio}
            </p>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-ink-inverse/60">
        Demo en vivo: pregúntele al sistema, responda en el chat o explore el panel.
      </p>
    </div>
  )
}
