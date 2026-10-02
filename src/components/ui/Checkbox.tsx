import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { FieldError } from './FieldMessage'

export type CheckboxProps = {
  /** Etiqueta visible asociada al control. */
  label: string
  /** Mensaje de error; marca el control como inválido. */
  error?: string
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>

/* Casilla de 20px: borde de control (3:1), marcada = relleno accent con
 * check blanco. Sigue siendo un <input type="checkbox"> nativo. */
const boxStyles =
  "mt-px size-5 shrink-0 cursor-pointer appearance-none rounded-xs border border-border-strong bg-surface bg-center bg-no-repeat shadow-xs outline-none transition-[background-color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-ink-muted checked:border-accent checked:bg-accent sr-check checked:hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-45 forced-colors:checked:appearance-auto"

/** Casilla de verificación con etiqueta y error accesibles. */
export function Checkbox({
  label,
  error,
  className,
  id: idProp,
  ...props
}: CheckboxProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const errorId = `${id}-error`

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={boxStyles}
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-sm text-ink">
          {label}
        </label>
      </div>
      <FieldError id={errorId} error={error} className="ps-[1.875rem]" />
    </div>
  )
}
