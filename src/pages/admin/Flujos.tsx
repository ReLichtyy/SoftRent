import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { flujos } from '../../data/admin'
import { PageIntro } from '../shared'

export function AdminFlujos() {
  const conError = flujos.filter((f) => f.estado === 'con-error').length

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Salud de flujos"
        description={`Cómo van las automatizaciones de todos los clientes. Hoy hay ${conError} ${conError === 1 ? 'flujo con error' : 'flujos con error'}.`}
      />

      <Card padded={false} className="overflow-hidden">
        <ul className="divide-y divide-border">
          {flujos.map((f) => (
            <li key={f.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{f.nombre}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                  {f.detalle} · Última ejecución {f.ultimaEjecucion}
                </p>
              </div>
              <Badge
                tone={f.estado === 'sano' ? 'success' : 'danger'}
                dot
                className="w-fit shrink-0"
              >
                {f.estado === 'sano' ? 'Sano' : 'Con error'}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  )
}
