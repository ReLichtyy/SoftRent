import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import garageBackdrop from '../../assets/backgrounds/siluetas-v2/08-audi-r8-perfil-izquierda.png'
import setupBackdrop from '../../assets/backgrounds/siluetas-v2/06-porsche-gt3rs-trasera-izquierda.png'
import bookingCapture from '../../assets/home/softrent-reservas-real.png'
import { demoPorId } from '../../content/demos'
import type { SolucionNicho } from '../../content/types'
import { Container } from '../layout/Container'
import { LinkButton } from '../ui/LinkButton'
import {
  CierrePreview,
  ClientesPreview,
  ComprobantePreview,
  PedidoPreview,
  ReprogramarPreview,
  ReservaPreview,
} from './HomePreviews'
import '../../styles/home-business.css'

const citasDemo = demoPorId('citas')
const bookingUrl = citasDemo?.estado === 'publicada' && citasDemo.demoUrl
  ? new URL('citas/reservar', citasDemo.demoUrl).href
  : null

const industries: { name: string; description: string; niche: SolucionNicho }[] = [
  { name: 'Barberías y salones', description: 'Reservas, recordatorios y clientes que vuelven.', niche: 'reservas' },
  { name: 'Veterinarias', description: 'Citas, cambios de horario y seguimiento.', niche: 'reservas' },
  { name: 'Comercios', description: 'Pedidos, comprobantes y cierre de caja.', niche: 'pedidos' },
  { name: 'Estudios de tatuajes', description: 'Agenda, reprogramaciones y depósitos.', niche: 'reservas' },
]

type HomeFeature = {
  id: string
  title: string
  description: string
  preview: ReactNode
}

const customerFeatures: HomeFeature[] = [
  {
    id: 'mensajes-fuera-de-horario',
    title: 'Responde y agenda a cualquier hora.',
    description: 'Resuelve las preguntas sobre servicios y disponibilidad, toma los datos y registra la cita.',
    preview: <ReservaPreview />,
  },
  {
    id: 'recordatorios-sin-salida',
    title: 'Reprograma desde el recordatorio.',
    description: 'Si el cliente no puede asistir, ofrece otro espacio y libera el anterior en tu agenda.',
    preview: <ReprogramarPreview />,
  },
  {
    id: 'clientes-que-no-vuelven',
    title: 'Retoma el contacto con tus clientes.',
    description: 'Encuentra a quienes llevan tiempo sin volver y escríbeles por WhatsApp desde sus datos de visitas.',
    preview: <ClientesPreview />,
  },
]

const operationFeatures: HomeFeature[] = [
  {
    id: 'pedidos-por-chat',
    title: 'Convierte los mensajes en pedidos.',
    description: 'Registra los productos, calcula el total y envía la información de pago desde la conversación.',
    preview: <PedidoPreview />,
  },
  {
    id: 'herramientas-sueltas',
    title: 'Emite el comprobante sin digitarlo.',
    description: 'En cuanto se completa el servicio o la venta, el comprobante se genera y se envía por correo o WhatsApp.',
    preview: <ComprobantePreview />,
  },
  {
    id: 'cierre-de-caja',
    title: 'Cierra la caja con un mensaje.',
    description: 'Agrupa las ventas, cruza los pagos y recibe el resumen del día en tu WhatsApp.',
    preview: <CierrePreview />,
  },
]

const setupSteps = [
  { title: 'Entendemos cómo trabajas.', description: 'Revisamos tus servicios, tus herramientas y las tareas que quieres resolver.' },
  { title: 'Definimos el alcance.', description: 'Elegimos los módulos, las conexiones y los flujos que necesita tu negocio.' },
  { title: 'Configuramos y revisamos.', description: 'Probamos los recorridos con tu información antes de ponerlos en uso.' },
  { title: 'Te acompañamos.', description: 'Tu equipo aprende a usar el sistema y revisamos los ajustes de la operación.' },
]

function FeatureRow({ feature }: { feature: HomeFeature }) {
  return (
    <div className="hb-task-row" data-solution={feature.id}>
      <div className="hb-function-copy">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <Link className="hb-text-link" to={`/soluciones/${feature.id}`} aria-label={`Ver solución: ${feature.title}`}>
          Ver este flujo <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="hb-sample hb-function-preview">{feature.preview}</div>
    </div>
  )
}

