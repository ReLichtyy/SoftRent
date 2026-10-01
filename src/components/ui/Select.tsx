import { useId, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

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

const fieldStyles =
  'w-full appearance-none rounded-sm border border-line bg-surface-2 bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235F585B\' stroke-width=\'2\' stroke-linecap=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat py-2.5 pl-3 pr-10 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30 aria-invalid:border-danger'

/** Selector nativo con etiqueta, ayuda y error asociados por id.
 * El chevron es una imagen de fondo; el control sigue siendo un
 * <select> accesible por teclado. */
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
  const describedBy = [hint && hintId, error && errorId]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        className={fieldStyles}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      >
        {children}
      </select>
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
