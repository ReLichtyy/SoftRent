# Checkbox

Casilla de verificación con etiqueta visible y mensaje de error. Pensada
para consentimientos y opciones de formulario (el checkbox de
consimiento del flujo "Comenzar", requisito Ley 8968).

```tsx
import { Checkbox } from '../ui/Checkbox'
```

## Ejemplos

```tsx
<Checkbox label="Acepto que SoftRent me contacte por WhatsApp o correo." />
```

Controlado y con error:

```tsx
<Checkbox
  label="Acepto la política de privacidad."
  checked={aceptado}
  onChange={(e) => setAceptado(e.target.checked)}
  error={enviado && !aceptado ? 'Debe aceptar la política para continuar.' : undefined}
/>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | **Requerida.** Etiqueta visible, clicable |
| `error` | `string` | — | Mensaje de error; marca `aria-invalid` |
| `className` | `string` | — | Clases del contenedor (se fusiona con `cn`) |
| `id` | `string` | autogenerado | Para enlazados manuales |
| `...props` | `InputHTMLAttributes` | — | Se delegan al `<input type="checkbox">` |

Soporta controlado (`checked` + `onChange`) y no controlado
(`defaultChecked`), como un input nativo.

## Accesibilidad

- `<input type="checkbox">` nativo: Espacio para alternar, estado anunciado
  por lectores de pantalla, sin ARIA extra necesario.
- Etiqueta clicable asociada por `htmlFor`/`id` (área de toque ampliada).
- El color del check usa `accent-color` (`--brand`), que respeta el tema.
- `error` se anuncia vía `aria-describedby` y `aria-invalid`.

## Tokens usados

`--brand` (check) · `--danger` (error) · `--ink` / `--ink-soft` (textos).
