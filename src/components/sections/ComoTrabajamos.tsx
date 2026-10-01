import { Badge } from '../ui/Badge'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { proceso } from '../../content/proceso'

/** Cómo trabajamos (sección 3.4.5): Diagnóstico, Propuesta,
 * Implementación y Acompañamiento, con duración estimada. */
export default function ComoTrabajamos() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.1,
  })

  return (
    <section ref={scope} className="border-t border-line py-20 sm:py-28">
      <Container>
        <h2
          data-reveal
          className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          De la conversación al sistema
        </h2>
        <p data-reveal className="mt-4 max-w-md text-ink-soft">
          No le entregamos una app para que la arme solo. Lo hacemos nosotros,
          con su información.
        </p>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {proceso.map((paso) => (
            <li key={paso.id} data-reveal className="border-t-2 border-brand pt-5">
              <Badge tone="neutral">{paso.duracion}</Badge>
              <h3 className="mt-4 font-display text-xl text-ink">
                {paso.nombre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {paso.clienteHace}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {paso.softrentHace}
              </p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-12">
          <LinkButton to="/comenzar" size="lg">
            Comenzar
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
