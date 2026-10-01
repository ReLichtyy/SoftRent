/*
 * Datos de ejemplo de la app del cliente (Fase 6).
 * Todo es dato de demo: cuando exista el backend (Fase 8),
 * estas pantallas se conectan a Supabase y este archivo desaparece.
 */

export type MensajeBandeja = {
  autor: 'cliente' | 'bot' | 'humano'
  texto: string
  hora: string
}

export type Conversacion = {
  id: string
  cliente: string
  telefono: string
  estado: 'bot' | 'humano' | 'cerrada'
  mensajes: MensajeBandeja[]
}

export const conversaciones: Conversacion[] = [
  {
    id: 'c1',
    cliente: 'María González',
    telefono: '+506 8812 0044',
    estado: 'bot',
    mensajes: [
      { autor: 'cliente', texto: 'Hola, ¿tienen cupo el viernes para tinte?', hora: '09:02' },
      { autor: 'bot', texto: 'Sí. El viernes tengo 3:00 p. m. y 5:30 p. m. ¿Cuál le sirve?', hora: '09:02' },
      { autor: 'cliente', texto: '3:00 por favor', hora: '09:03' },
      { autor: 'bot', texto: 'Listo: viernes 3:00 p. m. con Luisa. Le llega recordatorio 2 horas antes.', hora: '09:03' },
    ],
  },
  {
    id: 'c2',
    cliente: 'Andrés Pérez',
    telefono: '+506 8345 7712',
    estado: 'humano',
    mensajes: [
      { autor: 'cliente', texto: 'Buenas, necesito cambiar mi corte del jueves.', hora: '08:41' },
      { autor: 'bot', texto: 'Con gusto le ayudo. ¿A qué hora le gustaría pasarlo?', hora: '08:41' },
      { autor: 'cliente', texto: 'Es que no puedo venir esa semana, mejor la siguiente.', hora: '08:43' },
      { autor: 'humano', texto: 'Buenos días don Andrés, soy Don Luis. Le muevo la cita al jueves siguiente a la misma hora.', hora: '08:52' },
    ],
  },
  {
    id: 'c3',
    cliente: 'Karla Sánchez',
    telefono: '+506 8890 1330',
    estado: 'bot',
    mensajes: [
      { autor: 'cliente', texto: '¿Cuánto cuesta el tinte completo?', hora: '21:47' },
      { autor: 'bot', texto: 'El tinte completo está en ₡18.000, incluye lavado y peinado. ¿Quiere que le reserve?', hora: '21:47' },
    ],
  },
  {
    id: 'c4',
    cliente: 'Jorge Vindas',
    telefono: '+506 8721 5589',
    estado: 'bot',
    mensajes: [
      { autor: 'cliente', texto: '¿Atienden sábados por la tarde?', hora: '12:15' },
      { autor: 'bot', texto: 'Sí, sábados hasta las 4:00 p. m. ¿Le reserve un espacio?', hora: '12:15' },
    ],
  },
  {
    id: 'c5',
    cliente: 'Esteban Ramírez',
    telefono: '+506 8456 2278',
    estado: 'cerrada',
    mensajes: [
      { autor: 'cliente', texto: 'Ya le mandé el SINPE de la cita quincenal.', hora: '17:30' },
      { autor: 'bot', texto: 'Recibido, don Esteban. Su cita quedó pagada. ¡Nos vemos el viernes!', hora: '17:31' },
    ],
  },
  {
    id: 'c6',
    cliente: 'Ana Portilla',
    telefono: '+506 8399 0061',
    estado: 'cerrada',
    mensajes: [
      { autor: 'cliente', texto: 'Agendé mi primera visita, ¿dónde quedan?', hora: '10:05' },
      { autor: 'bot', texto: 'Quedamos 200 metros al sur del parque. Le envío la ubicación por WhatsApp.', hora: '10:05' },
    ],
  },
]

export type Contacto = {
  id: string
  nombre: string
  telefono: string
  etapa: 'nuevo' | 'interesado' | 'cliente'
  nota: string
}

export const contactos: Contacto[] = [
  { id: 'p1', nombre: 'María González', telefono: '+506 8812 0044', etapa: 'cliente', nota: 'Tinte cada 5 semanas' },
  { id: 'p2', nombre: 'Andrés Pérez', telefono: '+506 8345 7712', etapa: 'cliente', nota: 'Corte quincenal' },
  { id: 'p3', nombre: 'Karla Sánchez', telefono: '+506 8890 1330', etapa: 'interesado', nota: 'Consulta precios de tinte' },
  { id: 'p4', nombre: 'Jorge Vindas', telefono: '+506 8721 5589', etapa: 'nuevo', nota: 'Pregunta horario de sábado' },
  { id: 'p5', nombre: 'Ana Portilla', telefono: '+506 8399 0061', etapa: 'cliente', nota: 'Primera visita agendada' },
  { id: 'p6', nombre: 'Ricardo Mora', telefono: '+506 8855 3311', etapa: 'interesado', nota: 'Quiere barba y corte' },
]

export type Cita = {
  id: string
  hora: string
  cliente: string
  servicio: string
  responsable: string
  estado: 'solicitada' | 'confirmada' | 'atendida' | 'no-show' | 'cancelada'
}

