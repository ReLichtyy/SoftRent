import { Button } from '../ui/Button'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'

/** CTA final sobre bloque de marca (brand-deep). */
export default function Contact() {
  return (
    <Section id="contacto" tone="deep">
      <Container className="py-20 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            No tenemos una prueba gratis. Tenemos algo mejor: tu sistema, de
            una vez.
          </h2>
          <p className="mt-5 text-on-deep/75">
            No armamos un producto genérico para que lo pruebes y veas si te
            sirve. Conversamos contigo, entendemos tu negocio y construimos
            directo lo que necesitas.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button href="mailto:hola@softrent.com" size="lg">
              Comenzar
            </Button>
            <span className="text-sm text-on-deep/60">hola@softrent.com</span>
          </div>
        </div>
      </Container>
    </Section>
  )
}
