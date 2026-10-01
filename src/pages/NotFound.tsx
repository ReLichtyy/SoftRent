import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { LinkButton } from '../components/ui/LinkButton'

export function NotFound() {
  return (
    <Section className="py-24 sm:py-36">
      <Container className="flex max-w-md flex-col items-center text-center">
        <p className="font-display text-5xl text-brand">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink">
          Página no encontrada
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          La dirección no existe o cambió. Regrese al inicio y siga desde
          ahí.
        </p>
        <LinkButton to="/" className="mt-8">
          Volver al inicio
        </LinkButton>
      </Container>
    </Section>
  )
}
