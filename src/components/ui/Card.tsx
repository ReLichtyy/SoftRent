import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type CardProps = {
  /** Relleno interno estándar (20px). Usa false para controlar
   * el padding desde fuera.
   * @default true */
  padded?: boolean
  /** Fondo: "default" blanco sobre papel; "sunken" panel hundido y
   * tranquilo; "inverse" superficie nocturna para UNA tarjeta destacada.
   * @default "default" */
  tone?: 'default' | 'sunken' | 'inverse'
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

const toneStyles = {
  default: 'border-border bg-surface',
  sunken: 'border-border bg-surface-sunken',
  inverse:
    'border-surface-inverse bg-surface-inverse text-ink-inverse [--ink-muted:rgb(243_240_235/0.78)] [--ink:var(--ink-inverse)]',
} as const

/** Contenedor de contenido elevado: borde + superficie.
 * Radios de 16px según los tokens (tarjetas). */
export function Card({
  padded = true,
  tone = 'default',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border',
        toneStyles[tone],
        padded && 'p-5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
