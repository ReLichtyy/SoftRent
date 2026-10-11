import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import symbol from '../../assets/brand/softrent-symbol.png'
import scene from '../../assets/precios/hero-ferrari-dark.png'
import { planes } from '../../content/planes'
import { planPrice, pricingMoney } from '../../lib/pricing'
import { usePricingCurrency } from './usePricingCurrency'
import './precios.css'

const services = [
  { id: 'web', category: 'Presencia', cardTitle: <>Web<br />+ Chatbot.</>, title: <>Página Web<br />+ Chatbot</>, foot: 'Su negocio. Siempre disponible.', description: 'Su presencia en línea y un asistente para atender a sus clientes, en un mismo servicio.', features: ['Página para su negocio', 'Respuestas a preguntas frecuentes', 'Registro de datos de sus clientes'], label: 'Presencia y atención' },
  { id: 'booking', category: 'Agenda', cardTitle: 'Reservas.', title: 'Reservas', foot: 'Cada cita, en su lugar.', description: 'Cada cita en su lugar. Sus clientes eligen un horario y usted mantiene su agenda organizada.', features: ['Reservas según disponibilidad', 'Agenda centralizada', 'Confirmaciones y recordatorios'], label: 'Agenda y organización' },
  { id: 'payments', category: 'Pagos', cardTitle: 'Cobros.', title: 'Cobros', foot: 'El siguiente paso, resuelto.', description: 'Dé seguimiento a sus pagos y pendientes desde un solo lugar, con menos tareas manuales.', features: ['Gestión de cobros por SINPE', 'Recordatorios de pago', 'Seguimiento de comprobantes'], label: 'Pagos y seguimiento' },
  { id: 'invoicing', category: 'Control', cardTitle: 'Facturación.', title: 'Facturación', foot: 'Todo en orden.', description: 'Conecte sus ventas y servicios con la emisión de facturas electrónicas para su negocio.', features: ['Facturación electrónica', 'Facturas de sus ventas y visitas', 'Integración con su operación'], label: 'Facturas y control' },
]

function GraphiteCard({ category = 'Servicios', title = <>A su<br />elección.</>, foot = 'Un servicio. Usted elige.' }: { category?: string; title?: ReactNode; foot?: string }) {
  return <span className="graphite-face" aria-hidden="true">
    <span className="graphite-top"><span>SoftRent</span><span>{category}</span></span>
    <img className="graphite-mark" src={symbol} width="116" height="116" alt="" />
    <span className="graphite-title">{title}</span>
    <span className="graphite-foot">{foot}</span>
  </span>
}

function ServiceCatalog() {
  const grid = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const motion = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
    const cleanups = Array.from(grid.current?.querySelectorAll<HTMLElement>('.catalog-visual') ?? []).map(visual => {
      const face = visual.querySelector<HTMLElement>('.graphite-face')!
      let frame = 0
      function reset() {
        cancelAnimationFrame(frame)
        face.style.removeProperty('--rx')
        face.style.removeProperty('--ry')
      }
      function move(event: PointerEvent) {
        if (!motion.matches || event.pointerType === 'touch') return
        const bounds = visual.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          face.style.setProperty('--rx', `${(0.5 - y) * 12}deg`)
          face.style.setProperty('--ry', `${(x - 0.5) * 16}deg`)
        })
      }
      visual.addEventListener('pointermove', move)
      visual.addEventListener('pointerleave', reset)
      visual.addEventListener('pointercancel', reset)
      motion.addEventListener('change', reset)
      return () => {
        reset()
        visual.removeEventListener('pointermove', move)
        visual.removeEventListener('pointerleave', reset)
        visual.removeEventListener('pointercancel', reset)
        motion.removeEventListener('change', reset)
      }
    })
    return () => cleanups.forEach(cleanup => cleanup())
  }, [])
  return <section className="service-catalog" id="servicios" aria-labelledby="services-title">
    <div className="catalog-heading">
      <h2 id="services-title">Elija sus servicios.<br /><span>Combine lo que necesita.</span></h2>
      <p>Cada tarjeta representa un servicio. Elija uno, combine dos o reúna tres según su plan. Página Web + Chatbot cuenta como un solo servicio.</p>
    </div>
    <div className="catalog-grid" ref={grid}>
      {services.map(service => <article className={`catalog-card catalog-${service.id}`} key={service.id} aria-labelledby={`service-${service.id}-title`}>
        <div className="catalog-visual"><GraphiteCard category={service.category} title={service.cardTitle} foot={service.foot} /></div>
        <h3 id={`service-${service.id}-title`}>{service.title}</h3>
        <p>{service.description}</p>
        <ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <span className="catalog-card-bottom">{service.label}</span>
      </article>)}
    </div>
    <a className="catalog-back" href="#planes">Volver a elegir mi plan <span aria-hidden="true">↑</span></a>
  </section>
}

