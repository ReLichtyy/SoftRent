import { Fragment, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowsClockwise,
  CalendarCheck,
  CalendarX,
  CashRegister,
  ChartLine,
  DeviceMobile,
  Gear,
  Megaphone,
  Moon,
  Package,
  PlugsConnected,
  Robot,
  ShoppingCart,
  SquaresFour,
  Storefront,
  Tag,
  UserMinus,
  Wrench,
  type Icon,
} from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { LinkButton } from '../../components/ui/LinkButton'
import { FlujoPregunta } from '../../components/soluciones/FlujoPregunta'
import { SolucionEscena } from '../../components/soluciones/SolucionEscena'
import { areas, areasIntro, nichos, soluciones } from '../../content/soluciones'
import type { SolucionArea, SolucionNicho } from '../../content/types'
import { cn } from '../../lib/cn'
import { useScrollReveal } from '../../lib/useScrollReveal'

const iconos: Record<string, Icon> = {
  'inventario-tarde': Package,
  'reportes-sin-conclusion': ChartLine,
  'cierre-de-caja': CashRegister,
  'precios-uno-por-uno': Tag,
  'herramientas-sueltas': PlugsConnected,
  'promociones-a-mano': Megaphone,
  'clientes-que-no-vuelven': UserMinus,
  'cerrar-un-dia': CalendarX,
  'atado-a-la-computadora': DeviceMobile,
  'pedidos-por-chat': ShoppingCart,
  'mensajes-fuera-de-horario': Moon,
  'chatbot-limitado': Robot,
  'recordatorios-sin-salida': ArrowsClockwise,
}

/* Ícono de respaldo para soluciones nuevas. */
const iconoDefault: Icon = Gear

const ordenAreas: SolucionArea[] = ['administracion', 'clientes']

type Filtro = 'todos' | SolucionNicho

const iconosNicho: Record<Filtro, Icon> = {
  todos: SquaresFour,
  supermercados: ShoppingCart,
  reservas: CalendarCheck,
  pedidos: Storefront,
  servicios: Wrench,
  chatbot: Robot,
}

const filtros: { id: Filtro; etiqueta: string }[] = [
  { id: 'todos', etiqueta: 'Todos' },
  ...(Object.keys(nichos) as SolucionNicho[]).map((id) => ({
    id,
    etiqueta: nichos[id],
  })),
]

function esFiltro(valor: string | null): valor is Filtro {
  return valor !== null && filtros.some((f) => f.id === valor)
}

function contar(id: Filtro): number {
  return id === 'todos'
    ? soluciones.length
    : soluciones.filter((s) => s.nichos.includes(id)).length
}

/** Soluciones: cada problema de un sistema moderno sin IA frente a su
 * solución con SoftRent, por pregunta o por instrucción. Intro → filtro
 * por sistema (fijo bajo la barra, en ?nicho) → índice de problemas →
 * un capítulo por área, con una sección por solución (problema →
 * flecha → artefacto) → el camino común → cierre hacia /comenzar. */
