import { useId, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import {
  FieldError,
  FieldHint,
  controlStyles,
  labelStyles,
} from './FieldMessage'

export type SelectProps = {
  /** Etiqueta visible; siempre requerida para accesibilidad. */
  label: string
  /** Ayuda breve bajo el campo. */
  hint?: string
  /** Mensaje de error; marca el campo como inválido. */
  error?: string
  className?: string
  children: React.ReactNode
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'children'>

/* El chevron es una imagen de fondo en gris medio (3:1 sobre papel y
 * sobre superficie oscura); el control sigue siendo un <select> nativo
 * accesible por teclado. */
const chevron =
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23948d84%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat"

/** Selector nativo con etiqueta, ayuda y error asociados por id. */
export function Select({
  label,
  hint,
  error,
  className,
  id: idProp,
  children,
  ...props
}: SelectProps) {
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
      <select
        id={id}
        className={cn(controlStyles, 'cursor-pointer appearance-none pr-10', chevron)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      >
        {children}
      </select>
      <FieldError id={errorId} error={error} />
      {hint && !error && <FieldHint id={hintId}>{hint}</FieldHint>}
    </div>
  )
}
