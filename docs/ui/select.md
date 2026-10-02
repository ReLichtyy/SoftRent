# Select

Selector nativo con etiqueta visible, ayuda y error. Misma API visual que
[Input](input.md).

```tsx
import { Select } from '../ui/Select'
```

## Ejemplos

```tsx
<Select label="Industria">
  <option value="barberia">Barbería o salón</option>
  <option value="veterinaria">Veterinaria</option>
  <option value="comercio">Comercio por WhatsApp</option>
</Select>
```

Con estado de error:

```tsx
<Select label="Industria" error="Seleccione una opción para continuar.">
  <option value="">Elija su industria…</option>
</Select>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | **Requerida.** Etiqueta visible |
| `hint` | `string` | — | Ayuda breve bajo el campo |
| `error` | `string` | — | Mensaje de error; marca `aria-invalid` |
| `children` | `ReactNode` | — | **Requeridos.** Opciones del `<select>` |
| `className` | `string` | — | Clases del contenedor (se fusiona con `cn`) |
| `...props` | `SelectHTMLAttributes` | — | Se delegan al `<select>` |

## Accesibilidad

- Se mantiene el `<select>` nativo: navegación por teclado (flechas, Enter),
  semántica y comportamiento de móvil intactos. El chevron es una imagen de
  fondo decorativa (`appearance-none`), no un ícono interactivo.
- Mismo cableado ARIA que Input (`htmlFor`, `aria-describedby`, `aria-invalid`).

## Tokens usados

`--surface-sunken` · `--border` · `--focus-ring` (foco) · `--danger` (error) ·
radio 8px. El chevron usa `--text-muted` y es fijo entre temas.
