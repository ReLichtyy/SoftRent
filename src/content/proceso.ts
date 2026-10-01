/*
 * Proceso de trabajo (sección 3.4.5 del Notion).
 * Fuente única: la sección del sitio y el módulo core del chatbot
 * leen de aquí.
 */

export type PasoProceso = {
  id: string
  nombre: string
  /** Qué hace el cliente en este paso. */
  clienteHace: string
  /** Qué hace SoftRent en este paso. */
  softrentHace: string
  /** Duración estimada, en lenguaje claro. */
  duracion: string
}

export const proceso: PasoProceso[] = [
  {
    id: 'diagnostico',
    nombre: 'Diagnóstico',
    clienteHace: 'Nos cuenta cómo trabaja hoy: cómo agenda, cómo cobra, qué se le complica.',
    softrentHace: 'Escuchamos y armamos un brief claro de lo que su sistema necesita hacer.',
    duracion: 'Una conversación',
  },
  {
    id: 'propuesta',
    nombre: 'Propuesta',
    clienteHace: 'Recibe una propuesta con metas medibles y el tiempo exacto de entrega.',
    softrentHace: 'Definimos qué va a ganar su negocio y en cuánto tiempo, por escrito.',
    duracion: 'En 48 horas',
  },
  {
    id: 'implementacion',
    nombre: 'Implementación',
    clienteHace: 'Nos entrega sus servicios, horarios y número de WhatsApp.',
    softrentHace: 'Construimos su sistema con sus datos reales y lo dejamos listo.',
    duracion: 'En días',
  },
  {
    id: 'acompanamiento',
    nombre: 'Acompañamiento',
    clienteHace: 'Usa el sistema y nos dice qué ajustar.',
    softrentHace: 'Ajustamos con usted después del lanzamiento, mes a mes.',
    duracion: 'Continuo',
  },
]
