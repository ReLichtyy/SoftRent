# Link

Enlace de texto con variantes de color. Para acciones con forma de botón
usa [Button](button.md) con `href`.

```tsx
import { Link } from '../ui/Link'
```

## Cuándo usarlo

- Enlace dentro de contenido de texto → `variant="brand"`.
- Enlaces de navegación secundaria (footer, menús) → `variant="muted"`.
- Enlace que debe heredar el color del contexto → `variant="inherit"`.

## Ejemplos

```tsx
<Link href="/precios">Ver precios</Link>

<Link href="/demos" variant="muted">Demos</Link>

<Link href="#top" variant="inherit">Volver arriba</Link>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `variant` | `'brand' \| 'muted' \| 'inherit'` | `'brand'` | Color e interacción |
| `children` | `ReactNode` | — | Contenido del enlace |
| `className` | `string` | — | Clases extra (se fusiona con `cn`) |
| `...props` | `AnchorHTMLAttributes` | — | Se delegan al `<a>` |

Comportamiento por variante:

- `brand`: color de marca; subrayado solo en hover (`underline-offset-4`).
- `muted`: texto secundario que pasa a texto principal en hover.
- `inherit`: sin estilos de color; el contexto decide.

## Accesibilidad

- `<a>` nativo con `href`: foco, Enter y anuncio por rol heredados.
- `brand` cumple AA sobre fondo de página y superficie (4.86:1 en claro).
- El foco visible global (`outline` de 2px en `--brand`) aplica
  automáticamente.

## Tokens usados

`--brand` (brand), `--ink-soft` → `--ink` (muted).
