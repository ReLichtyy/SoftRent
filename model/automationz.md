1. Gestión de Email Inteligente (02:29)
Alcance Operativo: Procesamiento en segundo plano de bandejas de entrada para categorizar mensajes entrantes, extraer información transaccional/operativa y redactar borradores automáticos adaptados al tono de la empresa sin intervención manual inicial.

Requerimientos Técnicos e Integraciones:

Credenciales de Google Cloud Console con proyecto configurado y scopes OAuth 2.0 aprobados: gmail.modify, gmail.readonly, gmail.compose.

Instancia de n8n (Cloud o Self-hosted) con Webhook receptor o nodo Gmail Trigger configurado por polling o Google Cloud Pub/Sub.

API Key de OpenAI / Anthropic con acceso a modelos rápidos para clasificación (gpt-4o-mini, claude-3-5-haiku) y modelos avanzados para redacción (gpt-4o, claude-3-5-sonnet).

Lógica Funcional del Flujo:

Trigger: Detección de correo no leído en la bandeja principal.

Filtrado: Descarte de notificaciones automáticas (no-reply), newsletters y promociones mediante reglas regex.

Clasificación: El LLM analiza el cuerpo del mensaje y devuelve un JSON estructurado con: categoría (Soporte, Venta, Facturación, Urgente), nivel de prioridad (1-5) y resumen en una frase.

Extracción: Captura de entidades clave (nombres, fechas límites, números de pedido, enlaces).

Acción: Aplicación de etiquetas nativas en Gmail y generación de un borrador (Draft) con respuesta sugerida para que el usuario solo deba revisarlo y pulsar "Enviar".

Gobernanza y Seguridad:

Anonimización o enmascaramiento de datos personales (PII) antes de enviarlos a la API del modelo si la normativa lo exige (GDPR).

Política de Human-in-the-Loop: ningún correo se envía automáticamente de forma directa; siempre se almacena como borrador.

2. Seguimiento Automatizado de Facturas (05:24)
Alcance Operativo: Monitoreo de estados de pago en la plataforma contable y ejecución de cobros escalonados por correo y canales internos para reducir el Período Medio de Cobro (PMC).

Requerimientos Técnicos e Integraciones:

Acceso de lectura y webhooks a la API del software de facturación (Stripe API, QuickBooks, Xero o Holded).

Conexión SMTP o API de mensajería (Gmail, Microsoft 365, SendGrid) para comunicaciones con clientes.

Webhook entrante de Slack o Microsoft Teams para notificaciones internas al equipo de finanzas.

Base de datos ligera o almacén de estados (Supabase, PostgreSQL o Data Tables de n8n) para registrar historiales de notificación e idempotencia.

Lógica Funcional del Flujo:

Trigger: Ejecución programada diaria (cron a las 09:00 AM) o evento de webhook invoice.payment_failed / invoice.overdue.

Evaluación de Cadencia: Cálculo de días transcurridos tras el vencimiento:

Día +1 a +3: Recordatorio preventivo amable con enlace de pago directo.

Día +7: Recordatorio formal solicitando comprobante de transferencia.

Día +15: Notificación de suspensión de servicio y alerta automática en el canal de Slack #finanzas-cobranzas.

Verificación: Consulta a la API contable antes de cada envío para descartar pagos asentados en los últimos minutos.

Gobernanza y Seguridad:

Control estricto de idempotencia para evitar envíos dobles o cobros sobre facturas en disputa.

Bloqueo de correos a clientes marcados con la etiqueta manual exento_seguimiento en el CRM.

3. Reutilización de Contenido (Content Repurposing) (07:22)
Alcance Operativo: Transformación desatendida de videos largos (podcasts, webinars, directos) en microcontenidos verticales para TikTok/Reels/Shorts y piezas escritas para X y LinkedIn.

Requerimientos Técnicos e Integraciones:

Almacenamiento en la nube (Google Drive, Dropbox o AWS S3) con carpetas sincronizadas.

API de transcripción y marcas de tiempo (Whisper de OpenAI o Deepgram).

API de recorte y edición con IA (OpusClip API, Submagic API o Vizard).

API de redes sociales o programadores de contenido (Buffer API, Metricool o Make/n8n hacia LinkedIn/Twitter APIs).

Espacio de trabajo en Notion o Airtable para control editorial.

Lógica Funcional del Flujo:

Trigger: Carga de archivo .mp4 en la carpeta Inputs_Largo de Google Drive.

Transcripción: Extracción de audio y generación de archivo .srt o .json con timestamps a nivel de palabra.

Detección de Ganchos: Un LLM analiza el texto completo e identifica los 3-5 momentos más atractivos (gancho, retención, llamada a la acción).

Renderizado de Video: Envío de timestamps a la herramienta de recorte (ej. OpusClip) para aplicar subtítulos dinámicos y encuadre 9:16.

Generación de Texto: El LLM redacta un hilo de X y un post de LinkedIn alineados al contenido de cada clip.

Output: Volcado del material (video renderizado + copies) en una base de datos de Notion en estado "Listo para revisión".

Gobernanza y Seguridad:

