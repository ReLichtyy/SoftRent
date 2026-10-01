import type { PreguntaFrecuente } from './types'

/*
 * Preguntas frecuentes (sección 3.4.9 del Notion).
 * Esta es la única fuente: las mismas preguntas alimentan
 * la sección del sitio y el módulo core del chatbot.
 */

export const faq: PreguntaFrecuente[] = [
  {
    pregunta: '¿Hay prueba gratis?',
    respuesta:
      'No. En lugar de una prueba, puede recorrer las demos públicas y hablar con el asistente del sitio. Así ve el producto funcionando antes de decidir.',
  },
  {
    pregunta: '¿Quién configura todo?',
    respuesta:
      'Nosotros. SoftRent no es una app que usted instala y arma sola: conversamos, entendemos su negocio y lo dejamos funcionando.',
  },
  {
    pregunta: '¿Cuánto tarda la implementación?',
    respuesta:
      'Depende de su negocio, pero un sistema de citas o pedidos típico queda en vivo en días, no en meses. En la propuesta le confirmamos el tiempo exacto.',
  },
  {
    pregunta: '¿Puedo usar mi número de WhatsApp actual?',
    respuesta:
      'Sí. Se conecta su número con WhatsApp Business y sus clientes siguen escribiéndole al mismo número de siempre.',
  },
  {
    pregunta: '¿Los precios incluyen IVA?',
    respuesta:
      'No, los precios publicados no incluyen IVA. La implementación única se cobra aparte, según su negocio.',
  },
  {
    pregunta: '¿Qué pasa si cancelo?',
    respuesta:
      'Puede cancelar cuando quiera. Sus datos se conservan 30 días y se los entregamos exportados.',
  },
  {
    pregunta: '¿Con qué tipo de negocio trabajan?',
    respuesta:
      'Barberías y salones, veterinarias, estudios de tatuaje, consultorios, talleres y pequeños comercios que venden por WhatsApp en Costa Rica.',
  },
  {
    pregunta: '¿Mis datos y los de mis clientes están seguros?',
    respuesta:
      'Sí. Tratamos los datos bajo la Ley 8968 de protección de datos personales, con respaldos diarios y accesos por rol. Usted decide quién ve las conversaciones.',
  },
  {
    pregunta: '¿Puedo cambiar de plan después?',
    respuesta:
      'Sí, puede subir o bajar de plan en cualquier momento; el cambio se refleja en la próxima factura.',
  },
  {
    pregunta: '¿Qué pasa si el asistente no sabe responder?',
    respuesta:
      'Lo dice y le pasa el mensaje a una persona. Nunca inventa precios ni funciones que no estén en la información de su negocio.',
  },
]
