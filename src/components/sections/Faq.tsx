import { CaretDown } from '@phosphor-icons/react'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { faq } from '../../content/faq'

/** FAQ (sección 3.4.9): acordeón nativo (details/summary),
 * alimentado por content/faq, la misma fuente del chatbot. */
export default function Faq() {
  const scope = useScrollReveal<HTMLElement>()

  return (
    <section ref={scope} className="py-20 sm:py-28">
      <Container>
        <h2 className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl">
          Preguntas frecuentes
        </h2>

        <div className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.pregunta} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-medium text-ink outline-none transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] [&::-webkit-details-marker]:hidden">
                {item.pregunta}
                <CaretDown
                  className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.respuesta}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
