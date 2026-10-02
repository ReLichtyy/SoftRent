import type { ReactNode } from 'react'
import { MarqueeRow } from '../motion/MarqueeRow'
import { useScrollReveal } from '../../lib/useScrollReveal'

/* Escenarios de las demos (citas, pedidos y servicios): no son
 * clientes reales; el pie de la sección lo deja claro. Cada card
 * imita lo que el dueño abre en su celular a cualquier hora. */
type Resultado = {
  negocio: string
  /** La parte en negrita es el dato que vende; lo demás, contexto. */
  dato: ReactNode
  actualizado: string
  /** Llenado del anillo (porcentaje de la agenda del día). */
  avance: number
}

const filaA: Resultado[] = [
  {
    negocio: 'Barbería Don Luis',
    dato: (
      <>
        <strong>3 citas agendadas anoche</strong>, mientras usted dormía.
      </>
    ),
    actualizado: 'Ayer',
    avance: 68,
  },
  {
    negocio: 'Estética Ana',
    dato: (
      <>
        La agenda de marzo <strong>se llenó sola</strong> desde WhatsApp.
      </>
    ),
    actualizado: 'Hoy',
    avance: 92,
  },
  {
    negocio: 'Veterinaria Sur',
    dato: (
      <>
        <strong>2 recordatorios enviados</strong> y ninguna falta hoy.
      </>
    ),
    actualizado: 'Hoy',
    avance: 74,
  },
]

const filaB: Resultado[] = [
  {
    negocio: 'Taquería El Farol',
    dato: (
      <>
        Pedido confirmado y cobrado por SINPE:{' '}
        <strong>₡12.500 sin llamar</strong>.
      </>
    ),
    actualizado: 'Ayer',
    avance: 81,
  },
  {
    negocio: 'Taller Muñoz',
    dato: (
      <>
        Factura electrónica <strong>enviada al cierre</strong> de la visita.
      </>
    ),
    actualizado: 'Hoy',
    avance: 63,
  },
  {
    negocio: 'Clínica Dental Santa Ana',
    dato: (
      <>
        <strong>Abono de ₡25.000 recibido</strong> antes de la cita.
      </>
    ),
    actualizado: 'Viernes',
    avance: 88,
  },
]

/* Anillo de avance (SVG): radio 9 → circunferencia ≈ 56.5. */
const CIRCUNFERENCIA = 2 * Math.PI * 9

function AnilloAvance({ avance }: { avance: number }) {
  const desplazado = CIRCUNFERENCIA * (1 - avance / 100)
  return (
    <span
      className="relative flex h-11 w-11 shrink-0 items-center justify-center"
      title={`Agenda de hoy: ${avance}%`}
    >
      <svg viewBox="0 0 22 22" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="11"
          cy="11"
          r="9"
          fill="none"
          strokeWidth="2"
          className="stroke-border"
        />
        <circle
          cx="11"
          cy="11"
          r="9"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUNFERENCIA}
          strokeDashoffset={desplazado}
          className="stroke-accent"
        />
      </svg>
      <span className="text-[10px] font-semibold">{avance}%</span>
    </span>
  )
}

function ResultadoCard({ resultado }: { resultado: Resultado }) {
  return (
    <div className="w-[280px] shrink-0 rounded-md border border-border bg-surface p-4 shadow-xs">
      <p className="text-sm font-semibold">{resultado.negocio}</p>
      <p className="mt-2 min-h-10 text-sm leading-relaxed text-ink-muted">
        {resultado.dato}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3">
        <p className="text-xs text-ink-subtle">
          Actualizado • {resultado.actualizado}
        </p>
        <AnilloAvance avance={resultado.avance} />
      </div>
    </div>
  )
}

/** Marquesina del inicio (estilo "producto en vivo"): dos filas en
 * sentidos opuestos con cards de resultado, directamente bajo el
 * hero. El pie aclara que son escenarios de las demos. */
export default function MarqueeCards() {
  const scope = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={scope}
      aria-label="Así se ve su negocio con SoftRent"
      className="overflow-hidden py-16 sm:py-20"
    >
      <div className="space-y-4">
        <MarqueeRow duration={38}>
          {filaA.map((resultado) => (
            <ResultadoCard key={resultado.negocio} resultado={resultado} />
          ))}
        </MarqueeRow>
        <MarqueeRow direction="reverse" duration={44}>
          {filaB.map((resultado) => (
            <ResultadoCard key={resultado.negocio} resultado={resultado} />
          ))}
        </MarqueeRow>
      </div>

      <p className="mt-6 text-center text-xs text-ink-subtle">
        Escenarios de las demos: así se ve su negocio, con su propia cara.
      </p>
    </section>
  )
}
