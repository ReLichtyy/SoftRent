# Badge

Distintivo pill para estados y categorías (estados de cita, tipo de plan,
sellos "IA incluida").

```tsx
import { Badge } from '../ui/Badge'
```

## Cuándo usarlo

- Estados semánticos: `success` (confirmado/pagado), `warning` (pendiente/por
  vencer), `danger` (moroso/no-show), `info` (bot/IA).
- Categorías neutras: `neutral`.
- Marca: `brand` (poco frecuente; el rojo de marca es para CTA, no para
  estados).

## Ejemplos

Estado con punto de color (patrón recomendado: color + texto, nunca solo
color):

```tsx
<Badge tone="success" dot>Confirmada</Badge>
<Badge tone="warning" dot>Pendiente</Badge>
<Badge tone="neutral" dot>Facturada</Badge>
```

Categoría simple:

```tsx
<Badge tone="info">IA incluida</Badge>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `tone` | `'accent' | 'brand' (alias) | 'neutral| 'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | Tono semántico |
| `dot` | `boolean` | `false` | Punto de color a la izquierda |
| `children` | `ReactNode` | — | Contenido (texto corto) |
| `className` | `string` | — | Clases extra (se fusiona con `cn`) |
| `...props` | `HTMLAttributes<HTMLSpanElement>` | — | Se delegan al `<span>` |

El fondo es una capa al 10% del tono (`bg-success/10`), que se adapta sola
a ambos temas vía `color-mix`.

## Accesibilidad

- Es un `<span>` decorativo: no interactivo, sin rol. Si necesitas un estado
  clickeable, usa Button o un toggle con su rol correspondiente.
- **Contraste**: en tema claro, `success` (4.01:1) y `warning` (3.44:1) solo
  cumplen AA en texto grande; úsalos con `dot` o ícono y texto breve.
  `danger`, `info`, `brand` y `neutral` cumplen AA en ambos temas.
- No transmitas estado solo con `dot`; el texto del badge es el que lo
  anuncia a lectores de pantalla.

## Tokens usados

`--success`, `--warning`, `--danger`, `--info`, `--accent-soft`, `--accent-text`, `--surface-sunken`,
`--ink-muted`. Forma pill (radio completo) según los tokens.
