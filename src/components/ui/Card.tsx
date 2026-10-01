import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type CardProps = {
  /** Relleno interno estándar (20px). Usa false para controlar
   * el padding desde fuera.
   * @default true */
  padded?: boolean
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/** Contenedor de contenido elevado: borde + superficie.
 * Radios de 12px según los tokens (tarjetas). */
export function Card({
  padded = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-line bg-surface',
        padded && 'p-5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
