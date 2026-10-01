import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge, type BadgeTone } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { KpiTile } from '../../components/ui/KpiTile'
import { colones } from '../../lib/format'
import { cn } from '../../lib/cn'
import { cobros, type Cobro } from '../../data/app'
import { PageIntro } from '../shared'

type Filtro = 'todos' | 'pagado' | 'por-vencer' | 'vencido'

const filtros: { id: Filtro; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'pagado', label: 'Pagados' },
  { id: 'por-vencer', label: 'Por vencer' },
  { id: 'vencido', label: 'Vencidos' },
]

const tonoEstado: Record<Cobro['estado'], { badge: string; tone: BadgeTone }> = {
  pagado: { badge: 'Pagado', tone: 'success' },
  'por-vencer': { badge: 'Por vencer', tone: 'warning' },
  vencido: { badge: 'Vencido', tone: 'danger' },
}

export function AppCobros() {
  const [filtro, setFiltro] = useState<Filtro>('todos')

  const visibles =
    filtro === 'todos' ? cobros : cobros.filter((c) => c.estado === filtro)

  const totalPagado = cobros
    .filter((c) => c.estado === 'pagado')
    .reduce((suma, c) => suma + c.monto, 0)
  const totalPendiente = cobros
    .filter((c) => c.estado !== 'pagado')
    .reduce((suma, c) => suma + c.monto, 0)

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Cobros y facturas"
        description="Cada cita o venta genera su comprobante. Los recordatorios de SINPE salen solos; usted confirma la conciliación."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <KpiTile value={colones(totalPagado)} label="Cobrado esta semana" />
        <KpiTile value={colones(totalPendiente)} label="Pendiente de cobrar" />
      </div>

      <div className="flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            aria-pressed={filtro === f.id}
            className={cn(
              'rounded-full border px-3.5 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand',
              filtro === f.id
                ? 'border-brand bg-brand/10 text-brand'
                : 'border-line text-ink-soft hover:border-ink-soft/40 hover:text-ink',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="font-display text-lg text-ink">Nada por cobrar</p>
          <p className="max-w-sm text-sm text-ink-soft">
            No hay cobros en este filtro.
          </p>
        </Card>
      ) : (
        <Card padded={false} className="overflow-hidden">
          <ul className="divide-y divide-line">
            {visibles.map((c) => {
              const tono = tonoEstado[c.estado]
              return (
                <li key={c.id} className="flex flex-col gap-1.5 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">
                      {c.concepto}
                      <span className="ms-2 font-display text-base">
                        {colones(c.monto)}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {c.cliente} · {c.vencimiento}
                    </p>
                  </div>
                  <Badge tone={tono.tone} dot className="w-fit shrink-0">
                    {tono.badge}
                  </Badge>
                </li>
              )
            })}
          </ul>
        </Card>
      )}
    </Container>
  )
}
