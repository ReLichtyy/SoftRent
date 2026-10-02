import { useState } from 'react'
import { Plus, TrashSimple } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { baseConocimiento, type EntradaConocimiento } from '../../data/app'
import { PageIntro } from '../shared'

/** Asistente IA: la base de conocimiento del negocio (sección 1.3).
 * El bot responde solo desde aquí; si no sabe, pasa a humano. */
export function AppAsistente() {
  const [entradas, setEntradas] = useState(baseConocimiento)
  const [pregunta, setPregunta] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [error, setError] = useState('')

  function agregar() {
    if (pregunta.trim().length < 5 || respuesta.trim().length < 5) {
      setError('Escriba la pregunta y su respuesta completas.')
      return
    }
    setError('')
    const nueva: EntradaConocimiento = {
      id: 'k' + Date.now().toString(36),
      pregunta: pregunta.trim(),
      respuesta: respuesta.trim(),
    }
    setEntradas((prev) => [nueva, ...prev])
    setPregunta('')
    setRespuesta('')
  }

  function eliminar(id: string) {
    setEntradas((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Asistente"
        description="Su asistente responde solo con esta información. Lo que no esté aquí, lo pasa a una persona de su equipo."
      />

      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-heading-md text-ink">Nueva respuesta</h2>
          <Badge tone="info" dot>
            Se publica al instante
          </Badge>
        </div>
        <Input
          label="Pregunta del cliente"
          placeholder="¿Hacen servicios a domicilio?"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
        />
        <Textarea
          label="Respuesta del negocio"
          placeholder="Sí, dentro de 5 kilómetros. Se agenda con un día de anticipación."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
        <Button size="sm" onClick={agregar}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Agregar a la base
        </Button>
      </Card>

      {entradas.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-heading-md text-ink">Base vacía</p>
          <p className="max-w-sm text-sm text-ink-muted">
            Agregue las preguntas que más le hacen. Con tres o cuatro, el
            asistente ya ahorra buena parte del chat.
          </p>
        </Card>
      ) : (
        <Card padded={false} className="overflow-hidden">
          <ul className="divide-y divide-border">
            {entradas.map((e) => (
              <li key={e.id} className="flex items-start justify-between gap-4 p-4 sm:p-5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{e.pregunta}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    {e.respuesta}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => eliminar(e.id)}
                  aria-label={`Eliminar "${e.pregunta}"`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink-muted outline-none transition-colors hover:bg-danger-soft hover:text-danger focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <TrashSimple className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Container>
  )
}
