import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type LinkProps = {
  /** Estilo del enlace.
   * - "brand": color de marca con subrayado al pasar el cursor
   * - "muted": texto secundario que oscurece al pasar el cursor
   * - "inherit": hereda el color del contexto
   * @default "brand" */
  variant?: 'brand' | 'muted' | 'inherit'
  children: ReactNode
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

const variantStyles = {
  brand: 'text-accent-text underline-offset-4 hover:underline',
  muted: 'text-ink-muted transition-colors hover:text-ink',
  inherit: '',
} as const

/** Enlace de texto. Para acciones con forma de botón usa Button con href. */
export function Link({
  variant = 'brand',
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <a className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </a>
  )
}
