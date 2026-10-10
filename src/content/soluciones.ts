import type {
  Solucion,
  SolucionArea,
  SolucionCategoria,
  SolucionNicho,
  SolucionTipo,
} from './types'

/*
 * Soluciones: problema → solución.
 * El rival no es el papel ni el Excel: es el sistema moderno que ya
 * guarda los datos pero no tiene IA integrada. Cada entrada cuenta
 * cómo se resuelve hoy (friccion), una escena real de un negocio
 * (ejemplo) y cómo se resuelve con SoftRent: con una pregunta (el
 * sistema responde con datos), con una instrucción (el sistema ejecuta
 * el proceso completo) o sola, cuando un evento la dispara. Nunca
 * menciona herramientas técnicas salvo "API", explicada por lo que
 * hace. Las personas, negocios y cifras son ilustrativos.
 */

export const areas: Record<SolucionArea, string> = {
  clientes: 'Con tus clientes',
  administracion: 'En tu operación',
  ventas: 'Para vender más',
}

/** Categorías de cada área, en el orden en que se muestran. */
export const categorias: { id: SolucionCategoria; area: SolucionArea; titulo: string }[] = [
  { id: 'agenda', area: 'clientes', titulo: 'Agenda' },
  { id: 'chat-y-web', area: 'clientes', titulo: 'Chat y web' },
  { id: 'cobros-y-caja', area: 'administracion', titulo: 'Cobros y caja' },
  { id: 'inventario-y-precios', area: 'administracion', titulo: 'Inventario y precios' },
  { id: 'dia-a-dia', area: 'administracion', titulo: 'Día a día' },
  { id: 'clientes-nuevos', area: 'ventas', titulo: 'Clientes nuevos' },
  { id: 'clientes-que-vuelven', area: 'ventas', titulo: 'Clientes que vuelven' },
]

/** Filtro por sistema, en el orden en que se muestra. */
export const nichos: Record<SolucionNicho, string> = {
  reservas: 'Reservas',
  pedidos: 'Pedidos',
  supermercados: 'Supermercados',
  servicios: 'Servicios',
  chatbot: 'Chatbot',
}

/** Cómo se nombra el mensaje según el tipo de solución. */
export const tipos: Record<SolucionTipo, string> = {
  pregunta: 'Le preguntas',
  instruccion: 'Se lo pides',
  automatico: 'Pasa solo',
}

