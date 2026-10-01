import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Container } from '../layout/Container'

type Appointment = {
  time: string
  client: string
  service: string
  status: 'Confirmada' | 'Pendiente' | 'Facturada'
  tone: 'success' | 'warning' | 'neutral'
}

const appointments: Appointment[] = [
  {
    time: '09:00',
    client: 'Carla M.',
    service: 'Corte + barba',
    status: 'Confirmada',
    tone: 'success',
  },
  {
    time: '11:30',
    client: 'Veterinaria Rex',
    service: 'Consulta',
    status: 'Pendiente',
    tone: 'warning',
  },
  {
    time: '15:00',
    client: 'Taller Luna',
    service: 'Mantenimiento',
    status: 'Facturada',
    tone: 'neutral',
  },
]

function DaySheet() {
  return (
    <Card className="w-full max-w-sm">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="font-display text-base">Agenda de hoy</p>
        <p className="text-xs text-ink-soft">Mié 30 set</p>
      </div>

      <ul className="space-y-3">
        {appointments.map((a) => (
          <li
            key={a.time}
            className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0"
          >
            <span className="text-sm tabular-nums text-ink-soft">{a.time}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm text-ink">
                {a.client}
              </span>
              <span className="block truncate text-xs text-ink-soft">
                {a.service}
              </span>
            </span>
            <Badge tone={a.tone} dot>
              {a.status}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 rounded-sm bg-surface-2 px-3 py-2.5 text-xs text-ink-soft">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-success"
        />
        Recordatorio enviado a 3 clientes por WhatsApp
      </div>
    </Card>
  )
}

export default function Hero() {
  return (
    <section id="top" className="pt-16 pb-20 sm:pt-20 sm:pb-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
              Tu negocio ya sabe cómo trabaja. Tu software todavía no.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              SoftRent diseña el sistema de reservas, mensajes y facturación de
              tu negocio, hecho para cómo trabajas tú, no para una plantilla
              genérica.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#contacto" size="lg">
                Comenzar
              </Button>
              <Button href="#como-funciona" variant="link" size="lg">
                Ver cómo funciona
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <DaySheet />
          </div>
        </div>
      </Container>
    </section>
  )
}
