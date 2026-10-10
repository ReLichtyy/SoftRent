/*
 * Tipos de la capa de contenido (sección 3.2 del Notion).
 * El contenido es la fuente única de datos del sitio y del chatbot:
 * los componentes leen de aquí; nunca al revés.
 */

export type PlanId = 'arranque' | 'crecimiento' | 'pro' | 'medida'

export type DemoId = 'citas' | 'pedidos' | 'servicios'

/** Estado de una demo: publicada o próximamente. */
export type DemoEstado = 'publicada' | 'proximamente'

export type Demo = {
  id: DemoId
  /** Nombre comercial del paquete, p. ej. "SoftRent Citas". */
  nombre: string
  /** Industria principal que atiende. */
  industria: string
  estado: DemoEstado
  /** URL del subdominio; null mientras la demo no esté publicada. */
  demoUrl: string | null
  /** Captura del sistema para el plan B cuando el iframe no carga. */
  captura?: string
  /** Tareas sugeridas para recorrer la demo publicada (3, en orden). */
  recorrido?: string[]
  /** Resumen de una línea para tarjetas y galerías. */
  resumen: string
  /** Micro-descripción de impacto: el beneficio medible, en una línea. */
  impacto: string
  /** Dolores del cliente, en su propio lenguaje (patrón painLine). */
  resuelve: string[]
  /** Funciones del sistema (3 a 5, sin jerga técnica). */
  funciones: string[]
  /** Qué hace la IA incluida en ese sistema. */
  iaIncluida: string[]
  planRecomendado: PlanId
  /** Ruta del CTA con la demo preseleccionada. */
  cta: string
}

/** Dónde se nota la solución: con los clientes, en la operación del
 * negocio o al conseguir ventas nuevas. */
export type SolucionArea = 'clientes' | 'administracion' | 'ventas'

/** Categoría dentro de un área: agrupa soluciones afines. */
export type SolucionCategoria =
  | 'agenda'
  | 'chat-y-web'
  | 'cobros-y-caja'
  | 'inventario-y-precios'
  | 'dia-a-dia'
  | 'clientes-nuevos'
  | 'clientes-que-vuelven'

/** Nichos (sistemas) que filtran la página de soluciones. */
export type SolucionNicho =
  | 'supermercados'
  | 'reservas'
  | 'pedidos'
  | 'servicios'
  | 'chatbot'

/** "pregunta": el sistema responde con datos. "instruccion": el
 * sistema ejecuta un proceso completo a partir de un mensaje.
 * "automatico": un evento (un correo, un formulario, una factura
 * vencida) dispara el proceso sin que nadie escriba. */
export type SolucionTipo = 'pregunta' | 'instruccion' | 'automatico'

export type Solucion = {
  id: string
  area: SolucionArea
  categoria: SolucionCategoria
  tipo: SolucionTipo
  /** Sistemas donde aplica; alimenta el filtro por nicho. */
  nichos: SolucionNicho[]
  /** Para qué negocio aplica, p. ej. "Para negocios con citas". */
  aplica: string
  /** Frase de dolor del cliente, tal como la diría. */
  dolor: string
  /** Escena representativa: quién, cuándo y qué pasa, en una o dos
   * oraciones. Personas y negocios ilustrativos. */
  ejemplo: string
  /** Pasos que hoy exige un sistema moderno sin IA (2 a 3, cortos). */
  friccion: string[]
  /** Uno o más mensajes al sistema con su contestación y, si aplica,
   * la pieza visual de lo que devuelve o deja hecho. */
  conversacion: SolucionIntercambio[]
  /** Lo que el sistema deja hecho al final. */
  accion: string
  /** Qué cuida el sistema para no equivocarse (revisión humana,
   * límites, horarios). */
  resguardo?: string
  /** Qué hace SoftRent, en una oración. */
  respuesta: string
  /** Beneficio en una línea, sin cifras inventadas. */
  beneficio: string
  /** Demo relacionada. */
  demo: DemoId
  /** Ventana donde ocurre la conversación. */
  canal: SolucionCanal
  /** Título de esa ventana, p. ej. "Ingresos del mes". */
  titulo: string
}

