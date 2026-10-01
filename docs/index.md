# Sistema de diseño SoftRent

Documentación de los componentes del sitio principal. Fuente única de diseño:
[`src/styles/tokens.css`](../src/styles/tokens.css), basado en la página
"Lógica de negocio" del Notion (secciones 2.3–2.4).

## Temas

- Tema claro por defecto; el oscuro se activa con `data-theme="dark"` en `<html>`.
- La utilidades de Tailwind resuelven variables en vivo (`bg-brand` →
  `var(--brand)`), así que cambiar de tema no regenera CSS.
- La elección del usuario persiste en `localStorage` (`softrent-theme`);
  sin elección, sigue la preferencia del sistema.

## Índice

### Primitivas (`components/ui/`)

| Componente | Qué es |
| --- | --- |
| [Button](ui/button.md) | Acción o enlace con forma de botón |
| [Link](ui/link.md) | Enlace de texto |
| [Badge](ui/badge.md) | Distintivo pill para estados y categorías |
| [Card](ui/card.md) | Contenedor con borde y superficie |
| [Input](ui/input.md) | Campo de texto con etiqueta y error |
| [Select](ui/select.md) | Selector nativo con etiqueta y error |
| [Textarea](ui/textarea.md) | Área de texto multilínea |
| [Checkbox](ui/checkbox.md) | Casilla de verificación con etiqueta |
| [Toggle](ui/toggle.md) | Interruptor tipo switch |

### Layout (`components/layout/`)

| Componente | Qué es |
| --- | --- |
| [Container](layout/container.md) | Ancho máximo de página |
| [Section](layout/section.md) | Sección de página con tonos de fondo |

### Utilidades (`lib/`)

| Utilidad | Qué es |
| --- | --- |
| [cn](lib/cn.md) | Combinación de clases con resolución de conflictos |
| [useTheme](lib/use-theme.md) | Tema claro/oscuro persistente |

## Tokens

Color (claro / oscuro):

| Token | Claro | Oscuro | Uso |
| --- | --- | --- | --- |
| `--brand` | `#D8182A` | `#F0374A` | CTA principal, links, foco |
| `--brand-hover` | `#B31222` | `#FF5566` | Hover / presionado |
| `--brand-deep` | `#400517` | `#400517` | Hero y bloques de marca |
| `--on-brand` | `#FFFFFF` | `#0C0A0B` | Texto sobre la marca |
| `--on-deep` | `#FAF8F8` | `#FAF8F8` | Texto sobre brand-deep |
| `--bg` | `#FAF8F8` | `#0C0A0B` | Fondo de página |
| `--surface` | `#FFFFFF` | `#171314` | Tarjetas, paneles |
| `--surface-2` | `#F3EEEE` | `#221B1C` | Inputs, filas alternas |
| `--border` | `#E5DEDF` | `#3A2C2E` | Bordes y divisores |
| `--text` | `#161214` | `#EEEAEA` | Texto principal |
| `--text-muted` | `#5F585B` | `#A0979A` | Texto secundario |
| `--success` | `#2E8B57` | `#4CC38A` | Pagado, confirmado |
| `--warning` | `#B7791F` | `#E0A93B` | Por vencer, pendiente |
| `--danger` | `#C2410C` | `#F07A45` | Error, moroso (≠ marca) |
| `--info` | `#1F6FA8` | `#5AA9E6` | Bot / IA, avisos neutros |

Colores de plan: `--plan-arranque #437A22` · `--plan-crecimiento #006494` ·
`--plan-pro #A8841C` · `--plan-medida #400517`.

Tipografía: **Inter** para toda la interfaz, **Play** solo para logotipo y
titulares (`font-display`). Escala: 12 · 14 · 16 (base) · 20 · 24 · 32 · 48;
interlineado 1,5 en texto y 1,15 en titulares.

Radios: 8 px (inputs, botones) · 12 px (tarjetas) · 16 px (modales) · pill
(distintivos).

## Contraste AA (verificado, WCAG 2.1)

| Par | Ratio | Resultado |
| --- | --- | --- |
| Texto / fondo (claro y oscuro) | 17.55 / 16.54 | AA |
| Texto secundario / fondo (ambos) | 6.54 / 6.94 | AA |
| Blanco sobre `--brand` claro | 5.14 | AA |
| Tinta oscura sobre `--brand` oscuro | 5.03 | AA (por eso `--on-brand` oscuro no es blanco) |
| Blanco sobre `--brand` oscuro | 3.92 | Solo texto grande — **no usar** |
| `--success` sobre fondo claro | 4.01 | Solo texto grande; acompañar con ícono |
| `--warning` sobre fondo claro | 3.44 | Solo texto grande; acompañar con ícono |
| `--danger` / `--info` sobre fondo claro | 4.89 / 5.09 | AA |