function BookingPreview() {
  const capture = (
    <img
      src={bookingCapture}
      alt="Captura real del portal público de SoftRent Citas: selección de fecha y horario para una reserva."
      width={1100}
      height={800}
      loading="lazy"
      decoding="async"
    />
  )

  return (
    <div className="hb-business-feature">
      <div className="hb-business-feature-head">
        <div>
          <h3>Citas y recordatorios,<br />desde el chat.</h3>
          <p>Tu cliente elige una hora. El asistente confirma, recuerda la cita y ayuda a reprogramar si hace falta.</p>
        </div>
      </div>
      {bookingUrl ? (
        <a className="hb-live-capture" href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir el sistema real de reservas en una pestaña nueva">
          {capture}
        </a>
      ) : <div className="hb-live-capture">{capture}</div>}
      <div className="hb-business-feature-bottom">
        {bookingUrl ? (
          <a className="hb-text-link" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Abrir demo en vivo<span className="sr-only"> (nueva pestaña)</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : (
          <Link className="hb-text-link" to="/demos">Explorar demos <ArrowUpRight size={15} aria-hidden="true" /></Link>
        )}
      </div>
    </div>
  )
}

/** Base 04: contenido estático después del carrusel del hero. */
export default function HomeBusiness() {
  return (
    <div className="home-business">
      <section
        className="hb-section hb-photo"
        aria-labelledby="home-business-title"
        style={{ '--hb-photo': `url(${garageBackdrop})` } as CSSProperties}
      >
        <Container className="hb-wrap">
          <div className="hb-business-layout">
            <div className="hb-business-side">
              <div className="hb-section-intro">
                <h2 id="home-business-title">Hecho para<br />tu día a día.</h2>
              </div>
              <nav className="hb-industry-links" aria-label="Soluciones por industria">
                {industries.map((industry) => (
                  <Link className="hb-text-link hb-industry-link" key={industry.name} to={`/soluciones?nicho=${industry.niche}`}>
                    <span><b>{industry.name}</b><small>{industry.description}</small></span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </div>
            <BookingPreview />
          </div>
        </Container>
      </section>

      <section className="hb-section hb-soft" aria-labelledby="home-customers-title">
        <Container className="hb-wrap">
          <div className="hb-stack-heading">
            <h2 id="home-customers-title">Atiende, confirma<br />y da seguimiento.</h2>
          </div>
          {customerFeatures.map((feature) => <FeatureRow key={feature.id} feature={feature} />)}
        </Container>
      </section>

      <section className="hb-section" aria-labelledby="home-operations-title">
        <Container className="hb-wrap">
          <div className="hb-stack-heading">
            <h2 id="home-operations-title">Cobros y comprobantes,<br />sin perseguirlos.</h2>
          </div>
          {operationFeatures.map((feature) => <FeatureRow key={feature.id} feature={feature} />)}
          <div className="hb-functions-all">
            <Link className="hb-text-link" to="/soluciones">Ver todas las soluciones <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>

      <section
        className="hb-section hb-photo hb-photo-fill"
        aria-labelledby="home-setup-title"
        style={{ '--hb-photo': `url(${setupBackdrop})`, '--hb-photo-next': '#0f0e0d' } as CSSProperties}
      >
        <Container className="hb-wrap hb-setup">
          <div>
            <h2 id="home-setup-title">Lo construimos<br />contigo.</h2>
          </div>
          <ol>
            {setupSteps.map((step) => <li key={step.title}><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
          </ol>
        </Container>
      </section>

      <section className="hb-closing" aria-labelledby="home-closing-title">
        <Container className="hb-wrap">
          <div>
            <h2 id="home-closing-title">Empecemos<br />por tu negocio.</h2>
          </div>
          <div className="hb-actions">
            <LinkButton to="/comenzar" className="hb-button hb-primary">Comenzar <ArrowUpRight size={16} aria-hidden="true" /></LinkButton>
            <LinkButton to="/demos" variant="secondary" className="hb-button">Explorar demos</LinkButton>
          </div>
        </Container>
      </section>
    </div>
  )
}
