import { Fragment } from 'react'
import {
  ArrowRight,
  Calculator,
  ChatCircleDots,
  Check,
  CheckCircle,
  Desktop,
  Globe,
  Receipt,
  Sparkle,
  type Icon,
} from '@phosphor-icons/react'
import type { Solucion, SolucionPieza } from '../../content/types'
import { cn } from '../../lib/cn'

const canales = {
  whatsapp: { icono: ChatCircleDots, etiqueta: 'WhatsApp' },
  panel: { icono: Desktop, etiqueta: 'Panel de SoftRent' },
} as const

const iconosNodo: Record<'factura' | 'contabilidad' | 'web', Icon> = {
  factura: Receipt,
  contabilidad: Calculator,
  web: Globe,
}

/** Tarjeta-artefacto de una solución: una ventana del producto con uno
 * o más intercambios (mensaje, contestación de la IA y la pieza visual
 * de lo que devuelve o deja hecho) y la acción final. Para la escena:
 * [data-barra] crece desde la izquierda, [data-nodo] y [data-check]
 * entran en secuencia. */
export function ArtefactoSolucion({ item }: { item: Solucion }) {
  const canal = canales[item.canal]
  const habla = item.area === 'clientes' ? 'Su cliente' : 'Usted'

  return (
    <div className="relative">
      {/* Hojas de fondo: dan volumen de objeto apilado. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 -bottom-3 top-3 rounded-md border border-border bg-surface-sunken"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-3 -bottom-1.5 top-1.5 rounded-md border border-border bg-surface"
      />

      <figure className="relative overflow-hidden rounded-md border border-border bg-surface shadow-md">
        <figcaption className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <span className="flex items-center gap-2 text-xs font-medium text-ink-muted">
            <canal.icono className="h-4 w-4" aria-hidden="true" />
            {canal.etiqueta}
          </span>
          <span className="truncate text-xs text-ink-subtle">{item.titulo}</span>
        </figcaption>

        {item.conversacion.map((intercambio, i) => (
          <Fragment key={intercambio.pregunta}>
            {i > 0 && <div aria-hidden="true" className="mx-5 border-t border-dashed border-border" />}
            <div className="space-y-2 px-5 pt-5">
              <div className="ms-auto w-fit max-w-[85%]">
                <p className="mb-1 text-end text-[11px] text-ink-subtle">{habla}</p>
                <p className="rounded-sm rounded-br-xs bg-accent px-3 py-2 text-sm leading-relaxed text-on-accent">
                  {intercambio.pregunta}
                </p>
              </div>
              <div className="w-fit max-w-[90%]">
                <p className="mb-1 flex items-center gap-1 text-[11px] text-ink-subtle">
                  <Sparkle className="h-3 w-3" weight="fill" aria-hidden="true" />
                  IA de SoftRent
                </p>
                <p className="rounded-sm rounded-bl-xs bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-ink">
                  {intercambio.contestacion}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-4">
              {intercambio.pieza && <Pieza pieza={intercambio.pieza} />}
            </div>
          </Fragment>
        ))}

        <p className="flex items-center gap-2 border-t border-border bg-success-soft px-5 py-3 text-sm font-medium text-success">
          <CheckCircle className="h-4 w-4 shrink-0" weight="fill" aria-hidden="true" />
          {item.accion}
        </p>
      </figure>
    </div>
  )
}

/* Rótulo pequeño en mayúsculas para encabezar una pieza. */
const rotulo = 'text-[11px] font-medium uppercase tracking-[0.12em] text-ink-subtle'

/** Pieza visual según su tipo. */
function Pieza({ pieza }: { pieza: SolucionPieza }) {
  switch (pieza.tipo) {
    case 'barras':
      return (
        <ul className="space-y-3 rounded-sm border border-border p-4">
          {pieza.filas.map((f) => (
            <li key={f.etiqueta}>
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className={f.destacado ? 'font-semibold text-ink' : 'text-ink-muted'}>
                  {f.etiqueta}
                </span>
                <span className="flex items-center gap-2">
                  {f.destacado && pieza.destacado && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-text">
                      {pieza.destacado}
                    </span>
                  )}
                  {f.cifra && (
                    <span className="tabular-nums font-medium text-ink">{f.cifra}</span>
                  )}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunken">
                <div
                  data-barra
                  style={{ width: `${f.valor}%` }}
                  className={cn(
                    'h-full origin-left rounded-full',
                    f.destacado ? 'bg-accent' : 'bg-border-strong/50',
                  )}
                />
              </div>
            </li>
          ))}
        </ul>
      )

    case 'clientes':
      return (
        <ul className="divide-y divide-border rounded-sm border border-border">
          {pieza.filas.map((f) => (
            <li key={f.nombre} className="flex items-center gap-3 px-4 py-3">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-xs font-semibold text-ink"
              >
                {f.nombre.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-ink">{f.nombre}</span>
                <span className="block truncate text-xs text-ink-subtle">{f.detalle}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-success">
                <Check className="h-3.5 w-3.5" weight="bold" aria-hidden="true" />
                {pieza.estado}
              </span>
            </li>
          ))}
        </ul>
      )

    case 'existencias': {
      /* La barra se escala al doble del mínimo más alto: el mínimo
       * queda marcado y lo que está debajo se ve corto. */
      const tope = Math.max(...pieza.filas.map((f) => Math.max(f.unidades, f.minimo * 2)))
      return (
        <div className="space-y-3">
          <div className="rounded-sm border border-border">
            <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 border-b border-border px-4 py-2 text-[11px] text-ink-subtle">
              <span>Producto</span>
              <span className="text-end">En stock</span>
              <span className="text-end">Mínimo</span>
            </div>
            <ul className="space-y-3 p-4">
              {pieza.filas.map((f) => {
                const bajo = f.unidades < f.minimo
                return (
                  <li key={f.producto}>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-4 text-xs">
                      <span className={cn('truncate', bajo ? 'font-semibold text-ink' : 'text-ink-muted')}>
                        {f.producto}
                      </span>
                      <span
                        className={cn(
                          'text-end tabular-nums font-medium',
                          bajo ? 'text-warning' : 'text-ink',
                        )}
                      >
                        {f.unidades} u.
                      </span>
                      <span className="w-12 text-end tabular-nums text-ink-subtle">{f.minimo}</span>
                    </div>
                    <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunken">
                      <div
                        data-barra
                        style={{ width: `${(f.unidades / tope) * 100}%` }}
                        className={cn(
                          'h-full origin-left rounded-full',
                          bajo ? 'bg-warning' : 'bg-border-strong/50',
                        )}
                      />
                      <span
                        aria-hidden="true"
                        style={{ left: `${(f.minimo / tope) * 100}%` }}
                        className="absolute inset-y-0 w-0.5 bg-ink/40"
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {pieza.nota && (
            <div className="rounded-sm border border-dashed border-border-strong/60 px-4 py-3">
              <p className={rotulo}>{pieza.nota.titulo}</p>
              <p className="mt-1 text-sm text-ink">{pieza.nota.texto}</p>
            </div>
          )}
        </div>
      )
    }

    case 'resumen':
      return (
        <dl className="grid grid-cols-3 gap-2">
          {pieza.filas.map((f) => (
            <div key={f.etiqueta} className="rounded-sm bg-surface-sunken px-3 py-3">
              <dt className="text-[11px] leading-tight text-ink-muted">{f.etiqueta}</dt>
              <dd className="mt-1 font-display text-display-sm text-ink">{f.valor}</dd>
            </div>
          ))}
        </dl>
      )

    case 'conexiones':
      return (
        <div className="rounded-sm border border-border p-4">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-sm bg-surface-inverse px-4 py-2.5 text-ink-inverse">
            <span>
              <span className="block text-xs font-semibold">{pieza.origen.titulo}</span>
              <span className="block text-[11px] text-ink-inverse/70">{pieza.origen.detalle}</span>
            </span>
            <span className="font-display text-xl">{pieza.origen.total}</span>
          </div>

          {/* Tronco y bus que reparten la venta a cada sistema. */}
          <span aria-hidden="true" className="mx-auto block h-4 w-px bg-border-strong/60" />
          <span
            aria-hidden="true"
            className="mx-[16.66%] hidden h-px bg-border-strong/60 sm:block"
          />

          <ul className="grid gap-y-0 sm:grid-cols-3 sm:gap-x-2">
            {pieza.nodos.map((n) => {
              const IconoNodo = iconosNodo[n.icono]
              return (
                <li key={n.nombre} data-nodo className="flex flex-col">
                  <span aria-hidden="true" className="mx-auto block h-4 w-px bg-border-strong/60" />
                  <div className="flex-1 rounded-sm border border-border bg-surface p-3">
                    <p className="flex items-center gap-2 text-xs font-semibold text-ink">
                      <span className="flex h-6 w-6 items-center justify-center rounded-xs bg-surface-sunken text-ink-muted">
                        <IconoNodo className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {n.nombre}
                    </p>
                    <dl className="mt-2.5 space-y-1">
                      {n.filas.map((f) => (
                        <div key={f.etiqueta} className="flex items-baseline justify-between gap-2 text-[11px]">
                          <dt className="text-ink-subtle">{f.etiqueta}</dt>
                          <dd className="truncate font-medium text-ink">{f.valor}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-success">
                      <Check className="h-3 w-3" weight="bold" aria-hidden="true" />
                      {n.estado}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )

    case 'agenda':
      return (
        <div className="rounded-sm border border-border p-4">
          <p className={rotulo}>{pieza.dia}</p>
          <ul className="mt-3 space-y-2">
            {pieza.slots.map((s) => (
              <li key={s.hora} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs tabular-nums text-ink-muted">{s.hora}</span>
                <span
                  className={cn(
                    'flex-1 rounded-xs px-3 py-2 text-xs',
                    s.estado === 'ocupado' && 'bg-surface-sunken text-ink-subtle',
                    s.estado === 'libre' &&
                      'border border-dashed border-border-strong/50 text-ink-subtle',
                    s.estado === 'nuevo' &&
                      'border border-accent/40 bg-accent-soft font-medium text-accent-text',
                    s.estado === 'movido' &&
                      'border border-dashed border-border-strong/50 text-ink-subtle line-through decoration-ink-subtle/60',
                  )}
                >
                  {s.etiqueta ?? (s.estado === 'ocupado' ? 'Ocupado' : 'Libre')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'cobro':
      return (
        <div className="rounded-sm border border-border">
          <div className="px-4 py-4">
            <p className="text-xs text-ink-muted">{pieza.concepto}</p>
            <p className="mt-1 font-display text-display-md text-ink">{pieza.monto}</p>
          </div>
          <p className="flex items-center justify-between border-t border-dashed border-border-strong/50 px-4 py-2.5 text-xs text-ink-muted">
            {pieza.detalle}
            <span className="font-medium text-success">Datos enviados</span>
          </p>
        </div>
      )

    case 'proceso':
      return (
        <div className="rounded-sm border border-border p-4">
          <p className={rotulo}>Lo que hizo el sistema</p>
          <ol className="mt-3">
            {pieza.pasos.map((paso, i) => (
              <li key={paso} data-check className="relative flex gap-3 pb-3 last:pb-0">
                {i < pieza.pasos.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[9px] top-5 w-px bg-success/40"
                  />
                )}
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-success text-surface">
                  <Check className="h-2.5 w-2.5" weight="bold" aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug text-ink">{paso}</span>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'ticket':
      return (
        <div className="rounded-sm border border-border">
          <ul className="divide-y divide-dashed divide-border px-4">
            {pieza.filas.map((f) => (
              <li key={f.producto} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="w-7 shrink-0 tabular-nums text-ink-subtle">{f.cantidad}×</span>
                <span className="flex-1 text-ink">{f.producto}</span>
                <span className="tabular-nums text-ink-muted">{f.monto}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-end justify-between border-t border-border-strong/50 px-4 py-3">
            <span className="text-xs text-ink-muted">{pieza.nota}</span>
            <span className="text-end">
              <span className="block text-[11px] text-ink-subtle">Total</span>
              <span className="font-display text-display-sm text-ink">{pieza.total}</span>
            </span>
          </div>
        </div>
      )

    case 'cambios':
      return (
        <div className="rounded-sm border border-border">
          <ul className="divide-y divide-border">
            {pieza.filas.map((f) => (
              <li key={f.etiqueta} data-nodo className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <span className="min-w-0 flex-1 truncate text-ink">{f.etiqueta}</span>
                <span className="tabular-nums text-ink-subtle line-through">{f.antes}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-subtle" aria-hidden="true" />
                <span className="tabular-nums font-medium text-ink">{f.despues}</span>
              </li>
            ))}
          </ul>
          {pieza.nota && (
            <p className="border-t border-dashed border-border px-4 py-2.5 text-xs text-ink-muted">
              {pieza.nota}
            </p>
          )}
        </div>
      )
  }
}
