import {
  CalendarCheck,
  ForkKnife,
  Gear,
  Wrench,
  type Icon,
} from '@phosphor-icons/react'
import type { DemoId } from '../content/types'

/** Íconos de las demos: presentación, no contenido.
 * Una demo nueva renderiza con el ícono de respaldo,
 * sin tocar este archivo (regla de la sección 3.4.4). */
const iconos: Partial<Record<DemoId, Icon>> = {
  citas: CalendarCheck,
  pedidos: ForkKnife,
  servicios: Wrench,
}

const iconoDefault: Icon = Gear

export function demoIcon(id: DemoId): Icon {
  return iconos[id] ?? iconoDefault
}
