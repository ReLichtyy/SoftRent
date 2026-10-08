import type { Demo } from './types'

/*
 * Catálogo de demos (secciones 1.3 y 3.4.4 del Notion).
 * Regla: agregar una demo nueva = una entrada aquí
 * + un archivo en src/knowledge/demos/, sin tocar componentes.
 */

export const demos: Demo[] = [
  {
    id: 'citas',
    nombre: 'SoftRent Citas',
    industria: 'Barberías, salones, veterinarias, tatuajes y consultorios',
    estado: 'publicada',
    demoUrl: 'https://reservas.softrent.dev/',
    captura: '/ReservasImages/37_dashboard_dueno_agenda_diaria.png',
    recorrido: [
      'Reserve una cita como si fuera cliente',
      'Búsquela en la agenda del negocio',
      'Pregúntele al asistente por los horarios',
    ],
    resumen:
      'Sus clientes agendan solos, según los cupos reales, y reciben el recordatorio automático.',
    impacto: 'Agenda llena sin perder la mañana contestando mensajes de uno en uno.',
    resuelve: [
      'Pierdo citas por no contestar a tiempo',
      'La agenda vive en un cuaderno o en la cabeza de alguien',
    ],
    funciones: [
      'Agenda en línea y por WhatsApp',
      'Recordatorios automáticos 24 horas y 2 horas antes',
      'Confirmación de citas en una sola ventana',
    ],
    iaIncluida: [
      'Responde preguntas frecuentes del negocio a cualquier hora',
      'Agenda dentro del horario realmente disponible',
    ],
    planRecomendado: 'crecimiento',
    cta: '/comenzar?demo=citas',
  },
  {
    id: 'pedidos',
    nombre: 'SoftRent Pedidos',
    industria: 'Comercios pequeños que venden por WhatsApp',
    estado: 'proximamente',
    demoUrl: null,
    resumen:
      'Cada pedido que llega por WhatsApp queda registrado, confirmado y cobrado sin anotar a mano.',
    impacto: 'Cero pedidos perdidos entre los chats y menos cobros olvidados.',
    resuelve: [
      'Los pedidos se pierden entre chats de WhatsApp',
      'Olvida cobrar o anotar lo que ya entregó',
    ],
    funciones: [
      'Pedido por WhatsApp con confirmación automática',
      'Aviso de cobro con las instrucciones de SINPE',
      'Historial de pedidos por cliente',
    ],
    iaIncluida: [
      'Toma el pedido conversando con el cliente',
      'Lee el comprobante de SINPE y lo deja listo para revisar',
    ],
    planRecomendado: 'crecimiento',
    cta: '/comenzar?demo=pedidos',
  },
  {
    id: 'servicios',
    nombre: 'SoftRent Servicios',
    industria: 'Talleres y técnicos a domicilio',
    estado: 'proximamente',
    demoUrl: null,
    resumen:
      'Cada visita queda con su fecha, su técnico y su comprobante, del registro al cierre.',
    impacto: 'Cada visita se cobra y se cierra el mismo día, sin perseguir papeles.',
    resuelve: [
      'Las facturas salen tarde o no salen',
      'Nadie sabe qué visita queda pendiente',
    ],
    funciones: [
      'Visitas con fecha, responsable y estado',
      'Cotización aprobada por enlace',
      'Comprobante al cierre de cada visita',
    ],
    iaIncluida: [
      'Arma la cotización desde la conversación',
      'Resume la semana en lenguaje claro',
    ],
    planRecomendado: 'pro',
    cta: '/comenzar?demo=servicios',
  },
]

export function demoPorId(id: string): Demo | undefined {
  return demos.find((d) => d.id === id)
}
