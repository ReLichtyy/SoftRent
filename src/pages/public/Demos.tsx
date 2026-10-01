import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { CardImage } from '../../components/ui/CardImage'
import { LinkButton } from '../../components/ui/LinkButton'
import { demoIcon } from '../../lib/demo-icons'
import { demoPorId, demos } from '../../content/demos'
import { PageIntro } from '../shared'

export function Demos() {
  const destacada = demoPorId('citas')
  const publicada =
    destacada &&
    destacada.estado === 'publicada' &&
    destacada.demoUrl !== null
  const resto = demos.filter((d) => d.id !== destacada?.id)

  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Demos"
          description="Pruebe el sistema antes de hablar con nosotros. Sin registros ni pruebas gratuitas: la demo es la prueba."
        />

        {publicada && destacada?.demoUrl && (
          <CardImage
            imageSrc="https://picsum.photos/seed/softrent-demo-citas/960/600"
            imageAlt="Vista previa del sistema de reservas en línea"
            badge={{ label: 'Demo en vivo', tone: 'success', dot: true }}
            title="Sistema de Reservas y Citas 24/7"
            description="Vea cómo sus clientes eligen horario, confirman y reciben recordatorios automáticos por WhatsApp sin que usted intervenga."
            href={destacada.demoUrl}
            ctaLabel="Ver demo en vivo"
            external
            className="mx-auto max-w-xl lg:max-w-none"
          />
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {resto.map((demo) => {
            const Icono = demoIcon(demo.id)
            return (
              <Card key={demo.id} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-brand">
                    <Icono className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <Badge
                    tone={demo.estado === 'publicada' ? 'success' : 'neutral'}
                    dot
                  >
                    {demo.estado === 'publicada'
                      ? 'Publicada'
                      : 'Próximamente'}
                  </Badge>
                </div>
                <h2 className="font-display text-xl text-ink">{demo.nombre}</h2>
                <p className="text-xs text-ink-soft">{demo.industria}</p>
                <p className="flex-1 text-sm leading-relaxed text-ink-soft">
                  {demo.resumen}
                </p>
                {demo.estado === 'publicada' && demo.demoUrl ? (
                  <Button
                    href={demo.demoUrl}
                    size="sm"
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver demo
                  </Button>
                ) : (
                  <p className="text-xs text-ink-soft">
                    Le avisamos cuando abra al público.
                  </p>
                )}
              </Card>
            )
          })}
        </div>

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl text-ink">
              ¿Quiere ver la demo con sus servicios?
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Le preparamos una versión con su menú real de servicios y
              horario.
            </p>
          </div>
          <LinkButton to="/comenzar" className="shrink-0">
            Comenzar
          </LinkButton>
        </Card>
      </Container>
    </Section>
  )
}