export const soluciones: Solucion[] = [
  /* Con tus clientes */
  {
    id: 'mensajes-fuera-de-horario',
    area: 'clientes',
    categoria: 'agenda',
    tipo: 'pregunta',
    nichos: ['reservas', 'chatbot'],
    aplica: 'Para negocios con citas',
    dolor: 'Los mensajes que llegan de noche esperan hasta el día siguiente.',
    ejemplo:
      'Son las 10:48 p. m. y Lucía ya cerró la veterinaria. Un cliente pregunta si hay espacio mañana y, antes de que ella despierte, la cita ya está en su agenda.',
    friccion: ['El cliente escribe', 'Nadie contesta', 'Agenda en otro lado'],
    conversacion: [
      {
        pregunta: '¿Tienen espacio mañana en la mañana?',
        contestacion: 'Sí: a las 9:00 o a las 10:30. ¿Cuál te reservo?',
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
      'La IA responde a cualquier hora, toma los datos del cliente y agenda por ti.',
    resguardo: 'Solo ofrece los espacios que de verdad están libres en tu agenda.',
    beneficio: 'Responde y agenda a cualquier hora.',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Agenda de mañana',
  },
  {
    id: 'llamadas-sin-contestar',
    area: 'clientes',
    categoria: 'agenda',
    tipo: 'automatico',
    nichos: ['reservas', 'servicios'],
    aplica: 'Para negocios que reciben llamadas',
    dolor: 'El teléfono suena mientras atiendes y esa llamada se pierde.',
    ejemplo:
      'Andrés está a mitad de un corte cuando suena el teléfono de la barbería. Una voz de IA contesta, le busca hora al cliente para el jueves y le confirma por mensaje.',
    friccion: ['Dejar lo que haces', 'Buscar un espacio', 'Anotar la cita'],
    conversacion: [
      {
        pregunta: 'Llamada entrante: «Quería una cita para el jueves en la tarde.»',
        contestacion:
          'El jueves tengo las 3:00 o las 4:30. ¿Cuál le sirve? Le envío la confirmación por mensaje.',
        pieza: {
          tipo: 'linea',
          filas: [
            { momento: '0:00', texto: 'Contestó la llamada y saludó' },
            { momento: '0:12', texto: 'Revisó los espacios libres del jueves' },
            { momento: '0:41', texto: 'Creó la cita a las 4:30 p. m.' },
            { momento: '0:55', texto: 'Envió la confirmación por SMS' },
          ],
        },
      },
    ],
    accion: 'Cita creada y confirmada por mensaje',
    respuesta:
      'Una recepcionista de voz atiende tus llamadas, responde lo frecuente, agenda en tu calendario y te pasa la llamada si es urgente.',
    resguardo:
      'Se calla en cuanto la persona habla y te transfiere la llamada si detecta una emergencia. Cada llamada queda grabada y transcrita para revisarla.',
    beneficio: 'Contesta el teléfono por ti.',
    demo: 'citas',
    canal: 'panel',
    titulo: 'Llamada atendida',
  },
  {
    id: 'recordatorios-sin-salida',
    area: 'clientes',
    categoria: 'agenda',
    tipo: 'pregunta',
    nichos: ['reservas', 'chatbot'],
    aplica: 'Para negocios con reservas',
    dolor: 'El recordatorio sale, pero si el cliente no puede ir, nadie reprograma.',
    ejemplo:
      'Karla recibe el recordatorio de su sesión de tatuaje y contesta que mañana no puede. La IA le ofrece el jueves y el espacio del miércoles queda libre para otra persona.',
    friccion: ['Sale el recordatorio', 'El cliente no puede', 'El espacio queda vacío'],
    conversacion: [
      {
        pregunta: 'Mañana no puedo, ¿hay otro día?',
        contestacion: 'Claro. El jueves a las 4:00 p. m. está libre. ¿Te la cambio?',
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
    beneficio: 'Reprograma desde el recordatorio.',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Cambio de cita',
  },
  {
    id: 'pedidos-por-chat',
    area: 'clientes',
    categoria: 'chat-y-web',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos', 'chatbot'],
    aplica: 'Para comercios con ventas por chat',
    dolor: 'Los pedidos llegan por chat y alguien tiene que anotarlos, sumarlos y cobrarlos.',
    ejemplo:
      'Doña Marta escribe al minisúper como siempre: dos leches, un arroz y «el café de siempre». La IA sabe cuál es, suma el total y le manda los datos del SINPE.',
    friccion: ['Leer el mensaje', 'Anotar y sumar', 'Mandar el monto'],
    conversacion: [
      {
        pregunta: 'Quiero 2 leches, un arroz y el café de siempre, para recoger a las 5.',
        contestacion:
          'Tu pedido queda apartado para las 5:00 p. m. Total: ₡6.850. Te envío los datos del SINPE.',
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
    beneficio: 'Convierte los mensajes en pedidos.',
    demo: 'pedidos',
    canal: 'whatsapp',
    titulo: 'Pedido',
  },
  {
    id: 'chatbot-limitado',
    area: 'clientes',
    categoria: 'chat-y-web',
    tipo: 'instruccion',
    nichos: ['chatbot', 'reservas', 'pedidos'],
    aplica: 'Para negocios que ya tienen un chatbot',
    dolor: 'Tu chatbot contesta lo básico, pero no puede agendar ni cobrar.',
    ejemplo:
      'Un paciente de la clínica dental quiere mover su cita al viernes y pagarla de una vez. En lugar de un menú de opciones, recibe la cita nueva y el cobro en la misma conversación.',
    friccion: ['Responde con un menú', 'Pasa a una persona', 'El cliente espera'],
    conversacion: [
      {
        pregunta: 'Quiero pasar mi cita al viernes y pagar de una vez.',
        contestacion: 'Listo: viernes a las 3:00 p. m. Te envío los datos para el SINPE.',
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
      'Una IA que conoce tu agenda real: agenda, reprograma y cobra en la misma conversación.',
    beneficio: 'Un chat que agenda y cobra.',
    demo: 'servicios',
    canal: 'whatsapp',
    titulo: 'Cobro enviado',
  },
  {
    id: 'agente-web',
    area: 'clientes',
    categoria: 'chat-y-web',
    tipo: 'pregunta',
    nichos: ['chatbot', 'servicios'],
    aplica: 'Para negocios con página web',
    dolor: 'Te preguntan lo mismo en la web y nadie responde hasta que lo ves.',
    ejemplo:
      'Alguien entra a la web del taller de Mauricio un domingo y pregunta si revisan frenos de moto. El chat responde con la lista de servicios del taller, pide nombre y teléfono, y le abre la agenda.',
    friccion: ['Leer la pregunta', 'Buscar la respuesta', 'Pedir los datos'],
    conversacion: [
      {
        pregunta: '¿Revisan frenos de moto? ¿Cuánto cuesta?',
        contestacion:
          'Sí. La revisión de frenos de moto cuesta ₡15.000 y toma una hora. ¿Quieres que te reserve un espacio esta semana?',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Buscó la respuesta en tu lista de servicios',
            'Respondió con el precio y la duración',
            'Pidió nombre, correo y teléfono',
            'Guardó el contacto y abrió la agenda',
          ],
        },
      },
    ],
    accion: 'Contacto guardado y reunión agendada',
    respuesta:
      'Un chat en tu web que responde solo con tu información, guarda los datos de quien quiere comprar y lo pasa a una persona cuando hace falta.',
    resguardo:
      'Si la respuesta no está en tu información, no la inventa: ofrece hablar con alguien de tu equipo.',
    beneficio: 'Tu web responde con tu información.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Chat de tu web',
  },

  /* En tu operación */
  {
    id: 'correo-desordenado',
    area: 'administracion',
    categoria: 'dia-a-dia',
    tipo: 'automatico',
    nichos: ['servicios', 'pedidos'],
    aplica: 'Para negocios que viven en el correo',
    dolor: 'Abres el correo y tienes que leer todo para saber qué es urgente.',
    ejemplo:
      'Daniela abre el correo de su estudio contable a las 8:00 a. m. Las facturas, las consultas y lo urgente ya tienen su etiqueta, y cada respuesta la espera como borrador para revisar y enviar.',
    friccion: ['Leer cada correo', 'Decidir qué es urgente', 'Escribir cada respuesta'],
    conversacion: [
      {
        pregunta: 'Entran 23 correos durante la noche.',
        contestacion:
          'Ordené tu bandeja: 1 urgente, 3 de facturación y 2 de ventas. Te dejé 6 borradores listos para revisar.',
        pieza: {
          tipo: 'bandeja',
          filas: [
            { de: 'Distribuidora Rocha', asunto: 'Factura vence hoy', etiqueta: 'Urgente' },
            { de: 'Carolina Vargas', asunto: '¿Tienen campo el viernes?', etiqueta: 'Venta' },
            { de: 'Hotel Las Brisas', asunto: 'Pedido #3189 incompleto', etiqueta: 'Soporte' },
          ],
          nota: '17 promociones y avisos automáticos, apartados',
        },
      },
    ],
    accion: '6 borradores listos para enviar',
    respuesta:
      'El sistema lee cada correo, lo etiqueta por tipo y prioridad, saca fechas y números de pedido, y te deja la respuesta escrita en tu tono.',
    resguardo:
      'Nunca envía un correo por su cuenta: todo queda como borrador hasta que lo apruebas. Los datos personales se ocultan antes de procesarlos.',
    beneficio: 'Tu correo, ordenado y con borradores.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Bandeja de entrada',
  },
  {
    id: 'cobros-atrasados',
    area: 'administracion',
    categoria: 'cobros-y-caja',
    tipo: 'automatico',
    nichos: ['servicios', 'pedidos'],
    aplica: 'Para negocios que facturan a crédito',
    dolor: 'Hay facturas vencidas y te toca recordarle a cada cliente que pague.',
    ejemplo:
      'Una factura de la ferretería de Pablo venció ayer. El cliente recibe un recordatorio amable con el enlace de pago; si a la semana no ha pagado, le llega uno formal. Pablo no escribió ninguno.',
    friccion: ['Revisar facturas vencidas', 'Escribir a cada cliente', 'Volver a revisar si pagó'],
    conversacion: [
      {
        pregunta: 'La factura #2207 de Constructora Solano vence sin pago.',
        contestacion:
          'Le envié el primer recordatorio con el enlace de pago. Antes de cada aviso reviso que no haya pagado.',
        pieza: {
          tipo: 'linea',
          filas: [
            { momento: 'Día 1', texto: 'Recordatorio amable con enlace de pago' },
            { momento: 'Día 7', texto: 'Recordatorio formal: pide el comprobante' },
            { momento: 'Día 15', texto: 'Aviso de suspensión y alerta a tu equipo', alerta: true },
          ],
        },
      },
    ],
    accion: 'Recordatorio enviado, sin escribir nada',
    respuesta:
      'El sistema revisa cada día qué facturas vencieron y envía los recordatorios en el momento justo, cada vez más formales.',
    resguardo:
      'Confirma el pago justo antes de cada envío, nunca escribe dos veces por lo mismo y respeta a los clientes que marcaste como exentos o en disputa.',
    beneficio: 'Cobra sin perseguir a nadie.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Seguimiento de cobro',
  },
  {
    id: 'herramientas-sueltas',
    area: 'administracion',
    categoria: 'cobros-y-caja',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos', 'servicios'],
    aplica: 'Para negocios con citas o ventas',
    dolor: 'Tus herramientas no se hablan entre sí y alguien copia los datos a mano.',
    ejemplo:
      'Al final del día, Gabriela le pide al sistema que facture las ventas de la panadería. Las facturas salen a Hacienda, el asiento queda en contabilidad y la web oculta lo que se agotó.',
    friccion: ['Vender en el sistema', 'Copiar a facturación', 'Pasar a contabilidad'],
    conversacion: [
      {
        pregunta: 'Factura las ventas de hoy y pásalas a contabilidad.',
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
      'Por su API, el sistema conecta cada venta con tu facturación, tu contabilidad y tu sitio web.',
    beneficio: 'Una venta, tres sistemas al día.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Conectado con lo que ya usas',
  },
  {
    id: 'cierre-de-caja',
    area: 'administracion',
    categoria: 'cobros-y-caja',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos'],
    aplica: 'Para comercios con caja',
    dolor: 'Cerrar la caja es sumar tiquetes y cuadrar cada SINPE contra el efectivo.',
    ejemplo:
      'A las 8:00 p. m., doña Marta escribe desde el celular «cierra la caja». Antes de apagar las luces del minisúper ya tiene el resumen del día en su WhatsApp.',
    friccion: ['Contar el efectivo', 'Revisar cada SINPE', 'Pasar todo a la hoja'],
    conversacion: [
      {
        pregunta: 'Cierra la caja de hoy y mándame el resumen.',
        contestacion:
          'Caja cerrada. Todo cuadra: el efectivo y los SINPE coinciden con las ventas.',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Sumó las ventas del día',
            'Cruzó cada SINPE con su venta',
            'Separó efectivo, tarjeta y SINPE',
            'Te envió el resumen por WhatsApp',
          ],
        },
      },
    ],
    accion: 'Resumen de caja enviado a tu WhatsApp',
    respuesta:
      'Con un mensaje, el sistema cierra la caja, cuadra los pagos y te manda el resumen.',
    resguardo: 'Si un pago no coincide con ninguna venta, te lo señala en lugar de cuadrarlo a la fuerza.',
    beneficio: 'Cierra la caja con un mensaje.',
    demo: 'pedidos',
    canal: 'whatsapp',
    titulo: 'Cierre de caja',
  },
  {
    id: 'inventario-tarde',
    area: 'administracion',
    categoria: 'inventario-y-precios',
    tipo: 'pregunta',
    nichos: ['supermercados', 'pedidos'],
    aplica: 'Para comercios con inventario',
    dolor: 'El inventario está en el sistema, pero te enteras cuando ya se acabó.',
    ejemplo:
      'Un martes en la mañana, el encargado del minisúper pregunta qué se está agotando. La leche y el arroz están bajo el mínimo, y el pedido al proveedor ya viene armado.',
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
      'Te dice cuánto te queda de cada producto y qué se vende más, y te deja el pedido al proveedor preparado.',
    beneficio: 'Sabe qué se acaba antes de que se acabe.',
    demo: 'pedidos',
    canal: 'panel',
    titulo: 'Inventario y ventas de hoy',
  },
  {
    id: 'reportes-sin-conclusion',
    area: 'administracion',
    categoria: 'dia-a-dia',
    tipo: 'pregunta',
    nichos: ['supermercados', 'reservas', 'pedidos', 'servicios'],
    aplica: 'Para cualquier negocio con ventas',
    dolor: 'Los reportes están, pero la conclusión la tienes que sacar tú.',
    ejemplo:
      'Andrés quiere saber qué le deja más plata en la barbería. Lo pregunta así, con sus palabras, y la respuesta llega con sus propios números.',
    friccion: ['Abrir reportes', 'Cruzar fechas', 'Sacar la cuenta'],
    conversacion: [
      {
        pregunta: '¿Qué servicio me dejó más este mes?',
        contestacion:
          'Corte + barba: casi un tercio de tus ingresos, y sube por tercera semana seguida.',
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
      'Le preguntas al sistema y te responde con tus propios números, sin armar reportes.',
    beneficio: 'Pregunta y responde con tus números.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Ingresos del mes por servicio',
  },
  {
    id: 'precios-uno-por-uno',
    area: 'administracion',
    categoria: 'inventario-y-precios',
    tipo: 'instruccion',
    nichos: ['supermercados', 'pedidos'],
    aplica: 'Para comercios con lista de precios',
    dolor: 'Cambiar precios es ir producto por producto y repetirlo en la página web.',
    ejemplo:
      'El proveedor de lácteos subió precios. Doña Marta escribe una línea y los 14 productos quedan actualizados en caja y en la web desde mañana.',
    friccion: ['Buscar cada producto', 'Calcular el nuevo precio', 'Repetirlo en la web'],
    conversacion: [
      {
        pregunta: 'Sube 5 % los lácteos desde mañana.',
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
      'Le dices qué cambiar y el sistema actualiza cada precio, en caja y en tu página.',
    beneficio: 'Cambia tus precios con una línea.',
    demo: 'pedidos',
    canal: 'panel',
    titulo: 'Lista de precios',
  },
  {
    id: 'cerrar-un-dia',
    area: 'administracion',
    categoria: 'dia-a-dia',
    tipo: 'instruccion',
    nichos: ['reservas', 'servicios'],
    aplica: 'Para negocios con agenda',
    dolor: 'Si un día no puedes abrir, toca llamar a cada cliente para moverle la cita.',
    ejemplo:
      'Lucía tiene que viajar el viernes. Escribe una línea y sus 6 clientes reciben dos opciones nuevas; antes del almuerzo, 4 ya eligieron.',
    friccion: ['Revisar las citas del día', 'Llamar a cada cliente', 'Buscarle otro espacio'],
    conversacion: [
      {
        pregunta: 'Cierra mi agenda el viernes y mueve a los que tenían cita.',
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
      'Le dices qué día no abres y el sistema avisa, reprograma y te cuenta cómo quedó.',
    beneficio: 'Cierra un día sin hacer llamadas.',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Agenda',
  },
  {
    id: 'atado-a-la-computadora',
    area: 'administracion',
    categoria: 'dia-a-dia',
    tipo: 'pregunta',
    nichos: ['supermercados', 'reservas', 'pedidos', 'servicios'],
    aplica: 'Para dueños que no están en el negocio',
    dolor: 'Para consultar cualquier cosa tienes que sentarte frente a la computadora.',
    ejemplo:
      'Karla está en la fila del banco y quiere saber cómo va el estudio. Pregunta por WhatsApp y en segundos sabe cuántas citas hay y qué pagos entraron.',
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
    accion: 'Respondido en tu chat de WhatsApp',
    respuesta:
      'Consultas tu negocio desde el chat de WhatsApp que ya usas todos los días.',
    beneficio: 'Tu negocio, desde tu WhatsApp.',
    demo: 'citas',
    canal: 'whatsapp',
    titulo: 'Hoy en tu negocio',
  },

  /* Para vender más */
  {
    id: 'respuesta-lenta',
    area: 'ventas',
    categoria: 'clientes-nuevos',
    tipo: 'automatico',
    nichos: ['servicios', 'reservas'],
    aplica: 'Para negocios que reciben formularios o anuncios',
    dolor: 'Alguien llena tu formulario y le contestas horas después, cuando ya se enfrió.',
    ejemplo:
      'Sofía llena el formulario del anuncio de la clínica a las 7:12 p. m. A las 7:12 p. m. ya tiene un WhatsApp con su nombre, y la vendedora de turno recibe el aviso con un botón para llamarla.',
    friccion: ['Revisar el formulario', 'Pasar el dato al vendedor', 'Escribirle al interesado'],
    conversacion: [
      {
        pregunta: 'Nuevo formulario: Sofía Mora, limpieza dental, 8888 1234.',
        contestacion:
          'Hola Sofía, vimos tu solicitud sobre la limpieza dental. ¿Tienes un momento para una llamada rápida ahora?',
        pieza: {
          tipo: 'linea',
          filas: [
            { momento: '0 s', texto: 'Llegó el formulario del anuncio' },
            { momento: '8 s', texto: 'Guardó el contacto y se lo asignó a Valeria' },
            { momento: '15 s', texto: 'Envió el WhatsApp a Sofía' },
            { momento: '20 s', texto: 'Avisó a Valeria con botón para llamar' },
          ],
        },
      },
    ],
    accion: 'Contactado en menos de un minuto',
    respuesta:
      'Cada formulario recibe un WhatsApp en segundos, queda guardado con su vendedor asignado por turno y tu equipo recibe el aviso para llamar.',
    resguardo:
      'Usa solo mensajes aprobados por WhatsApp para no arriesgar tu cuenta. Si el número no tiene WhatsApp, envía un SMS.',
    beneficio: 'Contesta en menos de un minuto.',
    demo: 'servicios',
    canal: 'whatsapp',
    titulo: 'Nuevo interesado',
  },
  {
    id: 'clientes-que-no-vuelven',
    area: 'ventas',
    categoria: 'clientes-que-vuelven',
    tipo: 'pregunta',
    nichos: ['reservas', 'servicios'],
    aplica: 'Para negocios con clientes recurrentes',
    dolor: 'Sabes que hay clientes que dejaron de venir, pero no cuáles.',
    ejemplo:
      'Andrés nota la barbería más tranquila. Pregunta quién no ha vuelto en dos meses y, con un «sí», el sistema les escribe a los tres por WhatsApp.',
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
      'El sistema encuentra a los clientes que no vuelven y les escribe por ti.',
    beneficio: 'Recupera a los clientes que no vuelven.',
    demo: 'citas',
    canal: 'panel',
    titulo: 'Clientes sin volver',
  },
  {
    id: 'contactos-dormidos',
    area: 'ventas',
    categoria: 'clientes-que-vuelven',
    tipo: 'automatico',
    nichos: ['servicios', 'reservas'],
    aplica: 'Para negocios con contactos sin cerrar',
    dolor: 'Tienes cientos de contactos que preguntaron y nunca compraron.',
    ejemplo:
      'En marzo, 300 personas preguntaron por el gimnasio de Esteban y no se inscribieron. El sistema les escribe en grupos pequeños; Ana responde que sí, y Esteban recibe su conversación para llamarla.',
    friccion: ['Buscar contactos viejos', 'Escribir a cada uno', 'Leer y ordenar respuestas'],
    conversacion: [
      {
        pregunta: 'Hola Ana, ¿sigues buscando un gimnasio cerca o ya lo resolviste?',
        contestacion: 'Ana: «Sí, todavía. ¿Tienen horario temprano?» → La pasé a tu equipo con el contexto.',
        pieza: {
          tipo: 'bandeja',
          filas: [
            { de: 'Ana', asunto: '«Sí, todavía. ¿Tienen horario temprano?»', etiqueta: 'Interesada' },
            { de: 'Jorge', asunto: '«¿Cuánto cuesta el mes?»', etiqueta: 'Duda' },
            { de: 'Luis', asunto: '«BAJA»', etiqueta: 'No contactar' },
          ],
          nota: '30 mensajes cada 2 horas, de 10:00 a. m. a 6:00 p. m.',
        },
      },
    ],
    accion: 'Interesados pasados a tu equipo',
    respuesta:
      'El sistema les escribe a tus contactos dormidos con una pregunta corta, lee cada respuesta y separa a los interesados, las dudas y los que no quieren más mensajes.',
    resguardo:
      'Quien responde STOP, BAJA o CANCELAR sale de la lista al instante. Solo escribe de 10:00 a. m. a 6:00 p. m., en la hora de cada contacto.',
    beneficio: 'Reactiva a quienes preguntaron y no compraron.',
    demo: 'servicios',
    canal: 'whatsapp',
    titulo: 'Respuestas de hoy',
  },
  {
    id: 'promociones-a-mano',
    area: 'ventas',
    categoria: 'clientes-que-vuelven',
    tipo: 'instruccion',
    nichos: ['supermercados', 'reservas', 'pedidos'],
    aplica: 'Para negocios con clientes frecuentes',
    dolor: 'Para mandar una promoción tienes que armar la lista de contactos a mano.',
    ejemplo:
      'Doña Marta quiere mover el café antes de que llegue el nuevo. Pide mandar el 2x1 a quienes lo compran cada semana, y 41 clientes lo reciben con su nombre.',
    friccion: ['Exportar contactos', 'Elegir a quién', 'Enviar uno a uno'],
    conversacion: [
      {
        pregunta: 'Mándale el 2x1 de café a quienes compran café cada semana.',
        contestacion:
          'Listo: encontré 41 clientes que compran café cada semana y ya les envié la promoción con su nombre.',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Buscó a quienes compran café cada semana',
            'Armó el mensaje con el nombre de cada uno',
            'Lo envió por WhatsApp',
            'Te avisa quién la usa en caja',
          ],
        },
      },
    ],
    accion: 'Promoción enviada a 41 clientes',
    respuesta:
      'Le dices a quién y qué ofrecer; el sistema arma la lista, escribe el mensaje y lo envía.',
    beneficio: 'Promociones a la persona correcta.',
    demo: 'pedidos',
    canal: 'whatsapp',
    titulo: 'Promoción',
  },
  {
    id: 'contenido-sin-tiempo',
    area: 'ventas',
    categoria: 'clientes-nuevos',
    tipo: 'automatico',
    nichos: ['servicios', 'reservas'],
    aplica: 'Para negocios que graban videos o en vivo',
    dolor: 'Grabas un video largo y no tienes tiempo de sacarle clips ni publicaciones.',
    ejemplo:
      'La nutricionista Natalia sube a su carpeta el en vivo de una hora del martes. El miércoles en la mañana tiene 4 clips verticales con subtítulos y un post para LinkedIn esperando su visto bueno.',
    friccion: ['Ver el video completo', 'Cortar y subtitular', 'Escribir cada publicación'],
    conversacion: [
      {
        pregunta: 'Se subió «En vivo martes.mp4» a la carpeta de videos largos.',
        contestacion:
          'Encontré los 4 mejores momentos. Los clips y los textos están listos para que los revises.',
        pieza: {
          tipo: 'proceso',
          pasos: [
            'Transcribió el video con sus tiempos',
            'Eligió los 4 momentos más atractivos',
            'Cortó clips verticales con subtítulos',
            'Escribió un hilo y un post para cada clip',
          ],
        },
      },
    ],
    accion: '4 clips y sus textos listos para revisar',
    respuesta:
      'Subes un video largo y el sistema lo transcribe, elige los mejores momentos, los convierte en clips verticales y escribe los textos para tus redes.',
    resguardo:
      'Nada se publica solo: todo queda en estado «listo para revisión». Controla el gasto de cada video para que no haya sorpresas.',
    beneficio: 'Un video, una semana de publicaciones.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Contenido listo',
  },
  {
    id: 'prospeccion-en-frio',
    area: 'ventas',
    categoria: 'clientes-nuevos',
    tipo: 'instruccion',
    nichos: ['servicios'],
    aplica: 'Para negocios que venden a otras empresas',
    dolor: 'Escribir a empresas nuevas toma horas, y los correos genéricos nadie los abre.',
    ejemplo:
      'Rodrigo vende limpieza para oficinas. Sube una lista de 200 empresas y cada correo abre mencionando algo real, como la sede nueva que una de ellas anunció la semana pasada.',
    friccion: ['Investigar cada empresa', 'Escribir cada correo', 'Revisar que el correo exista'],
    conversacion: [
      {
        pregunta: 'Prepara la campaña para esta lista de 200 empresas.',
        contestacion:
          'Listo: 164 correos verificados, cada uno con una primera línea sobre la empresa. 36 descartados por correo inválido.',
        pieza: {
          tipo: 'resumen',
          filas: [
            { etiqueta: 'Investigadas', valor: '200' },
            { etiqueta: 'Verificadas', valor: '164' },
            { etiqueta: 'Por día', valor: '40' },
          ],
        },
      },
    ],
    accion: 'Campaña cargada con 164 correos personalizados',
    respuesta:
      'El sistema investiga cada empresa en su web y su perfil, escribe una primera línea sobre algo que les pasó de verdad y verifica cada correo antes de enviarlo.',
    resguardo:
      'Si no encuentra un dato verificable, usa una plantilla bien segmentada en lugar de inventar. Envía entre 30 y 50 correos por buzón al día para cuidar tu dominio.',
    beneficio: 'Prospecta sin escribir correo por correo.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Campaña de prospección',
  },
  {
    id: 'ventas-dispersas',
    area: 'ventas',
    categoria: 'clientes-nuevos',
    tipo: 'automatico',
    nichos: ['servicios'],
    aplica: 'Para equipos de venta',
    dolor: 'Correo, WhatsApp, llamadas y el CRM van cada uno por su lado.',
    ejemplo:
      'Un prospecto abre el correo de la agencia de Fernanda, responde por WhatsApp y atiende la llamada de la IA. Al pasar el umbral, la demo ya está en la agenda de su vendedor.',
    friccion: ['Revisar cada canal', 'Actualizar el CRM', 'Decidir a quién llamar'],
    conversacion: [
      {
        pregunta: 'Grupo Ortega abrió el correo, respondió por WhatsApp y atendió la llamada.',
        contestacion:
          'Grupo Ortega pasó de 40 a 85 puntos. Creé la oportunidad, le asigné la tarea a Diego y agendé la demo para el jueves.',
        pieza: {
          tipo: 'linea',
          filas: [
            { momento: 'Lun', texto: 'Abrió el correo · 40 puntos' },
            { momento: 'Mar', texto: 'Respondió por WhatsApp · 65 puntos' },
            { momento: 'Mié', texto: 'Atendió la llamada · 85 puntos' },
            { momento: 'Jue', texto: 'Demo agendada con Diego' },
          ],
        },
      },
    ],
    accion: 'Oportunidad creada y demo agendada',
    respuesta:
      'Un solo sistema busca prospectos, les escribe por correo o WhatsApp, suma puntos con cada respuesta y, cuando alguien está listo, agenda la demo con tu vendedor.',
    resguardo: 'Cada contacto existe una sola vez, aunque responda por tres canales distintos.',
    beneficio: 'Todo tu proceso de venta, conectado.',
    demo: 'servicios',
    canal: 'panel',
    titulo: 'Puntaje del prospecto',
  },
]

/** Soluciones por área y, dentro de cada área, por categoría. */
export const solucionesPorArea = (
  ['clientes', 'administracion', 'ventas'] satisfies SolucionArea[]
).map((area) => {
  const grupos = categorias
    .filter((c) => c.area === area)
    .map((c) => ({ ...c, items: soluciones.filter((s) => s.categoria === c.id) }))
  return { area, titulo: areas[area], categorias: grupos, items: grupos.flatMap((g) => g.items) }
})

/** Todas las soluciones en el orden en que se muestran: área,
 * categoría y posición dentro de ella. */
export const solucionesOrdenadas = solucionesPorArea.flatMap((a) => a.items)

/** Número de cada categoría en el orden en que se muestran (01 a N). */
export const numeroCategoria = new Map(categorias.map((c, i) => [c.id, i + 1]))

/** Número de cada solución en ese orden (01 a N). */
export const numeroSolucion = new Map(solucionesOrdenadas.map((s, i) => [s.id, i + 1]))
