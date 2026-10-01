import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { PlanesGrid } from './PlanesGrid'

/** Sección de planes del landing (wireframe 2.7). */
export default function Planes() {
  const scope = useScrollReveal<HTMLElement>()

  return (
    <section ref={scope} className="border-t border-line py-20 sm:py-28">
      <Container>
        <h2 className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl">
          Precios que se entienden en un vistazo
        </h2>
        <p className="mt-4 max-w-md text-ink-soft">
          Una suscripción mensual y una implementación única. Sin letra chica
          ni cargos sorpresa.
        </p>

        <div className="mt-10">
          <PlanesGrid />
        </div>
      </Container>
    </section>
  )
}
