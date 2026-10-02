import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge, type BadgeTone } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { citas, type Cita } from '../../data/app'
import { PageIntro } from '../shared'

type Filtro = 'todas' | 'confirmada' | 'solicitada' | 'atendida' | 'no-show'

const filtros: { id: Filtro; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'confirmada', label: 'Confirmadas' },
  { id: 'solicitada', label: 'Solicitadas' },
  { id: 'atendida', label: 'Atendidas' },
  { id: 'no-show', label: 'No vinieron' },
]

const tonoEstado: Record<Cita['estado'], { badge: string; tone: BadgeTone }> = {
  solicitada: { badge: 'Solicitada', tone: 'warning' },
  confirmada: { badge: 'Confirmada', tone: 'success' },
  atendida: { badge: 'Atendida', tone: 'info' },
  'no-show': { badge: 'No vino', tone: 'danger' },
  cancelada: { badge: 'Cancelada', tone: 'neutral' },
}

export function AppAgenda() {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [lista, setLista] = useState(citas)

  const visibles =
    filtro === 'todas' ? lista : lista.filter((c) => c.estado === filtro)

  function confirmar(cita: Cita) {
    setLista((prev) =>
      prev.map((c) =>
        c.id === cita.id ? { ...c, estado: 'confirmada' as const } : c,
      ),
    )
  }

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Agenda de hoy"
        description="Las citas entran solas por WhatsApp o su página. Confirme con un toque; el recordatorio sale automático."
      />

      <div className="flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFiltro(f.id)}
            aria-pressed={filtro === f.id}
            className={cn(
              'rounded-full border px-3.5 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-focus',
              filtro === f.id
                ? 'border-accent bg-accent-soft text-accent-text'
                : 'border-border text-ink-muted hover:border-ink-muted/40 hover:text-ink',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-heading-md text-ink">Agenda despejada</p>
          <p className="max-w-sm text-sm text-ink-muted">
            No hay citas con este filtro. Comparta su página de reservas y
            empiezan a llegar solas.
          </p>
        </Card>
      ) : (
        <Card padded={false} className="overflow-hidden">
          <ul className="divide-y divide-border">
            {visibles.map((cita) => {
              const tono = tonoEstado[cita.estado]
              return (
                <li key={cita.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-4">
                  <span className="w-16 shrink-0 text-heading-md tabular-nums text-ink">
                    {cita.hora}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{cita.cliente}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {cita.servicio} · {cita.responsable}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge tone={tono.tone} dot>
                      {tono.badge}
                    </Badge>
                    {cita.estado === 'solicitada' && (
                      <Button size="sm" variant="ghost" onClick={() => confirmar(cita)}>
                        Confirmar
                      </Button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      )}
    </Container>
  )
}
