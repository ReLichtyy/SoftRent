# Catálogo de Activos Visuales para Landing Page — SoftRent

Este directorio contiene la biblioteca oficial de **50 imágenes de alta calidad** diseñadas y organizadas específicamente para el sitio web y landing page de **SoftRent** (plataforma de software a la medida para negocios y empresas de servicios en Costa Rica).

---

## 🎨 Especificaciones del Sistema de Diseño

- **Paleta de Color Oficial:**
  - *Fondo Papel Cálido:* `#f8f6f3` (Light) / `#171513` (Dark)
  - *Superficie:* `#ffffff` / `#211e1b`
  - *Bordes:* `#e5e0d9` / `#37322d`
  - *Acento & Marca SoftRent:* Rojo Carmesí `#ea1b25` / `#d9161f`
  - *Texto & Tinta:* `#171513` (Ink) y `#5f5952` (Muted)
- **Tipografía Editorial:** *Figtree / Segoe UI* (interfaz y lectura rápida) + *Newsreader / Georgia* (titulares editoriales y cifras numéricas).
- **Resolución & Formato:** Formato PNG optimizado, relación de aspecto panorámica 16:9 (1920×1080) y renders de interfaz de alta densidad de píxeles.
- **Ruta de Uso en Vite / React:** `/images/landing/{nombre_de_archivo}.png`

---

## 📑 Índice Completo de las 50 Imágenes

### Categoría 1: Hero, Mockups de Dashboards & Analíticas (01 – 14)

| # | Archivo | Título / Descripción | Sección Recomendada | Texto Alt Sugerido |
|---|---|---|---|---|
| **01** | `01_hero_dashboard.png` | **Dashboard Principal Web:** Vista ejecutiva de KPIs, ingresos diarios, calendario de citas activas y embudo de clientes. | `src/components/sections/Hero.tsx` | "Panel principal del software SoftRent con calendario y métricas de ingresos" |
| **02** | `02_hero_mobile_app.png` | **Aplicación Móvil SoftRent:** Interfaz responsiva en smartphone con alertas en tiempo real, check-in express y botones rápidos. | `src/components/sections/Hero.tsx` / `Producto.tsx` | "Aplicación móvil de SoftRent para gestión de reservas desde el celular" |
| **03** | `03_hero_multidevice.png` | **Showcase Multidispositivo:** Monitor de escritorio y tablet de alta gama sincronizados en un estudio moderno. | `src/components/sections/Hero.tsx` | "SoftRent funcionando sincronizado en monitor de escritorio y tablet" |
| **04** | `04_hero_analytics_executive.png` | **Analítica Ejecutiva de Negocio:** Curvas de crecimiento mensual, costos de adquisición (CAC), suscripciones y valor de vida (LTV). | `src/components/sections/Resultados.tsx` | "Gráficos de analítica ejecutiva y crecimiento de ingresos en SoftRent" |
| **05** | `05_hero_command_center.png` | **Centro de Mando Operativo:** Monitoreo en vivo de despachos, pedidos pendientes, alertas técnicas y cuadrante de horarios. | `src/components/sections/Producto.tsx` | "Centro de mando operativo con programación de turnos y alertas en vivo" |
| **06** | `06_hero_darkmode_dashboard.png` | **Dashboard Modo Oscuro (Dark Theme):** Interfaz nocturna en tonos carbón con acentos carmesí de alto contraste y gráficos interactivos. | `src/components/sections/Hero.tsx` / Toggle Tema | "Panel de control de SoftRent en tema oscuro con indicadores luminosos" |
| **07** | `07_hero_modular_suite.png` | **Suite Modular Interconectada (3D Isometric):** Concepto 3D de módulos independientes (Reservas, Facturación, CRM, Inventario) enlazados al núcleo. | `src/components/sections/ComoTrabajamos.tsx` | "Diagrama 3D isométrico de la suite modular de software SoftRent" |
| **08** | `08_hero_team_collaboration.png` | **Colaboración de Equipo Enterprise:** Lista de miembros, roles granulares (Admin, Operador, Staff), registro de auditoría e índice de productividad. | `/soluciones` (Gestión de Equipo) | "Vista de administración de usuarios y roles de equipo en SoftRent" |
| **09** | `09_hero_quick_actions.png` | **Lanzador de Acciones Rápidas:** Modal emergente para agendar reservas, emitir facturas y enviar recordatorios por WhatsApp en 1 clic. | `src/components/sections/Hero.tsx` | "Ventana emergente de acciones rápidas para agendar y facturar en SoftRent" |
| **10** | `10_hero_workflow_automation.png` | **Constructor de Automatizaciones Visuales:** Flujo conectado por nodos: 'Cita Creada' ➔ 'Validar Inventario' ➔ 'Enviar WhatsApp'. | `src/components/sections/Producto.tsx` | "Diseñador visual de automatizaciones y disparadores de WhatsApp" |
| **11** | `11_feature_reservas_calendar.png` | **Calendario de Reservas Multirrecurso:** Cuadrante horario por salas, especialistas y estados de confirmación codificados por color. | `src/components/sections/Producto.tsx` (Agenda) | "Calendario interactivo de reservas y citas con vista por horarios y salas" |
| **12** | `12_feature_reservas_client_portal.png` | **Portal de Autoservicio para Clientes:** Proceso de reserva paso a paso con selección de servicio, fecha, especialista y pago final. | `/demos/citas` | "Portal web para que los clientes elijan su turno y servicio en línea" |
| **13** | `13_feature_crm_contacts.png` | **Ficha de Cliente & Historial CRM:** Perfil detallado de cliente con gasto acumulado, línea de tiempo de visitas y etiquetas de fidelidad. | `/soluciones` (CRM) | "Ficha de contacto CRM con historial completo de visitas y compras" |
| **14** | `14_hero_laptop_workspace.png` | **MacBook Pro Workspace Mockup:** Portátil sobre escritorio de madera mostrando la pantalla de bienvenida y calendario de SoftRent. | `src/components/sections/Hero.tsx` | "Laptop sobre escritorio de oficina mostrando la plataforma SoftRent" |

