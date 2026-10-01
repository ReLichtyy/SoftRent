# Button

Acción o enlace con estilo de botón. Es un `<button>` nativo por defecto;
si se pasa `href` se renderiza como `<a>` con la misma apariencia, para que
las CTAs de navegación mantengan semántica de enlace.

```tsx
import { Button } from '../ui/Button'
```

## Cuándo usarlo

- Acción principal de una sección ("Comenzar") → `variant="primary"`.
- Acción secundaria o neutra → `secondary` (borde + superficie).
- Acción discreta dentro de barras y encabezados → `ghost`.
- Navegación con estilo de texto → `variant="link"`; para enlaces dentro de
  párrafos usa [Link](link.md).

## Ejemplos

Variante y tamaño:

```tsx
<Button>Comenzar</Button>
<Button variant="secondary">Ver demos</Button>
<Button variant="ghost">Cancelar</Button>
<Button variant="link">Ver cómo funciona</Button>
```

Como enlace (mismo estilo, semántica de ancla):

```tsx
<Button href="#contacto">Comenzar</Button>
```

Tamaños (`sm` para navbar, `lg` para hero y CTA final, `icon` para solo ícono):

```tsx
<Button size="sm">Comenzar</Button>
<Button size="lg">Comenzar</Button>
<Button size="icon" aria-label="Cambiar tema"><Icono /></Button>
```

Deshabilitado:

```tsx
<Button disabled>Enviar</Button>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'link'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Tamaño y altura fija |
| `href` | `string` | — | Si se define, renderiza `<a>` en vez de `<button>` |
| `children` | `ReactNode` | — | Contenido (acepta íconos junto al texto) |
| `className` | `string` | — | Sobrescribe clases (se fusiona con `cn`) |
| `...props` | Atributos nativos | — | Se delegan al `<button>` o `<a>` |

Las clases propias van primero y `className` se aplica al final, así que
las clases pasadas ganan en conflictos (ver [cn](../lib/cn.md)).

## Accesibilidad

- Elemento nativo: foco, activación por teclado y anuncio por rol heredados
  del navegador. No uses `div` con `onClick` donde esto aplica.
- Foco visible: anillo de 2px en `--brand` con offset del fondo de página.
- `disabled` además aplica `pointer-events: none` y opacidad 50%.
- Con `size="icon"` el contenido visible debe ser un ícono y la prop
  `aria-label` es obligatoria.

## Tokens usados

`--brand` / `--brand-hover` (primario), `--surface` / `--surface-2` /
`--line` (secundario), `--on-brand` para el texto sobre la marca
(blanco en claro, tinta oscura en oscuro — ver
[contraste](index.md#contraste-aa-verificado-wcag-21)). Radio de 8px
(`rounded-sm` de los tokens).
