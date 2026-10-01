import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg' | 'icon'

export type ButtonProps = {
  /** Estilo visual del botón.
   * @default "primary" */
  variant?: Variant
  /** Tamaño del botón.
   * @default "md" */
  size?: Size
  /** Cuando se define, el botón se renderiza como enlace (<a>). */
  href?: string
  /** Contenido del botón (acepta iconos junto al texto). */
  children: ReactNode
  className?: string
}

const baseStyles =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-brand text-on-brand hover:bg-brand-hover',
  secondary:
    'border border-line bg-surface text-ink hover:bg-surface-2 hover:border-ink-soft/40',
  ghost: 'text-ink hover:bg-surface-2',
  link: 'text-brand underline-offset-4 hover:underline',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'size-10',
}

/** Acción o enlace con estilo de botón. Botón nativo por defecto;
 * pasa `href` para que sea un enlace con la misma apariencia. */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}: ButtonProps &
  (ButtonHTMLAttributes<HTMLButtonElement> &
    Partial<AnchorHTMLAttributes<HTMLAnchorElement>>)) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    variant === 'link' && 'px-0',
    className,
  )

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
