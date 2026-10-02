import type { Icon } from '@phosphor-icons/react'
import { CalendarCheck, ChatCircleDots, HandCoins, Timer } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { KpiTile } from '../../components/ui/KpiTile'
import { PageIntro } from '../shared'
import { LinkButton } from '../../components/ui/LinkButton'

type Kpi = {
  icon: Icon
  value: string
  label: string
}

const kpis: Kpi[] = [
  {
    icon: Timer,
    value: '4,2 h',
    label: 'Ahorradas por semana en tareas repetitivas',
  },
  {
    icon: CalendarCheck,
    value: '38',
    label: 'Citas agendadas por el asistente en un mes',
  },
  {
    icon: ChatCircleDots,
    value: '1 min',
    label: 'Tiempo promedio de respuesta a un cliente',
  },
  {
    icon: HandCoins,
    value: '₡85.000',
    label: 'Cobrados a tiempo en el mes, sin perseguir a nadie',
  },
]

const cases = [
  {
    title: 'Barbería Don Luis',
    before: 'La agenda vivía en un cuaderno y los mensajes se acumulaban sin respuesta.',
    after: 'Los clientes agendan solos y el asistente confirma cada cita. Luis solo revisa su bandeja.',
  },
  {
    title: 'Veterinaria Rex',
    before: 'Las llamadas se perdían entre consulta y consulta.',
    after: 'Las consultas se agendan por WhatsApp y el doctor aprueba los cambios desde su celular.',
  },
]

export function Casos() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Casos y resultados"
          description="Ejemplos de lo que logra un negocio cuando responde, agenda y cobra solo."
        >
          <Badge tone="neutral" className="mt-4">
            Datos de demo
          </Badge>
        </PageIntro>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiTile
              key={kpi.value}
              value={kpi.value}
              label={kpi.label}
              icon={<kpi.icon className="h-6 w-6" aria-hidden="true" />}
            />
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-heading-lg text-ink">{item.title}</h2>
                <Badge tone="neutral">Ejemplo de demo</Badge>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">
                Antes: {item.before}
              </p>
              <p className="text-sm leading-relaxed text-ink">
                Después: {item.after}
              </p>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink-muted">
            SoftRent aún no publica casos reales: las cifras anteriores son de
            demos internas. Cuando tengamos resultados con clientes, aparecen
            aquí primero.
          </p>
          <LinkButton to="/demos" variant="secondary" className="shrink-0">
            Ver demos
          </LinkButton>
        </Card>
      </Container>
    </Section>
  )
}
