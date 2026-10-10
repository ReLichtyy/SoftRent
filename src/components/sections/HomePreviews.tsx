import { useState, type ReactNode } from 'react'
import { Check, FilePdf, PaperPlaneTilt } from '@phosphor-icons/react'

/* Vistas de ejemplo de las funciones de la página principal: cada una es
 * una conversación corta, como la que tendría el cliente o el dueño. */

type Lado = 'cliente' | 'asistente'

function Chat({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <>
      <strong>{titulo}</strong>
      <div className="hb-chat">{children}</div>
    </>
  )
}

function Burbuja({ de, children }: { de: Lado; children: ReactNode }) {
  return <div className={`hb-bubble hb-${de}`}>{children}</div>
}

export function ReservaPreview() {
  return (
    <Chat titulo="Reserva por chat">
      <Burbuja de="cliente">Hola, ¿tienen espacio mañana en la mañana?</Burbuja>
      <Burbuja de="asistente">Sí: a las 9:00 o a las 10:30. ¿Cuál te reservo?</Burbuja>
      <Burbuja de="cliente">A las 10:30, por favor.</Burbuja>
      <Burbuja de="asistente">
        Listo, quedaste agendado mañana a las 10:30. Te escribo antes para recordártelo.
      </Burbuja>
    </Chat>
  )
}

export function ReprogramarPreview() {
  return (
    <Chat titulo="Cambio de cita">
      <Burbuja de="asistente">Hola Marco, te recordamos tu cita del miércoles a las 16:00.</Burbuja>
      <Burbuja de="cliente">Mañana no puedo, ¿hay otro día?</Burbuja>
      <Burbuja de="asistente">Tengo el jueves a las 16:00. ¿Te la cambio?</Burbuja>
      <Burbuja de="cliente">Sí, gracias.</Burbuja>
      <Burbuja de="asistente">Hecho. Quedó el jueves a las 16:00 y liberé el espacio anterior.</Burbuja>
    </Chat>
  )
}

const CLIENTES_SIN_VOLVER = [
  { nombre: 'Marco', semanas: 9 },
  { nombre: 'Sofía', semanas: 10 },
  { nombre: 'Elena', semanas: 12 },
]

export function ClientesPreview() {
  const [enviado, setEnviado] = useState(false)

  return (
    <Chat titulo="Clientes sin volver">
      <Burbuja de="cliente">¿Qué clientes llevan tiempo sin volver?</Burbuja>
      <Burbuja de="asistente">
        Estos llevan más de 8 semanas sin visita:
        <ul className="hb-bubble-list">
          {CLIENTES_SIN_VOLVER.map((c) => (
            <li key={c.nombre}>
              <span>{c.nombre}</span>
              <small>{c.semanas} semanas</small>
            </li>
          ))}
        </ul>
      </Burbuja>
      {enviado && (
        <>
          <Burbuja de="cliente">Escríbeles un recordatorio.</Burbuja>
          <Burbuja de="asistente">Listo, les escribí por WhatsApp a los 3.</Burbuja>
        </>
      )}
      <button
        type="button"
        className="hb-chat-action"
        data-sent={enviado}
        disabled={enviado}
        onClick={() => setEnviado(true)}
        aria-live="polite"
      >
        {enviado ? (
          <>
            <Check size={14} weight="bold" aria-hidden="true" />
            Recordatorio enviado
          </>
        ) : (
          <>
            <PaperPlaneTilt size={14} weight="fill" aria-hidden="true" />
            Enviar recordatorio a los 3
          </>
        )}
      </button>
    </Chat>
  )
}

export function PedidoPreview() {
  return (
    <Chat titulo="Pedido por WhatsApp">
      <Burbuja de="cliente">Quiero 2 leches, 1 arroz y 1 café para recoger a las 17:00.</Burbuja>
      <Burbuja de="asistente">
        Anotado:
        <ul className="hb-bubble-list">
          <li><span>Leche 1 L × 2</span><small>₡2.210</small></li>
          <li><span>Arroz 1 kg × 1</span><small>₡1.450</small></li>
          <li><span>Café 500 g × 1</span><small>₡3.190</small></li>
          <li className="hb-bubble-total"><span>Total</span><small>₡6.850</small></li>
        </ul>
        ¿Pagas con SINPE?
      </Burbuja>
      <Burbuja de="cliente">Sí.</Burbuja>
      <Burbuja de="asistente">Te envié los datos de SINPE. Tu pedido queda listo a las 17:00.</Burbuja>
    </Chat>
  )
}

export function ComprobantePreview() {
  return (
    <Chat titulo="Comprobante">
      <Burbuja de="asistente">Tu servicio quedó completado. Aquí está tu comprobante.</Burbuja>
      <Burbuja de="asistente">
        <span className="hb-chip">
          <FilePdf size={16} aria-hidden="true" />
          Comprobante · PDF
        </span>
      </Burbuja>
      <Burbuja de="asistente">Te lo envié también por correo y WhatsApp.</Burbuja>
      <Burbuja de="cliente">Recibido, gracias.</Burbuja>
    </Chat>
  )
}

const PASOS_CIERRE = [
  'Ventas del día sumadas',
  'Efectivo, tarjeta y SINPE separados',
  'Pagos cruzados con sus ventas',
]

export function CierrePreview() {
  return (
    <Chat titulo="Cierre del día">
      <Burbuja de="cliente">Cierra la caja de hoy y envíame el resumen.</Burbuja>
      <Burbuja de="asistente">
        Listo, esto hice:
        <ul className="hb-bubble-list hb-bubble-steps">
          {PASOS_CIERRE.map((paso) => (
            <li key={paso}>
              <Check size={13} weight="bold" aria-hidden="true" />
              {paso}
            </li>
          ))}
        </ul>
        Te mando el resumen por WhatsApp.
      </Burbuja>
    </Chat>
  )
}
