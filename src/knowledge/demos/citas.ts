import type { SubmoduloDemo } from '../types'

export const submoduloCitas: SubmoduloDemo = {
  id: 'citas',
  descripcion:
    'Información de SoftRent Citas: agenda en línea, recordatorios y confirmaciones para salones, veterinarias, tatuajes y consultorios.',
  preguntasFrecuentes: [
    {
      pregunta: '¿Puedo usar mi número de WhatsApp actual?',
      respuesta:
        'Sí. Se conecta su número con WhatsApp Business y sus clientes siguen escribiéndole al mismo número de siempre.',
    },
    {
      pregunta: '¿Qué pasa si dos clientes quieren el mismo cupo?',
      respuesta:
        'No pasa: la agenda solo muestra los cupos realmente disponibles, así nadie puede agendar dos veces el mismo espacio.',
    },
    {
      pregunta: '¿Los recordatorios salen solos?',
      respuesta:
        'Sí. Cada cita confirmada recibe su recordatorio 24 horas antes y 2 horas antes, sin que usted toque nada.',
    },
    {
      pregunta: '¿Puedo ver la agenda desde el celular?',
      respuesta:
        'Sí, todo el sistema se revisa desde el celular: la agenda del día, las confirmaciones y lo que necesita su atención.',
    },
  ],
  noHace: [
    'Cobros con tarjeta dentro de la demo',
    'Cambiar citas ya confirmadas sin que una persona lo apruebe',
  ],
}
