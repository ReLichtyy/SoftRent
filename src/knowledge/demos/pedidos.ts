import type { SubmoduloDemo } from '../types'

export const submoduloPedidos: SubmoduloDemo = {
  id: 'pedidos',
  descripcion:
    'Información de SoftRent Pedidos: registro, confirmación y cobro de pedidos que llegan por WhatsApp.',
  preguntasFrecuentes: [
    {
      pregunta: '¿Cómo queda registrado un pedido?',
      respuesta:
        'El cliente escribe su pedido por WhatsApp y el sistema lo registra con los productos, la confirmación y el cobro, sin anotar a mano.',
    },
    {
      pregunta: '¿Y si el cliente paga por SINPE?',
      respuesta:
        'El asistente lee el comprobante de SINPE y lo deja listo para que usted lo revise y lo apruebe con un toque.',
    },
    {
      pregunta: '¿Puedo ver el historial de un cliente?',
      respuesta:
        'Sí, cada cliente tiene su historial de pedidos, con montos y fechas, en una sola ventana.',
    },
  ],
  noHace: [
    'Confirmar pagos sin revisión de una persona',
    'Enviar promociones masivas sin consentimiento del cliente',
  ],
}
