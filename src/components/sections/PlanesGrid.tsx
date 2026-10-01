import { useState } from 'react'
import {
  CrownSimple,
  Rocket,
  Sparkle,
  SquaresFour,
  type Icon,
} from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { LinkButton } from '../ui/LinkButton'
import { Toggle } from '../ui/Toggle'
import { planes, precioAnualMensual, reglas } from '../../content/planes'
import type { PlanId } from '../../content/types'
import { colones } from '../../lib/format'
import { cn } from '../../lib/cn'

/* Presentación de cada plan: ícono y color son decisión visual;
 * los datos vienen de content/planes. */
const iconos: Record<PlanId, Icon> = {
  arranque: Rocket,
  crecimiento: Sparkle,
  pro: CrownSimple,
  medida: SquaresFour,
}

const colores: Record<PlanId, string> = {
  arranque: 'text-plan-arranque',
  crecimiento: 'text-plan-crecimiento',
  pro: 'text-plan-pro',
  medida: 'text-plan-medida',
}

/** Grilla de planes con toggle mensual/anual (sección 3.4.6).
 * Reutilizable: la alimenta content/planes, sin datos duplicados. */
export function PlanesGrid() {
  const [anual, setAnual] = useState(false)

  function precioTexto(plan: (typeof planes)[number]): string {
    if (plan.id === 'medida') {
      return 'Desde ' + colones(plan.precioMensual ?? 0)
    }
    const base = anual ? precioAnualMensual(plan) : plan.precioMensual
    return base === null ? 'A cotizar' : colones(base)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <Toggle
          label="Cambiar entre pago mensual y anual"
          checked={anual}
          onCheckedChange={setAnual}
        />
        <span className="text-sm text-ink-soft">
          Pago anual{' '}
          <span className="font-medium text-ink">2 meses gratis</span>
        </span>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {planes.map((plan) => {
          const Icono = iconos[plan.id]
          return (
            <Card
              key={plan.id}
              className={cn(
                'flex flex-col gap-4',
                plan.destacado && 'border-brand ring-1 ring-brand',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={colores[plan.id]}>
                  <Icono className="h-6 w-6" aria-hidden="true" />
                </span>
                {plan.destacado && (
                  <Badge tone="brand" dot>
                    Recomendado
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">{plan.nombre}</h3>
                <p className="mt-2 font-display text-2xl text-ink">
                  {precioTexto(plan)}
                  {plan.id !== 'medida' && (
                    <span className="ms-1 text-sm font-normal text-ink-soft">
                      por mes
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {plan.paraQuien}
                </p>
              </div>
              <ul className="flex-1 space-y-2 text-sm text-ink-soft">
                {plan.incluye.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <LinkButton
                to={plan.ctaRuta}
                variant={plan.destacado ? 'primary' : 'secondary'}
                size="sm"
                className="w-full"
              >
                {plan.cta}
              </LinkButton>
            </Card>
          )
        })}
      </div>

      <Card className="mt-8 space-y-2">
        <p className="text-sm font-medium text-ink">
          {reglas.iva} {reglas.implementacionUnica}
        </p>
        <p className="text-sm text-ink-soft">
          {reglas.anual} {reglas.cancelacion}
        </p>
      </Card>
    </div>
  )
}
