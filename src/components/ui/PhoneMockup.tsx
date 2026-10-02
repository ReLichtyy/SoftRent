import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type PhoneMockupProps = {
  /** Pantalla de la app: todo el contenido vive dentro del marco. */
  children: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/** Marco de teléfono con pantalla de app: muestra el sistema como
 * lo ve el cliente, usado por las secciones de producto del inicio. */
export function PhoneMockup({
  children,
  className,
  ...props
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        'w-[300px] max-w-full rounded-[2.5rem] bg-surface-inverse p-2.5 shadow-lg sm:w-[320px]',
        className,
      )}
      {...props}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-surface text-ink">
        {/* Notch y home indicator decorativos del marco. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-surface-inverse"
        />
        <div className="pt-9">{children}</div>
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-ink/20"
        />
        <div className="pb-4" aria-hidden="true" />
      </div>
    </div>
  )
}
