import { core, submodulos } from '../../knowledge'
import { demoPorId } from '../../content/demos'
import { planes } from '../../content/planes'
import { faq } from '../../content/faq'
import { proceso } from '../../content/proceso'
import { colones } from '../format'
import type { DemoId } from '../../content/types'

/*
 * Enrutador del chatbot (sección 3.5 del Notion).
 * Reglas: el módulo core siempre está cargado; máximo un
 * submódulo de demo activo; los precios salen siempre de
 * content/planes; si no sabe, lo dice y ofrece una persona.
 * Nunca inventa funciones ni promesas.
 */

export type AccionChat =
  | { tipo: 'quickReplies'; opciones: string[] }
  | { tipo: 'sugerirModulo'; demo: DemoId }
  | { tipo: 'ofrecerLead' }
  | { tipo: 'handoff' }

export type RespuestaChat = {
  texto: string
  acciones: AccionChat[]
}

/** Palabras clave que delatan la industria de cada demo. */
const clavesModulo: Record<DemoId, string[]> = {
  citas: ['cita', 'citas', 'reserva', 'reservas', 'agenda', 'barber', 'salón', 'salon', 'veterinaria', 'tatuaje', 'consultorio', 'corte'],
  pedidos: ['pedido', 'pedidos', 'soda', 'comercio', 'tienda', 'vendo por whatsapp', 'reparto'],
  servicios: ['servicio', 'servicios', 'taller', 'técnico', 'tecnico', 'visita', 'cotización', 'cotizacion', 'reparación', 'reparacion'],
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function mencionoModulo(texto: string): DemoId | null {
  const t = normalizar(texto)
  for (const [demo, claves] of Object.entries(clavesModulo)) {
    if (claves.some((clave) => t.includes(clave))) return demo as DemoId
  }
  return null
}

function resumenPlanes(): string {
  return planes
    .map((plan) => {
      const precio =
        plan.precioMensual === null
          ? 'a cotizar'
          : (plan.desde ? 'desde ' : '') + colones(plan.precioMensual)
      return `${plan.nombre}: ${precio} al mes`
    })
    .join('. ')
}

function faqParecida(texto: string): string | null {
  const t = normalizar(texto)
  let mejor: { puntaje: number; respuesta: string } | null = null
  for (const item of faq) {
    const palabras = normalizar(item.pregunta)
      .split(/\W+/)
      .filter((p) => p.length > 3)
    const puntaje = palabras.filter((p) => t.includes(p)).length
    if (puntaje >= 2 && (!mejor || puntaje > mejor.puntaje)) {
      mejor = { puntaje, respuesta: item.respuesta }
    }
  }
  return mejor?.respuesta ?? null
}

/** Reglas del módulo core siempre cargado. */
function reglasCore(texto: string): RespuestaChat | null {
  const t = normalizar(texto)

  if (/(precio|cuesta|cuanto cuesta|plan|planes|tarifa|mensual)/.test(t)) {
    return {
      texto: `Nuestros planes: ${resumenPlanes()}. El precio no incluye IVA y la implementación se cobra una sola vez, según su negocio. ¿Quiere que le preparemos una propuesta?`,
      acciones: [
        { tipo: 'ofrecerLead' },
        { tipo: 'quickReplies', opciones: ['¿Cómo funciona?', 'Hablar con alguien'] },
      ],
    }
  }

  if (/(prueba gratis|gratis|prob|demo)/.test(t)) {
    return {
      texto: 'No tenemos prueba gratis, y le cuento por qué: cada sistema se construye con sus servicios y su horario. En cambio puede recorrer la demo de Citas en vivo, o preguntarme lo que quiera aquí.',
      acciones: [
        { tipo: 'quickReplies', opciones: ['Ver demos', '¿Cuánto cuesta?'] },
      ],
    }
  }

  if (/(como funciona|proceso|implementacion|cuanto tarda|cuanto tiempo|pasos)/.test(t)) {
    const linea = proceso
      .map((paso) => `${paso.nombre}: ${paso.softrentHace}`)
      .join(' ')
    return {
      texto: `Así trabajamos: ${linea} ¿Le gustaría que arrancáramos con el diagnóstico?`,
      acciones: [
        { tipo: 'ofrecerLead' },
        { tipo: 'quickReplies', opciones: ['¿Cuánto cuesta?', 'Hablar con alguien'] },
      ],
    }
  }

  if (/(humano|persona|alguien de carne|hablar con ustedes|agente real|asesor)/.test(t)) {
    return {
      texto: 'Con gusto le atiende una persona. Puede escribirnos a hola@softrent.com y le respondemos en menos de un día hábil. Si prefiere, déjeme sus datos y le escribimos nosotros.',
      acciones: [{ tipo: 'handoff' }],
    }
  }

  if (/(contacto|correo|email|telefono|whatsapp de ustedes)/.test(t)) {
    return {
      texto: `Puede escribirnos a ${core.contacto.correo}. Le respondemos en menos de un día hábil.`,
      acciones: [{ tipo: 'quickReplies', opciones: ['¿Cómo funciona?', 'Ver demos'] }],
    }
  }

  if (/(que es softrent|que hacen|quienes son|que es esto)/.test(t)) {
    return { texto: core.queEs, acciones: [{ tipo: 'quickReplies', opciones: ['¿Cuánto cuesta?', 'Ver demos'] }] }
  }

  const faqRespuesta = faqParecida(texto)
  if (faqRespuesta) {
    return {
      texto: faqRespuesta,
      acciones: [{ tipo: 'quickReplies', opciones: ['¿Cuánto cuesta?', 'Hablar con alguien'] }],
    }
  }

  return null
}

/** Preguntas frecuentes del submódulo activo. */
function reglasSubmodulo(texto: string, modulo: DemoId): RespuestaChat | null {
  const submodulo = submodulos[modulo]
  const t = normalizar(texto)

  for (const item of submodulo.preguntasFrecuentes) {
    const palabras = normalizar(item.pregunta)
      .split(/\W+/)
      .filter((p) => p.length > 3)
    const puntaje = palabras.filter((p) => t.includes(p)).length
    if (puntaje >= 2) return { texto: item.respuesta, acciones: [] }
  }

  if (submodulo.noHace.some((limite) => t.includes(normalizar(limite).split(' ')[0]))) {
    return {
      texto: 'Eso se lo tiene que confirmar una persona del negocio; prefiero no prometer algo que no controlo. ¿Le paso sus datos a alguien de SoftRent?',
      acciones: [{ tipo: 'handoff' }],
    }
  }

  return null
}

/**
 * Responde un mensaje del visitante según el submódulo activo
 * (o null al arrancar). Nunca lanza; siempre devuelve respuesta.
 */
export function responder(
  texto: string,
  moduloActivo: DemoId | null,
  mensajesEnviados: number,
): RespuestaChat {
  const mencion = mencionoModulo(texto)

  // Cambio de módulo propuesto, nunca forzado (regla 3).
  if (mencion && mencion !== moduloActivo) {
    const demo = demoPorId(mencion)
    if (demo) {
      const nombre = demo.nombre.replace('SoftRent ', '')
      return {
        texto: `Eso suena a ${nombre}. ¿Quiere que le cuente de esa demo?`,
        acciones: [
          { tipo: 'sugerirModulo', demo: mencion },
          { tipo: 'quickReplies', opciones: ['Sí, cuénteme', 'No, gracias'] },
        ],
      }
    }
  }

  const porSubmodulo = moduloActivo
    ? reglasSubmodulo(texto, moduloActivo)
    : null
  const porCore = reglasCore(texto)

  const respuesta = porSubmodulo ?? porCore
  if (respuesta) {
    // Señal de interés: ofrecer captura a partir del tercer mensaje (3.5).
    const interes = /(precio|cuesta|implementacion|tiempo|comenzar|empezar|propuesta)/.test(
      normalizar(texto),
    )
    if (interes && mensajesEnviados >= 3) {
      return {
        ...respuesta,
        acciones: [...respuesta.acciones, { tipo: 'ofrecerLead' }],
      }
    }
    return respuesta
  }

  return {
    texto: 'Esa no me la sé, y prefiero decírselo antes que inventarle. ¿Quiere que le ayude con precios, con cómo funcionamos, o le paso con una persona?',
    acciones: [
      { tipo: 'quickReplies', opciones: ['¿Cuánto cuesta?', '¿Cómo funciona?', 'Hablar con alguien'] },
    ],
  }
}

/** Activación del submódulo de una demo (regla 2). */
export function activarSubmodulo(demo: DemoId): string | null {
  const dato = demoPorId(demo)
  if (!dato || dato.estado !== 'publicada') return null
  return submodulos[demo].descripcion
}

/** Texto de bienvenida con respuestas rápidas (3.5). */
export function bienvenida(): RespuestaChat {
  return {
    texto: '¡Hola! Soy el asistente de SoftRent. Puedo contarle qué hacemos, cuánto cuesta y mostrarle las demos. ¿Por dónde empezamos?',
    acciones: [
      {
        tipo: 'quickReplies',
        opciones: ['Ver demos', '¿Cuánto cuesta?'],
      },
    ],
  }
}

/** Nombres de demo para el chip de módulo. */
export function nombreDemo(id: DemoId): string {
  return demoPorId(id)?.nombre.replace('SoftRent ', '') ?? id
}

/** Aviso breve de privacidad antes del primer mensaje (3.5). */
export const avisoPrivacidad =
  'Este chat guarda la conversación para que SoftRent pueda responderle mejor. No usamos sus datos para nada más.'
