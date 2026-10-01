import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge, type BadgeTone } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { cn } from '../../lib/cn'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { clientes, type EstadoSuscripcion } from '../../data/admin'
import { PageIntro } from '../shared'

const estados: { id: EstadoSuscripcion | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'activa', label: 'Activos' },
  { id: 'implementacion', label: 'En implementación' },
  { id: 'morosa', label: 'Morosos' },
  { id: 'suspendida', label: 'Suspendidos' },
  { id: 'cancelada', label: 'Cancelados' },
]

const tono: Record<EstadoSuscripcion, { badge: string; tone: BadgeTone }> = {
  implementacion: { badge: 'Implementación', tone: 'info' },
  activa: { badge: 'Activa', tone: 'success' },
  morosa: { badge: 'Morosa', tone: 'warning' },
  suspendida: { badge: 'Suspendida', tone: 'danger' },
  cancelada: { badge: 'Cancelada', tone: 'neutral' },
}

export function AdminClientes() {
  const scope = useScrollReveal<HTMLDivElement>({
    selector: '[data-fila]',
    stagger: 0.05,
    y: 14,
  })
  const [filtro, setFiltro] = useState<EstadoSuscripcion | 'todos'>('todos')
  const [busqueda, setBusqueda] = useState('')

  const visibles = clientes.filter((c) => {
    const porEstado = filtro === 'todos' || c.estado === filtro
    const t = busqueda.trim().toLowerCase()
    const porTexto =
      t === '' ||
      c.negocio.toLowerCase().includes(t) ||
      c.industria.toLowerCase().includes(t)
    return porEstado && porTexto
  })

  return (
    <Container className="max-w-5xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Clientes y suscripciones"
        description="El estado de cada negocio en una sola vista: implementación, activo, moroso o suspendido."
      />

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <Input
          label="Buscar negocio"
          placeholder="Escriba un nombre o industria"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {estados.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setFiltro(e.id)}
            aria-pressed={filtro === e.id}
            className={cn(
              'rounded-full border px-3.5 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand',
              filtro === e.id
                ? 'border-brand bg-brand/10 text-brand'
                : 'border-line text-ink-soft hover:border-ink-soft/40 hover:text-ink',
            )}
          >
            {e.label}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="font-display text-lg text-ink">Sin resultados</p>
          <p className="max-w-sm text-sm text-ink-soft">
            Ningún cliente coincide con esa búsqueda o filtro.
          </p>
        </Card>
      ) : (
        <div ref={scope}>
          <Card padded={false} className="overflow-hidden">
            <ul className="divide-y divide-line">
              {visibles.map((c) => (
                <li key={c.id} data-fila className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{c.negocio}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {c.industria} · Plan {c.plan} · desde {c.desde}
                    </p>
                  </div>
                  <Badge tone={tono[c.estado].tone} dot className="w-fit shrink-0">
                    {tono[c.estado].badge}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </Container>
  )
}