Compresión previa de audio para evitar superar los límites de carga (máx. 25 MB en Whisper API).

Monitoreo y control de créditos en APIs de renderizado de video para evitar sobrecostes.

4. Cold Email Personalizado a Escala (09:47)
Alcance Operativo: Prospección en frío B2B con enriquecimiento de datos de múltiples fuentes e hiperpersonalización del primer párrafo para maximizar tasas de apertura y respuesta.

Requerimientos Técnicos e Integraciones:

Cuenta en Clay con créditos de búsqueda web y scrapers.

APIs de enriquecimiento B2B (Apollo.io, Prospeo, Scrapin o Hunter).

API de validación de entregabilidad (Bouncer o NeverBounce).

API de OpenAI (gpt-4o-mini para tareas de extracción, gpt-4o para redacción).

Plataforma de envío en frío (Instantly.ai o Smartlead.ai) con dominios secundarios configurados (SPF, DKIM, DMARC activos).

Lógica Funcional del Flujo:

Ingesta: Importación de leads con nombre, cargo, empresa y URL de LinkedIn.

Scraping: Clay visita la web de la empresa y el perfil de LinkedIn para extraer hitos recientes (nuevas contrataciones, rondas de inversión, publicaciones destacadas).

Generación de Icebreaker: Prompt con instrucciones de estilo estructuradas: "Redacta un comentario de apertura de 1-2 frases mencionando [Hito_Empresa] sin adular y enlazando de forma natural con el problema X".

Validación: Comprobación del correo corporativo mediante Bouncer; si el resultado no es deliverable, se descarta el lead.

Exportación: Carga de los contactos validados en la campaña correspondiente de Instantly/Smartlead con las variables dinámicas asignadas.

Gobernanza y Seguridad:

Fallback automático: si el scraping no arroja datos verificables, se usa una plantilla genérica bien segmentada para evitar alucinaciones.

Límites de calentamiento (warmup) y topes diarios de 30-50 correos por bandeja para proteger la reputación del dominio.

5. Agente Web y Atención al Cliente con RAG (12:01)
Alcance Operativo: Chatbot conversacional 24/7 embebido en la web que responde dudas técnicas y comerciales basadas en documentación interna, captura datos de contacto y transfiere a humanos.

Requerimientos Técnicos e Integraciones:

Plataforma conversacional (Voiceflow o Typebot).

Base de conocimiento estructurada (vectorial nativa o Pinecone/Qdrant alimentada con PDFs, URLs o bases Notion).

Modelo LLM con baja latencia (OpenAI gpt-4o-mini o Anthropic claude-3-5-haiku).

Webhook hacia CRM (HubSpot, GoHighLevel o Pipedrive) para volcado de leads cualificados.

Lógica Funcional del Flujo:

Interacción: El visitante formula una pregunta en el widget web.

Búsqueda Semántica (RAG): El motor recupera los fragmentos de texto más relevantes de la documentación de la empresa.

Generación con Guardrails: El LLM responde citando únicamente la información provista; si no la tiene, ofrece conectar con un asesor.

Cualificación: Si el usuario muestra intención de compra, el bot solicita nombre, correo, empresa y tamaño de presupuesto.

Handoff / Agendamiento: Inserción del lead en el CRM con el historial de chat y despliegue del widget de agenda para reservar reunión.

Gobernanza y Seguridad:

Filtros de inyección de prompts para evitar que el bot adopte personalidades no autorizadas o revele instrucciones del sistema.

Política de retención de historial por sesión para evitar que datos personales queden expuestos a otros usuarios.

6. Speed to Lead (Respuesta Sub-Minuto) (14:11)
Alcance Operativo: Notificación y primer contacto multicanal instantáneo (< 60 segundos) en cuanto un prospecto completa un formulario publicitario o de landing page.

Requerimientos Técnicos e Integraciones:

Webhooks entrantes de fuentes de captura (Meta Ads Lead Forms, Google Lead Forms, Typeform, Webflow).

API oficial de WhatsApp Business (Cloud API directa o vía Twilio, 360dialog, ManyChat).

Proveedor de telefonía/SMS como fallback (Twilio).

CRM central (HubSpot, Salesforce, Pipedrive) y canal de comunicación interna (Slack/Telegram).

Lógica Funcional del Flujo:

Trigger: Recepción instantánea del payload del formulario.

Normalización de Datos: Validación y formato del número telefónico en estándar internacional (E.164).

Creación en CRM: Alta del contacto, asignación de etapa ("Nuevo Lead") y reparto del contacto al vendedor en turno mediante regla Round-Robin.

Disparo al Lead: Envío inmediato de plantilla autorizada de WhatsApp ("Hola [Nombre], vimos tu solicitud sobre [Servicio]. ¿Tienes disponibilidad para una llamada rápida ahora?").

Alerta Interna: Mensaje a Slack/Telegram con botón directo de llamada para que el vendedor contacte al lead de inmediato.

Gobernanza y Seguridad:

Uso de plantillas pre-aprobadas en Meta para evitar bloqueos de la cuenta de WhatsApp Business.

Plan de contingencia: si la API de WhatsApp reporta fallo (ej. número sin cuenta), envío inmediato de SMS de respaldo.

