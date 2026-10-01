import { useEffect, useId, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { X } from '@phosphor-icons/react'
import { cn } from '../../lib/cn'

export type ModalProps = {
  /** Abre el diálogo; cerrado no renderiza nada (cero saltos de diseño). */
  open: boolean
  onClose: () => void
  /** Título anunciado por el lector de pantalla. */
  title: string
  children: ReactNode
  className?: string
}

/** Diálogo modal accesible: Esc cierra, clic en el fondo cierra,
 * el foco entra al panel y regresa al elemento que lo abrió.
 * El cuerpo no se desplaza mientras está abierto. */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const tituloId = useId()
  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (!open) return

    const previo = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const foco = panelRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    foco?.focus()

    if (!reducido.matches) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' },
      )
    }

    function alPresionar(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', alPresionar)

    return () => {
      document.removeEventListener('keydown', alPresionar)
      document.body.style.overflow = overflow
      previo?.focus()
    }
  }, [open, onClose, reducido])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        className={cn(
          'relative w-full max-w-lg rounded-lg border border-line bg-surface p-6 shadow-lg outline-none',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={tituloId} className="font-display text-xl text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink-soft outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
