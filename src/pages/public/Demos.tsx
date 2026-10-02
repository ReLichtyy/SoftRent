import { useState } from 'react'
import { ArrowRight, Eye } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { LinkButton } from '../../components/ui/LinkButton'
import { Modal } from '../../components/ui/Modal'
import { demoIcon } from '../../lib/demo-icons'
import { planPorId } from '../../content/planes'
import { demos } from '../../content/demos'
import type { Demo } from '../../content/types'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { PageIntro } from '../shared'

/* Vista rápida: qué hace el sistema y qué incluye, sin salir de la página. */
function VistaRapida({ demo, onClose }: { demo: Demo; onClose: () => void }) {
  const plan = planPorId(demo.planRecomendado)

  return (
    <Modal open onClose={onClose} title={demo.nombre}>
      <div className="flex flex-col gap-4 text-sm">
        <p className="text-xs text-ink-muted">{demo.industria}</p>

        <div>
          <h3 className="font-medium text-ink">Qué hace</h3>
          <ul className="mt-2 space-y-1.5 text-ink-muted">
            {demo.funciones.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-ink">La inteligencia que lleva dentro</h3>
          <ul className="mt-2 space-y-1.5 text-ink-muted">
            {demo.iaIncluida.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-info" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {plan && <Badge tone="neutral">Plan recomendado: {plan.nombre}</Badge>}

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
          {demo.estado === 'publicada' && demo.demoUrl && (
            <Button
              href={demo.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              Abrir demo en vivo
            </Button>
          )}
          <LinkButton to={demo.cta} variant="secondary" size="sm">
            Seleccionar
          </LinkButton>
        </div>
      </div>
    </Modal>
  )
}

export function Demos() {
  const [vista, setVista] = useState<Demo | null>(null)
  const gridRef = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.08,
    y: 18,
  })

  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Demos"
          description="Pruebe el sistema antes de hablar con nosotros. Sin registros ni pruebas gratuitas: la demo es la prueba."
        />

        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => {
            const Icono = demoIcon(demo.id)
            const publicada = demo.estado === 'publicada' && demo.demoUrl !== null
            return (
              <Card key={demo.id} data-reveal className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-accent-text">
                    <Icono className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <Badge
                    tone={publicada ? 'success' : 'neutral'}
                    dot
                    className="text-[10px]"
                  >
                    {publicada ? 'En vivo' : 'Próximamente'}
                  </Badge>
                </div>
                <h2 className="text-heading-md text-ink">{demo.nombre}</h2>
                <p className="text-xs text-ink-muted">{demo.industria}</p>
                <p className="flex-1 text-sm leading-relaxed text-ink-muted">
                  {demo.impacto}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setVista(demo)}
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Vista rápida
                  </Button>
                  <LinkButton to={demo.cta} variant="ghost" size="sm">
                    Seleccionar
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-heading-lg text-ink">
              ¿Quiere ver la demo con sus servicios?
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Le preparamos una versión con su menú real de servicios y
              horario.
            </p>
          </div>
          <LinkButton to="/comenzar" className="shrink-0">
            Comenzar
          </LinkButton>
        </Card>
      </Container>

      {vista && <VistaRapida demo={vista} onClose={() => setVista(null)} />}
    </Section>
  )
}
