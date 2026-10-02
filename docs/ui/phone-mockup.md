# PhoneMockup

Marco de teléfono con pantalla de app. Muestra el sistema como lo
ve el cliente, para las secciones de producto del inicio.

```tsx
import { PhoneMockup } from '../ui/PhoneMockup'
```

## Cuándo usarlo

- Sección "Producto" del inicio: pantallas de chat, agenda y cobros.
- Cualquier bloque que deba enseñar el sistema "en la mano", en vez
  de una captura suelta.

## Ejemplos

```tsx
<PhoneMockup role="img" aria-label="Agenda del día con citas confirmadas">
  <AgendaScreen />
</PhoneMockup>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Contenido de la pantalla |
| `...props` | `HTMLAttributes` | — | Se extienden al marco (p. ej. `role`, `aria-label`) |

Notas:

- El marco es decorativo; el contenido recibe el foco y los lectores.
  Declare `role="img"` con `aria-label` cuando la pantalla sea
  ilustrativa y no interactiva.
- Las pantallas (AgendaScreen, CobrosScreen) viven hoy dentro de
  `sections/Producto`; si aparece un tercer uso, súbalas a `ui/`.
