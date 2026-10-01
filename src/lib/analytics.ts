/*
 * Conector de eventos de analytics (secciones 3.4.10 y 3.5).
 * PostHog se integra en la Fase 8; mientras tanto los eventos
 * se acumulan en un buffer que facilita la depuración en
 * desarrollo sin acoplar la dependencia.
 */

export type EventoAnalytics = {
  evento: string
  datos?: Record<string, string | number | null>
  ts: number
}

const buffer: EventoAnalytics[] = []
const MAX_BUFFER = 100

/** Registra un evento del sitio o del chatbot. */
export function track(
  evento: string,
  datos?: Record<string, string | number | null>,
): void {
  buffer.push({ evento, datos, ts: Date.now() })
  if (buffer.length > MAX_BUFFER) buffer.shift()
}

/** Eventos registrados en esta sesión (depuración). */
export function eventosRegistrados(): EventoAnalytics[] {
  return [...buffer]
}
