import type { Icon } from '@phosphor-icons/react'
import {
  ChatCircleText,
  FileText,
  HandCoins,
  Lifebuoy,
  MapPin,
  Rocket,
} from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { PageIntro } from '../shared'
import { LinkButton } from '../../components/ui/LinkButton'

type Block = {
  icon: Icon
  title: string
  text: string
}

const blocks: Block[] = [
  {
    icon: MapPin,
    title: 'Hecho en Costa Rica',
    text: 'Trabajamos con negocios de todo el país. Le hablamos en su idioma, con horario local y sin letra pequeña.',
  },
  {
    icon: HandCoins,
    title: 'Software a la medida, sin pleitos',
    text: 'No vendemos licencias. Diseñamos, implementamos y acompañamos. Usted decide qué tan lejos llegar.',
  },
]

const steps: Block[] = [
  {
    icon: ChatCircleText,
    title: 'Diagnóstico',
    text: 'Escuchamos cómo trabaja su negocio hoy.',
  },
  {
    icon: FileText,
    title: 'Propuesta',
    text: 'Le decimos qué se automatiza y qué no.',
  },
  {
    icon: Rocket,
    title: 'Implementación',
    text: 'Ajustamos el sistema a su operación real.',
  },
  {
    icon: Lifebuoy,
    title: 'Acompañamiento',
    text: 'Nos queda cerca, no desaparecemos.',
  },
]

export function Nosotros() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Nosotros"
          description="Hacemos software para las pymes de servicios de Costa Rica: simple, en su idioma y a la medida."
        />

        <div id="quienes-somos" className="grid scroll-mt-24 gap-5 md:grid-cols-2">
          {blocks.map((block) => (
            <Card key={block.title} className="flex flex-col gap-3">
              <span className="text-accent-text">
                <block.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-heading-lg text-ink">{block.title}</h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                {block.text}
              </p>
            </Card>
          ))}
        </div>

        <div id="como-trabajamos" className="scroll-mt-24">
          <h2 className="font-display text-display-sm text-ink">Cómo trabajamos</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.title} className="flex flex-col gap-2">
                <span className="text-accent-text">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-heading-md text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Pendiente: presentación real del creador (nombre, foto, historia). */}
        <div id="creador" className="scroll-mt-24">
          <h2 className="font-display text-display-sm text-ink">Creador</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Pronto: quién está detrás de SoftRent.
          </p>
        </div>

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-ink-muted">
            Le gustaría conocer el detalle de los planes antes de escribirnos,
            revíselos con calma.
          </p>
          <LinkButton to="/precios" variant="secondary" className="shrink-0">
            Ver precios
          </LinkButton>
        </Card>
      </Container>
    </Section>
  )
}
