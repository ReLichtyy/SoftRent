import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type CheckboxProps = {
  /** Etiqueta visible asociada al control. */
  label: string
  /** Mensaje de error; marca el control como inválido. */
  error?: string
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>

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
          className="mt-0.5 size-4 shrink-0 accent-brand"
          {...props}
        />
        <label htmlFor={id} className="text-sm text-ink">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="ps-6 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
