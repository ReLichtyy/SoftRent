import { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDown,
  ArrowUpRight,
  CalendarCheck,
  Robot,
  ShoppingCart,
  SquaresFour,
  Storefront,
  Wrench,
  type Icon,
} from '@phosphor-icons/react'
import heroBmw from '../../assets/soluciones/vehiculos/hero-bmw-completo-v5.webp'
import heroAston from '../../assets/soluciones/vehiculos/hero-aston-completo-v5.webp'
import siluetaAmg from '../../assets/soluciones/vehiculos/agenda-amg-izquierda-ambiente-v4.webp'
import siluetaDbs from '../../assets/soluciones/vehiculos/cobros-dbs-derecha-ambiente-v4.webp'
import siluetaGtr from '../../assets/soluciones/vehiculos/operacion-gtr-izquierda-ambiente-v4.webp'
import siluetaSupra from '../../assets/soluciones/vehiculos/clientes-supra-perfil-ambiente-v4.webp'
import siluetaVantage from '../../assets/soluciones/vehiculos/cierre-ambiente-v4.webp'
import { Container } from '../../components/layout/Container'
import { LinkButton } from '../../components/ui/LinkButton'
import { SolucionFila } from '../../components/soluciones/SolucionFila'
import {
  areas,
  categorias,
  nichos,
  numeroCategoria,
  soluciones,
  solucionesOrdenadas,
} from '../../content/soluciones'
import type { SolucionArea, SolucionCategoria, SolucionNicho } from '../../content/types'
import '../../styles/home-business.css'
import '../../styles/soluciones.css'

const ordenAreas: SolucionArea[] = ['clientes', 'administracion', 'ventas']

/* Cada carro acompaña el primer texto de su categoría. */
const siluetasFondo: Partial<Record<SolucionCategoria, string>> = {
  agenda: siluetaAmg,
  'cobros-y-caja': siluetaDbs,
  'dia-a-dia': siluetaGtr,
  'clientes-nuevos': siluetaSupra,
}

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

/** Soluciones: cada una con su título, la escena que la explica y el
 * artefacto de lo que SoftRent deja hecho. Mismo lenguaje visual que
 * el main (base 04), siempre en tema oscuro. Hero con la foto de los autos →
 * filtro por negocio (fijo bajo la barra, en ?nicho) → un capítulo
 * por área con sus categorías, algunas con un carro bajo el primer
 * texto → cierre hacia /comenzar con la última silueta.
 * Todos los carros añaden una superficie y ambiente que se funden
 * con el fondo oscuro mediante máscaras suaves.
 * /soluciones/<id> abre la misma página en esa categoría o solución. */
