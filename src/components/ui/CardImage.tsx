import { Badge, type BadgeTone } from './Badge'
import { Button } from './Button'
import { Card } from './Card'
import { cn } from '../../lib/cn'

export type CardImageProps = {
  /** Imagen de portada (siempre con texto alternativo real). */
  imageSrc: string
  imageAlt: string
  /** Velo suave sobre la imagen, degradado desde brand-deep.
   * @default false */
  overlay?: boolean
  /** Distintivo del contenido; va en el cuerpo, nunca sobre la imagen. */
  badge?: { label: string; tone?: BadgeTone; dot?: boolean }
  title: string
  description: string
  /** Destino de la acción. */
  href: string
  ctaLabel: string
  /** true abre el destino en pestaña nueva. @default false */
  external?: boolean
  /** Orientación: "vertical" apila imagen y cuerpo;
   * "horizontal" pone la imagen a la izquierda.
   * @default "vertical" */
  orientation?: 'vertical' | 'horizontal'
  /** Densidad compacta (panel de navegación): menos aire,
   * título menor y texto recortado a altura fija.
   * @default false */
  compact?: boolean
  className?: string
}

/** Tarjeta con imagen de portada, distintivo, título y una acción.
 * La imagen escala suavemente en hover dentro del recorte. */
export function CardImage({
  imageSrc,
  imageAlt,
  overlay = false,
  orientation = 'vertical',
  compact = false,
  badge,
  title,
  description,
  href,
  ctaLabel,
  external = false,
  className,
}: CardImageProps) {
  const horizontal = orientation === 'horizontal'

  return (
    <Card
      padded={false}
      className={cn(
        'flex h-full overflow-hidden',
        horizontal ? 'flex-row' : 'flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          horizontal && 'w-[38%] shrink-0',
        )}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          width="960"
          height="600"
          loading="lazy"
          className={cn(
            'object-cover grayscale transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]',
            horizontal
              ? 'h-full w-full'
              : cn(
                  'w-full',
                  compact ? 'aspect-video' : 'aspect-[16/10]',
                ),
          )}
        />
        {overlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/45 via-brand-deep/10 to-transparent"
          />
        )}
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col',
          compact ? 'gap-2 p-4' : 'gap-3 p-5',
        )}
      >
        {badge && (
          <div>
            <Badge tone={badge.tone ?? 'brand'} dot={badge.dot}>
              {badge.label}
            </Badge>
          </div>
        )}
        <h3
          className={cn(
            'font-display text-ink',
            compact ? 'line-clamp-2 text-lg' : 'text-xl',
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'flex-1 text-sm leading-relaxed text-ink-soft',
            compact && 'line-clamp-3',
          )}
        >
          {description}
        </p>
        <Button
          href={href}
          size="sm"
          className="w-fit"
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {ctaLabel}
        </Button>
      </div>
    </Card>
  )
}
