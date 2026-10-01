import { cn } from '../../lib/cn'

export type SkeletonProps = {
  className?: string
}

/** Marcador de carga con el mismo tamaño que el contenido final,
 * para cero saltos de diseño (iteración de diseño 3). El pulso
 * se desactiva solo con prefers-reduced-motion (ver base.css). */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-sm bg-surface-2', className)}
    />
  )
}