7. Reactivación de Leads Inactivos (16:16)
Alcance Operativo: Extracción y reenganche automático de contactos dormidos de la base de datos mediante secuencias conversacionales de bajo compromiso en SMS o WhatsApp.

Requerimientos Técnicos e Integraciones:

Base de datos en CRM (GoHighLevel, HubSpot o ActiveCampaign).

Proveedor de mensajería masiva compatible con bidireccionalidad (Twilio SMS o WhatsApp Cloud API).

Instancia de n8n o workflows internos del CRM para orquestar esperas, respuestas y ramificaciones.

LLM para clasificación de intención de las respuestas recibidas.

Lógica Funcional del Flujo:

Segmentación: Filtrado de contactos con estado "Sin actividad comercial en > 90 días", sin tratos abiertos y con teléfono verificado.

Disparo Escalonado (Drip): Envío de lotes pequeños (ej. 30 mensajes cada 2 horas) con un gancho directo y corto: "Hola [Nombre], ¿sigues trabajando en [Objetivo/Proyecto] o ya lo resolviste?".

Análisis de Respuesta: Al recibir respuesta, un LLM clasifica el mensaje:

Interés positivo: Pausa la automatización, actualiza el estado a "Lead Reactivado" y notifica al comercial con el contexto.

Objeción/Duda: El bot ofrece una respuesta básica y orienta al agendamiento.

Negativa / Opt-out: Etiqueta el contacto como "No contactar" y lo retira de la lista.

Gobernanza y Seguridad:

Procesamiento automático e inmediato de palabras clave de baja (STOP, BAJA, CANCELAR).

Respeto a ventanas horarias locales (solo envíos entre 10:00 y 18:00 en la zona horaria del lead).

8. Recepcionista de Voz IA (Voice Agent) (18:24)
Alcance Operativo: Agente de voz telefónico autónomo que atiende llamadas entrantes o realiza llamadas de confirmación, mantiene conversaciones fluidas de baja latencia y gestiona citas en el calendario.

Requerimientos Técnicos e Integraciones:

Plataforma de voz conversacional de baja latencia (Vapi.ai, Retell AI o Bland.ai).

Motores de voz: Speech-to-Text (Deepgram Nova-2), LLM (gpt-4o-mini o claude-3-5-haiku), Text-to-Speech (Cartesia o ElevenLabs Turbo v2).

Troncal SIP o número telefónico provisto por Twilio.

Integración de calendario (Google Calendar API, Cal.com o Calendly).

Webhook a n8n o Make para ejecución de funciones (Function Calling).

Lógica Funcional del Flujo:

Trigger: Llamada entrante al número corporativo.

Conversación: El agente saluda, identifica el motivo de la llamada y responde preguntas frecuentes con latencia inferior a 800 ms.

Function Calling (Consulta de Huecos): Cuando el cliente solicita una cita, el agente ejecuta una herramienta conectada a n8n que lee los slots libres del calendario en tiempo real.

Function Calling (Reserva): Tras confirmar día y hora con el usuario, el agente crea el evento en Google Calendar y recopila nombre y correo.

Cierre: Envío de confirmación por SMS y transferencia de llamada en vivo (Warm Transfer) a un operador si se detecta una emergencia.

Gobernanza y Seguridad:

Configuración de interrupciones (Barge-in activado) para que el agente calle inmediatamente si el interlocutor habla.

Grabación y transcripción almacenadas en base de datos para auditoría y mejora continua de los prompts.

9. Motor de Ventas Integral (End-to-End Sales Engine) (20:34)
Alcance Operativo: Ecosistema comercial unificado que articula prospección en frío, enriquecimiento, cualificación multicanal, actualización de pipeline y reporting sin fricciones entre herramientas aisladas.

Requerimientos Técnicos e Integraciones:

Orquestador central de lógica (n8n en servidor dedicado con PostgreSQL).

Base de datos transaccional centralizada (Supabase o Postgres) para unificar identificadores de contactos.

APIs de prospección y scraping (LinkedIn Sales Navigator via PhantomBuster/Apify, Apollo API).

Plataformas de ejecución: Instantly (Email), ManyChat/Twilio (WhatsApp), Voice agent (Vapi).

CRM corporativo con API bidireccional (HubSpot o Pipedrive).

Dashboard de analítica y métricas (PostgreSQL + Metabase / Grafana).

Lógica Funcional del Flujo:

Fase 1 (Adquisición): Extracción continua de leads según Perfil de Cliente Ideal (ICP) y enriquecimiento con validación de datos.

Fase 2 (Activación Multicanal):

Si hay email válido -> Cadencia en frío personalizada.

Si hay teléfono móvil -> Campaña de WhatsApp o llamada asistida por voz IA.

Fase 3 (Sincronización en CRM): Todo evento (apertura, clic, respuesta positiva, llamada completada) actualiza el Lead Score en tiempo real.

Fase 4 (Cierre y Conversión): Al alcanzar el umbral de cualificación, el sistema genera la oportunidad comercial, asigna tareas al Account Executive (AE) y agenda la demo.