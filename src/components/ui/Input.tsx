import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type InputProps = {
  /** Etiqueta visible; siempre requerida para accesibilidad. */
  label: string
  /** Ayuda breve bajo el campo. */
  hint?: string
  /** Mensaje de error; marca el campo como inválido. */
  error?: string
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

const fieldStyles =
  'w-full rounded-sm border border-line bg-surface-2 px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/70 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30 aria-invalid:border-danger'

/** Campo de texto con etiqueta, ayuda y error asociados por id. */
export function Input({
  label,
  hint,
  error,
  className,
  id: idProp,
  ...props
}: InputProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className={fieldStyles}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {hint && (
        <p id={hintId} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