---

### Categoría 2: Características & Módulos Core (15 – 22)

| # | Archivo | Título / Descripción | Sección Recomendada | Texto Alt Sugerido |
|---|---|---|---|---|
| **15** | `15_feature_facturacion_pos.png` | **Punto de Venta (POS) & Cobro Ágil:** Catálogo rápido con precios, carrito con IVA 13% y cobro directo por SINPE Móvil o tarjeta. | `src/components/sections/Producto.tsx` (Cobra) | "Terminal de punto de venta con desglose de IVA y cobro por SINPE" |
| **16** | `16_feature_facturacion_digital_receipt.png` | **Factura Electrónica Hacienda v4.3:** Comprobante digital con código QR fiscal, desglose de tarifas y botón de envío a WhatsApp. | `src/components/sections/Producto.tsx` | "Comprobante digital de factura electrónica con código QR para Hacienda" |
| **17** | `17_feature_inventario_stock.png` | **Control de Inventario & Alertas de Stock:** Listado de artículos, existencias en bodega, insumos reservados y alertas de reorden. | `/soluciones` (Inventario) | "Tabla de control de inventario con alertas de stock mínimo" |
| **18** | `18_feature_inventario_rental_assets.png` | **Despacho y Alquiler de Activos:** Seguimiento de contratos vigentes, fechas de despacho, inspección de devolución y depósitos de garantía. | `/soluciones` (Alquiler) | "Gestión de contratos de alquiler de equipos y fechas de devolución" |
| **19** | `19_feature_crm_whatsapp_chat.png` | **Bandeja Unificada de WhatsApp & Bot IA:** Centro de mensajería en vivo con respuestas automáticas, cobro de señas por SINPE y ficha lateral. | `src/components/sections/ChatMockup.tsx` | "Chat de WhatsApp con respuestas automáticas del bot y cobro por SINPE" |
| **20** | `20_feature_reportes_financieros.png` | **Reportes Financieros & Flujo de Caja:** Gráfica de evolución de ingresos semestrales, porcentaje cobrado por SINPE y exportación contable. | `src/components/sections/Resultados.tsx` | "Gráficos financieros con distribución de cobros por SINPE Móvil y tarjeta" |
| **21** | `21_feature_control_empleados.png` | **Equipo, Turnos & Comisiones:** Rendimiento por colaborador, cálculo transparente del 40% de comisión, citas completadas y valoraciones. | `/soluciones` (Colaboradores) | "Tabla de liquidación de comisiones y rendimiento de colaboradores" |
| **22** | `22_feature_notificaciones_multicanal.png` | **Motor de Reglas de Notificación:** Disparadores automáticos a 24h y 2h antes de la cita, encuestas de satisfacción y reenganche a 30 días. | `src/components/sections/Problemas.tsx` | "Panel de configuración de recordatorios automáticos por WhatsApp y SMS" |

