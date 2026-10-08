import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import bookingCapture from '../../assets/home/softrent-reservas-real.png'
import { demoPorId } from '../../content/demos'
import type { SolucionNicho } from '../../content/types'
import { Container } from '../layout/Container'
import { LinkButton } from '../ui/LinkButton'
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
  applies: string
  title: string
  description: string
  preview: ReactNode
}

const customerFeatures: HomeFeature[] = [
  {
    id: 'mensajes-fuera-de-horario',
    applies: 'Para negocios con citas',
    title: 'Responde y agenda a cualquier hora.',
    description: 'Resuelve las preguntas sobre servicios y disponibilidad, toma los datos y registra la cita.',
    preview: (
      <>
        <div className="hb-function-preview-top">
          <strong>Reserva por chat</strong><time dateTime="22:48">22:48</time>
        </div>
        <p className="hb-message hb-customer">¿Tienen espacio mañana en la mañana?</p>
        <p className="hb-message">Sí: a las 9:00 o a las 10:30. ¿Cuál te reservo?</p>
        <div className="hb-function-result">
          <span>Mañana · 10:30</span><span className="hb-state">Agendada</span>
        </div>
      </>
    ),
  },
  {
    id: 'recordatorios-sin-salida',
    applies: 'Para negocios con reservas',
    title: 'Reprograma desde el recordatorio.',
    description: 'Si el cliente no puede asistir, ofrece otro espacio y libera el anterior en tu agenda.',
    preview: (
      <>
        <strong>Cambio de cita</strong>
        <p>«Mañana no puedo, ¿hay otro día?»</p>
        <div className="hb-reschedule-line">
          <span>Miércoles · 16:00<small>Espacio liberado</small></span>
          <ArrowRight size={16} aria-hidden="true" />
          <span>Jueves · 16:00<small>Nuevo horario</small></span>
        </div>
      </>
    ),
  },
  {
    id: 'clientes-que-no-vuelven',
    applies: 'Para negocios con clientes recurrentes',
    title: 'Retoma el contacto con tus clientes.',
    description: 'Encuentra a quienes llevan tiempo sin volver y escríbeles por WhatsApp desde sus datos de visitas.',
    preview: (
      <>
        <strong>Clientes sin volver</strong>
        <ul className="hb-function-list">
          <li><span>Marco</span><small>9 semanas</small></li>
          <li><span>Sofía</span><small>10 semanas</small></li>
          <li><span>Elena</span><small>12 semanas</small></li>
        </ul>
        <p className="hb-preview-foot">Contacto por WhatsApp desde la misma consulta.</p>
      </>
    ),
  },
]

const operationFeatures: HomeFeature[] = [
  {
    id: 'pedidos-por-chat',
    applies: 'Para comercios con ventas por chat',
    title: 'Convierte los mensajes en pedidos.',
    description: 'Registra los productos, calcula el total y envía la información de pago desde la conversación.',
    preview: (
      <>
        <div className="hb-function-preview-top">
          <strong>Pedido por WhatsApp</strong><span>Recoger · 17:00</span>
        </div>
        <ul className="hb-function-list">
          <li><span>Leche 1 L × 2</span><span>₡2.210</span></li>
          <li><span>Arroz 1 kg × 1</span><span>₡1.450</span></li>
          <li><span>Café 500 g × 1</span><span>₡3.190</span></li>
        </ul>
        <div className="hb-function-result">
          <span>Total · ₡6.850</span><small>Datos de SINPE enviados</small>
        </div>
      </>
    ),
  },
  {
    id: 'herramientas-sueltas',
    applies: 'Para negocios con citas o ventas',
    title: 'Emite el comprobante sin digitarlo.',
    description: 'En cuanto se completa el servicio o la venta, el comprobante se genera y se envía por correo o WhatsApp.',
    preview: (
      <>
        <div className="hb-function-preview-top">
          <strong>Comprobante</strong><span>#004128</span>
        </div>
        <dl className="hb-receipt-details">
          <div><dt>Servicio o venta</dt><dd>Completado</dd></div>
          <div><dt>Entrega</dt><dd>Correo o WhatsApp</dd></div>
        </dl>
        <div className="hb-function-result">
          <span className="hb-receipt-status">Generado <ArrowRight size={14} aria-hidden="true" /></span>
          <span className="hb-state">Enviado</span>
        </div>
      </>
    ),
  },
  {
    id: 'cierre-de-caja',
    applies: 'Para comercios con caja',
    title: 'Cierra la caja con un mensaje.',
    description: 'Agrupa las ventas, cruza los pagos y recibe el resumen del día en tu WhatsApp.',
    preview: (
      <>
        <strong>Cierre del día</strong>
        <p>«Cierra la caja de hoy y envíame el resumen.»</p>
        <ol className="hb-close-steps">
          <li>Ventas del día sumadas</li>
          <li>Efectivo, tarjeta y SINPE separados</li>
          <li>Pagos cruzados con sus ventas</li>
          <li>Resumen enviado por WhatsApp</li>
        </ol>
      </>
    ),
  },
]

