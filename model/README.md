# Vista de prueba SoftRent IA

Desde la raíz `SoftRent/`, ejecutar `npm run dev -- --host 127.0.0.1` y abrir `/model/index.html` en la dirección que indique Vite.

## Concepto

Titular: **Tu negocio, potenciado por IA.** / **Pregunta. Agenda. Haz que avance.**

El hero está integrado en la página principal mediante `src/components/sections/Hero.tsx`. Reutiliza `HeroLiveDemo.tsx` con la opción `showcase`: **Preguntar a la IA**, **Chat** y **Agenda**. Una cita agendada desde el chat se refleja en la agenda. El componente conserva sus cinco vistas cuando se usa sin `showcase`.

Los datos y las acciones son simulados, como en el hero original. No se conecta un modelo de IA ni se envían mensajes reales. El panel mantiene la identidad de SoftRent: logo, Figtree, Newsreader, colores y componentes existentes.

## Archivos

- `index.html`, `preview.css`, `preview.js`: página de prueba y navegación.
- `canvas.html`: canvas de ideas, recorridos actuales, estados y propuestas pendientes.
- `main-canvas.html`, `main-canvas.css`: la **base principal 04**, estática y sin selector de variantes. Las opciones 01–03 se retiraron. Industrias enlaza a las soluciones filtradas y una franja intermedia conduce a `/comenzar`.
- `assets/softrent-reservas-real.png`: captura real del portal público de reservas, con enlace al sistema publicado; no es una maqueta ni una captura de la agenda administrativa.

- `live-demo.html`, `live-demo.tsx`, `live-demo.css`: montaje React del hero existente. El iframe aísla sus estilos Tailwind de los estilos de la página.
- `contours.svg`: fondo Relieve.

La base prioriza reservas, comunicación y facturación. Conserva seis funciones: atención fuera de horario, recordatorios con reprogramación, clientes que no vuelven, pedidos por chat, emisión de comprobantes y cierre de caja. Los textos «Para negocios/comercios con…» usan una taxonomía uniforme. El ejemplo de comprobante sigue la propuesta del usuario y enlaza a `herramientas-sueltas`, que describe la facturación en `src/content/soluciones.ts`. Los otros ejemplos también enlazan al flujo correspondiente. Las cifras de estos ejemplos son ilustrativas, no métricas de ahorro ni acciones reales.

La captura se obtuvo el 7 de octubre de 2026 desde `https://mivps-217-77-11-250.sslip.io/citas/reservar`, recorriendo las opciones públicas hasta fecha y horario. No se confirmó ninguna cita. El canvas usa la imagen estática para conservar la revisión sin motion y abre el portal real en una pestaña nueva.

La ventana está centrada sobre un fondo oscuro de cuadrícula. Se retiraron el selector de ambientes y la franja inferior de tres columnas. Debajo del encabezado aparece **Pregúntale a tu negocio | Automatiza tareas**. El enlace **Explorar demos** lleva a `/demos`.

## Dirección Creative

Se conserva la versión oscura aprobada: panel central compacto y tarjetas laterales de contexto con movimiento suave. Se eliminaron el párrafo bajo el título, la leyenda exterior y los encabezados repetidos del marco. Las pestañas, mensajes y gráficos tienen transiciones; el icono de pausa permite detenerlas. Se respeta la preferencia de movimiento reducido del dispositivo.

Chat y Agenda comparten un indicador de actividad: aparece cuando hay mensajes del asistente o una cita, respectivamente, y esa vista no está seleccionada. Al abrir la pestaña se oculta; al salir vuelve a mostrarse mientras exista esa actividad. Los indicadores tienen una descripción accesible.

## Verificación

La base 04 está integrada después de `RubrosCarousel` en el main mediante `HomeBusiness.tsx`, con estilos limitados a `.home-business`. Reutiliza `Container`, `LinkButton`, la marca y el footer compartido en una variante compacta. La captura se importa desde `src/assets/home/` para incluirla en producción; el enlace público se obtiene del catálogo de demos. Estas secciones son estáticas y conservan la navegación interna del sitio.

La integración se comprobó en navegador a 320, 390, 768, 1024 y 1440 px: sin desbordamiento en el contenido nuevo, seis enlaces que desplazan a su solución, filtros por industria, CTA hacia Comenzar y Demos, y una sola instancia del footer. `ScrollRestoration` gestiona los destinos con fragmento y el desplazamiento al cambiar de página. Build, lint y revisiones React/TypeScript completos.

Build y lint del sitio; revisión React y TypeScript; pruebas en navegador de las tres pestañas, consulta inicial, cita creada y reflejada en agenda, navegación por teclado, movimiento reducido y anchos de 320 y 390 px. La entrada de `model/` se sirve con Vite y no se incluye en el build de producción; la página principal monta los componentes directamente, sin iframe.

## Soluciones (octubre 2026)

- `soluciones-canvas.html`: canvas con dos iteraciones de lógica para `/soluciones` (01 Escenas, 02 Historias en filas), la tabla de decisión y el catálogo final. Se implementó la 02.
- La página usa el lenguaje de la base 04 (`home-business.css`) más `src/styles/soluciones.css`, tuteo y una escena humana por solución (`ejemplo` en `src/content/soluciones.ts`).
- Se sumaron nueve soluciones de `automationz.md` (correo, cobros, contenido, prospección, agente web, respuesta en menos de un minuto, contactos dormidos, voz y motor de ventas) con su resguardo, y un tercer tipo: `automatico` («Pasa solo»).
- `legacy-soluciones/`: componentes de la versión anterior (escenas con GSAP), fuera del build.

### Ajuste posterior

- Cada solución es ahora título + la escena que la explica → flecha → artefacto (`SolucionFila`, `FlechaSolucion`, `ArtefactoSolucion`, recuperados de la versión anterior y adaptados al tuteo, al tipo «Pasa solo» y a las piezas `bandeja` y `linea`). Se quitaron «Cómo funciona», «Lo quiero en mi negocio», las etiquetas «Para negocios…», los rótulos en mayúsculas y la sección «Tres formas de que pase».
- Hero con la imagen de identidad: `src/assets/soluciones/nave.webp` (original en `assets/soluciones-nave.png`, generada con IA).
- La barra superior abre menús a pantalla completa para Soluciones y Nosotros (`src/components/nav/NavMegaMenu.tsx`).
- `legacy-soluciones/MuestraSolucion.tsx`: la muestra compacta de la iteración 02, fuera del build.
