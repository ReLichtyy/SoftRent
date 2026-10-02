# Input

Campo de texto con etiqueta visible, ayuda y error. La etiqueta es
obligatoria por diseño (no hay placeholder como etiqueta).

```tsx
import { Input } from '../ui/Input'
```

## Ejemplos

Básico:

```tsx
<Input label="WhatsApp" type="tel" placeholder="8888 8888" />
```

Con ayuda y validación en tiempo real (para el flujo "Comenzar",
sección 3.4.10 del Notion):

```tsx
<Input
  label="Correo"
  type="email"
  hint="Le enviamos la propuesta a este correo."
  error={enviado ? undefined : 'Ingrese un correo válido.'}
/>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | **Requerida.** Etiqueta visible del campo |
| `hint` | `string` | — | Ayuda breve bajo el campo |
| `error` | `string` | — | Mensaje de error; marca `aria-invalid` |
| `className` | `string` | — | Clases del contenedor (se fusiona con `cn`) |
| `id` | `string` | autogenerado | Para enlazar con la etiqueta manualmente |
| `...props` | `InputHTMLAttributes` | — | Se delegan al `<input>` |

Nota: `className` aplica al contenedor (label + campo + mensajes), no al
`<input>` mismo, para permitir dimensionar el bloque completo.

## Accesibilidad

- `label` asociada por `htmlFor`/`id` (id autogenerado con `useId`).
- `aria-describedby` apunta a `hint` y `error` cuando existen.
- `aria-invalid` se activa al pasar `error`.
- Foco: borde de 2px en `--focus-ring`; reposo con `--border-strong`; el borde de error usa `--danger`.
- Fondo `--surface-sunken` con texto de 16px para evitar el zoom automático en
  iOS.

## Tokens usados

`--surface-sunken` (fondo) · `--border` · `--focus-ring` (foco) · `--danger` (error) ·
radio 8px (`rounded-sm`).
