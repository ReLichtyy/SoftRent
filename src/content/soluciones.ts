import type { Solucion } from './types'

/*
 * Soluciones por dolor (secciones 1.3 y 3.4.3 del Notion).
 * Cada tarjeta abre con la frase de dolor del cliente;
 * nunca menciona herramientas técnicas.
 */

export const soluciones: Solucion[] = [
  {
    id: 'mensajes-sin-respuesta',
    dolor: 'Llegan mensajes a las 10 p. m. y nadie contesta.',
    respuesta:
      'Su asistente responde a cualquier hora, toma los datos del cliente y agenda por usted.',
    beneficio: 'Primera respuesta en menos de 1 minuto',
    demo: 'citas',
  },
  {
    id: 'agenda-en-cuaderno',
    dolor: 'La agenda vive en un cuaderno o en la cabeza de alguien.',
    respuesta:
      'Sus clientes agendan solos según los cupos reales, desde WhatsApp o desde su página.',
    beneficio: 'Un solo calendario para todo el negocio',
    demo: 'citas',
  },
  {
    id: 'citas-perdidas',
    dolor: 'Olvida recordar las citas y los clientes no aparecen.',
    respuesta:
      'Recordatorios automáticos 24 horas y 2 horas antes de cada cita, por WhatsApp.',
    beneficio: 'Menos citas perdidas cada semana',
    demo: 'citas',
  },
  {
    id: 'pedidos-sueltos',
    dolor: 'Los pedidos por WhatsApp se pierden entre chats.',
    respuesta:
      'Cada pedido queda registrado con su confirmación y su cobro, sin anotar a mano.',
    beneficio: 'Ningún pedido se queda suelto',
    demo: 'pedidos',
  },
  {
    id: 'facturas-tardias',
    dolor: 'Las facturas salen tarde o no salen.',
    respuesta:
      'Cada visita o venta genera su comprobante, y al cierre del mes ya está el resumen listo.',
    beneficio: 'Horas menos de trabajo administrativo',
    demo: 'servicios',
  },
  {
    id: 'decisiones-a-ciegas',
    dolor: 'No sabe qué servicios dejan más ganancia.',
    respuesta:
      'El resumen semanal le muestra qué llena la agenda y qué conviene más, con sus propios datos.',
    beneficio: 'Decisiones con sus propios números',
    demo: 'servicios',
  },
]
