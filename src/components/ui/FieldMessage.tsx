import { WarningCircle } from '@phosphor-icons/react'
import { cn } from '../../lib/cn'

/** Clases comunes de los controles de texto (Input, Select, Textarea).
 * Alto 40px, valor a 16px (el teléfono no hace zoom), borde de control
 * `border-strong` (3:1), foco con borde de 2px en el propio control. */
export const controlStyles =
  'h-10 w-full rounded-sm border border-border-strong bg-surface px-3 text-base text-ink shadow-xs outline-none transition-[color,background-color,border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-out)] placeholder:text-ink-subtle hover:border-ink-muted focus:border-focus focus:shadow-[0_0_0_1px_var(--focus-ring)] aria-invalid:border-danger aria-invalid:focus:border-danger aria-invalid:focus:shadow-[0_0_0_1px_var(--danger)] disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-sunken disabled:text-ink-subtle disabled:shadow-none'

export const labelStyles = 'text-sm font-medium text-ink'

export function FieldHint({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-sm text-ink-muted">
      {children}
    </p>
  )
}

/** Error junto al campo: color + ícono + frase que dice qué hacer.
 * Vive dentro de una región `aria-live="polite"` para que se anuncie. */
export function FieldError({
  id,
  error,
  className,
}: {
  id: string
  error?: string
  className?: string
}) {
  return (
    <div aria-live="polite">
      {error && (
        <p
          id={id}
          className={cn('flex items-start gap-1.5 text-sm text-danger', className)}
        >
          <WarningCircle
            className="mt-0.5 size-4 shrink-0"
            weight="fill"
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  )
}
