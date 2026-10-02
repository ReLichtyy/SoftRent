import { useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import {
  FieldError,
  FieldHint,
  controlStyles,
  labelStyles,
} from './FieldMessage'

export type TextareaProps = {
  /** Etiqueta visible; siempre requerida para accesibilidad. */
  label: string
  /** Ayuda breve bajo el campo. */
  hint?: string
  /** Mensaje de error; marca el campo como inválido. */
  error?: string
  className?: string
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

/** Área de texto multilínea con etiqueta, ayuda y error. */
export function Textarea({
  label,
  hint,
  error,
  className,
  id: idProp,
  ...props
}: TextareaProps) {
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
      <textarea
        id={id}
        className={cn(controlStyles, 'h-auto min-h-24 resize-y py-2.5 leading-6')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      <FieldError id={errorId} error={error} />
      {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
    </div>
  )
}
