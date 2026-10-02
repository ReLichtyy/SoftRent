import symbolSrc from '../../assets/brand/softrent-symbol.png'
import wordmarkSrc from '../../assets/brand/softrent-wordmark.png'
import { cn } from '../../lib/cn'

export type LogoSymbolProps = {
  /** Lado mayor en px. Mínimo recomendado: 20. @default 28 */
  size?: number
  className?: string
}

/** Símbolo: la "S" roja. Funciona sobre cualquier fondo (favicon, avatar,
 * barra superior). Mantener un espacio libre de media anchura. */
export function LogoSymbol({ size = 28, className }: LogoSymbolProps) {
  return (
    <img
      src={symbolSrc}
      alt=""
      aria-hidden="true"
      width={Math.round((size * 1246) / 1295)}
      height={size}
      className={cn('shrink-0 select-none', className)}
    />
  )
}

export type LogoProps = {
  /** Lado mayor del símbolo en px. @default 28 */
  size?: number
  className?: string
  /** Clases del texto "SoftRent". */
  textClassName?: string
}

/** Logotipo para fondo de papel: símbolo + "SoftRent" en Figtree 700.
 * El wordmark de imagen solo va sobre superficies oscuras
 * (ver LogoWordmark). */
export function Logo({ size = 28, className, textClassName }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoSymbol size={size} />
      <span
        className={cn(
          'text-heading-md font-bold tracking-tight text-ink',
          textClassName,
        )}
      >
        SoftRent
      </span>
    </span>
  )
}

export type LogoWordmarkProps = {
  /** Ancho en px. Mínimo 120; debajo de 200 usar el símbolo. @default 168 */
  width?: number
  className?: string
}

/** Wordmark "Soft" + "Rent" con la línea RENT · MANAGE · GROW.
 * Sus partes blancas desaparecen sobre papel: usarlo SOLO sobre
 * surface-inverse (hero, footer, cierre). */
export function LogoWordmark({ width = 168, className }: LogoWordmarkProps) {
  return (
    <img
      src={wordmarkSrc}
      alt="SoftRent · Rent · Manage · Grow"
      width={width}
      height={Math.round((width * 1235) / 4111)}
      className={cn('select-none', className)}
    />
  )
}
