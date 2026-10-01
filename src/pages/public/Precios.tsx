import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { PlanesGrid } from '../../components/sections/PlanesGrid'
import { PageIntro } from '../shared'

export function Precios() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Precios"
          description="Una suscripción mensual, sin sorpresas. Todos los planes incluyen soporte en español y actualizaciones."
        />
        <PlanesGrid />
      </Container>
    </Section>
  )
}
