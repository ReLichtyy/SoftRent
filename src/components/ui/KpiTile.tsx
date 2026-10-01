import type { ReactNode } from 'react'
import { Card } from './Card'

export type KpiTileProps = {
  /** Cifra destacada, ya formateada ("4,2 h", "₡85.000"). */
  value: string
  /** Etiqueta que explica la cifra. */
  label: string
  /** Ícono opcional arriba de la cifra. */
  icon?: ReactNode
}

/** Cifra destacada con su etiqueta, en tarjeta. */
export function KpiTile({ value, label, icon }: KpiTileProps) {
  return (
    <Card className="flex flex-col gap-2">
      {icon && <span className="text-brand">{icon}</span>}
      <p className="font-display text-2xl leading-tight text-ink">{value}</p>
      <p className="text-sm leading-relaxed text-ink-soft">{label}</p>
    </Card>
  )
}
