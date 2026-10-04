import type {
  Solucion,
  SolucionArea,
  SolucionNicho,
  SolucionTipo,
} from './types'

/*
 * Soluciones: problema → solución.
 * El rival no es el papel ni el Excel: es el sistema moderno que ya
 * guarda los datos pero no tiene IA integrada. Cada entrada cuenta
 * cómo se resuelve hoy (friccion) y cómo se resuelve con SoftRent:
 * con una pregunta (el sistema responde con datos) o con una
 * instrucción (el sistema ejecuta el proceso completo). Nunca menciona
 * herramientas técnicas salvo "API", explicada por lo que hace. Las
 * cifras de las contestaciones son ilustrativas.
 */

export const areas: Record<SolucionArea, string> = {
  administracion: 'Para usted',
  clientes: 'Para sus clientes',
}

/** Entrada de cada capítulo de la página de soluciones. */
export const areasIntro: Record<SolucionArea, string> = {
  administracion:
    'Lo que hoy tiene que hacer a mano para entender y mover su negocio.',
  clientes:
    'Lo que sus clientes esperan de usted y hoy se queda sin respuesta.',
}

/** Filtro por sistema, en el orden en que se muestra. */
export const nichos: Record<SolucionNicho, string> = {
  supermercados: 'Supermercados',
  reservas: 'Reservas',
  pedidos: 'Pedidos',
  servicios: 'Servicios',
  chatbot: 'Chatbot',
}

/** Cómo se nombra el mensaje según el tipo de solución. */
export const tipos: Record<SolucionTipo, string> = {
  pregunta: 'Una pregunta',
  instruccion: 'Una instrucción',
}

