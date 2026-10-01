import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type ToggleProps = {
  /** Etiqueta visible junto al interruptor. */
  label?: string
  /** Estado controlado. */
  checked?: boolean
  /** Estado inicial cuando no está controlado. */
  defaultChecked?: boolean
  /** Se llama en cada cambio con el nuevo estado. */
  onCheckedChange?: (checked: boolean) => void
  /** Deshabilita el control. */
  disabled?: boolean
  children?: ReactNode
  className?: string
}

/** Interruptor tipo "switch". Botón nativo con role="switch"
 * y gestión de foco por teclado (Espacio / Enter). */
export function Toggle({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className,
}: ToggleProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked)
  const isChecked = checked ?? uncontrolled

  function handleClick() {
    if (checked === undefined) setUncontrolled(!isChecked)
    onCheckedChange?.(!isChecked)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:opacity-50',
        isChecked ? 'bg-brand' : 'bg-surface-2 ring-1 ring-inset ring-line',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none block size-4.5 rounded-full bg-surface shadow transition-transform',
          isChecked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  )
}
