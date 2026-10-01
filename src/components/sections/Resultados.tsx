import { Clock, CalendarCheck, ChatCircleDots, ArrowsClockwise } from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'
import { KpiTile } from '../ui/KpiTile'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'

/* Métricas de las demos (sección 3.4.7): sin casos reales aún,
 * se marcan explícitamente como ejemplo. */
const metricas = [
  {
    value: '1 min',
    label: 'Tiempo de primera respuesta, a cualquier hora',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    value: '2 recordatorios',
    label: 'Por cita: 24 horas y 2 horas antes',
    icon: <CalendarCheck className="h-5 w-5" />,
  },
  {
    value: '24/7',
    label: 'Atención sin horario de oficina',
    icon: <ChatCircleDots className="h-5 w-5" />,
  },
  {
    value: 'En días',
    label: 'De la conversación al sistema en marcha',
    icon: <ArrowsClockwise className="h-5 w-5" />,
  },
]

/** Resultados en números (wireframe 2.7): KPI tiles de las demos. */
export default function Resultados() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.08,
  })

  return (
    <section ref={scope} className="py-20 sm:py-28">
      <Container>
        <div data-reveal className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            El valor, en números
          </h2>
          <Badge tone="neutral">Ejemplo de demo</Badge>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((m) => (
            <div data-reveal key={m.value}>
              <KpiTile value={m.value} label={m.label} icon={m.icon} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
