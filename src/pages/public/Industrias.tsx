import type { Icon } from '@phosphor-icons/react'
import { CalendarCheck, ForkKnife, Wrench } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { PageIntro } from '../shared'
import { LinkButton } from '../../components/ui/LinkButton'

type Industry = {
  icon: Icon
  name: string
  description: string
  examples: string
  demo: string
  demoTone: 'success' | 'neutral'
}

const industries: Industry[] = [
  {
    icon: CalendarCheck,
    name: 'Citas',
    description:
      'Agenda en línea, confirmaciones y recordatorios. Su cliente escoge su hora y el sistema cuida el cupo.',
    examples: 'Barberías, salones, clínicas pequeñas y estudios.',
    demo: 'Demo publicada',
    demoTone: 'success',
  },
  {
    icon: ForkKnife,
    name: 'Pedidos',
    description:
      'El pedido llega por WhatsApp, queda registrado y sale con su comprobante. Sin anotar a mano.',
    examples: 'Restaurantes, sodas y negocios de repuestos.',
    demo: 'Demo próximamente',
    demoTone: 'neutral',
  },
  {
    icon: Wrench,
    name: 'Servicios',
    description:
      'Visitas técnicas con fecha, técnico y estado. Su cliente sabe cuándo lo atienden.',
    examples: 'Talleres, mantenimiento y limpieza.',
    demo: 'Demo próximamente',
    demoTone: 'neutral',
  },
]

export function Industrias() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Industrias"
          description="Tres industrias al día de hoy, cada una con su plantilla lista para ajustar a su negocio."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {industries.map((industry) => (
            <Card key={industry.name} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-accent-text">
                  <industry.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <Badge tone={industry.demoTone} dot>
                  {industry.demo}
                </Badge>
              </div>
              <h2 className="text-heading-lg text-ink">{industry.name}</h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                {industry.description}
              </p>
              <p className="text-xs text-ink-muted">{industry.examples}</p>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-heading-lg text-ink">
              ¿Su industria no está en la lista?
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Trabajamos con cualquier negocio de servicios. Cuéntenos su caso.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <LinkButton to="/demos" variant="secondary">
              Ver demos
            </LinkButton>
            <LinkButton to="/comenzar">Comenzar</LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
