import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

export type LinkButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
export type LinkButtonSize = 'sm' | 'md' | 'lg'

export type LinkButtonProps = {
  /** Ruta interna; usa react-router, sin recarga de página. */
  to: string
  /** Estilo visual, igual que Button. @default "primary" */
  variant?: LinkButtonVariant
  /** Tamaño, igual que Button. @default "md" */
  size?: LinkButtonSize
  className?: string
  children: ReactNode
}

/* Clases espejo de Button: el enlace interno necesita la misma
 * apariencia sin que la primitiva ui/Button dependa del router. */
const baseStyles =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]'

const variantStyles: Record<LinkButtonVariant, string> = {
  primary: 'bg-brand text-on-brand hover:bg-brand-hover',
  secondary:
    'border border-line bg-surface text-ink hover:bg-surface-2 hover:border-ink-soft/40',
  ghost: 'text-ink hover:bg-surface-2',
  link: 'text-brand underline-offset-4 hover:underline',
}

const sizeStyles: Record<LinkButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

/** Enlace interno de react-router con apariencia de botón.
 * Para enlaces externos usa Button con href. */
export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        variant === 'link' && 'px-0',
        className,
      )}
    >
      {children}
    </Link>
  )
}
