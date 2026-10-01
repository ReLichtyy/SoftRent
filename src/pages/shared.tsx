import type { ReactNode } from 'react'
import { Badge, type BadgeTone } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

/** Encabezado común de página: título y una línea de descripción. */
export function PageIntro({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <header className="max-w-2xl">
      <h1 className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-soft">
        {description}
      </p>
      {children}
    </header>
  )
}

export type StatusItem = {
  title: string
  meta?: string
  badge?: string
  tone?: BadgeTone
}

/** Lista de filas con estado a la derecha.
 * Colapsa a columna completa debajo de sm. */
export function StatusList({ items }: { items: StatusItem[] }) {
  return (
    <Card padded={false}>
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{item.title}</p>
              {item.meta && (
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                  {item.meta}
                </p>
              )}
            </div>
            {item.badge && (
              <Badge tone={item.tone} dot className="w-fit shrink-0">
                {item.badge}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}
