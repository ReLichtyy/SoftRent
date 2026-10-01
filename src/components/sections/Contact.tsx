import { Button } from '../ui/Button'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { useScrollReveal } from '../../lib/useScrollReveal'

/** CTA final sobre bloque de marca (brand-deep). */
export default function Contact() {
  const scope = useScrollReveal<HTMLDivElement>({
    selector: '[data-reveal]',
    stagger: 0.1,
  })

  return (
    <Section id="contacto" tone="deep">
      <Container className="py-24 sm:py-36">
        <div ref={scope} className="max-w-xl">
          <h2
            data-reveal
            className="font-display text-3xl leading-tight sm:text-4xl"
          >
            No tenemos una prueba gratis. Tenemos algo mejor: su sistema, de
            una vez.
          </h2>
          <p data-reveal className="mt-5 text-on-deep/75">
            No armamos un producto genérico para que lo pruebe y vea si le
            sirve. Conversamos con usted, entendemos su negocio y construimos
            directo lo que necesita.
          </p>

          <div data-reveal className="mt-9 flex flex-wrap items-center gap-5">
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
