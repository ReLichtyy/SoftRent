# Plan de implementación - SoftRent

Fuente: página "Lógica de negocio" de Notion (consultada 2026-09-30). Este plan traduce las secciones 1, 2 y 3 del Notion a fases de trabajo sobre este repositorio.

## 1. Contexto y alcance

Estado actual del repo: landing de una sola página (Vite + React 19 + TypeScript + Tailwind v4) con tokens de las secciones 2.3 y 2.4 ya implementados (`src/styles/tokens.css`), primitivas de UI, tema claro/oscuro y capa de motion (GSAP).

Objetivo final según el Notion: sitio público multi-página + app del cliente + admin de SoftRent, con contenido separado de componentes (`content/` como fuente única) y chatbot con submódulos de conocimiento.

Reglas transversales (secciones 2.1, 2.2 y 3.1 del Notion):
- Todo en español de Costa Rica, trato de usted, frases cortas.
- Sin jerga técnica visible: n8n, RAG, API y webhook no aparecen en la interfaz.
- Contenido separado de componentes: las secciones leen de `content/`.
- Móvil primero: el dueño de la pyme revisa todo desde el celular.
- Sin prueba gratuita: las demos en subdominio reemplazan el trial.
- Los componentes se construyen desde cero; no se migra código de los repos académicos.

## 2. Decisiones cerradas

| Tema | Decisión | Origen |
|---|---|---|
| Framework | Vite + React (repo actual); no migrar a Next por ahora | 3.6.1, realidad del repo |
| Router | react-router-dom v7 | nuevo, necesario para 2.6 |
| Idioma | Solo español | 3.6.7 |
| Precios en el sitio | Montos exactos de 1.4 + "IVA aparte" + nota de implementación única | 3.6.4, 3.4.6 |
| Prueba social | Sin casos reales al lanzar: la sección Resultados muestra métricas de demos marcadas como ejemplo | 3.4.7, 3.6.8 |
| "Iniciar sesión" | No en el navbar para v1; se agrega como texto al lado de "Comenzar" cuando exista la app | 3.3, 3.6.6 |
| Destino del brief | Correo (hola@softrent.com) para v1; luego CRM/base propia | 3.6.5 |
| Demos v1 | Citas publicada (CitasTemplate); Pedidos y Servicios como "próximamente" | 3.6.2 |
| Chatbot en subdominios | Solo en el sitio principal para v1 | 3.6.3 |
| Dominio | softrent.cr pendiente de confirmar; las URL de demos quedan como placeholder deshabilitado | 3.6.9 |

## 3. Arquitectura de rutas (mapa de pantallas, sección 2.6)

Tres superficies con layout propio:

```
/                       Inicio (landing actual, secciones de 3.4)
/soluciones             Soluciones por dolor
/industrias             Industrias: Citas, Pedidos, Servicios
/precios                Planes (3.4.6)
/comenzar               Flujo de diagnóstico (3.4.10)
/casos                  Casos y resultados
/nosotros               Nosotros
/demos                  Galería de demos (3.4.4)

/app                    Inicio de la app: impacto (KPI, "requiere su atención")
/app/bandeja            Conversaciones (bot / humano)
/app/contactos          Contactos y pipeline
/app/agenda             Agenda y pedidos
/app/cobros             Cobros y facturas
/app/automatizaciones   Automatizaciones activas
/app/asistente          Asistente IA: base de conocimiento
/app/plan               Plan y facturación
/app/ajustes            Ajustes y usuarios

/admin/clientes         Clientes y estado de suscripción
/admin/onboarding       Checklist de onboarding
/admin/plantillas       Plantillas por industria
/admin/flujos           Salud de flujos y errores
/admin/consumo          Consumo IA y WhatsApp por cliente
/admin/briefs           Briefs del agente de diagnóstico
```

Layouts:
- `PublicLayout`: NavBar (Soluciones, Demos, Precios, Nosotros + botón Comenzar) y Footer (3.4.1, 3.4.11).
- `AppLayout`: marco de la app del cliente; en móvil, barra inferior Inicio / Bandeja / Agenda / Más (wireframe 2.7).
- `AdminLayout`: barra lateral con las 6 pantallas.

## 4. Fases

### Fase 1 - Router y páginas del mapa de pantallas (sección 2.6) [COMPLETADA]
Alcance: exclusivamente crear las 23 páginas del mapa como esqueletos navegables con el design system actual. Sin chatbot, sin backend, sin auth, sin flujos completos.

Tareas:
1. Instalar react-router-dom y montar `RouterProvider` en `main.tsx`.
2. Crear los tres layouts (`PublicLayout`, `AppLayout`, `AdminLayout`).
3. Crear las 23 páginas en `src/pages/`, cada una con: título, descripción corta y 2 a 4 bloques de contenido de ejemplo con las primitivas existentes (Container, Section, Card, Badge, Button).
4. Reutilizar las secciones actuales del landing en `/`; el resto de páginas públicas hereda NavBar y Footer.
5. App del cliente: KPI tiles y lista "Requiere su atención" según wireframe 2.7 (datos de ejemplo marcados como tal).
6. Estados 404 y redirección `/admin` a `/admin/clientes`.
7. `npm run build` y `npm run lint` en verde.