export const citas: Cita[] = [
  { id: 'a1', hora: '09:00', cliente: 'Andrés Pérez', servicio: 'Corte clásico', responsable: 'Don Luis', estado: 'confirmada' },
  { id: 'a2', hora: '10:30', cliente: 'Carla Monge', servicio: 'Corte + barba', responsable: 'Jorge', estado: 'confirmada' },
  { id: 'a3', hora: '11:30', cliente: 'Veterinaria Rex', servicio: 'Consulta de control', responsable: 'Don Luis', estado: 'solicitada' },
  { id: 'a4', hora: '13:00', cliente: 'Luisa Hernández', servicio: 'Tinte completo', responsable: 'Luisa', estado: 'confirmada' },
  { id: 'a5', hora: '15:00', cliente: 'Taller Luna', servicio: 'Mantenimiento', responsable: 'Jorge', estado: 'atendida' },
  { id: 'a6', hora: '16:30', cliente: 'Ricardo Mora', servicio: 'Corte + barba', responsable: 'Don Luis', estado: 'no-show' },
]

export type Cobro = {
  id: string
  concepto: string
  cliente: string
  monto: number
  vencimiento: string
  estado: 'pagado' | 'por-vencer' | 'vencido'
}

export const cobros: Cobro[] = [
  { id: 'f1', concepto: 'Corte clásico', cliente: 'Andrés Pérez', monto: 8000, vencimiento: 'Ya pagado', estado: 'pagado' },
  { id: 'f2', concepto: 'Tinte completo', cliente: 'Luisa Hernández', monto: 18000, vencimiento: 'Vence hoy', estado: 'por-vencer' },
  { id: 'f3', concepto: 'Corte + barba', cliente: 'Ricardo Mora', monto: 10000, vencimiento: 'Vence en 3 días', estado: 'por-vencer' },
  { id: 'f4', concepto: 'Mantenimiento mensual', cliente: 'Taller Luna', monto: 45000, vencimiento: 'Venció hace 2 días', estado: 'vencido' },
  { id: 'f5', concepto: 'Consulta de control', cliente: 'Veterinaria Rex', monto: 15000, vencimiento: 'Ya pagado', estado: 'pagado' },
]

export type Automatizacion = {
  id: string
  nombre: string
  descripcion: string
  activa: boolean
  horasAhorradas: number
  ejecucionesMes: number
}

export const automatizaciones: Automatizacion[] = [
  {
    id: 'm1',
    nombre: 'Recordatorio de cita',
    descripcion: 'Envía recordatorio 24 horas y 2 horas antes de cada cita.',
    activa: true,
    horasAhorradas: 2.4,
    ejecucionesMes: 38,
  },
  {
    id: 'm2',
    nombre: 'Aviso de cobro',
    descripcion: 'Avisa al vencer, a los 3 y a los 7 días, con las instrucciones de SINPE.',
    activa: true,
    horasAhorradas: 1.2,
    ejecucionesMes: 14,
  },
  {
    id: 'm3',
    nombre: 'Resumen semanal',
    descripcion: 'Le llega cada lunes: citas, cobros y lo que necesita su atención.',
    activa: true,
    horasAhorradas: 0.8,
    ejecucionesMes: 4,
  },
  {
    id: 'm4',
    nombre: 'Reactivación de clientes',
    descripcion: 'Escribe a los clientes que llevan más de un mes sin venir.',
    activa: false,
    horasAhorradas: 0,
    ejecucionesMes: 0,
  },
]

export type EntradaConocimiento = {
  id: string
  pregunta: string
  respuesta: string
}

export const baseConocimiento: EntradaConocimiento[] = [
  {
    id: 'k1',
    pregunta: '¿A qué hora abren?',
    respuesta: 'De lunes a sábado de 9:00 a. m. a 6:00 p. m., sábados hasta las 4:00 p. m.',
  },
  {
    id: 'k2',
    pregunta: '¿Cuánto cuesta el corte + barba?',
    respuesta: '₡10.000, incluye perfilado de barba con toalla caliente.',
  },
  {
    id: 'k3',
    pregunta: '¿Aceptan SINPE Móvil?',
    respuesta: 'Sí, al confirmar la cita le enviamos las instrucciones de SINPE.',
  },
  {
    id: 'k4',
    pregunta: '¿Atienden sin cita?',
    respuesta: 'Preferimos cita para no hacerle esperar; si hay espacio, sí lo atendemos.',
  },
]

export type UsuarioApp = {
  id: string
  nombre: string
  rol: 'dueño' | 'agente' | 'lectura'
  canal: 'WhatsApp' | 'Correo'
}

export const usuarios: UsuarioApp[] = [
  { id: 'u1', nombre: 'Don Luis', rol: 'dueño', canal: 'WhatsApp' },
  { id: 'u2', nombre: 'Jorge', rol: 'agente', canal: 'WhatsApp' },
  { id: 'u3', nombre: 'Luisa', rol: 'agente', canal: 'WhatsApp' },
  { id: 'u4', nombre: 'Contadora Ada', rol: 'lectura', canal: 'Correo' },
]

export const negocioDemo = {
  nombre: 'Barbería Don Luis',
  plan: 'crecimiento' as const,
}
