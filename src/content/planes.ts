import type { Plan, PlanId } from './types'

/*
 * Planes y reglas comerciales (sección 1.4 del Notion).
 * Los precios son una hipótesis para validar con los primeros clientes.
 * Precios en colones, IVA aparte.
 */

export const planes: Plan[] = [
  {
    id: 'arranque',
    nombre: 'Arranque',
    precioMensual: 29900,
    paraQuien: 'Negocio de 1 a 3 personas que solo quiere dejar de perder mensajes.',
    incluye: [
      'Chatbot de WhatsApp o web',
      'Registro básico de clientes',
      '1 automatización incluida',
      'Hasta 500 conversaciones con IA al mes',
      'Soporte por chat',
    ],
    cta: 'Comenzar',
    ctaRuta: '/comenzar?plan=arranque',
  },
  {
    id: 'crecimiento',
    nombre: 'Crecimiento',
    precioMensual: 64900,
    destacado: true,
    paraQuien: 'El plan recomendado para la mayoría de pymes de servicios.',
    incluye: [
      'Todo lo de Arranque',
      'Agenda con citas y recordatorios',
      'Cobros con recordatorio de SINPE',
      '3 automatizaciones incluidas',
      'Hasta 1.500 conversaciones con IA al mes',
      'Resumen semanal del negocio',
    ],
    cta: 'Comenzar',
    ctaRuta: '/comenzar?plan=crecimiento',
  },
  {
    id: 'pro',
    nombre: 'Pro',
    precioMensual: 129900,
    paraQuien: 'Negocios con varias sucursales o mucho volumen de clientes.',
    incluye: [
      'Todo lo de Crecimiento',
      'Facturación electrónica integrada',
      'Panel de impacto con sus números',
      '6 automatizaciones incluidas',
      'Hasta 4.000 conversaciones con IA al mes',
      'Soporte prioritario y ajustes mensuales',
    ],
    cta: 'Comenzar',
    ctaRuta: '/comenzar?plan=pro',
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
