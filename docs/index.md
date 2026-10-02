# Sistema de diseño SoftRent

Documentación de los componentes del sitio principal. Fuente única de diseño:
[`src/styles/tokens.css`](../src/styles/tokens.css), basado en la página
"Lógica de negocio" del Notion (secciones 2.3–2.4).

## Temas

- Tema **oscuro por defecto**; el claro se activa con la elección del
  usuario (`data-theme` en `<html>`).
- La utilidades de Tailwind resuelven variables en vivo (`bg-accent` →
  `var(--accent)`), así que cambiar de tema no regenera CSS.
- La elección del usuario persiste en `localStorage` (`softrent-theme`);
  sin elección, el sitio queda en oscuro.

## Índice

### Primitivas (`components/ui/`)

| Componente | Qué es |
| --- | --- |
| [Button](ui/button.md) | Acción o enlace con forma de botón |
| [Link](ui/link.md) | Enlace de texto |
| [LinkButton](ui/linkbutton.md) | Enlace interno con forma de botón |
| [KpiTile](ui/kpi-tile.md) | Cifra destacada con su etiqueta |
| [CardImage](ui/card-image.md) | Tarjeta con portada, distintivo y acción |
| [Skeleton](ui/skeleton.md) | Marcador de carga sin saltos de diseño |
| [Badge](ui/badge.md) | Distintivo pill para estados y categorías |
| [Card](ui/card.md) | Contenedor con borde y superficie |
| [Input](ui/input.md) | Campo de texto con etiqueta y error |
| [Select](ui/select.md) | Selector nativo con etiqueta y error |
| [Textarea](ui/textarea.md) | Área de texto multilínea |
| [Checkbox](ui/checkbox.md) | Casilla de verificación con etiqueta |
| [DragAndDrop](ui/draganddrop.md) | Zona de arrastre para archivos de contexto |
| [Modal](ui/modal.md) | Diálogo accesible con vista rápida |
| [Toggle](ui/toggle.md) | Interruptor tipo switch |
| [PhoneMockup](ui/phone-mockup.md) | Marco de teléfono con pantalla de app |

### Layout (`components/layout/`)

| Componente | Qué es |
| --- | --- |
| [Container](layout/container.md) | Ancho máximo de página |
| [Section](layout/section.md) | Sección de página con tonos de fondo |
| [PageTransition](layout/page-transition.md) | Transición de página en cada cambio de ruta |

### Utilidades (`lib/`)

| Utilidad | Qué es |
| --- | --- |
| [cn](lib/cn.md) | Combinación de clases con resolución de conflictos |
| [useTheme](lib/use-theme.md) | Tema oscuro por defecto, persistente |

## Tokens

Fuente: sistema de diseño SoftRent v2 ("papel tibio, una señal roja"). El
rojo del logo aparece pocas veces: acción primaria, controles marcados y el
punto de marca. Cada rol existe en claro y oscuro.

Color (claro / oscuro):

| Token (utilidad) | Claro | Oscuro | Uso |
| --- | --- | --- | --- |
| `bg` | `#F8F6F3` | `#0F0E0D` | Fondo de página (papel) |
| `surface` | `#FFFFFF` | `#181715` | Tarjetas, paneles, inputs, diálogos |
| `surface-sunken` | `#F1EEE9` | `#1B1917` | Hover, relleno hundido, skeletons |
| `surface-inverse` | `#171513` | `#2B2824` | Banda nocturna (hero, footer, CTA final); wordmark |
| `border` | `#E5E0D9` | `#2E2B27` | Líneas finas decorativas |
| `border-strong` | `#8C847B` | `#6F685F` | Contorno de controles (3:1) |
| `ink` / `ink-muted` / `ink-subtle` | `#171513` / `#5F5952` / `#6E675F` | `#F3F0EB` / `#A8A198` / `#948D84` | Texto primario, secundario, terciario |
| `ink-inverse` | `#F3F0EB` | `#F3F0EB` | Texto sobre `surface-inverse` |
| `brand` | `#EA1B25` | `#EA1B25` | Rojo exacto del logo: marcas y puntos, no texto ni botones |
| `accent` / `accent-hover` / `accent-active` | `#D9161F` / `#C0121B` / `#A80F17` | igual | Botón primario, controles marcados |
| `on-accent` | `#FFFFFF` | `#FFFFFF` | Texto sobre `accent` |
| `accent-text` / `accent-soft` | `#C8131C` / `#FDECEB` | `#FF6B70` / `#3A1416` | Palabras en rojo; fondo del badge accent |
| `focus` (`--focus-ring`) | `#D9161F` | `#FF3B44` | Anillo de foco de 2 px |
| `success` · `warning` · `danger` · `info` | `#1D7348` · `#8F5B00` · `#B2410C` · `#245F9E` | `#4CC38A` · `#E2A93F` · `#F2804F` · `#6AAEF0` | Estados; cada uno con su `-soft`. `danger` es naranja quemado a propósito: el error nunca se ve como CTA |
| `scrim` | `rgba(23,21,19,.44)` | `rgba(0,0,0,.64)` | Fondo tras diálogos |

Los planes ya no tienen color propio: se distinguen por posición y palabras;
el recomendado es la única tarjeta `Card tone="inverse"`.

Tipografía (autoalojada en `src/assets/fonts`): **Figtree** para la interfaz
y **Newsreader** (un solo peso, `font-display`) para titulares editoriales,
títulos de diálogo y cifras grandes. Utilidades: `text-display-xl|lg|md|sm`
(72 · 56 · 40 · 28 px), `text-heading-lg|md|sm` (22 · 18 · 15 px, 600),
`text-label`, `text-caption`, `text-eyebrow`; la escala `text-xs…5xl` coincide
con ella (12 · 14 · 16 · 18 · 22 · 28 · 40 · 56 · 72). En la app del cliente y
el admin, Newsreader solo va en títulos de página y cifras grandes.

Radios: `rounded-xs` 6 (casillas) · `rounded-sm` 10 (controles) ·
`rounded-md` 16 (tarjetas) · `rounded-lg` 24 (diálogos) · pill.
Sombras: `shadow-xs|sm|md|lg` (planas por defecto; la sombra significa "flota").
Alturas de control: 32 / 40 / 48 px (`h-8`, `h-10`, `h-12`). Valores de campos a 16 px.
Movimiento: 120 / 200 / 320 ms, `ease-out` al entrar, `ease-in` al salir.

## Marca

- `src/assets/brand/softrent-symbol.png` — símbolo "S" (favicon, barra superior).
  Componente `LogoSymbol`. Espacio libre: media anchura; mínimo 20 px.
- `src/assets/brand/softrent-wordmark.png` — wordmark con "RENT · MANAGE · GROW".
  Componente `LogoWordmark`. **Solo sobre `surface-inverse`**.
- `Logo` = símbolo + "SoftRent" en Figtree 700, para fondo de papel.

## Contraste AA

Todos los pares de texto cumplen AA en ambos temas (tabla completa en el sistema
de diseño, sección Accesibilidad). No usar `brand` como color de texto ni de
relleno de botón (blanco sobre `brand` = 4,49:1): para eso existen `accent` y
`accent-text`.
