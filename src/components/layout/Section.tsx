import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type SectionTone = 'bg' | 'surface' | 'deep'

export type SectionProps = {
  /** Fondo de la sección.
   * - "bg": fondo de página (por defecto)
   * - "surface": banda con superficie y borde superior
   * - "deep": bloque de marca (surface-inverse, texto claro fijo)
   * @default "bg" */
  tone?: SectionTone
} & HTMLAttributes<HTMLElement>

const toneStyles: Record<SectionTone, string> = {
  bg: '',
  surface: 'border-t border-border bg-surface-sunken',
  deep: 'bg-surface-inverse text-ink-inverse',
}

/** Sección de página con ritmo vertical consistente
 * (múltiplos de 4px según los tokens). */
export function Section({ tone = 'bg', className, ...props }: SectionProps) {
  return (
    <section
      className={cn(toneStyles[tone], className)}
      {...props}
    />
  )
}
