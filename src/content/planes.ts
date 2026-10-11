import type { Plan, PlanId } from './types'

/*
 * Planes y reglas comerciales (sección 1.4 del Notion).
 * Los precios son una hipótesis para validar con los primeros clientes.
 * Precios fijos en CRC y USD; el primer plan convierte su base USD a CRC.
 */

export const planes: Plan[] = [
  {
    id: 'arranque', nombre: '1 servicio', servicios: 1,
    precioMensual: null, precioUsd: 78,
    paraQuien: 'Una sola cosa, bien resuelta.',
    incluye: ['Elija 1: Web + Chatbot, reservas, cobros o facturación', 'Hasta 500 conversaciones con IA al mes', '1 automatización incluida', 'Soporte por chat'],
    cta: 'Comenzar con 1 servicio', ctaRuta: '/comenzar?plan=arranque',
  },
  {
    id: 'crecimiento', nombre: '2 servicios', servicios: 2,
    precioMensual: 64900, precioUsd: 129, destacado: true,
    paraQuien: 'El punto medio de la mayoría de negocios.',
    incluye: ['Elija 2 de los 4 servicios', 'Hasta 1.500 conversaciones con IA al mes', '3 automatizaciones incluidas', 'Resumen semanal del negocio'],
    cta: 'Comenzar con 2 servicios', ctaRuta: '/comenzar?plan=crecimiento',
  },
  {
    id: 'pro', nombre: '3 servicios', servicios: 3,
    precioMensual: 129900, precioUsd: 259,
    paraQuien: 'Para negocios con mucho movimiento.',
    incluye: ['Elija 3 de los 4 servicios', 'Hasta 4.000 conversaciones con IA al mes', '6 automatizaciones incluidas', 'Soporte prioritario y ajustes mensuales'],
    cta: 'Comenzar con 3 servicios', ctaRuta: '/comenzar?plan=pro',
  },
  {
    id: 'medida',
    nombre: 'A la medida',
    precioMensual: 250000,
    desde: true,
    paraQuien: 'Procesos que no caben en una plantilla.',
    incluye: [
      'Integraciones especiales',
      'Varios departamentos en un mismo sistema',
      'Asistente adaptado a su negocio',
      'Acompañamiento dedicado',
    ],
    cta: 'Conversar con nosotros',
    ctaRuta: '/comenzar?plan=medida',
  },
]

export function planPorId(id: PlanId | string): Plan | undefined {
  return planes.find((p) => p.id === id)
}

/** Reglas comerciales de la sección 1.4 del Notion. */
export const reglas = {
  iva: 'Los precios no incluyen IVA.',
  implementacionUnica:
    'La implementación se paga una sola vez: de ₡90.000 a ₡350.000 según su negocio, y se puede prorratear en 3 meses.',
  anual: 'Pago anual: 2 meses gratis en todos los planes.',
  cancelacion: 'Puede cancelar cuando quiera; sus datos se pueden exportar.',
  addOns: [
    'Automatización adicional',
    'Número de WhatsApp adicional',
    'Usuario adicional',
  ],
} as const

/** Precio mensual equivalente pagando anual (2 meses gratis). */
export function precioAnualMensual(plan: Plan): number | null {
  return plan.precioMensual === null
    ? null
    : Math.round((plan.precioMensual * 10) / 12)
}
