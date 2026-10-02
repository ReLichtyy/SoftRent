# Toggle

Interruptor tipo "switch" para opciones de configuración con dos estados
(por ejemplo, ajustes de la app del cliente).

```tsx
import { Toggle } from '../ui/Toggle'
```

## Cuándo usarlo

- Opción de encendido/apagado inmediata (sin formulario ni botón Enviar).
- Para opciones dentro de un formulario que se envía junto, prefiere
  [Checkbox](checkbox.md).

## Ejemplos

No controlado (gestiona su propio estado):

```tsx
<Toggle label="Avisos por WhatsApp" defaultChecked />
```

Controlado:

```tsx
<Toggle
  label="Modo fuera de horario"
  checked={fueraDeHorario}
  onCheckedChange={setFueraDeHorario}
/>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `label` | `string` | — | Nombre accesible del interruptor (`aria-label`); no se renderiza visible |
| `checked` | `boolean` | — | Estado controlado |
| `defaultChecked` | `boolean` | `false` | Estado inicial cuando no está controlado |
| `onCheckedChange` | `(checked: boolean) => void` | — | Se llama en cada cambio con el nuevo estado |
| `disabled` | `boolean` | `false` | Deshabilita el control |
| `className` | `string` | — | Clases del botón (se fusiona con `cn`) |

Regla de controlado/no controlado: si `checked` es `undefined`, el
componente gestiona el estado internamente; si está definido, el estado lo
gestiona el consumidor (patrón estándar de React, ver la referencia
`state` del skill).

## Accesibilidad

- `<button type="button" role="switch">` con `aria-checked`: anuncio
  correcto por lectores de pantalla y activación nativa por Espacio/Enter.
- `aria-label` obligatoria: el control es puramente visual, así que el
  nombre accesible va en la prop `label`. Si necesitas etiqueta visible,
  pónla junto al Toggle con un `<label>` externo.
- Foco visible con anillo de marca; `disabled` aplica opacidad y bloquea
  interacción.

## Tokens usados

`--accent` (encendido) · `--surface-sunken` + `--border` (apagado) · `--surface`
(pulgar).
