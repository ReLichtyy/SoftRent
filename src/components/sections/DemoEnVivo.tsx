import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  ArrowClockwise,
  ArrowSquareOut,
  ChatsCircle,
  Check,
  Desktop,
  DeviceMobile,
  LockSimple,
  Sparkle,
} from '@phosphor-icons/react'
import { Button } from '../ui/Button'
import { demos } from '../../content/demos'
import type { DemoId } from '../../content/types'
import { demoIcon } from '../../lib/demo-icons'
import { cn } from '../../lib/cn'

/* Demo en vivo (diseño "Demo en vivo", opción 1a): el sistema real
 * dentro de la página, en un marco de navegador a todo el ancho, con
 * pestañas por sistema y la información debajo. Si el iframe no carga
 * en 12 s (X-Frame-Options/CSP, red lenta) cae al plan B: la captura
 * del sistema con el enlace para abrirlo en su propia pestaña. */

const TIMEOUT_MS = 12000
/* Ancho de referencia del sistema en escritorio: el iframe se escala
 * para que quepa entero en el escenario. */
const ANCHO_ESCRITORIO = 1280
/* Altura de la barra del navegador más su borde. */
const ALTO_BARRA = 42

type Dispositivo = 'desktop' | 'mobile'

/* Pestañas: las demos del catálogo más el ChatBot de prueba, que vive
 * solo en esta sección (todavía sin contenido). */
const CHATBOT = 'chatbot'
type Pestana = DemoId | typeof CHATBOT
const pestanas: Pestana[] = [...demos.map((d) => d.id), CHATBOT]

const dispositivos = [
  { id: 'desktop', label: 'Escritorio', Icono: Desktop },
  { id: 'mobile', label: 'Móvil', Icono: DeviceMobile },
] as const

const publicada = (d: (typeof demos)[number]) =>
  d.estado === 'publicada' && d.demoUrl !== null

/** Sigue el ancho de un elemento con ResizeObserver. */
function useAncho<T extends HTMLElement>(inicial: number) {
  const ref = useRef<T>(null)
  const [ancho, setAncho] = useState(inicial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const v = Math.round(e.contentRect.width)
      if (v) setAncho(v)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, ancho] as const
}