---

### Categoría 3: Soluciones por Industria & Banners Editoriales (23 – 36)

| # | Archivo | Título / Descripción | Sección Recomendada | Texto Alt Sugerido |
|---|---|---|---|---|
| **23** | `23_industria_hoteleria_resorts.png` | **SoftRent Hotelería (UI):** Tablero de ocupación de villas y cabañas, tarifas por noche, estado de limpieza y registro de huéspedes. | `src/components/sections/Industrias.tsx` | "Sistema de reservas de habitaciones de hotel y villas vacacionales" |
| **24** | `24_industria_hoteleria_banner.png` | **Banner Hotelería & Hospedaje Boutique:** Fotografía de villa de lujo con tarjeta SoftRent destacando 94% de ocupación directa. | `/industrias/hoteleria` | "Banner de hotel boutique con métricas de reservas sin comisiones de OTA" |
| **25** | `25_industria_comercio_retail.png` | **SoftRent Comercio (UI):** Terminal de caja para tiendas y boutiques con lector de código de barras, stock en vivo y cobro en 12 segundos. | `src/components/sections/Industrias.tsx` | "Sistema de punto de venta y catálogo de productos para tiendas retail" |
| **26** | `26_industria_comercio_banner.png` | **Banner Comercio & Boutiques:** Fotografía de tienda contemporánea con tarjeta SoftRent destacando velocidad de cobro e inventario 99.8%. | `/industrias/retail` | "Banner de tienda comercial moderna con sistema de cobro ágil SoftRent" |
| **27** | `27_industria_logistica_flotas.png` | **SoftRent Logística (UI):** Monitoreo de envíos, camiones en ruta activa, rutas GAM y firma digital en destino. | `src/components/sections/Industrias.tsx` | "Panel de seguimiento de rutas de entrega y flota de camiones de reparto" |
| **28** | `28_industria_logistica_banner.png` | **Banner Logística & Envíos:** Fotografía de centro de distribución con tarjeta SoftRent resaltando 97.4% de puntualidad en entregas. | `/industrias/logistica` | "Banner de centro logístico con métricas de optimización de rutas SoftRent" |
| **29** | `29_industria_restaurantes_cafes.png` | **SoftRent Gastronomía (UI):** Mapa de mesas de terraza y salón principal, capacidad por comensales y reservas con depósito previo. | `src/components/sections/Industrias.tsx` | "Distribución de mesas de restaurante con reservas y abonos de anticipo" |
| **30** | `30_industria_restaurantes_banner.png` | **Banner Restaurantes & Bares:** Fotografía cálida de cafetería/bistro gourmet con tarjeta SoftRent destacando 0% inasistencias. | `/industrias/restaurantes` | "Banner de restaurante gourmet con sistema de reservas por WhatsApp" |
| **31** | `31_industria_salud_clinicas.png` | **SoftRent Salud & Odontología (UI):** Gestión de consultorios médicos, turnos por especialista y expediente confidencial encriptado. | `src/components/sections/Industrias.tsx` | "Agenda médica por consultorios con expediente clínico digital" |
| **32** | `32_industria_salud_banner.png` | **Banner Clínicas & Centros Médicos:** Fotografía de centro clínico vanguardista con tarjeta SoftRent destacando 82% menos ausentismo. | `/industrias/salud` | "Banner de centro médico moderno con agenda automatizada para pacientes" |
| **33** | `33_industria_servicios_estetica.png` | **SoftRent Estética & Barberías (UI):** Agenda de sillas de barbero, catálogo de servicios capilares y control de cobros por SINPE. | `src/components/sections/Industrias.tsx` | "Agenda de turnos por silla de barbero con confirmación inmediata" |
| **34** | `34_industria_servicios_banner.png` | **Banner Barberías & Cuidado Personal:** Fotografía de salón/barbería premium con tarjeta SoftRent destacando +45 citas semanales automáticas. | `/demos/citas` | "Banner de barbería de alta gama con reservas automáticas por WhatsApp" |
| **35** | `35_industria_alquiler_maquinaria.png` | **SoftRent Maquinaria & Equipos (UI):** Flota de mini excavadoras y generadores, horas de uso, pólizas INS y contratos de alquiler activos. | `/industrias/alquiler` | "Control de contratos de alquiler de maquinaria pesada y herramientas" |
| **36** | `36_industria_eventos_espacios.png` | **SoftRent Eventos & Salones (UI):** Calendario de fechas para salones de fiesta, paquetes con catering y seguimiento de depósitos. | `/industrias/eventos` | "Calendario de disponibilidad de salones de eventos y paquetes de bodas" |