export function Soluciones() {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get('nicho')
  const filtro: Filtro = esFiltro(param) ? param : 'todos'
  const catalogoRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()

  /* La barra de filtros fija tapa también la franja de la barra superior
   * solo mientras está pegada; un centinela avisa cuándo. */
  const centinelaRef = useRef<HTMLDivElement>(null)
  const [pegado, setPegado] = useState(false)
  useEffect(() => {
    const centinela = centinelaRef.current
    if (!centinela) return
    const observador = new IntersectionObserver(
      ([entrada]) => setPegado(!entrada.isIntersecting && entrada.boundingClientRect.top < 73),
      { rootMargin: '-73px 0px 0px 0px' },
    )
    observador.observe(centinela)
    return () => observador.disconnect()
  }, [])

  const visibles =
    filtro === 'todos'
      ? solucionesOrdenadas
      : solucionesOrdenadas.filter((s) => s.nichos.includes(filtro))
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
    /* Si el filtro se cambia más abajo, vuelve al inicio del catálogo
     * para que el contenido nuevo no aparezca a mitad de una fila. */
    const catalogo = catalogoRef.current
    if (catalogo && catalogo.getBoundingClientRect().top < 0) {
      catalogo.scrollIntoView({ behavior: 'smooth' })
    }
  }

  /* Al cambiar el filtro las filas cambian de altura y de orden:
   * recalcular disparadores. No al montar: refresh() devuelve el scroll
   * a donde estaba y anularía el salto de la ruta. */
  const montado = useRef(false)
  useEffect(() => {
    if (montado.current) ScrollTrigger.refresh()
    montado.current = true
  }, [filtro])

  /* Ruta /soluciones/<id>: baja hasta esa categoría o hasta la fila de
   * esa solución (ambas llevan su id).
   * El salto es instantáneo y se sostiene unos cuadros: justo después
   * de montar, el router y el refresh() de las filas vuelven a mover el
   * scroll, en un orden que no es fijo. Se suelta antes si el visitante
   * usa la rueda, el dedo o el teclado. */
  useEffect(() => {
    const destino = id ? document.getElementById(id) : null
    if (!destino) return
    const hasta = performance.now() + 600
    let cuadro = 0
    const fijar = () => {
      destino.scrollIntoView({ behavior: 'instant' })
      if (performance.now() < hasta) cuadro = requestAnimationFrame(fijar)
    }
    const soltar = () => cancelAnimationFrame(cuadro)
    fijar()
    const eventos = ['wheel', 'touchstart', 'keydown'] as const
    eventos.forEach((e) => window.addEventListener(e, soltar, { once: true, passive: true }))
    return () => {
      soltar()
      eventos.forEach((e) => window.removeEventListener(e, soltar))
    }
  }, [id])

  return (
    /* data-theme: los artefactos usan los tokens del sitio y esta página
     * es oscura aunque el visitante tenga el tema claro. */
    <div className="home-business sol" data-theme="dark">
      <section className="sol-hero" aria-labelledby="soluciones-title">
        <Container className="hb-wrap sol-hero-copy">
          <h1 id="soluciones-title">Lo que haces a mano,<br />resuelto con un mensaje.</h1>
          <p>Tú llevas el negocio. SoftRent se encarga de lo que se repite.</p>
          <div className="hb-actions">
            <a className="hb-button hb-primary" href="#catalogo">
              Ver soluciones <ArrowDown size={16} aria-hidden="true" />
            </a>
            <LinkButton to="/demos" variant="secondary" className="hb-button">Explorar demos</LinkButton>
          </div>
        </Container>
        <div className="sol-hero-cars" aria-hidden="true">
          <img className="sol-hero-image sol-hero-image-left" src={heroBmw} alt="" width={1672} height={940} />
          <img className="sol-hero-image sol-hero-image-right" src={heroAston} alt="" width={1672} height={941} />
        </div>
      </section>

      {/* El filtro queda fijo bajo la barra mientras dure el catálogo. */}
      <div ref={catalogoRef} id="catalogo" className="sol-catalog">
        <div ref={centinelaRef} aria-hidden="true" />
        <div className="sol-filter" data-pegado={pegado || undefined}>
          <Container className="hb-wrap sol-filter-row">
            <div role="group" aria-label="Filtrar por tipo de negocio" className="sol-chips">
              {filtros.map((f) => {
                const IconoNicho = iconosNicho[f.id]
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filtro === f.id}
                    onClick={() => elegir(f.id)}
                    className="sol-chip"
                  >
                    <IconoNicho size={15} aria-hidden="true" />
                    {f.etiqueta}
                    <span className="sol-chip-count">{contar(f.id)}</span>
                  </button>
                )
              })}
            </div>
          </Container>
        </div>

        {grupos.map((g) => {
          const cats = categorias
            .filter((c) => c.area === g.area)
            .map((c) => ({ ...c, items: g.items.filter((s) => s.categoria === c.id) }))
            .filter((c) => c.items.length > 0)
          return (
            <section key={g.area} className="sol-area" aria-labelledby={`area-${g.area}`}>
              <Container className="hb-wrap">
                <h2 id={`area-${g.area}`} className="sol-area-title">{areas[g.area]}</h2>
                {cats.map((c) => {
                  return (
                    <section key={c.id} id={c.id} className="sol-cat" aria-labelledby={`cat-${c.id}`}>
                      <header className="sol-cat-head">
                        <span className="sol-cat-num" aria-hidden="true">
                          {String(numeroCategoria.get(c.id) ?? 0).padStart(2, '0')}
                        </span>
                        <h3 id={`cat-${c.id}`}>{c.titulo}</h3>
                      </header>
                      {c.items.map((item, index) => (
                        <SolucionFila key={item.id} item={item} imagen={index === 0 ? siluetasFondo[c.id] : undefined} />
                      ))}
                    </section>
                  )
                })}
              </Container>
            </section>
          )
        })}
      </div>

      <section className="sol-band sol-closing" aria-labelledby="soluciones-closing-title">
        <img
          className="sol-silueta"
          src={siluetaVantage}
          alt=""
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
        />
        <Container className="hb-wrap">
          <div className="sol-band-copy">
            <h2 id="soluciones-closing-title">Empieza<br />por una.</h2>
            <p>Cuéntanos cuál quieres resolver primero y armamos tu sistema alrededor de ella.</p>
          <div className="hb-actions">
            <LinkButton to="/comenzar" className="hb-button hb-primary">
              Comenzar <ArrowUpRight size={16} aria-hidden="true" />
            </LinkButton>
            <LinkButton to="/demos" variant="secondary" className="hb-button">Explorar demos</LinkButton>
          </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
