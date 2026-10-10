import type { CSSProperties } from 'react'
import { ArrowRight, Check, Lightning } from '@phosphor-icons/react'
import type {
  Solucion,
  SolucionIntercambio,
  SolucionPieza,
} from '../../content/types'
import { cn } from '../../lib/cn'

const canales = {
  whatsapp: 'WhatsApp',
  panel: 'Panel de SoftRent',
} as const

const estadosSlot = {
  ocupado: 'Ocupado',
  libre: 'Libre',
  nuevo: 'Nueva',
  movido: 'Liberado',
} as const

/** Pieza visual de un intercambio, con el lenguaje de las muestras del
 * main (listas con filete, estado verde, texto cálido). */
function Pieza({ pieza }: { pieza: SolucionPieza }) {
  switch (pieza.tipo) {
    case 'barras':
      return (
        <ul className="sol-bars">
          {pieza.filas.map((f) => (
            <li key={f.etiqueta} className={cn(f.destacado && 'is-top')}>
              <span>{f.etiqueta}</span>
              <span className="sol-bar" style={{ '--w': `${f.valor}%` } as CSSProperties} aria-hidden="true" />
              <small>{f.cifra ?? (f.destacado ? pieza.destacado : '')}</small>
            </li>
          ))}
        </ul>
      )
    case 'clientes':
      return (
        <>
          <ul className="hb-function-list">
            {pieza.filas.map((f) => (
              <li key={f.nombre}><span>{f.nombre}</span><small>{f.detalle}</small></li>
            ))}
          </ul>
          <p className="hb-preview-foot">Mensaje por WhatsApp: {pieza.estado.toLowerCase()}.</p>
        </>
      )
    case 'existencias':
      return (
        <>
          <ul className="hb-function-list">
            {pieza.filas.map((f) => (
              <li key={f.producto} className={cn(f.unidades < f.minimo && 'sol-low')}>
                <span>{f.producto}</span>
                <small>{f.unidades} de {f.minimo} mín.</small>
              </li>
            ))}
          </ul>
          {pieza.nota && (
            <p className="hb-preview-foot"><b>{pieza.nota.titulo}:</b> {pieza.nota.texto}</p>
          )}
        </>
      )
    case 'resumen':
      return (
        <dl className="sol-tiles">
          {pieza.filas.map((f) => (
            <div key={f.etiqueta}><dt>{f.etiqueta}</dt><dd>{f.valor}</dd></div>
          ))}
        </dl>
      )
    case 'conexiones':
      return (
        <>
          <p className="sol-origin">
            <span>{pieza.origen.titulo}<small>{pieza.origen.detalle}</small></span>
            <b>{pieza.origen.total}</b>
          </p>
          <ul className="hb-function-list">
            {pieza.nodos.map((n) => (
              <li key={n.nombre}>
                <span>{n.nombre}<small className="sol-sub">{n.filas.map((f) => `${f.etiqueta}: ${f.valor}`).join(' · ')}</small></span>
                <span className="hb-state">{n.estado}</span>
              </li>
            ))}
          </ul>
        </>
      )
    case 'agenda':
      return (
        <>
          <p className="sol-caption">{pieza.dia}</p>
          <ul className="hb-function-list">
            {pieza.slots.map((s) => (
              <li key={s.hora} className={`sol-slot is-${s.estado}`}>
                <span>{s.hora}</span>
                <small>{s.etiqueta ?? estadosSlot[s.estado]}</small>
              </li>
            ))}
          </ul>
        </>
      )
    case 'cobro':
      return (
        <dl className="hb-receipt-details">
          <div><dt>Concepto</dt><dd>{pieza.concepto}</dd></div>
          <div><dt>Monto</dt><dd>{pieza.monto}</dd></div>
          <div><dt>Pago</dt><dd>{pieza.detalle}</dd></div>
        </dl>
      )
    case 'proceso':
      return (
        <ol className="sol-steps">
          {pieza.pasos.map((p) => (
            <li key={p}><Check size={13} weight="bold" aria-hidden="true" />{p}</li>
          ))}
        </ol>
      )
    case 'ticket':
      return (
        <>
          <ul className="hb-function-list">
            {pieza.filas.map((f) => (
              <li key={f.producto}><span>{f.producto} × {f.cantidad}</span><span>{f.monto}</span></li>
            ))}
          </ul>
          <p className="hb-preview-foot">Total {pieza.total}{pieza.nota ? `. ${pieza.nota}` : ''}</p>
        </>
      )
    case 'cambios':
      return (
        <>
          <ul className="hb-function-list">
            {pieza.filas.map((f) => (
              <li key={f.etiqueta}>
                <span>{f.etiqueta}</span>
                <span className="sol-change">
                  <s>{f.antes}</s><ArrowRight size={12} aria-hidden="true" />{f.despues}
                </span>
              </li>
            ))}
          </ul>
          {pieza.nota && <p className="hb-preview-foot">{pieza.nota}</p>}
        </>
      )
    case 'bandeja':
      return (
        <>
          <ul className="hb-function-list">
            {pieza.filas.map((f) => (
              <li key={f.de}>
                <span>{f.de}<small className="sol-sub">{f.asunto}</small></span>
                <span className="sol-label">{f.etiqueta}</span>
              </li>
            ))}
          </ul>
          {pieza.nota && <p className="hb-preview-foot">{pieza.nota}</p>}
        </>
      )
    case 'linea':
      return (
        <ol className="sol-timeline">
          {pieza.filas.map((f) => (
            <li key={f.momento} className={cn(f.alerta && 'is-alert')}>
              <time>{f.momento}</time><span>{f.texto}</span>
            </li>
          ))}
        </ol>
      )
  }
}

/** Mensaje de entrada: la burbuja del cliente (rojo) o del dueño
 * (neutra), o una línea de evento si el proceso arranca solo. */
function Entrada({ item, intercambio }: { item: Solucion; intercambio: SolucionIntercambio }) {
  if (item.tipo === 'automatico') {
    return (
      <p className="sol-event">
        <Lightning size={13} weight="fill" aria-hidden="true" />
        {intercambio.pregunta}
      </p>
    )
  }
  return (
    <p className={cn('hb-message', item.area === 'clientes' ? 'hb-customer' : 'sol-owner')}>
      {intercambio.pregunta}
    </p>
  )
}

/** Muestra de una solución: la ventana donde ocurre, el mensaje o
 * evento que la dispara, lo que contesta la IA, la pieza de lo que
 * deja hecho y la acción final. */
export function MuestraSolucion({ item }: { item: Solucion }) {

  return (
    <figure className="hb-sample hb-function-preview sol-sample">
      <figcaption className="hb-function-preview-top">
        <strong>{item.titulo}</strong>
        <span>{canales[item.canal]}</span>
      </figcaption>
      {item.conversacion.map((intercambio) => (
        <div key={intercambio.pregunta} className="sol-exchange">
          <Entrada item={item} intercambio={intercambio} />
          <p className="hb-message">{intercambio.contestacion}</p>
          {intercambio.pieza && <Pieza pieza={intercambio.pieza} />}
        </div>
      ))}
      <div className="hb-function-result">
        <span>{item.accion}</span>
        <span className="hb-state">Hecho</span>
      </div>
    </figure>
  )
}
