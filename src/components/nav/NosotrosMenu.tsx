import { NavMegaLink, NavMegaMenu } from './NavMegaMenu'

/* Cada opción lleva a su sección en /nosotros (ids en la página). */
const opciones = [
  { id: 'quienes-somos', titulo: 'Quiénes somos' },
  { id: 'como-trabajamos', titulo: 'Cómo trabajamos' },
  { id: 'creador', titulo: 'Creador' },
]

/** "Nosotros" en la barra: menú a pantalla completa con tres
 * opciones repartidas a lo ancho, cada una hacia su sección en /nosotros. */
export function NosotrosMenu() {
  return (
    <NavMegaMenu to="/nosotros" label="Nosotros" titulo="Nosotros">
      {(close) => (
        <ul className="grid grid-cols-3 gap-x-6 pt-6 lg:gap-x-10">
          {opciones.map((o, i) => (
            <li key={o.id} className="border-t border-border">
              <NavMegaLink to={`/nosotros#${o.id}`} numero={i + 1} titulo={o.titulo} onClick={close} />
            </li>
          ))}
        </ul>
      )}
    </NavMegaMenu>
  )
}
