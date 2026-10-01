import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge, type BadgeTone } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { contactos, type Contacto } from '../../data/app'
import { PageIntro } from '../shared'

type Etapa = Contacto['etapa']

const etapas: { id: Etapa | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todos' },
  { id: 'nuevo', label: 'Nuevos' },
  { id: 'interesado', label: 'Interesados' },
  { id: 'cliente', label: 'Clientes' },
]

const tonoEtapa: Record<Etapa, { badge: string; tone: BadgeTone }> = {
  nuevo: { badge: 'Nuevo', tone: 'info' },
  interesado: { badge: 'Interesado', tone: 'warning' },
  cliente: { badge: 'Cliente', tone: 'success' },
}

const siguiente: Partial<Record<Etapa, Etapa>> = {
  nuevo: 'interesado',
  interesado: 'cliente',
}

export function AppContactos() {
  const [filtro, setFiltro] = useState<Etapa | 'todas'>('todas')
  const [lista, setLista] = useState(contactos)

  const visibles =
    filtro === 'todas' ? lista : lista.filter((c) => c.etapa === filtro)

  function avanzar(contacto: Contacto) {
    const nueva = siguiente[contacto.etapa]
    if (!nueva) return
    setLista((prev) =>
      prev.map((c) => (c.id === contacto.id ? { ...c, etapa: nueva } : c)),
    )
  }

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Contactos y pipeline"
        description="Cada conversación crea o actualiza un contacto. Muévalos de etapa cuando avancen, sin hojas de cálculo."
      />

      <div className="flex flex-wrap gap-2">
        {etapas.map((e) => (
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
          <p className="font-display text-lg text-ink">Nadie por aquí</p>
          <p className="max-w-sm text-sm text-ink-soft">
            No hay contactos en esta etapa todavía.
          </p>
        </Card>
      ) : (
        <Card padded={false} className="overflow-hidden">
          <ul className="divide-y divide-line">
            {visibles.map((c) => {
              const tono = tonoEtapa[c.etapa]
              return (
                <li key={c.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{c.nombre}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {c.telefono}
                      {c.nota && ` · ${c.nota}`}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge tone={tono.tone} dot>
                      {tono.badge}
                    </Badge>
                    {siguiente[c.etapa] && (
                      <Button size="sm" variant="ghost" onClick={() => avanzar(c)}>
                        Avanzar
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
