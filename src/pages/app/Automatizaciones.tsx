import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Card } from '../../components/ui/Card'
import { KpiTile } from '../../components/ui/KpiTile'
import { Toggle } from '../../components/ui/Toggle'
import { automatizaciones } from '../../data/app'
import { PageIntro } from '../shared'

export function AppAutomatizaciones() {
  const [lista, setLista] = useState(automatizaciones)

  const horasTotales = lista
    .filter((a) => a.activa)
    .reduce((suma, a) => suma + a.horasAhorradas, 0)
  const activas = lista.filter((a) => a.activa).length

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Automatizaciones"
        description="Tareas que su sistema hace solo. Prenda o apague cada una; las horas ahorradas se suman solas."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <KpiTile
          value={`${horasTotales.toLocaleString('es-CR', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })} h`}
          label="Ahorradas este mes, en conjunto"
        />
        <KpiTile
          value={`${activas} de ${lista.length}`}
          label="Automatizaciones activas"
        />
      </div>

      <Card padded={false} className="overflow-hidden">
        <ul className="divide-y divide-line">
          {lista.map((auto) => (
            <li
              key={auto.id}
              className="flex items-center justify-between gap-4 p-4 sm:p-5"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{auto.nombre}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                  {auto.descripcion}
                </p>
                {auto.activa && auto.ejecucionesMes > 0 && (
                  <p className="mt-1 text-xs text-ink-soft">
                    {auto.ejecucionesMes} veces este mes ·{' '}
                    {auto.horasAhorradas.toLocaleString('es-CR', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}{' '}
                    h ahorradas
                  </p>
                )}
              </div>
              <Toggle
                label={`${auto.activa ? 'Apagar' : 'Prender'} ${auto.nombre}`}
                checked={auto.activa}
                onCheckedChange={(valor) =>
                  setLista((prev) =>
                    prev.map((a) => (a.id === auto.id ? { ...a, activa: valor } : a)),
                  )
                }
              />
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  )
}
