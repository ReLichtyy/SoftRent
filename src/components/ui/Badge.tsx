import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeTone =
  | 'accent'
  | 'brand'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type BadgeProps = {
  /** Tono semántico del distintivo. */
  tone?: BadgeTone
  /** Punto de color a la izquierda (para estados). */
  dot?: boolean
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>

/* Cada tono usa su relleno -soft con el texto del mismo estado
 * (AA en 12px, ambos temas). "brand" es alias de "accent". */
const accentTone = 'bg-accent-soft text-accent-text'

const toneStyles: Record<BadgeTone, string> = {
  accent: accentTone,
  brand: accentTone,
  neutral: 'bg-surface-sunken text-ink-muted',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
}

/* El punto del badge accent usa el rojo exacto del logo (brand). */
const dotStyles: Record<BadgeTone, string> = {
  accent: 'bg-brand',
  brand: 'bg-brand',
  neutral: 'bg-ink-muted',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
}

/** Distintivo compacto (pill) para estados y categorías.
 * Contraste: todos los tonos cumplen AA en texto pequeño en ambos
 * temas (tokens ajustados, auditoría de la iteración 3). */
export function Badge({
  tone = 'neutral',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotStyles[tone])}
        />
      )}
      {children}
    </span>
  )
}
