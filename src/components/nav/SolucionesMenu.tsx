import { numeroCategoria, soluciones, solucionesPorArea } from '../../content/soluciones'
import { NavMegaLink, NavMegaMenu } from './NavMegaMenu'

/** "Soluciones" en la barra: aviso que parpadea y menú a pantalla
 * completa con las tres áreas repartidas en columnas. Bajo cada una,
 * sus categorías en vertical (máximo tres), cada una hacia su ruta
 * /soluciones/<categoría>. */
export function SolucionesMenu() {
  return (
    <NavMegaMenu
      to="/soluciones"
      label="Soluciones"
      titulo="Soluciones por categoría"
      aviso
      avisoTexto={`${soluciones.length} soluciones`}
      pie="Ver todas las soluciones"
    >
      {(close) => (
        <div className="grid grid-cols-3 gap-x-6 pt-6 lg:gap-x-10">
          {solucionesPorArea.map((area) => (
            <section key={area.area} aria-label={area.titulo}>
              <h3 className="border-b border-border pb-3 text-sm text-ink-muted">{area.titulo}</h3>
              <ul>
                {area.categorias.map((c) => (
                  <li key={c.id}>
                    <NavMegaLink
                      to={`/soluciones/${c.id}`}
                      numero={numeroCategoria.get(c.id) ?? 0}
                      titulo={c.titulo}
                      onClick={close}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </NavMegaMenu>
  )
}
