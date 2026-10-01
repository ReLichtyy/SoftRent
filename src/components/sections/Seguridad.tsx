import {
  Lock,
  ArrowsClockwise,
  Users,
  Sparkle,
  type Icon,
} from '@phosphor-icons/react'
import { Card } from '../ui/Card'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'

type Garantia = {
  icono: Icon
  titulo: string
  detalle: string
}

const garantias: Garantia[] = [
  {
    icono: Lock,
    titulo: 'Datos protegidos por ley',
    detalle:
      'Tratamos los datos de sus clientes bajo la Ley 8968 de protección de datos personales, con consentimiento registrado y opción de baja.',
  },
  {
    icono: ArrowsClockwise,
    titulo: 'Respaldos diarios',
    detalle:
      'La información de su negocio se respalda todos los días y se puede exportar cuando usted lo pida.',
  },
  {
    icono: Users,
    titulo: 'Accesos por rol',
    detalle:
      'Usted decide quién ve qué: dueño, agente o solo lectura. Las conversaciones quedan registradas y son revisables.',
  },
  {
    icono: Sparkle,
    titulo: 'IA con límites claros',
    detalle:
      'El asistente responde solo con la información de su negocio. Si no sabe, lo dice y pasa el mensaje a una persona.',
  },
]

/** Seguridad y datos (sección 3.4.8): bloque de confianza. */
export default function Seguridad() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.08,
  })

  return (
    <section ref={scope} className="border-t border-line bg-surface/60 py-20 sm:py-28">
      <Container>
        <h2
          data-reveal
          className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          Sus datos, tratados como deben ser
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {garantias.map((g) => (
            <Card key={g.titulo} data-reveal className="flex gap-4">
              <span className="shrink-0 text-brand">
                <g.icono className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg text-ink">{g.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {g.detalle}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
