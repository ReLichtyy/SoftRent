import { cn } from '../../lib/cn'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export type SpinnerProps = {
  /** Diámetro: sm 14px, md 16px, lg 20px. @default "md" */
  size?: SpinnerSize
  /** Texto para lectores de pantalla. Con texto el spinner es un
   * `role="status"`; sin texto es decorativo (úselo dentro de un
   * control que ya anuncia su estado, como un Button cargando). */
  label?: string
  className?: string
}

const sizes: Record<SpinnerSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
}

/** Anillo de progreso indeterminado en currentColor, para esperas de
 * pocos segundos. Gira 720 ms por vuelta; con movimiento reducido
 * sigue girando (su movimiento es el significado). */
export function Spinner({ size = 'md', label, className }: SpinnerProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
      className={cn('inline-flex shrink-0', sizes[size], className)}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="size-full animate-spin [animation-duration:720ms] motion-reduce:[animation-duration:1.6s!important]"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="currentColor"
          strokeOpacity="0.22"
          strokeWidth="2.25"
        />
        <path
          d="M18 10a8 8 0 0 0-8-8"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      </svg>
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}