---

### Categoría 4: Metodología, Arquitectura & Seguridad (37 – 44)

| # | Archivo | Título / Descripción | Sección Recomendada | Texto Alt Sugerido |
|---|---|---|---|---|
| **37** | `37_proceso_descubrimiento_diseno.png` | **Fase 1: Descubrimiento & Blueprint en 48h:** Mapeo de reglas de negocio, prototipado interactivo y aprobación antes de programar. | `src/components/sections/ComoTrabajamos.tsx` | "Metodología de descubrimiento y prototipado rápido de SoftRent" |
| **38** | `38_proceso_desarrollo_agil.png` | **Fase 2: Desarrollo Ágil en 5 Días:** Cronograma día por día desde configuración de base de datos hasta pruebas de cobro en vivo. | `src/components/sections/ComoTrabajamos.tsx` | "Cronograma de desarrollo ágil e implementación en 5 días de SoftRent" |
| **39** | `39_proceso_integracion_apis.png` | **Arquitectura de Conectividad Oficial:** Núcleo central SoftRent enlazado con WhatsApp Cloud API, SINPE Móvil y Hacienda v4.3. | `src/components/sections/ComoTrabajamos.tsx` | "Diagrama de integración de APIs de WhatsApp, SINPE y Factura Electrónica" |
| **40** | `40_seguridad_encriptacion_cloud.png` | **Seguridad Grado Bancario & RLS:** Aislamiento estricto de bases de datos por negocio, cifrado AES-256 y cumplimiento de Ley 8968. | `src/components/sections/Seguridad.tsx` | "Arquitectura de seguridad en la nube con encriptación AES-256 y Supabase RLS" |
| **41** | `41_seguridad_backup_resiliencia.png` | **Alta Disponibilidad 99.99% & Respaldos:** Instantáneas cada 60 minutos, escalabilidad serverless y monitoreo activo cada 30s. | `src/components/sections/Seguridad.tsx` | "Infraestructura cloud con respaldos automáticos cada hora y SLA 99.99%" |
| **42** | `42_soporte_dedicado_24_7.png` | **Banner Soporte con Ingenieros Locales:** Equipo técnico en Costa Rica con canal directo de WhatsApp y respuesta en <15 min. | `src/components/sections/Seguridad.tsx` / Footer | "Banner de equipo de ingenieros locales brindando soporte 24/7 en Costa Rica" |
| **43** | `43_comparativa_a_medida_vs_generico.png` | **Comparativa SoftRent vs Software Genérico:** Análisis punto a punto: cero comisiones, SINPE nativo y marca propia vs sistemas rígidos. | `src/components/sections/Problemas.tsx` | "Tabla comparativa entre software genérico extranjero y SoftRent a la medida" |
| **44** | `44_roi_crecimiento_escalabilidad.png` | **Retorno de Inversión (ROI 3.4x):** Tarjetas con métricas (+32% reservas, 24h ahorradas, -85% inasistencias) y caso de estudio real. | `src/components/sections/Resultados.tsx` | "Infografía de retorno de inversión y ahorro de horas con SoftRent" |

