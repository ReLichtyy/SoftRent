import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { CardImage } from '../ui/CardImage'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { demoIcon } from '../../lib/demo-icons'
import { demoPorId, demos } from '../../content/demos'

/** Industrias (wireframe 2.7): un sistema por industria,
 * desde content/demos, con su estado real. */
export default function Industrias() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.09,
  })

  return (
    <section ref={scope} className="border-t border-line bg-surface/60 py-20 sm:py-28">
      <Container>
        <h2
          data-reveal
          className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          Un sistema por industria, con su cara
        </h2>
        <p data-reveal className="mt-4 max-w-md text-ink-soft">
          Mismas piezas, plantilla distinta. Cada sistema vive en su propio
          subdominio, armado sobre lo que su negocio necesita.
        </p>

        {demoPorId('citas')?.estado === 'publicada' &&
          demoPorId('citas')?.demoUrl && (
            <div
              data-reveal
              className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14"
            >
              <div>
                <h3 className="font-display text-2xl leading-tight text-ink">
                  La demo de Citas ya está en vivo
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Recórrala como si fuera su cliente: elija un horario,
                  confirme la cita y vea el recordatorio que llega solo. Nadie
                  de nuestro lado interviene.
                </p>
              </div>
              <CardImage
                imageSrc="https://picsum.photos/seed/softrent-demo-citas/960/600"
                imageAlt="Vista previa del sistema de reservas en línea"
                badge={{ label: 'Demo en vivo', tone: 'success', dot: true }}
                title="Sistema de Reservas y Citas 24/7"
                description="Vea cómo sus clientes eligen horario, confirman y reciben recordatorios automáticos por WhatsApp sin que usted intervenga."
                href={demoPorId('citas')!.demoUrl!}
                ctaLabel="Ver demo en vivo"
                external
              />
            </div>
          )}

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {demos.map((demo) => {
            const Icono = demoIcon(demo.id)
            return (
              <Card key={demo.id} data-reveal className="flex flex-col gap-3">
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
                <h3 className="font-display text-xl text-ink">{demo.nombre}</h3>
                <p className="text-xs text-ink-soft">{demo.industria}</p>
                <p className="flex-1 text-sm leading-relaxed text-ink-soft">
                  {demo.resumen}
                </p>
                <LinkButton to={demo.cta} variant="secondary" size="sm">
                  Comenzar con {demo.nombre.replace('SoftRent ', '')}
                </LinkButton>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
