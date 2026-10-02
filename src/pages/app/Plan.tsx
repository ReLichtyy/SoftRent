import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { LinkButton } from '../../components/ui/LinkButton'
import { planPorId, reglas } from '../../content/planes'
import { negocioDemo } from '../../data/app'
import { colones } from '../../lib/format'
import { PageIntro } from '../shared'

/* Uso del mes: dato de demo hasta que exista el backend (Fase 8). */
const uso = [
  '380 de 1.500 conversaciones con IA usadas este mes',
  '2 de 3 usuarios activos',
  'Cobros y recordatorios de SINPE sin límite',
  'La próxima factura sale el 1 del mes',
]

export function AppPlan() {
  const plan = planPorId(negocioDemo.plan)
  if (!plan) return null

  return (
    <Container className="max-w-5xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Plan"
        description="Su plan actual, lo que incluye y cuánto le queda del mes."
      />

      <Card className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-heading-lg text-ink">Plan {plan.nombre}</h2>
          <Badge tone="brand" dot>
            Su plan
          </Badge>
        </div>
        <p className="font-display text-display-sm text-ink">
          {plan.precioMensual !== null ? colones(plan.precioMensual) : 'A cotizar'}
          <span className="ms-1 text-sm font-normal text-ink-muted">
            por mes, {reglas.iva.toLowerCase()}
          </span>
        </p>
        <ul className="space-y-2 text-sm text-ink-muted">
          {plan.incluye.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {line}
            </li>
          ))}
        </ul>
        <p className="border-t border-border pt-4 text-xs leading-relaxed text-ink-muted">
          Uso de este mes (ejemplo de demo): {uso.join('. ')}.
        </p>
      </Card>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-heading-md text-ink">
            ¿Necesita más espacio?
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            Cambie a Pro cuando quiera. El cambio se refleja desde el
            siguiente mes.
          </p>
        </div>
        <LinkButton to="/precios" variant="secondary" className="shrink-0">
          Comparar planes
        </LinkButton>
      </Card>
    </Container>
  )
}