const setupSteps = [
  { title: 'Entendemos cómo trabajas.', description: 'Revisamos tus servicios, tus herramientas y las tareas que quieres resolver.' },
  { title: 'Definimos el alcance.', description: 'Elegimos los módulos, las conexiones y los flujos que necesita tu negocio.' },
  { title: 'Configuramos y revisamos.', description: 'Probamos los recorridos con tu información antes de ponerlos en uso.' },
  { title: 'Te acompañamos.', description: 'Tu equipo aprende a usar el sistema y revisamos los ajustes de la operación.' },
]

function FeatureRow({ feature, number }: { feature: HomeFeature; number: number }) {
  return (
    <div className="hb-task-row" data-solution={feature.id}>
      <span className="hb-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <div className="hb-function-copy">
        <p className="hb-function-applies">{feature.applies}</p>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
        <Link className="hb-text-link" to={`/soluciones#${feature.id}`} aria-label={`Ver solución: ${feature.title}`}>
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
        <span className="hb-state">SoftRent Citas</span>
      </div>
      {bookingUrl ? (
        <a className="hb-live-capture" href={bookingUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir el sistema real de reservas en una pestaña nueva">
          {capture}
        </a>
      ) : <div className="hb-live-capture">{capture}</div>}
      <div className="hb-business-feature-bottom">
        <small>Captura real del sistema de reservas.</small>
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
      <section className="hb-section" aria-labelledby="home-business-title">
        <Container className="hb-wrap">
          <div className="hb-section-intro">
            <h2 id="home-business-title">Hecho para<br />tu día a día.</h2>
            <p>Citas, mensajes y facturación. Empieza por las tareas que repites más.</p>
          </div>
          <div className="hb-business-layout">
            <nav className="hb-industry-links" aria-label="Soluciones por industria">
              {industries.map((industry) => (
                <Link className="hb-text-link hb-industry-link" key={industry.name} to={`/soluciones?nicho=${industry.niche}`}>
                  <span><b>{industry.name}</b><small>{industry.description}</small></span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <BookingPreview />
          </div>
        </Container>
      </section>

      <section className="hb-section hb-soft" aria-labelledby="home-customers-title">
        <Container className="hb-wrap">
          <div className="hb-stack-heading">
            <p className="hb-eyebrow">CON TUS CLIENTES</p>
            <h2 id="home-customers-title">Atiende, confirma<br />y da seguimiento.</h2>
            <p>Delega los mensajes que se repiten y los cambios que necesitan una respuesta.</p>
          </div>
          {customerFeatures.map((feature, index) => <FeatureRow key={feature.id} feature={feature} number={index + 1} />)}
        </Container>
      </section>

      <aside className="hb-mid-cta" aria-label="Comenzar tu sistema">
        <Container className="hb-wrap">
          <p>¿Ya sabes qué necesitas?</p>
          <LinkButton to="/comenzar" className="hb-button hb-primary">Empezar <ArrowUpRight size={16} aria-hidden="true" /></LinkButton>
        </Container>
      </aside>

      <section className="hb-section" aria-labelledby="home-operations-title">
        <Container className="hb-wrap">
          <div className="hb-stack-heading">
            <p className="hb-eyebrow">EN TU OPERACIÓN</p>
            <h2 id="home-operations-title">Cobros y comprobantes,<br />sin perseguirlos.</h2>
            <p>Elige las funciones que necesitas según cómo vendes y administras tu negocio.</p>
          </div>
          {operationFeatures.map((feature, index) => <FeatureRow key={feature.id} feature={feature} number={index + 4} />)}
          <p className="hb-ui-note">Vistas ilustrativas basadas en Soluciones. Las funciones y conexiones se definen para cada negocio.</p>
          <div className="hb-functions-all">
            <Link className="hb-text-link" to="/soluciones">Ver todas las soluciones <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>

      <section className="hb-section" aria-labelledby="home-setup-title">
        <Container className="hb-wrap hb-setup">
          <div>
            <p className="hb-eyebrow">DE TU OPERACIÓN AL SISTEMA</p>
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
            <p>Cuéntanos qué tarea quieres resolver primero.</p>
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
