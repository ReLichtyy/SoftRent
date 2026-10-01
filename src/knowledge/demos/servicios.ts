import type { SubmoduloDemo } from '../types'

export const submoduloServicios: SubmoduloDemo = {
  id: 'servicios',
  descripcion:
    'Información de SoftRent Servicios: visitas de talleres y técnicos, con cotización y comprobante al cierre.',
  preguntasFrecuentes: [
    {
      pregunta: '¿Cómo funciona la cotización por enlace?',
      respuesta:
        'El asistente arma la cotización desde la conversación y se la envía al cliente por enlace; el cliente la aprueba y la visita queda agendada.',
    },
    {
      pregunta: '¿El comprobante sale solo?',
      respuesta:
        'Sí. Al cerrar la visita el comprobante queda generado, listo para enviar al cliente y para su resumen de fin de mes.',
    },
    {
      pregunta: '¿Puedo tener varios técnicos con su agenda?',
      respuesta:
        'Sí, cada visita lleva su responsable, y usted ve en una sola ventana qué le toca a cada técnico.',
    },
  ],
  noHace: [
    'Facturación electrónica dentro de la demo',
    'Aprobar cotizaciones por encima del monto que usted definió',
  ],
}
