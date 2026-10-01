/*
 * Datos de ejemplo del admin de SoftRent (Fase 7).
 * Demo data: con el backend (Fase 8) se reemplazan por
 * consultas a Supabase.
 */

export type EstadoSuscripcion =
  | 'implementacion'
  | 'activa'
  | 'morosa'
  | 'suspendida'
  | 'cancelada'

export type ClienteAdmin = {
  id: string
  negocio: string
  industria: string
  plan: string
  estado: EstadoSuscripcion
  desde: string
}

export const clientes: ClienteAdmin[] = [
  { id: 'cl1', negocio: 'Barbería Don Luis', industria: 'Citas', plan: 'Crecimiento', estado: 'activa', desde: 'feb 2026' },
  { id: 'cl2', negocio: 'Veterinaria Rex', industria: 'Citas', plan: 'Crecimiento', estado: 'activa', desde: 'abr 2026' },
  { id: 'cl3', negocio: 'Taller Luna', industria: 'Servicios', plan: 'Pro', estado: 'morosa', desde: 'ene 2026' },
  { id: 'cl4', negocio: 'Soda La Esquina', industria: 'Pedidos', plan: 'Arranque', estado: 'implementacion', desde: 'set 2026' },
  { id: 'cl5', negocio: 'Studio Ink CR', industria: 'Citas', plan: 'Arranque', estado: 'suspendida', desde: 'mar 2026' },
  { id: 'cl6', negocio: 'Ferretería El Córniz', industria: 'Pedidos', plan: 'Crecimiento', estado: 'activa', desde: 'may 2026' },
  { id: 'cl7', negocio: 'Consultorio Dra. Páez', industria: 'Citas', plan: 'Crecimiento', estado: 'cancelada', desde: 'jul 2026' },
]

export type PasoOnboarding = {
  id: string
  nombre: string
  hecho: boolean
}

export const onboardingInicial: PasoOnboarding[] = [
  { id: 'o1', nombre: 'Conectar WhatsApp Business', hecho: true },
  { id: 'o2', nombre: 'Cargar servicios, precios y horarios', hecho: true },
  { id: 'o3', nombre: 'Cargar base de conocimiento (FAQ)', hecho: false },
  { id: 'o4', nombre: 'Crear usuarios del negocio', hecho: false },
  { id: 'o5', nombre: 'Prueba de punta a punta con el dueño', hecho: false },
  { id: 'o6', nombre: 'Salida en vivo (go-live)', hecho: false },
]

export type Plantilla = {
  id: string
  nombre: string
  industria: string
  aplicadaEn: number
  estado: 'lista' | 'borrador'
}

export const plantillas: Plantilla[] = [
  { id: 't1', nombre: 'Citas para barberías y salones', industria: 'Citas', aplicadaEn: 2, estado: 'lista' },
  { id: 't2', nombre: 'Citas para veterinarias', industria: 'Citas', aplicadaEn: 1, estado: 'lista' },
  { id: 't3', nombre: 'Pedidos por WhatsApp', industria: 'Pedidos', aplicadaEn: 1, estado: 'lista' },
  { id: 't4', nombre: 'Visitas de taller', industria: 'Servicios', aplicadaEn: 1, estado: 'lista' },
  { id: 't5', nombre: 'Citas para consultorios', industria: 'Citas', aplicadaEn: 0, estado: 'borrador' },
]

export type Flujo = {
  id: string
  nombre: string
  estado: 'sano' | 'con-error'
  detalle: string
  ultimaEjecucion: string
}

export const flujos: Flujo[] = [
  { id: 'fl1', nombre: 'Recordatorio de cita 24 h', estado: 'sano', detalle: '38 ejecuciones hoy', ultimaEjecucion: 'hace 4 minutos' },
  { id: 'fl2', nombre: 'Recordatorio de cita 2 h', estado: 'sano', detalle: '21 ejecuciones hoy', ultimaEjecucion: 'hace 12 minutos' },
  { id: 'fl3', nombre: 'Aviso de cobro SINPE', estado: 'con-error', detalle: 'Fallo al leer un comprobante (imagen ilegible); quedó en revisión manual', ultimaEjecucion: 'hace 1 hora' },
  { id: 'fl4', nombre: 'Resumen semanal a dueños', estado: 'sano', detalle: 'Programado para lunes 7:00 a. m.', ultimaEjecucion: 'hace 2 días' },
]

export type ConsumoCliente = {
  id: string
  negocio: string
  conversacionesIA: number
  mensajesWhatsApp: number
  costoEstimado: number
}

export const consumo: ConsumoCliente[] = [
  { id: 'cs1', negocio: 'Barbería Don Luis', conversacionesIA: 380, mensajesWhatsApp: 1420, costoEstimado: 11800 },
  { id: 'cs2', negocio: 'Veterinaria Rex', conversacionesIA: 295, mensajesWhatsApp: 980, costoEstimado: 9200 },
  { id: 'cs3', negocio: 'Taller Luna', conversacionesIA: 610, mensajesWhatsApp: 2100, costoEstimado: 16600 },
  { id: 'cs4', negocio: 'Ferretería El Córniz', conversacionesIA: 120, mensajesWhatsApp: 410, costoEstimado: 4300 },
  { id: 'cs5', negocio: 'Studio Ink CR', conversacionesIA: 0, mensajesWhatsApp: 0, costoEstimado: 0 },
]

export type BriefAdmin = {
  id: string
  nombre: string
  negocio: string
  origen: 'Flujo Comenzar' | 'Chatbot'
  estado: 'nuevo' | 'revisado'
  resumen: string
}

export const briefs: BriefAdmin[] = [
  {
    id: 'b1',
    nombre: 'Karla Sánchez',
    negocio: 'Salón Karla',
    origen: 'Flujo Comenzar',
    estado: 'nuevo',
    resumen: 'Quiere tinte y citas en línea; hoy anota en cuaderno. Interesada en Crecimiento.',
  },
  {
    id: 'b2',
    nombre: 'Ricardo Mora',
    negocio: 'Barbería RM',
    origen: 'Chatbot',
    estado: 'nuevo',
    resumen: 'Preguntó por precios y tiempos; su barbero atiende dos sillas y pierde mensajes.',
  },
  {
    id: 'b3',
    nombre: 'Mariana Rojas',
    negocio: 'Dulce María Repostería',
    origen: 'Chatbot',
    estado: 'revisado',
    resumen: 'Pedidos por WhatsApp; propuesta enviada, esperando respuesta.',
  },
  {
    id: 'b4',
    nombre: 'Beto Cascante',
    negocio: 'Taller Cascante',
    origen: 'Flujo Comenzar',
    estado: 'revisado',
    resumen: 'Visitas de taller con cotización por enlace; agendó diagnóstico por llamada.',
  },
]