Criterio de aceptación: desde `/` se llega a cada página del mapa por navegación (o URL directa en el caso de admin), en móvil y desktop, con tema claro y oscuro, sin contenido vacío ni placeholders "lorem".

### Fase 2 - Contenido estructurado (sección 3.2) [COMPLETADA]
1. `src/content/`: demos (con estado publicada/próximamente, IA incluida, plan recomendado), soluciones (dolor, qué hace, beneficio medible, demo relacionada), planes (mensual/anual, límites, add-ons), faq.
2. `src/knowledge/`: `core/softrent` + un archivo por demo (esquema YAML de 3.5).
3. Regla: agregar una demo nueva = una entrada en `content/demos` + un archivo en `knowledge/demos/`, sin tocar componentes.

### Fase 3 - Secciones del sitio público (3.4.2 a 3.4.9) [COMPLETADA]
1. Hero según wireframe 2.7: fondo brand-deep, titular "Su negocio responde, agenda y cobra solo.", CTAs Comenzar / Ver demos, mockup de conversación, franja de confianza (Hecho en Costa Rica, SINPE, facturación electrónica, WhatsApp).
2. Problemas a Soluciones: 4 a 6 tarjetas desde `content/soluciones`, sin jerga técnica.
3. Galería de demos con filtro por industria y estados.
4. Cómo trabajamos: Diagnóstico, Propuesta, Implementación, Acompañamiento, con duración estimada y CTA.
5. Planes: toggle mensual/anual, Crecimiento destacado, límites en números, CTA con plan preseleccionado hacia `/comenzar?plan=crecimiento`.
6. Seguridad y datos: Ley 8968, respaldos, accesos, dónde se procesa la IA, link a privacidad.
7. FAQ (8 a 10 preguntas desde `content/faq`, la misma fuente del chatbot).

### Fase 4 - Flujo Comenzar (3.4.10) [COMPLETADA]
Formulario por pasos en `/comenzar`: industria (tarjetas), dolores (multiselección), datos (nombre, negocio, WhatsApp, correo, tamaño del equipo, consentimiento), confirmación con tiempo de respuesta. Acepta parámetros `demo`, `plan`, `origen`. Validación en tiempo real; menos de 90 segundos en móvil; mismo formato de brief que el chatbot; envío a correo con protección anti-spam.

### Fase 5 - Chatbot (3.5) [COMPLETADA]
1. Componentes: ChatLauncher, ChatWindow, MessageList, Message, QuickReplies, ModuleChip, LeadCapture, Handoff.
2. Enrutador de módulos: core siempre cargado + máximo un submódulo de demo; cambio propuesto, nunca forzado.
3. Precios siempre desde `content/planes`; si no sabe, lo dice y ofrece humano.
4. Captura de lead desde el tercer mensaje o por interés explícito.
5. No funcionales: carga diferida, accesible por teclado y lector de pantalla, límite de mensajes, estados completos (cerrado, abierto, escribiendo, error, fuera de horario, lead enviado).

### Fase 6 - App del cliente [COMPLETADA]
Convertir los esqueletos de la Fase 1 en pantallas funcionales con datos mock: bandeja con estados bot/humano, agenda con recordatorios, cobros con estados y comprobantes, automatizaciones con horas ahorradas, base de conocimiento del asistente, plan y usuarios. Navegación móvil completa según wireframe 2.7.

### Fase 7 - Admin de SoftRent [COMPLETADA]
Clientes y suscripciones (estados de 1.6), checklist de onboarding, plantillas por industria, salud de flujos, consumo por cliente, briefs del diagnóstico.

### Fase 8 - Integraciones backend (1.9)
Supabase (Postgres + auth + RLS por `negocio_id`), WhatsApp Business Cloud API, n8n autoalojado para automatizaciones, proveedor autorizado de facturación electrónica (verificar esquema vigente de Hacienda antes de construir el módulo), Resend para correo transaccional, PostHog para analytics.

### Fase 9 - Lanzamiento
Contraste AA en ambos temas (pendiente documentado: success y warning en claro), páginas legales (privacidad, términos, contrato de encargado), SEO y OG por página, Lighthouse, deploy del sitio y subdominios de demos.

## 5. Guardrails de diseño activos

- `tokens.css` es la fuente única: Inter para interfaz, Play solo display; radios 8/12/16/pill.
- Voz: usted, cercano y directo; nombres de servicio por resultado.
- Sin em-dashes en ningún texto visible; íconos solo de `@phosphor-icons/react`.
- Mobile first con colapso explícito por sección; `min-h-[100dvh]`, nunca `h-screen`.
- Motion con `useScrollReveal` (GSAP) respetando `prefers-reduced-motion`.
- Tema claro/oscuro con `data-theme`; mantener jerarquía y contraste en ambos.