export function Precios() {
  const [annual, setAnnual] = useState(false)
  const { currency, chooseCurrency, rate, rateStatus } = usePricingCurrency()
  return <div className="pricing-page">
    <div className="pricing-scene" aria-hidden="true">
      <img src={scene} alt="" width="1672" height="941" fetchPriority="high" />
      <div className="scene-light scene-light-red" /><div className="scene-light scene-light-amber" />
    </div>
    <div className="pricing-shell">
      <section className="hero" aria-labelledby="pricing-title">
        <h1 id="pricing-title">Un plan para cada<br /><span>etapa de su negocio.</span></h1>
        <p>Empiece con lo que necesita hoy. Combine sus servicios en un solo sistema y sume más cuando su negocio lo necesite.</p>
      </section>
      <section className="pricing" id="planes" aria-labelledby="plans-title">
        <div className="section-heading">
          <div><h2 id="plans-title">Elija su punto de partida</h2><p>Sus servicios, a su ritmo.</p></div>
          <div className="billing">
            <div className="seg" role="group" aria-label="Periodo de pago">
              <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Mensual</button>
              <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>Anual <span>2 meses gratis</span></button>
            </div>
            <div className="seg currency" role="group" aria-label="Moneda">
              <button type="button" aria-pressed={currency === 'CRC'} onClick={() => chooseCurrency('CRC')}>CRC ₡</button>
              <button type="button" aria-pressed={currency === 'USD'} onClick={() => chooseCurrency('USD')}>USD $</button>
            </div>
          </div>
        </div>
        <div className="plan-grid">
          {planes.filter(plan => plan.servicios !== undefined).map(plan => {
            const price = planPrice(plan, currency, annual, rate)
            const count = plan.servicios!
            return <article className={`plan plan-${count}`} key={plan.id} aria-labelledby={`plan-${plan.id}-title`}>
              <div className="plan-heading"><h3 id={`plan-${plan.id}-title`}>{plan.nombre}</h3>{plan.destacado && <span>Más elegido</span>}</div>
              <p className="plan-description">{plan.paraQuien}</p>
              <div className="price">{price ? pricingMoney(price.monthly, price.currency) : 'A cotizar'}<small>/mes</small></div>
              <p className="bill-note">{annual && price ? `${pricingMoney(price.yearly, price.currency)} facturados al año` : 'Facturación mensual'}
                {price?.currency !== currency && <><br />{rateStatus === 'loading' ? 'Consultando conversión a colones…' : 'Conversión no disponible; precio en USD.'}</>}
              </p>
              <div className="plan-art">
                <p>{count === 1 ? 'Elija el servicio que necesita' : `Combine ${count} servicios a su elección`}</p>
                <ul className="service-stack" data-count={count} aria-label={`${count} ${count === 1 ? 'servicio' : 'servicios'} a su elección`}>
                  {Array.from({ length: count }, (_, index) => <li className="service-card choice-card" key={index}><span className="sr-only">Servicio {index + 1} a su elección</span><GraphiteCard /></li>)}
                </ul>
                <a className="catalog-link" href="#servicios">Ver servicios disponibles <span aria-hidden="true">↓</span></a>
              </div>
              <Link className="button" to={plan.ctaRuta}>{plan.cta}<span aria-hidden="true">↗</span></Link>
              <p className="includes">Lo que incluye su plan</p>
              <ul className="features">{plan.incluye.map(feature => <li key={feature}><svg viewBox="0 0 16 18" aria-hidden="true"><path d="m2 9 4 4 8-9" /></svg><span>{feature}</span></li>)}</ul>
            </article>
          })}
        </div>
        <p className="sr-only" role="status">Pago {annual ? 'anual' : 'mensual'}. {currency === 'CRC' && rateStatus !== 'ready' ? 'Primer plan en dólares; otros planes en colones.' : `Precios en ${currency === 'CRC' ? 'colones' : 'dólares'}.`}</p>
      </section>
      <section className="custom" aria-labelledby="custom-title">
        <div className="custom-copy"><span className="custom-type">A la medida</span><h2 id="custom-title">Su negocio no cabe<br />en un plan. <em>Lo entendemos.</em></h2><p>Una solución empresarial diseñada alrededor de sus procesos, su equipo y sus objetivos.</p><Link className="button proposal-button" to="/comenzar?plan=medida">Diseñemos su solución <span aria-hidden="true">↗</span></Link></div>
        <div className="premium-art" aria-hidden="true"><div className="premium-card">
          <span className="premium-brand">SoftRent <span>Premium</span></span>
          <img src={symbol} width="80" height="80" alt="" />
          <span className="premium-signature">A la medida<span>Diseñado para su negocio</span></span>
        </div></div>
        <div className="custom-details"><p>Una propuesta personalizada.</p><ul><li>Todos sus servicios en un solo sistema</li><li>Integraciones especiales</li><li>Varios departamentos o sucursales</li><li>Acompañamiento dedicado</li></ul><span>Conversaciones · Agenda · Cobros · Facturación</span></div>
      </section>
      <ServiceCatalog />
    </div>
  </div>
}