---

### Categoría 5: Recursos Visuales, Confianza, Testimonios & CTA (45 – 50)

| # | Archivo | Título / Descripción | Sección Recomendada | Texto Alt Sugerido |
|---|---|---|---|---|
| **45** | `45_recurso_satisfaccion_garantia.png` | **Sello de Garantía 100% Hecho en Costa Rica:** Medallón de garantía de satisfacción 30 días, soporte local y cero comisiones ocultas. | `src/components/sections/Hero.tsx` / `PlanesGrid.tsx` | "Sello de garantía 100% Hecho en Costa Rica y satisfacción de SoftRent" |
| **46** | `46_recurso_testimonios_exito.png` | **Historias de Éxito de Clientes Reales:** Tarjetas editoriales con citas de barberías, clínicas y empresas de alquiler (Calificación 4.96/5). | `src/components/sections/Resultados.tsx` | "Testimonios y valoraciones de 5 estrellas de clientes de SoftRent" |
| **47** | `47_recurso_onboarding_pasos.png` | **Ruta de Onboarding en 3 Pasos:** 1. Diagnóstico Gratuito, 2. Calibración & Pruebas en Vivo, 3. Lanzamiento y Cobros Automáticos. | `/comenzar` / `Planes.tsx` | "Ruta de 3 pasos sencillos para implementar SoftRent en un negocio" |
| **48** | `48_recurso_soporte_whatsapp_qr.png` | **Tarjeta Interactiva Código QR para Demo:** Escaneo con celular para probar el bot de reservas interactivo directamente en WhatsApp. | `src/components/sections/Contact.tsx` / Footer | "Tarjeta con código QR para probar la demo interactiva de SoftRent en WhatsApp" |
| **49** | `49_recurso_cta_comenzar_banner.png` | **Banner Final de Conversión (Call to Action):** Fondo oscuro con botón carmesí SoftRent para agendar demostración gratuita en días. | Cierre de Landing / Pre-Footer | "Banner de llamada a la acción para agendar demostración gratuita de SoftRent" |
| **50** | `50_recurso_ecosistema_softrent.png` | **Mapa Holístico del Ecosistema SoftRent:** Las 6 capacidades críticas (Reservas, WhatsApp, SINPE, Facturación, Inventario, Reportes) en 1 sistema. | `/soluciones` / `Hero.tsx` | "Diagrama del ecosistema completo de herramientas interconectadas de SoftRent" |

---

## 💻 Ejemplos de Implementación en Código React

### 1. Utilizar un banner por industria con `CardImage`:
```tsx
import { CardImage } from '../ui/CardImage'

export function SeccionHoteleria() {
  return (
    <CardImage
      imageSrc="/images/landing/24_industria_hoteleria_banner.png"
      imageAlt="SoftRent Hotelería y Hospedaje Boutique"
      badge={{ label: 'Demo en vivo', tone: 'success', dot: true }}
      title="Gestión de Cabañas y Villas sin Comisiones"
      description="Sus huéspedes reservan directamente, pagan el depósito por SINPE Móvil y reciben el voucher en WhatsApp."
      href="/demos/hoteleria"
      ctaLabel="Ver sistema en vivo"
    />
  )
}
```

### 2. Mostrar la comparativa de software en `Problemas.tsx`:
```tsx
export function SeccionComparativa() {
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-border shadow-md">
      <img
        src="/images/landing/43_comparativa_a_medida_vs_generico.png"
        alt="Comparativa entre software a la medida SoftRent y software genérico"
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </div>
  )
}
```

### 3. Integrar el banner final de conversión antes del Footer:
```tsx
export function SeccionFinalCTA() {
  return (
    <div className="relative my-16 overflow-hidden rounded-3xl">
      <img
        src="/images/landing/49_recurso_cta_comenzar_banner.png"
        alt="Comience con SoftRent hoy"
        className="w-full h-auto object-cover"
      />
    </div>
  )
}
```
