import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { briefs as briefsIniciales } from '../../data/admin'
import { PageIntro } from '../shared'

/** Briefs del agente de diagnóstico (sección 1.5): llegan del
 * flujo Comenzar y del chatbot; SoftRent los revisa antes de
 * responder al cliente (humano en el circuito). */
export function AdminBriefs() {
  const [lista, setLista] = useState(briefsIniciales)

  const nuevos = lista.filter((b) => b.estado === 'nuevo').length

  function marcarRevisado(id: string) {
    setLista((prev) =>
      prev.map((b) => (b.id === id ? { ...b, estado: 'revisado' as const } : b)),
    )
  }

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Briefs de diagnóstico"
        description={`Interés convertido en brief listo para revisar. Hay ${nuevos} sin revisar. Se responden en menos de un día hábil.`}
      />

      <Card padded={false} className="overflow-hidden">
        <ul className="divide-y divide-line">
          {lista.map((b) => (
            <li key={b.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">
                  {b.nombre}
                  <span className="ms-2 text-xs font-normal text-ink-soft">
                    {b.negocio} · {b.origen}
                  </span>
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                  {b.resumen}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge tone={b.estado === 'nuevo' ? 'warning' : 'success'} dot>
                  {b.estado === 'nuevo' ? 'Nuevo' : 'Revisado'}
                </Badge>
                {b.estado === 'nuevo' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => marcarRevisado(b.id)}
                  >
                    Marcar revisado
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  )
}
