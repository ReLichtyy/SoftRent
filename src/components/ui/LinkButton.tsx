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
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium tracking-[-0.005em] outline-none transition-[color,background-color,border-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]'

const variantStyles: Record<LinkButtonVariant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.14),var(--elev-xs)] hover:bg-accent-hover active:bg-accent-active',
  secondary:
    'border border-border bg-surface text-ink shadow-xs hover:border-border-strong hover:bg-surface-sunken',
  ghost: 'text-ink hover:bg-surface-sunken active:bg-border',
  link: 'text-accent-text underline-offset-4 hover:underline',
}

const sizeStyles: Record<LinkButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
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
