import { ChartBar, Funnel, MagnifyingGlass, Table } from '@phosphor-icons/react'
import { Card } from '../ui/Card'
import { Container } from '../layout/Container'
import { WordScrub } from '../motion/WordScrub'
import { useScrollReveal } from '../../lib/useScrollReveal'

/* El rival aquí no es el papel ni el Excel: es el sistema moderno que
 * ya tiene reportes y dashboards, pero sin IA integrada. El dato está,
 * la respuesta no. */
const pasosSistemaNormal = [
  { icono: Table, texto: 'Abrir el módulo de reportes' },
  { icono: Funnel, texto: 'Elegir fechas y filtrar por última visita' },
  { icono: MagnifyingGlass, texto: 'Revisar la tabla cliente por cliente' },
  { icono: ChartBar, texto: 'Armar usted mismo la conclusión' },
]

/** El problema: un sistema moderno sin IA guarda sus datos, pero la
 * respuesta la arma usted. Contrasta el recorrido de pasos con una sola
 * pregunta en SoftRent. */
export default function ProblemaDatos() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.1,
  })

  return (
    <section ref={scope} className="py-20 sm:py-28">
      <Container>
        <WordScrub
          className="max-w-2xl font-display text-display-sm text-ink sm:text-display-md"
          text="Su sistema ya guarda todos los datos. Lo que no hace es darle respuestas."
        />
        <p
          data-reveal
          className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted"
        >
          Los sistemas modernos tienen paneles y reportes. Pero la pregunta es
          suya, y el camino hasta la respuesta también.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Card data-reveal className="flex flex-col p-6 sm:p-8">
            <p className="text-eyebrow uppercase text-ink-subtle">
              Un sistema moderno, sin IA integrada
            </p>
            <p className="mt-4 font-display text-display-sm text-ink">
              Para saber quién no ha vuelto en dos meses.
            </p>
            <ol className="mt-6 space-y-3">
              {pasosSistemaNormal.map((paso, i) => (
                <li
                  key={paso.texto}
                  className="flex items-center gap-3 rounded-sm border border-border px-3.5 py-3 text-sm text-ink-muted"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-xs font-semibold text-ink">
                    {i + 1}
                  </span>
                  <paso.icono
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {paso.texto}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-ink-muted">
              Cuatro pasos para una sola pregunta. Y mañana, otra vez.
            </p>
          </Card>

          <Card
            data-reveal
            tone="inverse"
            className="flex flex-col p-6 sm:p-8"
          >
            <p className="text-eyebrow uppercase text-ink-inverse/60">
              SoftRent, con IA integrada
            </p>
            <p className="mt-4 font-display text-display-sm text-ink-inverse">
              Se lo pregunta y listo.
            </p>

            <div className="mt-6 flex flex-1 flex-col gap-3">
              <div className="ms-auto w-fit max-w-[85%] rounded-sm bg-accent px-3.5 py-2.5 text-sm text-on-accent">
                ¿Quién no ha vuelto en dos meses?
              </div>
              <div className="w-fit max-w-[92%] rounded-sm bg-white/10 px-3.5 py-3 text-sm leading-relaxed text-ink-inverse">
                Hay 3 clientes que no vuelven desde julio: Marco Díaz, Sofía
                Chaves y Elena Brenes. ¿Les escribo por WhatsApp?
              </div>
              <div className="ms-auto w-fit max-w-[85%] rounded-sm bg-accent px-3.5 py-2.5 text-sm text-on-accent">
                Sí, escríbales.
              </div>
            </div>
            <p className="mt-6 text-sm text-ink-inverse/75">
              Una pregunta. La respuesta y la acción, en el mismo lugar.
            </p>
          </Card>
        </div>
      </Container>
    </section>
  )
}
