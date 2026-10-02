import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { plantillas } from '../../data/admin'
import { PageIntro } from '../shared'

export function AdminPlantillas() {
  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Plantillas por industria"
        description="Regla de operación: 80% plantilla, 20% personalización. Cada plantilla nueva arranca de una existente."
      />

      <Card padded={false} className="overflow-hidden">
        <ul className="divide-y divide-border">
          {plantillas.map((t) => (
            <li key={t.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{t.nombre}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Aplicada en {t.aplicadaEn}{' '}
                  {t.aplicadaEn === 1 ? 'negocio' : 'negocios'}
                </p>
              </div>
              <Badge tone={t.estado === 'lista' ? 'success' : 'neutral'} dot className="w-fit shrink-0">
                {t.estado === 'lista' ? 'Lista' : 'Borrador'}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  )
}