/** Un mensaje (del administrador o del cliente, según el área) y lo
 * que contesta la IA, con datos ilustrativos. */
export type SolucionIntercambio = {
  pregunta: string
  contestacion: string
  pieza?: SolucionPieza
}

/** Dónde ocurre la conversación de la solución. */
export type SolucionCanal = 'whatsapp' | 'panel'

/** Pieza visual de un intercambio. Los valores son ilustrativos. */
export type SolucionPieza =
  | {
      /** Barras horizontales; valor en 0..100, cifra = texto a la derecha. */
      tipo: 'barras'
      filas: {
        etiqueta: string
        valor: number
        cifra?: string
        destacado?: boolean
      }[]
      /** Texto del distintivo de la fila destacada. */
      destacado?: string
    }
  | {
      /** Lista de personas con un detalle y un estado final. */
      tipo: 'clientes'
      filas: { nombre: string; detalle: string }[]
      estado: string
    }
  | {
      /** Existencias en unidades frente al mínimo de cada producto. */
      tipo: 'existencias'
      filas: { producto: string; unidades: number; minimo: number }[]
      /** Nota al pie, p. ej. el pedido sugerido. */
      nota?: { titulo: string; texto: string }
    }
  | {
      /** Cifras del día en tiles. */
      tipo: 'resumen'
      filas: { etiqueta: string; valor: string }[]
    }
  | {
      /** Una venta que el sistema reparte a otras herramientas. */
      tipo: 'conexiones'
      origen: { titulo: string; detalle: string; total: string }
      nodos: {
        nombre: string
        icono: 'factura' | 'contabilidad' | 'web'
        estado: string
        filas: { etiqueta: string; valor: string }[]
      }[]
    }
  | {
      /** Franja de agenda; "movido" = espacio que queda libre. */
      tipo: 'agenda'
      dia: string
      slots: {
        hora: string
        estado: 'ocupado' | 'libre' | 'nuevo' | 'movido'
        etiqueta?: string
      }[]
    }
  | {
      /** Comprobante de cobro por SINPE Móvil. */
      tipo: 'cobro'
      concepto: string
      monto: string
      detalle: string
    }
  | {
      /** Proceso que el sistema ejecutó, paso a paso. */
      tipo: 'proceso'
      pasos: string[]
    }
  | {
      /** Pedido o venta con sus líneas y total. */
      tipo: 'ticket'
      filas: { producto: string; cantidad: number; monto: string }[]
      total: string
      nota?: string
    }
  | {
      /** Mensajes entrantes ordenados por el sistema. */
      tipo: 'bandeja'
      filas: { de: string; asunto: string; etiqueta: string }[]
      nota?: string
    }
  | {
      /** Lo que pasa en el tiempo: cuándo y qué hizo el sistema. */
      tipo: 'linea'
      filas: { momento: string; texto: string; alerta?: boolean }[]
    }
  | {
      /** Cambios aplicados: antes → después. */
      tipo: 'cambios'
      filas: { etiqueta: string; antes: string; despues: string }[]
      nota?: string
    }

export type Plan = {
  id: PlanId
  nombre: string
  /** Precio mensual en colones, IVA aparte. Null para "desde". */
  precioMensual: number | null
  /** true cuando el precio es un "desde ...". */
  desde?: boolean
  /** Para quién es este plan. */
  paraQuien: string
  /** Qué incluye, en lenguaje de resultado. */
  incluye: string[]
  /** true en el plan recomendado. */
  destacado?: boolean
  /** Texto del botón de la tarjeta. */
  cta: string
  /** Ruta del CTA con el plan preseleccionado. */
  ctaRuta: string
}

export type PreguntaFrecuente = {
  pregunta: string
  respuesta: string
}
