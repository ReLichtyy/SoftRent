import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Container } from '../layout/Container'
import { WordScrub } from '../motion/WordScrub'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { soluciones } from '../../content/soluciones'

/* El landing muestra las primeras cuatro; la lista completa
 * vive en la página de Soluciones. */
const destacadas = soluciones.slice(0, 4)

/** ¿Le pasa esto? (wireframe 2.7): tarjetas de dolor con su
 * solución y beneficio medible, desde content/soluciones. */
export default function Problemas() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.09,
  })

  return (
    <section ref={scope} className="py-20 sm:py-28">
      <Container>
        <WordScrub
          className="max-w-lg font-display text-display-sm text-ink sm:text-display-md"
          text="Si su negocio se parece a esto, no es un problema de esfuerzo. Es un problema de herramientas."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {destacadas.map((item) => (
            <Link
              key={item.id}
              to="/soluciones"
              className="group block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              <Card className="flex h-full flex-col gap-3 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-heading-lg text-ink">{item.dolor}</h3>
                  <Badge tone="success" className="shrink-0">
                    {item.beneficio}
                  </Badge>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-ink-muted">
                  {item.respuesta}
                </p>
                <p className="text-sm text-accent-text underline-offset-4 group-hover:underline">
                  Ver la solución
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
