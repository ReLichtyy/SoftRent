# Modal

Diálogo accesible sobre la página: vista rápida, confirmaciones y
acciones que necesitan foco total sin cambiar de ruta.

```tsx
import { Modal } from '../ui/Modal'
```

## Cuándo usarlo

- Vista rápida de una demo desde la página /demos.
- Confirmaciones y avisos que piden una decisión.

## Ejemplos

```tsx
<Modal open={abierto} onClose={() => setAbierto(false)} title="Vista rápida">
  <p>Contenido del diálogo.</p>
</Modal>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Abre el diálogo; cerrado no renderiza nada |
| `onClose` | `() => void` | — | Cierra el diálogo (Esc, clic en el fondo, botón) |
| `title` | `string` | — | Título anunciado por el lector de pantalla |
| `children` | `ReactNode` | — | Contenido |
| `className` | `string` | — | Se fusiona con `cn` en el panel |

Notas:

- Radio de 16 px (`rounded-lg`): el de modales según los tokens.
- Cerrado renderiza `null`: cero saltos de diseño (CLS) al abrir.
- Accesibilidad: `role="dialog"` + `aria-modal`, Esc cierra, clic en el
  fondo cierra, el foco entra al panel y regresa al elemento que abrió.
- El fondo usa `bg-bg/80` + `backdrop-blur-sm`: funciona en ambos temas.
- Entrada con GSAP solo `transform`/`opacity`; estática con
  `prefers-reduced-motion: reduce`.
- Mientras está abierto, el cuerpo de la página no se desplaza.
