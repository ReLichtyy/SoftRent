import { ChatCircleText, Lightning } from '@phosphor-icons/react'

/** Flecha escena → artefacto con la etiqueta de cómo ocurre
 * ("Le preguntas", "Se lo pides" o "Pasa solo").
 * Horizontal en escritorio y vertical en móvil; los trazos llevan
 * [data-trazo] y pathLength=1 para que la escena los dibuje. */
export function FlechaSolucion({ etiqueta, solo = false }: { etiqueta: string; solo?: boolean }) {
  const Icono = solo ? Lightning : ChatCircleText
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center justify-center gap-2 text-accent"
    >
      <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text">
        <Icono className="h-3.5 w-3.5" weight={solo ? 'fill' : 'regular'} aria-hidden="true" />
        {etiqueta}
      </span>

      <svg
        viewBox="0 0 120 40"
        fill="none"
        className="hidden h-10 w-28 lg:block"
      >
        <path
          data-trazo
          pathLength={1}
          d="M2 20 C 40 4, 76 36, 112 20"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          data-trazo
          pathLength={1}
          d="M103 13 L113 20 L103 27"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg viewBox="0 0 40 64" fill="none" className="h-14 w-9 lg:hidden">
        <path
          data-trazo
          pathLength={1}
          d="M20 2 C 4 22, 36 38, 20 58"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          data-trazo
          pathLength={1}
          d="M13 50 L20 60 L27 50"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