export function DemoEnVivo({
  demoInicial = 'citas',
}: {
  demoInicial?: DemoId
}) {
  const uid = useId()
  const titleId = `${uid}-titulo`
  const panelId = `${uid}-panel`

  const [demoId, setDemoId] = useState<DemoId>(
    () =>
      (demos.find((d) => d.id === demoInicial) ??
        demos.find(publicada) ??
        demos[0]).id,
  )
  const [dispositivo, setDispositivo] = useState<Dispositivo>('desktop')
  const [cargada, setCargada] = useState(false)
  const [vencida, setVencida] = useState(false)
  const [recargas, setRecargas] = useState(0)
  const [visible, setVisible] = useState(false)
  const [hechos, setHechos] = useState<number[]>([])
  const [chat, setChat] = useState(false)
  /* Pestañas ya abiertas: las demás llevan un punto que invita a
   * tocarlas, y el punto se va en cuanto se muestran. */
  const [vistas, setVistas] = useState<Pestana[]>(() => [demoId])

  const [rootRef, ancho] = useAncho<HTMLElement>(1152)
  const [stageRef, anchoStage] = useAncho<HTMLDivElement>(1088)
  const tabsRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)

  const demo = demos.find((d) => d.id === demoId) ?? demos[0]
  const enVivo = publicada(demo)
  const bloqueada = enVivo && vencida
  const angosto = ancho < 720
  const modo = angosto ? 'full' : dispositivo

  const armarTimer = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVencida(true), TIMEOUT_MS)
  }

  /* El iframe se monta solo cuando el escenario se acerca a la vista;
   * desde ahí corre el plazo del plan B. */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [stageRef])

  useEffect(() => {
    if (visible && enVivo && !cargada) armarTimer()
    return () => window.clearTimeout(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, demoId, recargas])

  const activa: Pestana = chat ? CHATBOT : demoId

  const elegir = (id: Pestana) => {
    if (id === activa) return
    setVistas((v) => (v.includes(id) ? v : [...v, id]))
    if (id === CHATBOT) {
      setChat(true)
      return
    }
    setChat(false)
    if (id === demoId) return
    setDemoId(id)
    setCargada(false)
    setVencida(false)
    setHechos([])
  }

  const marcar = (i: number) =>
    setHechos((h) => (h.includes(i) ? h.filter((x) => x !== i) : [...h, i]))

  const recargar = () => {
    setRecargas((n) => n + 1)
    setCargada(false)
    setVencida(false)
  }

  /* Pestañas con flechas, Inicio y Fin (patrón WAI-ARIA tabs). */
  const onTabsKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = pestanas.length
    const i = pestanas.indexOf(activa)
    let j = i
    if (e.key === 'ArrowRight') j = (i + 1) % n
    else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n
    else if (e.key === 'Home') j = 0
    else if (e.key === 'End') j = n - 1
    else return
    e.preventDefault()
    elegir(pestanas[j])
    tabsRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [j]?.focus()
  }

  /* Medidas del escenario. Escritorio: iframe de 1280px escalado al
   * ancho disponible. Móvil: marco de 392px sobre fondo hundido. */
  const altoEscenario = angosto ? 560 : 680
  const padEscenario = modo === 'mobile' ? 24 : 0
  const altoCuerpo = altoEscenario - padEscenario * 2 - ALTO_BARRA
  let anchoMarco = '100%'
  let anchoIframe = '100%'
  let altoIframe = altoCuerpo
  let escala = 1
  if (modo === 'desktop') {
    escala = Math.min(1, (anchoStage - 2) / ANCHO_ESCRITORIO)
    anchoIframe = `${ANCHO_ESCRITORIO}px`
    altoIframe = Math.round(altoCuerpo / escala)
  } else if (modo === 'mobile') {
    anchoMarco = '392px'
    anchoIframe = '390px'
  }

  let host = ''
  if (demo.demoUrl) {
    try {
      host = new URL(demo.demoUrl).host
    } catch {
      host = demo.demoUrl
    }
  }

  const IconoDemo = demoIcon(demo.id)
  const recorrido = demo.recorrido ?? []

  return (
    <section ref={rootRef} aria-labelledby={titleId}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <header className="max-w-[600px]">
          <p className="flex items-center gap-2 text-eyebrow uppercase text-ink-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
            Demo en vivo
          </p>
          <h1
            id={titleId}
            className={cn(
              'mt-3.5 font-display text-ink',
              angosto ? 'text-display-sm' : 'text-display-md',
            )}
          >
            Pruebe el sistema real, aquí mismo.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-pretty text-ink-muted">
            No es un video: navegue la demo dentro de la página o ábrala
            completa en otra pestaña.
          </p>
        </header>

        {!angosto && enVivo && !chat && (
          <div
            role="group"
            aria-label="Tamaño de la vista previa"
            className="inline-flex gap-0.5 rounded-sm border border-border bg-surface-sunken p-1"
          >
            {dispositivos.map(({ id, label, Icono }) => {
              const activo = dispositivo === id
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={activo}
                  onClick={() => setDispositivo(id)}
                  className={cn(
                    'inline-flex h-8 items-center gap-1.5 rounded-xs px-3 text-sm font-medium transition-colors duration-[var(--duration-fast)]',
                    activo
                      ? 'bg-surface text-ink shadow-xs'
                      : 'text-ink-muted hover:text-ink',
                  )}
                >
                  <Icono className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Sistemas"
        onKeyDown={onTabsKey}
        className="mt-8 flex gap-6 overflow-x-auto border-b border-border"
      >
        {demos.map((d) => {
          const sel = d.id === activa
          const Icono = demoIcon(d.id)
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`${uid}-tab-${d.id}`}
              aria-selected={sel}
              aria-controls={panelId}
              tabIndex={sel ? 0 : -1}
              onClick={() => elegir(d.id)}
              className={cn(
                '-mb-px inline-flex flex-none items-center gap-2 border-b-2 py-3 text-sm font-medium transition-colors duration-[var(--duration-fast)]',
                sel
                  ? 'border-ink text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              <Icono className="h-[18px] w-[18px]" aria-hidden="true" />
              {d.nombre.replace(/^SoftRent\s+/, '')}
              {!publicada(d) && (
                <span className="rounded-full bg-surface-sunken px-2 py-px text-[11px] font-medium text-ink-muted">
                  Próximamente
                </span>
              )}
              {!sel && !vistas.includes(d.id) && <PuntoNuevo />}
            </button>
          )
        })}

        {/* ChatBot de prueba: hover propio en la señal roja, con el
         * destello que gira, para distinguirlo de los sistemas. */}
        <button
          type="button"
          role="tab"
          id={`${uid}-tab-${CHATBOT}`}
          aria-selected={chat}
          aria-controls={`${panelId}-chatbot`}
          tabIndex={chat ? 0 : -1}
          onClick={() => elegir(CHATBOT)}
          className={cn(
            'group -mb-px inline-flex flex-none items-center gap-2 border-b-2 py-3 text-sm font-medium transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)]',
            chat
              ? 'border-accent text-accent-text'
              : 'border-transparent text-ink-muted hover:border-accent/40 hover:text-accent-text',
          )}
        >
          <Sparkle
            className="h-[18px] w-[18px] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:rotate-[24deg] group-hover:scale-110"
            weight={chat ? 'fill' : 'regular'}
            aria-hidden="true"
          />
          ChatBot de Prueba
          {!chat && !vistas.includes(CHATBOT) && <PuntoNuevo />}
        </button>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${demo.id}`}
        hidden={chat}
        className="mt-6"
      >
        {/* Recorrido sugerido: tres tareas concretas para que nadie
         * quede frente a una demo vacía sin saber qué tocar. El
         * visitante las marca a mano; el iframe no expone su avance. */}
        {enVivo && recorrido.length > 0 && (
          <div className="mb-4 flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-heading-sm text-ink">
                Pruebe esto
              </h2>
              <p
                aria-live="polite"
                className="text-xs font-medium tabular-nums text-ink-muted"
              >
                {hechos.length === recorrido.length
                  ? 'Recorrido completo'
                  : `${hechos.length} de ${recorrido.length}`}
              </p>
            </div>
            <ol className="grid gap-2 sm:grid-cols-3">
              {recorrido.map((tarea, i) => {
                const hecho = hechos.includes(i)
                return (
                  <li key={tarea}>
                    <button
                      type="button"
                      aria-pressed={hecho}
                      onClick={() => marcar(i)}
                      className={cn(
                        'group flex h-full w-full items-center gap-3 rounded-sm border px-3 py-2.5 text-left text-sm transition-colors duration-[var(--duration-fast)]',
                        hecho
                          ? 'border-success/40 bg-success-soft text-ink'
                          : 'border-border bg-surface text-ink hover:border-border-strong',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'grid h-6 w-6 flex-none place-items-center rounded-full font-display text-sm tabular-nums transition-colors duration-[var(--duration-fast)]',
                          hecho
                            ? 'bg-success text-surface'
                            : 'border border-border text-ink-muted group-hover:border-border-strong',
                        )}
                      >
                        {hecho ? <Check className="h-3.5 w-3.5" weight="bold" /> : i + 1}
                      </span>
                      {tarea}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        {/* Escenario */}
        <div
          ref={stageRef}
          style={{ height: altoEscenario, padding: padEscenario }}
          className={cn(
            'box-border flex justify-center rounded-md transition-[padding,background-color] duration-[var(--duration-slow)] ease-[var(--ease-out)]',
            padEscenario ? 'bg-surface-sunken' : 'bg-transparent',
          )}
        >
          <div
            style={{ width: anchoMarco }}
            className="flex h-full max-w-full flex-col overflow-hidden rounded-md border border-border bg-surface shadow-md transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-out)]"
          >
            {/* Barra del navegador */}
            <div className="flex h-10 flex-none items-center gap-3 border-b border-border bg-surface-sunken px-3">
              <div aria-hidden="true" className="flex flex-none gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong opacity-45" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong opacity-45" />
                <span className="h-2.5 w-2.5 rounded-full bg-border-strong opacity-45" />
              </div>
              <div className="flex min-w-0 flex-1 justify-center">
                <div
                  title={demo.demoUrl ?? undefined}
                  className="flex h-[26px] w-full min-w-0 max-w-[420px] items-center gap-1.5 rounded-xs border border-border bg-surface px-2.5 text-xs text-ink-muted"
                >
                  <LockSimple className="h-[13px] w-[13px] flex-none" aria-hidden="true" />
                  <span className="truncate">{host || 'Próximamente'}</span>
                </div>
              </div>
              {enVivo && demo.demoUrl && (
                <div className="flex flex-none gap-0.5">
                  {!angosto && (
                    <button
                      type="button"
                      onClick={recargar}
                      aria-label="Recargar la demo"
                      title="Recargar"
                      className="grid h-7 w-7 place-items-center rounded-xs text-ink-muted transition-colors duration-[var(--duration-fast)] hover:bg-border hover:text-ink"
                    >
                      <ArrowClockwise className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                  <a
                    href={demo.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir la demo en una pestaña nueva"
                    title="Abrir en pestaña nueva"
                    className="grid h-7 w-7 place-items-center rounded-xs text-ink-muted transition-colors duration-[var(--duration-fast)] hover:bg-border hover:text-ink"
                  >
                    <ArrowSquareOut className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            {/* Cuerpo */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-surface">
              {enVivo && !bloqueada && visible && demo.demoUrl && (
                <iframe
                  key={`${demo.id}-${recargas}`}
                  src={demo.demoUrl}
                  title={`Demo en vivo de ${demo.nombre}`}
                  loading="lazy"
                  onLoad={() => {
                    window.clearTimeout(timer.current)
                    setCargada(true)
                  }}
                  style={{
                    width: anchoIframe,
                    height: altoIframe,
                    transform: `scale(${escala})`,
                  }}
                  className="absolute left-0 top-0 origin-top-left border-0 bg-surface"
                />
              )}

              {enVivo && !bloqueada && !cargada && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute inset-0 flex flex-col gap-3.5 bg-surface p-6"
                >
                  <span className="sr-only">Cargando la demo</span>
                  <div aria-hidden="true" className="flex items-center justify-between">
                    <div className="h-5 w-[120px] animate-pulse rounded-sm bg-surface-sunken" />
                    <div className="h-7 w-[84px] animate-pulse rounded-sm bg-surface-sunken" />
                  </div>
                  <div aria-hidden="true" className="mt-[18px] h-[30px] w-[52%] animate-pulse rounded-sm bg-surface-sunken" />
                  <div aria-hidden="true" className="h-3.5 w-[34%] animate-pulse rounded-sm bg-surface-sunken" />
                  <div
                    aria-hidden="true"
                    className="mt-3.5 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3"
                  >
                    <div className="h-[72px] animate-pulse rounded-md bg-surface-sunken" />
                    <div className="h-[72px] animate-pulse rounded-md bg-surface-sunken" />
                    <div className="h-[72px] animate-pulse rounded-md bg-surface-sunken" />
                  </div>
                  <div aria-hidden="true" className="flex-1 animate-pulse rounded-md bg-surface-sunken" />
                  <p className="absolute inset-x-0 bottom-5 text-center text-xs font-medium text-ink-muted">
                    Cargando {demo.nombre}…
                  </p>
                </div>
              )}

              {bloqueada && demo.demoUrl && (
                <div className="absolute inset-0">
                  {demo.captura ? (
                    <img
                      src={demo.captura}
                      alt={`Captura de ${demo.nombre}`}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div aria-hidden="true" className="h-full w-full bg-surface-sunken" />
                  )}
                  <div className="pointer-events-none absolute inset-0 grid place-items-center bg-scrim p-5">
                    <div className="pointer-events-auto flex max-w-[320px] flex-col items-center gap-3.5 rounded-md border border-border bg-surface px-[22px] py-5 text-center shadow-md">
                      <p className="text-sm text-ink-muted">
                        Esta demo se abre mejor en su propia pestaña.
                      </p>
                      <Button
                        href={demo.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir en pantalla completa
                        <ArrowSquareOut className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!enVivo && (
                <div className="absolute inset-0 grid place-items-center bg-surface-sunken p-6">
                  <div className="flex max-w-[320px] flex-col items-center gap-2.5 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-ink-muted">
                      <IconoDemo className="h-[22px] w-[22px]" aria-hidden="true" />
                    </span>
                    <p className="text-[15px] font-semibold text-ink">
                      {demo.nombre} todavía no está publicada.
                    </p>
                    <p className="text-sm text-ink-muted">
                      Puede pedirla desde ahora para su negocio.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <div
        id={`${panelId}-chatbot`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${CHATBOT}`}
        hidden={!chat}
        className="mt-6"
      >
        {/* Sin contenido por ahora: el espacio queda reservado con la
         * misma altura del escenario para que la página no salte. */}
        <div
          style={{ height: altoEscenario }}
          className="grid place-items-center rounded-md border border-dashed border-border bg-surface-sunken p-6"
        >
          <div className="flex max-w-[320px] flex-col items-center gap-2.5 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-accent-text">
              <ChatsCircle className="h-[22px] w-[22px]" aria-hidden="true" />
            </span>
            <p className="text-[15px] font-semibold text-ink">ChatBot de Prueba</p>
            <p className="text-sm text-ink-muted">Muy pronto podrá conversar aquí con el asistente.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Punto de marca que late para invitar a abrir una pestaña nueva. */
function PuntoNuevo() {
  return (
    <span className="relative flex h-2 w-2 flex-none">
      <span
        aria-hidden="true"
        className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60"
      />
      <span aria-hidden="true" className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
      <span className="sr-only">, sin ver</span>
    </span>
  )
}
