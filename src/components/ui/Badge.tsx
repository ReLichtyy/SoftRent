import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeTone =
  | 'brand'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type BadgeProps = {
  /** Tono semántico del distintivo.
   * Nota de contraste: en tema claro, "success" y "warning"
   * solo cumplen AA en texto grande; acompáñalos con ícono. */
  tone?: BadgeTone
  /** Punto de color a la izquierda (para estados). */
  dot?: boolean
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>

const toneStyles: Record<BadgeTone, string> = {
  brand: 'bg-brand/10 text-brand',
  neutral: 'bg-surface-2 text-ink-soft',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
}

const dotStyles: Record<BadgeTone, string> = {
  brand: 'bg-brand',
  neutral: 'bg-ink-soft',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
}

/** Distintivo compacto (pill) para estados y categorías. */
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
