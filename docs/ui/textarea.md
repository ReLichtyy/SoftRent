# Textarea

Área de texto multilínea con etiqueta visible, ayuda y error. Misma API
visual que [Input](input.md).

```tsx
import { Textarea } from '../ui/Textarea'
```

## Ejemplos

```tsx
<Textarea
  label="Cuéntenos de su negocio"
  hint="Cómo agenda, cómo cobra, qué se le complica."
  rows={4}
/>
```

Con límite de caracteres:

```tsx
<Textarea label="Notas" maxLength={500} />
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | **Requerida.** Etiqueta visible |
| `hint` | `string` | — | Ayuda breve bajo el campo |
| `error` | `string` | — | Mensaje de error; marca `aria-invalid` |
| `className` | `string` | — | Clases del contenedor (se fusiona con `cn`) |
| `...props` | `TextareaHTMLAttributes` | — | Se delegan al `<textarea>` |

Altura mínima de 4 filas (`min-h-24`) y redimensionamiento vertical
habilitado (`resize-y`).

## Accesibilidad

- Mismo cableado que Input: `htmlFor`/`id` autogenerado,
  `aria-describedby` para ayuda y error, `aria-invalid` con error.
- Fondo `--surface-sunken`, texto de 16px (evita zoom en iOS).

## Tokens usados

`--surface-sunken` · `--border` · `--focus-ring` (foco) · `--danger` (error) ·
radio 8px.
