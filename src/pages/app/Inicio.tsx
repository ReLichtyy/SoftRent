import type { Icon } from '@phosphor-icons/react'
import { CalendarCheck, ChatCircleDots, HandCoins, Timer } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { KpiTile } from '../../components/ui/KpiTile'
import { PageIntro, StatusList } from '../shared'
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
    label: 'Ahorradas esta semana en tareas repetitivas',
  },
  {
    icon: CalendarCheck,
    value: '38',
    label: 'Citas agendadas este mes',
  },
  {
    icon: ChatCircleDots,
    value: '1 min',
    label: 'Tiempo promedio de respuesta a sus clientes',
  },
  {
    icon: HandCoins,
    value: '₡85.000',
    label: 'Cobrado a tiempo este mes',
  },
]

const attention = [
  {
    title: '2 citas sin confirmar para mañana',
    meta: 'Andrés P. a las 9:00 y Karla S. a las 11:00',
    badge: 'Por confirmar',
    tone: 'warning' as const,
  },
  {
    title: '1 cobro vencido',
    meta: 'Esteban R., ₡12.500 desde el 20 de setiembre',
    badge: 'Vencido',
    tone: 'danger' as const,
  },
  {
    title: '3 conversaciones esperan su criterio',
    meta: 'El asistente las atendió y piden una palabra suya',
    badge: 'Humano',
    tone: 'info' as const,
  },
]

export function AppInicio() {
  return (
    <Container className="max-w-5xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Hola, Barbería Don Luis"
        description="Este es el resumen de su negocio esta semana, en una sola vista."
      />

      <section aria-labelledby="impacto-heading" className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="impacto-heading" className="font-display text-xl text-ink">
            Su impacto
          </h2>
          <Badge tone="neutral">Datos de ejemplo</Badge>
        </div>
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
      </section>

      <section aria-labelledby="atencion-heading" className="space-y-4">
        <h2 id="atencion-heading" className="font-display text-xl text-ink">
          Requiere su atención (3)
        </h2>
        <StatusList items={attention} />
      </section>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          Cada ítem anterior tiene su pantalla para resolverlo en dos toques.
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <LinkButton to="/app/agenda" variant="secondary" size="sm">
            Ir a la agenda
          </LinkButton>
          <LinkButton to="/app/bandeja" size="sm">
            Ir a la bandeja
          </LinkButton>
        </div>
      </Card>
    </Container>
  )
}
