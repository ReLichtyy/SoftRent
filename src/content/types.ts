/*
 * Tipos de la capa de contenido (sección 3.2 del Notion).
 * El contenido es la fuente única de datos del sitio y del chatbot:
 * los componentes leen de aquí; nunca al revés.
 */

export type PlanId = 'arranque' | 'crecimiento' | 'pro' | 'medida'

export type DemoId = 'citas' | 'pedidos' | 'servicios'

/** Estado de una demo: publicada o próximamente. */
export type DemoEstado = 'publicada' | 'proximamente'

export type Demo = {
  id: DemoId
  /** Nombre comercial del paquete, p. ej. "SoftRent Citas". */
  nombre: string
  /** Industria principal que atiende. */
  industria: string
  estado: DemoEstado
  /** URL del subdominio; null mientras la demo no esté publicada. */
  demoUrl: string | null
  /** Resumen de una línea para tarjetas y galerías. */
  resumen: string
  /** Micro-descripción de impacto: el beneficio medible, en una línea. */
  impacto: string
  /** Dolores del cliente, en su propio lenguaje (patrón painLine). */
  resuelve: string[]
  /** Funciones del sistema (3 a 5, sin jerga técnica). */
  funciones: string[]
  /** Qué hace la IA incluida en ese sistema. */
  iaIncluida: string[]
  planRecomendado: PlanId
  /** Ruta del CTA con la demo preseleccionada. */
  cta: string
}

export type Solucion = {
  id: string
  /** Frase de dolor del cliente, tal como la diría. */
  dolor: string
  /** Qué hace SoftRent, en una oración. */
  respuesta: string
  /** Beneficio medible: horas, colones o minutos. */
  beneficio: string
  /** Demo relacionada. */
  demo: DemoId
}

export type Plan = {
  id: PlanId
  nombre: string
  /** Precio mensual en colones, IVA aparte. Null para "desde". */
  precioMensual: number | null
  /** true cuando el precio es un "desde ...". */
  desde?: boolean
  /** Para quién es este plan. */
  paraQuien: string
  /** Qué incluye, en lenguaje de resultado. */
  incluye: string[]
  /** true en el plan recomendado. */
  destacado?: boolean
  /** Texto del botón de la tarjeta. */
  cta: string
  /** Ruta del CTA con el plan preseleccionado. */
  ctaRuta: string
}

export type PreguntaFrecuente = {
  pregunta: string
  respuesta: string
}
