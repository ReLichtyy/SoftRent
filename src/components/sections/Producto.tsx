import type { ReactNode } from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { PhoneMockup } from '../ui/PhoneMockup'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../layout/Container'
import { ChatMockup } from './ChatMockup'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { demoPorId } from '../../content/demos'

type Movimiento = {
  id: string
  numero: string
  nombre: string
  titulo: string
  parrafo: string
  bullets: string[]
  pantalla: ReactNode
  alt: string
}

/* Los tres movimientos del sistema, en el mismo orden en que los
 * vive un cliente del negocio: mensaje → agenda → cobro. */
const movimientos: Movimiento[] = [
  {
    id: 'responde',
    numero: '01',
    nombre: 'Responde',
    titulo: 'Nadie espera a que usted despierte.',
    parrafo:
      'El asistente contesta a cualquier hora, toma los datos del cliente y agenda por usted. La primera respuesta llega en menos de un minuto.',
    bullets: [
      'Atención 24/7, festivos incluidos',
      'Toma los datos y confirma la cita',
      'Usted revisa todo en una sola bandeja',
    ],
    pantalla: <ChatMockup />,
    alt: 'Conversación de WhatsApp donde el asistente agenda una cita',
  },
  {
    id: 'agenda',
    numero: '02',
    nombre: 'Agenda',
    titulo: 'La agenda se llena sola.',
    parrafo:
      'Sus clientes agendan según los cupos reales, desde WhatsApp o desde su página. Los recordatorios salen solos: 24 horas y 2 horas antes de cada cita.',
    bullets: [
      'Un solo calendario para todo el negocio',
      'Cupos reales, nunca sobrevendidos',
      'Recordatorios automáticos por WhatsApp',
    ],
    pantalla: <AgendaScreen />,
    alt: 'Agenda del día con citas confirmadas y recordatorios enviados',
  },
  {
    id: 'cobra',
    numero: '03',
    nombre: 'Cobra',
    titulo: 'La cita termina y el cobro ya entró.',
    parrafo:
      'El asistente pide el SINPE al confirmar, la factura electrónica sale al cierre de la visita y el resumen de la semana le llega solo.',
    bullets: [
      'Cobros por SINPE Móvil al confirmar',
      'Factura electrónica de cada visita',
      'Resumen semanal con sus propios números',
    ],
    pantalla: <CobrosScreen />,
    alt: 'Cobros de la semana con SINPE recibido y facturas enviadas',
  },
]

/* Pantalla de agenda: el mismo día de la barbería del chat. */
function AgendaScreen() {
  const citas = [
    { hora: '10:30', cliente: 'Luis Ramírez', detalle: 'Corte + barba', estado: 'Confirmado' },
    { hora: '11:15', cliente: 'María Fernández', detalle: 'Tinte y corte', estado: 'Confirmado' },
    { hora: '15:00', cliente: 'Kevin Álvarez', detalle: 'Corte', estado: 'Recordatorio enviado' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Agenda de hoy</p>
          <p className="text-xs text-ink-muted">Barbería Don Luis</p>
        </div>
        <Badge tone="success" dot>
          2 cupos libres
        </Badge>
      </div>
      <ul className="space-y-2.5 px-4 py-4">
        {citas.map((cita) => (
          <li
            key={cita.hora}
            className="flex items-center gap-3 rounded-md bg-surface-sunken px-3 py-2.5"
          >
            <span className="font-display text-sm">{cita.hora}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{cita.cliente}</p>
              <p className="truncate text-xs text-ink-muted">{cita.detalle}</p>
            </div>
            <Badge
              tone={cita.estado === 'Confirmado' ? 'success' : 'info'}
              className="shrink-0"
            >
              {cita.estado}
            </Badge>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-4 py-2.5 text-xs text-ink-muted">
        Recordatorios programados: 24 h y 2 h antes de cada cita.
      </p>
    </div>
  )
}

/* Pantalla de cobros: lo que entra SINPE y lo que sale al cierre. */
function CobrosScreen() {
  const movimientos = [
    { etiqueta: 'SINPE Móvil · corte + barba', monto: '₡8.000', tono: 'success' as const, nota: 'Recibido' },
    { etiqueta: 'Abono de reserva · tinte', monto: '₡25.000', tono: 'success' as const, nota: 'Recibido' },
    { etiqueta: 'Factura electrónica · visita 10:30', monto: '', tono: 'info' as const, nota: 'Enviada' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Cobros de la semana</p>
          <p className="text-xs text-ink-muted">Barbería Don Luis</p>
        </div>
        <p className="font-display text-lg">₡86.500</p>
      </div>
      <ul className="space-y-2.5 px-4 py-4">
        {movimientos.map((m) => (
          <li
            key={m.etiqueta}
            className="flex items-center gap-3 rounded-md bg-surface-sunken px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.etiqueta}</p>
              <p className="text-xs text-ink-muted">Hoy</p>
            </div>
            {m.monto && <span className="text-sm font-semibold">{m.monto}</span>}
            <Badge tone={m.tono} dot className="shrink-0">
              {m.nota}
            </Badge>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-4 py-2.5 text-xs text-ink-muted">
        Sin anotar a mano: cada visita genera su comprobante.
      </p>
    </div>
  )
}

/** Fila de un movimiento: texto a un lado, teléfono al otro,
 * alternando el lado en cada fila. Se revela al entrar en viewport. */
function FeatureRow({ movimiento, invertido }: {
  movimiento: Movimiento
  invertido: boolean
}) {
  const scope = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.08,
  })

  return (
    <div
      ref={scope}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
        invertido ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div>
        <p data-reveal className="text-eyebrow text-accent-text">
          {movimiento.numero} · {movimiento.nombre}
        </p>
        <h3
          data-reveal
          className="mt-3 font-display text-display-sm text-ink sm:text-display-md"
        >
          {movimiento.titulo}
        </h3>
        <p data-reveal className="mt-4 max-w-md leading-relaxed text-ink-muted">
          {movimiento.parrafo}
        </p>
        <ul data-reveal className="mt-6 space-y-2.5">
          {movimiento.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-ink">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal className="flex justify-center">
        <PhoneMockup role="img" aria-label={movimiento.alt}>
          {movimiento.pantalla}
        </PhoneMockup>
      </div>
    </div>
  )
}

/** El producto en tres movimientos (estilo TakeControl): filas
 * alternadas con el teléfono como protagonista y, al final, el
 * paso a la demo en vivo si está publicada. */
export default function Producto() {
  const demoCitas = demoPorId('citas')
  const demoPublicada = demoCitas?.estado === 'publicada' && demoCitas.demoUrl

  return (
    <section className="border-t border-border bg-surface/60 py-20 sm:py-28">
      <Container>
        <h2 className="mx-auto max-w-xl text-center font-display text-display-md text-ink sm:text-display-lg">
          Su negocio en tres movimientos
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-ink-muted">
          Responda, agende y cobre sin tocar el celular. Así se ve cada paso.
        </p>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
          {movimientos.map((movimiento, i) => (
            <FeatureRow
              key={movimiento.id}
              movimiento={movimiento}
              invertido={i % 2 === 1}
            />
          ))}
        </div>

        {demoPublicada && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center sm:mt-20">
            <p className="max-w-md text-sm text-ink-muted">
              ¿Quiere verlo andando con sus propios ojos? Recorra la demo de
              Citas como si fuera su cliente.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={demoCitas!.demoUrl!}>Ver demo en vivo</Button>
              <LinkButton to="/comenzar?demo=citas" variant="secondary">
                Comenzar con Citas
              </LinkButton>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
