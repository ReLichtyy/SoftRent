import type { DemoId } from '../content/types'

/*
 * Tipos de los módulos de conocimiento del chatbot (sección 3.5).
 * El módulo core siempre está cargado; máximo un submódulo de demo
 * activo a la vez. Los precios siempre vienen de content/planes;
 * la IA nunca los genera.
 */

export type PreguntaRespuesta = {
  pregunta: string
  respuesta: string
}

export type ModuloCore = {
  id: 'softrent'
  nombre: string
  queEs: string
  /** Proceso comercial, paso a paso. */
  proceso: { paso: string; detalle: string }[]
  contacto: { correo: string }
  /** Límites explícitos: lo que el asistente nunca hace. */
  noHace: string[]
}

export type SubmoduloDemo = {
  id: DemoId
  /** Presentación del submódulo dentro del chat. */
  descripcion: string
  /** Preguntas frecuentes específicas de esta demo. */
  preguntasFrecuentes: PreguntaRespuesta[]
  /** Límites explícitos para evitar promesas falsas. */
  noHace: string[]
}
