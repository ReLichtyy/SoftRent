import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Spinner } from './Spinner'

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
  /** Muestra un spinner, conserva el ancho, marca `aria-busy` e ignora
   * los clics. El botón sigue siendo enfocable. Solo en botones, no en
   * enlaces (`href`).
   * @default false */
  loading?: boolean
  /** Texto anunciado mientras `loading`.
   * @default "Cargando" */
  loadingLabel?: string
  /** Contenido del botón (acepta iconos junto al texto). */
  children: ReactNode
  className?: string
}

const baseStyles =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium tracking-[-0.005em] outline-none transition-[color,background-color,border-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-45'

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.14),var(--elev-xs)] hover:bg-accent-hover active:bg-accent-active',
  secondary:
    'border border-border bg-surface text-ink shadow-xs hover:border-border-strong hover:bg-surface-sunken',
  ghost: 'text-ink hover:bg-surface-sunken active:bg-border',
  link: 'text-accent-text underline-offset-4 hover:underline',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
  icon: 'size-10',
}

/** Acción o enlace con estilo de botón. Botón nativo por defecto;
 * pasa `href` para que sea un enlace con la misma apariencia. */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  loadingLabel = 'Cargando',
  className,
  children,
  onClick,
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
    <button
      className={cn(classes, loading && 'relative cursor-progress')}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
      {...props}
    >
      {loading ? (
        <>
          <span className="invisible inline-flex items-center gap-2">
            {children}
          </span>
          <span className="absolute inset-0 grid place-items-center">
            <Spinner size={size === 'lg' ? 'lg' : 'md'} />
            <span className="sr-only">{loadingLabel}</span>
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
