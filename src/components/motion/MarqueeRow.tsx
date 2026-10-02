import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type MarqueeRowProps = {
  children: ReactNode
  /** Sentido del loop: "reverse" recorre el track al revés. */
  direction?: 'forward' | 'reverse'
  /** Duración de un ciclo completo, en segundos. Más contenido
   * pide más duración para que el desplazamiento no acelere. */
  duration?: number
  className?: string
}

/** Fila de marquesina infinita (base.css): duplica su contenido
 * (la copia va aria-hidden) y anima el track un ciclo exacto.
 * Se pausa al hover y queda estática con movimiento reducido. */
export function MarqueeRow({
  children,
  direction = 'forward',
  duration = 40,
  className,
}: MarqueeRowProps) {
  const trackStyle: CSSProperties = { animationDuration: `${duration}s` }

  return (
    <div
      className={cn(
        'marquee',
        direction === 'reverse' && 'marquee-reverse',
        className,
      )}
    >
      <div className="marquee-track" style={trackStyle}>
        <div className="flex shrink-0 items-center gap-4 pe-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4 pe-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
