import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import {
  FieldError,
  FieldHint,
  controlStyles,
  labelStyles,
} from './FieldMessage'

export type InputProps = {
  /** Etiqueta visible; siempre requerida para accesibilidad. */
  label: string
  /** Ayuda breve bajo el campo. */
  hint?: string
  /** Mensaje de error; marca el campo como inválido. Diga qué hacer,
   * no qué falló: "Escriba los 8 dígitos, sin el +506". */
  error?: string
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

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
  const describedBy = [error && errorId, hint && hintId]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      <input
        id={id}
        className={controlStyles}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      <FieldError id={errorId} error={error} />
      {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
    </div>
  )
}
