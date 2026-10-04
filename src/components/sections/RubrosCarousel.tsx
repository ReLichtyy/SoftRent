import {
  Barbell,
  Car,
  ForkKnife,
  PawPrint,
  PenNib,
  Scissors,
  ShoppingCart,
  Storefront,
  Tooth,
} from '@phosphor-icons/react'
import { MarqueeRow } from '../motion/MarqueeRow'

/* Carrusel de tipos de negocio: íconos y nombre, nunca logos de
 * marcas reales ni clientes inventados. */
const rubros = [
  { icono: ShoppingCart, nombre: 'Supermercados' },
  { icono: Scissors, nombre: 'Barberías' },
  { icono: PawPrint, nombre: 'Veterinarias' },
  { icono: PenNib, nombre: 'Estudios de tatuajes' },
  { icono: Storefront, nombre: 'Comercios' },
  { icono: Tooth, nombre: 'Clínicas' },
  { icono: ForkKnife, nombre: 'Restaurantes' },
  { icono: Car, nombre: 'Talleres' },
  { icono: Barbell, nombre: 'Gimnasios' },
]

function RubroTile({ icono: Icono, nombre }: (typeof rubros)[number]) {
  return (
    <div className="flex w-[200px] shrink-0 items-center gap-3 rounded-md border border-border bg-surface px-4 py-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-surface-sunken text-ink">
        <Icono className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-ink">{nombre}</span>
    </div>
  )
}

/** Franja entre el hero y la segunda sección: los negocios donde se
 * usa SoftRent, en marquesina infinita. */
export default function RubrosCarousel() {
  return (
    <section
      aria-label="Negocios que usan SoftRent"
      className="overflow-hidden border-b border-border py-10 sm:py-12"
    >
      <p className="mb-6 text-center text-sm text-ink-muted">
        Pensado para negocios como el suyo
      </p>
      <MarqueeRow duration={36}>
        {rubros.map((r) => (
          <RubroTile key={r.nombre} {...r} />
        ))}
      </MarqueeRow>
    </section>
  )
}
