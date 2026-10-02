import { useEffect, useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge, type BadgeTone } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Skeleton } from '../../components/ui/Skeleton'
import { cn } from '../../lib/cn'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { conversaciones, type Conversacion } from '../../data/app'
import { PageIntro } from '../shared'

type Filtro = 'todas' | 'bot' | 'humano' | 'cerrada'

const filtros: { id: Filtro; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'bot', label: 'Con el asistente' },
  { id: 'humano', label: 'Con usted' },
  { id: 'cerrada', label: 'Cerradas' },
]

const tonoEstado: Record<Conversacion['estado'], { badge: string; tone: BadgeTone }> = {
  bot: { badge: 'Asistente', tone: 'info' },
  humano: { badge: 'Con usted', tone: 'warning' },
  cerrada: { badge: 'Cerrada', tone: 'neutral' },
}

export function AppBandeja() {
  const scope = useScrollReveal<HTMLDivElement>({
    selector: '[data-fila]',
    stagger: 0.05,
    y: 16,
  })
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [seleccionada, setSeleccionada] = useState<Conversacion | null>(null)
  const [extra, setExtra] = useState<Record<string, { texto: string; hora: string }[]>>({})
  const [respuesta, setRespuesta] = useState('')

  /* Estado de carga: simulado hasta que exista el backend (Fase 8);
   * muestra el esqueleto con el mismo tamaño que la lista final. */
  const [cargando, setCargando] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setCargando(false), 600)
    return () => window.clearTimeout(t)
  }, [])

  const visibles =
    filtro === 'todas'
      ? conversaciones
      : conversaciones.filter((c) => c.estado === filtro)

  function enviarRespuesta() {
    if (!seleccionada || respuesta.trim() === '') return
    const hora = new Date().toLocaleTimeString('es-CR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setExtra((prev) => ({
      ...prev,
      [seleccionada.id]: [
        ...(prev[seleccionada.id] ?? []),
        { texto: respuesta.trim(), hora },
      ],
    }))
    setRespuesta('')
  }

  return (
    <Container className="max-w-6xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Bandeja"
        description="El asistente atiende lo frecuente y le pasa lo que necesita su criterio. Usted decide cuándo entrar a la conversación."
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

      {cargando ? (
        <Card padded={false} className="overflow-hidden">
          <ul className="divide-y divide-border" aria-label="Cargando conversaciones">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex flex-col gap-2 p-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-3/4" />
              </li>
            ))}
          </ul>
        </Card>
      ) : visibles.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <p className="text-heading-md text-ink">Todo en orden</p>
          <p className="max-w-sm text-sm text-ink-muted">
            No hay conversaciones en este filtro. Cuando un cliente escriba,
            aparece aquí.
          </p>
        </Card>
      ) : (
        <div ref={scope} className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <Card padded={false} className="h-fit overflow-hidden">
            <ul className="divide-y divide-border">
              {visibles.map((c) => {
                const tono = tonoEstado[c.estado]
                const ultimo = c.mensajes[c.mensajes.length - 1]
                return (
                  <li key={c.id} data-fila>
                    <button
                      type="button"
                      onClick={() => setSeleccionada(c)}
                      aria-pressed={seleccionada?.id === c.id}
                      className={cn(
                        'flex w-full flex-col gap-1.5 p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus',
                        seleccionada?.id === c.id ? 'bg-accent-soft' : 'hover:bg-surface-sunken',
                      )}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-ink">
                          {c.cliente}
                        </span>
                        <Badge tone={tono.tone} dot>
                          {tono.badge}
                        </Badge>
                      </span>
                      <span className="truncate text-xs text-ink-muted">
                        {ultimo.autor === 'cliente' ? '' : 'Usted: '}
                        {ultimo.texto}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card padded={false} className="flex min-h-[420px] flex-col overflow-hidden">
            {seleccionada ? (
              <>
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {seleccionada.cliente}
                    </p>
                    <p className="text-xs text-ink-muted">{seleccionada.telefono}</p>
                  </div>
                  <Badge tone={tonoEstado[seleccionada.estado].tone} dot>
                    {tonoEstado[seleccionada.estado].badge}
                  </Badge>
                </div>

                <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
                  {seleccionada.mensajes.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        'max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed',
                        m.autor === 'cliente'
                          ? 'bg-surface-sunken text-ink'
                          : 'ms-auto bg-accent text-on-accent',
                      )}
                    >
                      {m.texto}
                      <span className="ms-2 text-[10px] text-on-accent/70">
                        {m.hora}
                      </span>
                    </div>
                  ))}
                  {(extra[seleccionada.id] ?? []).map((m, i) => (
                    <div
                      key={`extra-${i}`}
                      className="ms-auto max-w-[85%] rounded-md bg-accent px-3 py-2 text-sm leading-relaxed text-on-accent"
                    >
                      {m.texto}
                      <span className="ms-2 text-[10px] text-on-accent/70">
                        {m.hora}
                      </span>
                    </div>
                  ))}
                </div>

                {seleccionada.estado === 'cerrada' ? (
                  <p className="border-t border-border px-4 py-3 text-xs text-ink-muted">
                    Conversación cerrada. Puede reabrirla escribiéndole al
                    cliente.
                  </p>
                ) : (
                  <form
                    className="flex items-center gap-2 border-t border-border p-3"
                    onSubmit={(e) => {
                      e.preventDefault()
                      enviarRespuesta()
                    }}
                  >
                    <input
                      value={respuesta}
                      onChange={(e) => setRespuesta(e.target.value)}
                      placeholder="Escriba su respuesta"
                      aria-label={`Responder a ${seleccionada.cliente}`}
                      className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-base text-ink placeholder:text-ink-subtle outline-none transition-colors hover:border-ink-muted focus:border-focus focus:shadow-[0_0_0_1px_var(--focus-ring)]"
                    />
                    <Button type="submit" size="sm" className="shrink-0">
                      Enviar
                    </Button>
                  </form>
                )}
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
                <p className="text-heading-md text-ink">
                  Elija una conversación
                </p>
                <p className="max-w-xs text-sm text-ink-muted">
                 Seleccione un cliente de la lista para leer el hilo completo
                  y responderle desde aquí.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </Container>
  )
}