export function Soluciones() {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get('nicho')
  const filtro: Filtro = esFiltro(param) ? param : 'todos'
  const indiceRef = useRef<HTMLElement>(null)

  const intro = useScrollReveal<HTMLElement>({
    selector: '[data-intro]',
    stagger: 0.09,
    y: 22,
    immediate: true,
  })

  const visibles =
    filtro === 'todos'
      ? soluciones
      : soluciones.filter((s) => s.nichos.includes(filtro))
  const grupos = ordenAreas
    .map((area) => ({
      area,
      items: visibles.filter((s) => s.area === area),
    }))
    .filter((g) => g.items.length > 0)

  const elegir = (id: Filtro) => {
    setSearchParams(id === 'todos' ? {} : { nicho: id }, {
      replace: true,
      preventScrollReset: true,
    })
    /* Si el filtro se cambia más abajo, vuelve al índice para que el
     * contenido nuevo no aparezca a mitad de una sección. */
    const indice = indiceRef.current
    if (indice && indice.getBoundingClientRect().top < 0) {
      indice.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* Las secciones cambian de altura y de orden: recalcular disparadores. */
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [filtro])

  return (
    <>
      <section
        ref={intro}
        className="bg-surface-inverse pb-16 pt-16 text-ink-inverse sm:pb-20 sm:pt-24"
      >
        <Container>
          <h1
            data-intro
            className="max-w-4xl text-balance font-display text-display-md sm:text-display-lg"
          >
            Su sistema ya hace mucho.{' '}
            <span className="italic text-[#ff6b70]">
              Lo que falta es que le responda.
            </span>
          </h1>
          <p
            data-intro
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-inverse/75"
          >
            Compare cómo se resuelve cada situación hoy, con un sistema
            moderno sin IA, y cómo se resuelve con SoftRent: con una pregunta
            o con una instrucción que el sistema ejecuta de principio a fin.
          </p>
          <div data-intro className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#problemas"
              className="inline-flex h-12 items-center rounded-sm bg-accent px-5 text-base font-medium text-on-accent transition-colors duration-[var(--duration-fast)] hover:bg-accent-hover"
            >
              Ver los problemas
            </a>
            <LinkButton to="/demos" variant="secondary" size="lg">
              Probar una demo
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* El filtro queda fijo bajo la barra mientras dure este bloque. */}
      <div>
        <div className="sticky top-16 z-30 border-b border-border bg-bg/90 backdrop-blur">
          <Container className="flex items-center gap-4 py-3">
            <span className="hidden shrink-0 text-xs font-medium text-ink-muted sm:block">
              Su negocio
            </span>
            <div
              role="group"
              aria-label="Filtrar por sistema"
              className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0"
            >
              {filtros.map((f) => {
                const activo = filtro === f.id
                const IconoNicho = iconosNicho[f.id]
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={activo}
                    onClick={() => elegir(f.id)}
                    className={cn(
                      'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none transition-colors duration-[var(--duration-base)] focus-visible:ring-2 focus-visible:ring-focus',
                      activo
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-border bg-surface text-ink-muted hover:border-border-strong hover:text-ink',
                    )}
                  >
                    <IconoNicho className="h-4 w-4" aria-hidden="true" />
                    {f.etiqueta}
                    <span
                      className={cn(
                        'text-xs tabular-nums',
                        activo ? 'text-on-accent/80' : 'text-ink-subtle',
                      )}
                    >
                      {contar(f.id)}
                    </span>
                  </button>
                )
              })}
            </div>
          </Container>
        </div>

        <section
          ref={indiceRef}
          id="problemas"
          className="scroll-mt-32 py-20 sm:py-28"
        >
          <Container>
            <h2 className="max-w-xl text-balance font-display text-display-sm text-ink sm:text-display-md">
              ¿Cuál de estos le pasa?
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-muted">
              Elija uno y vea cómo pasa de varios pasos a mano a un solo
              mensaje: una pregunta, o una instrucción que el sistema ejecuta.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {grupos.map((g) => (
                <div key={g.area}>
                  <p className="text-eyebrow uppercase text-ink-subtle">
                    {areas[g.area]}
                  </p>
                  <ul className="mt-4 divide-y divide-border border-y border-border">
                    {g.items.map((s) => {
                      const Icono = iconos[s.id] ?? iconoDefault
                      return (
                        <li key={s.id} className="demo-enter">
                          <a
                            href={`#${s.id}`}
                            className="group flex items-center gap-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-focus"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-surface-sunken text-ink-muted transition-colors duration-[var(--duration-base)] group-hover:bg-accent-soft group-hover:text-accent-text">
                              <Icono className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="flex-1 text-sm leading-relaxed text-ink">
                              {s.dolor}
                            </span>
                            <ArrowDown
                              className="h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-[var(--duration-base)] group-hover:translate-y-0.5 group-hover:text-accent-text"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {grupos.map((g) => (
          <Fragment key={g.area}>
            <Section tone="deep" className="py-16 sm:py-20">
              <Container className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-display-md sm:text-display-lg">
                  {areas[g.area]}
                </h2>
                <p className="max-w-sm text-base leading-relaxed text-ink-inverse/75">
                  {areasIntro[g.area]}
                </p>
              </Container>
            </Section>

            {g.items.map((item, i) => (
              <SolucionEscena
                key={item.id}
                item={item}
                icono={iconos[item.id] ?? iconoDefault}
                tono={i % 2 === 0 ? 'bg' : 'surface'}
              />
            ))}
          </Fragment>
        ))}
      </div>

      {/* key: reinicia el recorrido al cambiar el filtro. */}
      <FlujoPregunta key={filtro} items={visibles} />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 rounded-lg border border-border bg-surface p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-balance font-display text-display-sm text-ink">
                Elija los problemas que le suenan.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Los mismos aparecen al comenzar: marque los suyos y armamos su
                sistema alrededor de ellos.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <LinkButton to="/comenzar" size="lg">
                Comenzar
              </LinkButton>
              <LinkButton to="/demos" variant="secondary" size="lg">
                Ver demos
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
