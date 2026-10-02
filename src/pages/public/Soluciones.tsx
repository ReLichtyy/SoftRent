import {
  CalendarBlank,
  ChatCircleText,
  ChartLine,
  Gear,
  Receipt,
  type Icon,
} from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { LinkButton } from '../../components/ui/LinkButton'
import { demoPorId } from '../../content/demos'
import { soluciones } from '../../content/soluciones'
import { PageIntro } from '../shared'

const iconos: Record<string, Icon> = {
  'mensajes-sin-respuesta': ChatCircleText,
  'agenda-en-cuaderno': CalendarBlank,
  'citas-perdidas': CalendarBlank,
  'pedidos-sueltos': Receipt,
  'facturas-tardias': Receipt,
  'decisiones-a-ciegas': ChartLine,
}

/* Ícono de respaldo para soluciones nuevas. */
const iconoDefault: Icon = Gear

export function Soluciones() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="space-y-12 sm:space-y-16">
        <PageIntro
          title="Soluciones por dolor"
          description="Cada tarjeta responde a un problema concreto de su negocio. Primero el dolor, después la solución."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {soluciones.map((item) => {
            const Icono = iconos[item.id] ?? iconoDefault
            const demo = demoPorId(item.demo)
            return (
              <Card key={item.id} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-accent-text">
                    <Icono className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <Badge tone="success">{item.beneficio}</Badge>
                </div>
                <h2 className="text-heading-lg text-ink">{item.dolor}</h2>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {item.respuesta}
                </p>
                {demo && (
                  <p className="text-xs text-ink-muted">
                    Incluido en {demo.nombre}.
                  </p>
                )}
              </Card>
            )
          })}
        </div>

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-heading-lg text-ink">
              ¿Le suena alguno de estos dolores?
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Cuéntenos cómo trabaja y le decimos qué se puede automatizar.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <LinkButton to="/comenzar">Comenzar</LinkButton>
            <LinkButton to="/precios" variant="secondary">
              Ver precios
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  )
}