export const soluciones: Solucion[] = [
  /* Para usted */
  {
    id: 'inventario-tarde',
    area: 'administracion',
    tipo: 'pregunta',
    nichos: ['supermercados', 'pedidos'],
    dolor: 'El inventario está en el sistema, pero se entera cuando ya se acabó.',
    friccion: ['Revisar existencias', 'Buscar las ventas del día', 'Armar el pedido'],
    conversacion: [
      {
        pregunta: '¿Qué se me está agotando?',
        contestacion:
          'Leche: quedan 8 unidades. Arroz 1 kg: quedan 12. Los dos están por debajo de su mínimo.',
        pieza: {
          tipo: 'existencias',
          filas: [
            { producto: 'Leche 1 L', unidades: 8, minimo: 24 },
            { producto: 'Arroz 1 kg', unidades: 12, minimo: 20 },
            { producto: 'Café 500 g', unidades: 34, minimo: 15 },
            { producto: 'Azúcar 2 kg', unidades: 41, minimo: 12 },
          ],
          nota: {
            titulo: 'Pedido al proveedor',
            texto: 'Leche 1 L × 48 · Arroz 1 kg × 30',
          },
        },
      },
      {
        pregunta: '¿Cuáles productos se vendieron más hoy?',
        contestacion:
          'Leche 1 L (46), pan baguette (38) y café 500 g (21). La leche va por encima de un día normal.',
        pieza: {
          tipo: 'barras',
          destacado: 'El más vendido',
          filas: [
            { etiqueta: 'Leche 1 L', valor: 100, cifra: '46', destacado: true },
            { etiqueta: 'Pan baguette', valor: 83, cifra: '38' },
            { etiqueta: 'Café 500 g', valor: 46, cifra: '21' },
            { etiqueta: 'Huevos × 15', valor: 39, cifra: '18' },
          ],
        },
      },
    ],
    accion: 'Pedido al proveedor listo para enviar',
    respuesta:
      'Le dice cuánto le queda de cada producto y qué se vende más, y le deja el pedido al proveedor preparado.',
    beneficio: 'Sepa qué tiene y qué se vende, sin contar estantes',
    demo: 'pedidos',
    canal: 'panel',
    titulo: 'Inventario y ventas de hoy',
  },
  {
    id: 'reportes-sin-conclusion',
    area: 'administracion',
    tipo: 'pregunta',
    nichos: ['supermercados', 'reservas', 'pedidos', 'servicios'],
    dolor: 'Los reportes están, pero la conclusión la tiene que sacar usted.',
    friccion: ['Abrir reportes', 'Cruzar fechas', 'Sacar la cuenta'],
    conversacion: [
      {
        pregunta: '¿Qué servicio me dejó más este mes?',
        contestacion:
          'Corte + barba: casi un tercio de sus ingresos, y sube por tercera semana seguida.',
        pieza: {
          tipo: 'barras',
          destacado: 'El que más deja',
          filas: [
            { etiqueta: 'Corte + barba', valor: 92, destacado: true },
            { etiqueta: 'Corte clásico', valor: 61 },
            { etiqueta: 'Tinte', valor: 38 },
            { etiqueta: 'Afeitado', valor: 22 },
          ],
        },
      },
    ],
    accion: 'Detalle por semana listo para ver',
    respuesta:
      'Le pregunta al sistema y le responde con sus propios números, sin armar reportes.',
    beneficio: 'Respuestas en segundos, sin armar reportes',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Ingresos del mes por servicio',
  },
  {
    id: 'cierre-de-caja',
    area: 'administracion',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos'],
    dolor: 'Cerrar la caja es sumar tiquetes y cuadrar cada SINPE contra el efectivo.',
    friccion: ['Contar el efectivo', 'Revisar cada SINPE', 'Pasar todo a la hoja'],
    conversacion: [
      {
        pregunta: 'Cierre la caja de hoy y mándeme el resumen.',
        contestacion:
          'Caja cerrada. Todo cuadra: el efectivo y los SINPE coinciden con las ventas.',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Sumó las ventas del día',
            'Cruzó cada SINPE con su venta',
            'Separó efectivo, tarjeta y SINPE',
            'Le envió el resumen por WhatsApp',
          ],
        },
      },
    ],
    accion: 'Resumen de caja enviado a su WhatsApp',
    respuesta:
      'Con un mensaje, el sistema cierra la caja, cuadra los pagos y le manda el resumen.',
    beneficio: 'La caja se cierra con un mensaje',
    demo: 'pedidos',
    canal: 'whatsapp',
    titulo: 'Cierre de caja',
  },
  {
    id: 'precios-uno-por-uno',
    area: 'administracion',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos'],
    dolor: 'Cambiar precios es ir producto por producto y repetirlo en la página web.',
    friccion: ['Buscar cada producto', 'Calcular el nuevo precio', 'Repetirlo en la web'],
    conversacion: [
      {
        pregunta: 'Suba 5 % los lácteos desde mañana.',
        contestacion:
          'Listo: 14 productos actualizados en caja y en la página web desde mañana.',
        pieza: {
          tipo: 'cambios',
          filas: [
            { etiqueta: 'Leche 1 L', antes: '₡1.050', despues: '₡1.105' },
            { etiqueta: 'Queso tierno 500 g', antes: '₡2.900', despues: '₡3.045' },
            { etiqueta: 'Natilla 250 g', antes: '₡980', despues: '₡1.030' },
          ],
          nota: 'Y 11 productos más',
        },
      },
    ],
    accion: 'Precios nuevos en caja y en la web',
    respuesta:
      'Le dice qué cambiar y el sistema actualiza cada precio, en caja y en su página.',
    beneficio: 'Cambia todos sus precios con una línea',
    demo: 'pedidos',
    canal: 'panel',
    titulo: 'Lista de precios',
  },
  {
    id: 'herramientas-sueltas',
    area: 'administracion',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos', 'servicios'],
    dolor: 'Sus herramientas no se hablan entre sí y alguien copia los datos a mano.',
    friccion: ['Vender en el sistema', 'Copiar a facturación', 'Pasar a contabilidad'],
    conversacion: [
      {
        pregunta: 'Facture las ventas de hoy y páselas a contabilidad.',
        contestacion:
          'Hecho: 32 facturas electrónicas aceptadas, el asiento del día registrado y el inventario de la web al día.',
        pieza: {
          tipo: 'conexiones',
          origen: {
            titulo: 'Ventas de hoy',
            detalle: '32 ventas cerradas',
            total: '₡486.300',
          },
          nodos: [
            {
              nombre: 'Facturación',
              icono: 'factura',
              estado: 'Aceptadas',
              filas: [
                { etiqueta: 'Facturas', valor: '32' },
                { etiqueta: 'Hacienda', valor: 'Al día' },
              ],
            },
            {
              nombre: 'Contabilidad',
              icono: 'contabilidad',
              estado: 'Registrado',
              filas: [
                { etiqueta: 'Asiento', valor: 'Del día' },
                { etiqueta: 'Monto', valor: '₡486.300' },
              ],
            },
            {
              nombre: 'Sitio web',
              icono: 'web',
              estado: 'Actualizado',
              filas: [
                { etiqueta: 'Inventario', valor: 'Al día' },
                { etiqueta: 'Agotados', valor: 'Ocultos' },
              ],
            },
          ],
        },
      },
    ],
    accion: 'Sincronizado por API, sin copiar nada',
    respuesta:
      'Por su API, el sistema conecta cada venta con su facturación, su contabilidad y su sitio web.',
    beneficio: 'Una venta, tres sistemas al día',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Conectado con lo que ya usa',
  },
  {
    id: 'promociones-a-mano',
    area: 'administracion',
    tipo: 'instruccion',
    nichos: ['supermercados', 'reservas', 'pedidos'],
    dolor: 'Para mandar una promoción tiene que armar la lista de contactos a mano.',
    friccion: ['Exportar contactos', 'Elegir a quién', 'Enviar uno a uno'],
    conversacion: [
      {
        pregunta: 'Mándele el 2x1 de café a quienes compran café cada semana.',
        contestacion:
          'Listo: encontré 41 clientes que compran café cada semana y ya les envié la promoción con su nombre.',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Buscó a quienes compran café cada semana',
            'Armó el mensaje con el nombre de cada uno',
            'Lo envió por WhatsApp',
            'Le avisa quién la usa en caja',
          ],
        },
      },
    ],
    accion: 'Promoción enviada a 41 clientes',
    respuesta:
      'Le dice a quién y qué ofrecer; el sistema arma la lista, escribe el mensaje y lo envía.',
    beneficio: 'Promociones a la persona correcta, sin listas',
    demo: 'pedidos',
    canal: 'whatsapp',
    titulo: 'Promoción',
  },
  {
    id: 'clientes-que-no-vuelven',
    area: 'administracion',
    tipo: 'pregunta',
    nichos: ['reservas', 'servicios'],
    dolor: 'Sabe que hay clientes que dejaron de venir, pero no cuáles.',
    friccion: ['Exportar clientes', 'Filtrar por visita', 'Escribir uno a uno'],
    conversacion: [
      {
        pregunta: '¿Quién no ha vuelto en dos meses?',
        contestacion:
          'Tres clientes frecuentes: Marco, Sofía y Elena. ¿Les escribo por WhatsApp?',
        pieza: {
          tipo: 'clientes',
          filas: [
            { nombre: 'Marco', detalle: 'Última visita: hace 9 semanas' },
            { nombre: 'Sofía', detalle: 'Última visita: hace 10 semanas' },
            { nombre: 'Elena', detalle: 'Última visita: hace 12 semanas' },
          ],
          estado: 'Enviado',
        },
      },
    ],
    accion: 'Mensaje enviado a los tres',
    respuesta:
      'El sistema encuentra a los clientes que no vuelven y les escribe por usted.',
    beneficio: 'Recupera clientes con una sola pregunta',
    demo: 'citas',
    canal: 'panel',
    titulo: 'Clientes sin volver',
  },
  {
    id: 'cerrar-un-dia',
    area: 'administracion',
    tipo: 'instruccion',
    nichos: ['reservas', 'servicios'],
    dolor: 'Si un día no puede abrir, toca llamar a cada cliente para moverle la cita.',
    friccion: ['Revisar las citas del día', 'Llamar a cada cliente', 'Buscarle otro espacio'],
    conversacion: [
      {
        pregunta: 'Cierre mi agenda el viernes y mueva a los que tenían cita.',
        contestacion:
          'Viernes cerrado. Les escribí a los 6 clientes con dos opciones nuevas; 4 ya eligieron.',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Bloqueó el viernes completo',
            'Encontró las 6 citas de ese día',
            'Le ofreció a cada cliente dos espacios libres',
            'Reagendó a los que ya contestaron',
          ],
        },
      },
    ],
    accion: 'Agenda del viernes cerrada y citas movidas',
    respuesta:
      'Le dice qué día no abre y el sistema avisa, reprograma y le cuenta cómo quedó.',
    beneficio: 'Cierra un día sin hacer una sola llamada',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Agenda',
  },
  {
    id: 'atado-a-la-computadora',
    area: 'administracion',
    tipo: 'pregunta',
    nichos: ['supermercados', 'reservas', 'pedidos', 'servicios'],
    dolor: 'Para consultar cualquier cosa tiene que sentarse frente a la computadora.',
    friccion: ['Llegar al negocio', 'Iniciar sesión', 'Buscar la pantalla'],
    conversacion: [
      {
        pregunta: '¿Cómo va el día?',
        contestacion:
          'Cuatro citas hoy y una por confirmar. Ya entraron dos pagos por SINPE.',
        pieza: {
          tipo: 'resumen',
          filas: [
            { etiqueta: 'Citas', valor: '4' },
            { etiqueta: 'Por confirmar', valor: '1' },
            { etiqueta: 'Pagos SINPE', valor: '2' },
          ],
        },
      },
    ],
    accion: 'Respondido en su chat de WhatsApp',
    respuesta:
      'Consulta su negocio desde el chat de WhatsApp que ya usa todos los días.',
    beneficio: 'Su negocio, desde su chat de WhatsApp',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Hoy en su negocio',
  },

  /* Para sus clientes */
  {
    id: 'pedidos-por-chat',
    area: 'clientes',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos', 'chatbot'],
    dolor: 'Los pedidos llegan por chat y alguien tiene que anotarlos, sumarlos y cobrarlos.',
    friccion: ['Leer el mensaje', 'Anotar y sumar', 'Mandar el monto'],
    conversacion: [
      {
        pregunta: 'Quiero 2 leches, un arroz y el café de siempre, para recoger a las 5.',
        contestacion:
          'Su pedido queda apartado para las 5:00 p. m. Total: ₡6.850. Le envío los datos del SINPE.',
        pieza: {
          tipo: 'ticket',
          filas: [
            { producto: 'Leche 1 L', cantidad: 2, monto: '₡2.210' },
            { producto: 'Arroz 1 kg', cantidad: 1, monto: '₡1.450' },
            { producto: 'Café 500 g', cantidad: 1, monto: '₡3.190' },
          ],
          total: '₡6.850',
          nota: 'Para recoger a las 5:00 p. m.',
        },
      },
    ],
    accion: 'Pedido apartado y cobro enviado',
    respuesta:
      'La IA toma el pedido conversando, recuerda lo que el cliente compra siempre y le cobra.',
    beneficio: 'Pedidos tomados y cobrados sin anotar nada',
    demo: 'pedidos',
    canal: 'whatsapp',
    titulo: 'Pedido',
  },
  {
    id: 'mensajes-fuera-de-horario',
    area: 'clientes',
    tipo: 'pregunta',
    nichos: ['reservas', 'chatbot'],
    dolor: 'Los mensajes que llegan de noche esperan hasta el día siguiente.',
    friccion: ['El cliente escribe', 'Nadie contesta', 'Agenda en otro lado'],
    conversacion: [
      {
        pregunta: '¿Tienen espacio mañana en la mañana?',
        contestacion: 'Sí: 9:00 o 10:30. ¿Cuál le reservo?',
        pieza: {
          tipo: 'agenda',
          dia: 'Mañana',
          slots: [
            { hora: '9:00', estado: 'libre' },
            { hora: '10:30', estado: 'nuevo', etiqueta: 'Reservada de noche' },
            { hora: '11:30', estado: 'ocupado' },
          ],
        },
      },
    ],
    accion: 'Cita agendada a las 10:48 p. m.',
    respuesta:
      'La IA responde a cualquier hora, toma los datos del cliente y agenda por usted.',
    beneficio: 'Atiende y agenda a cualquier hora',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Agenda de mañana',
  },
  {
    id: 'chatbot-limitado',
    area: 'clientes',
    tipo: 'instruccion',
    nichos: ['chatbot', 'reservas', 'pedidos'],
    dolor: 'Su chatbot contesta lo básico, pero no puede agendar ni cobrar.',
    friccion: ['Responde con un menú', 'Pasa a una persona', 'El cliente espera'],
    conversacion: [
      {
        pregunta: 'Quiero pasar mi cita al viernes y pagar de una vez.',
        contestacion: 'Listo: viernes a las 3:00 p. m. Le envío los datos para el SINPE.',
        pieza: {
          tipo: 'cobro',
          concepto: 'Cita del viernes, 3:00 p. m.',
          monto: '₡10.000',
          detalle: 'Pago por SINPE Móvil',
        },
      },
    ],
    accion: 'Cita movida y cobro enviado',
    respuesta:
      'Una IA que conoce su agenda real: agenda, reprograma y cobra en la misma conversación.',
    beneficio: 'Conoce su agenda real y actúa',
    demo: 'servicios',
    canal: 'whatsapp',
    titulo: 'Cobro enviado',
  },
  {
    id: 'recordatorios-sin-salida',
    area: 'clientes',
    tipo: 'pregunta',
    nichos: ['reservas', 'chatbot'],
    dolor: 'El recordatorio sale, pero si el cliente no puede ir, nadie reprograma.',
    friccion: ['Sale el recordatorio', 'El cliente no puede', 'El espacio queda vacío'],
    conversacion: [
      {
        pregunta: 'Mañana no puedo, ¿hay otro día?',
        contestacion: 'Claro. El jueves a las 4:00 p. m. está libre. ¿Se lo cambio?',
        pieza: {
          tipo: 'agenda',
          dia: 'Esta semana',
          slots: [
            { hora: 'Mié 4:00', estado: 'movido', etiqueta: 'Liberado para otro cliente' },
            { hora: 'Jue 4:00', estado: 'nuevo', etiqueta: 'Cita nueva' },
          ],
        },
      },
    ],
    accion: 'Cita reprogramada y espacio liberado',
    respuesta:
      'Si el cliente no puede, la IA le ofrece otro espacio y libera el anterior.',
    beneficio: 'Menos espacios vacíos en la agenda',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Cambio de cita',
  },
]
