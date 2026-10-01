# useTheme

Tema claro/oscuro del sitio: una sola fuente de verdad para la elección
del usuario.

```tsx
import { useTheme } from '../lib/useTheme'
```

## API

| Valor | Tipo | Descripción |
| --- | --- | --- |
| `theme` | `'light' \| 'dark'` | Tema actual |
| `toggle` | `() => void` | Alterna entre claro y oscuro |

```tsx
const { theme, toggle } = useTheme()

<button onClick={toggle} aria-pressed={theme === 'dark'}>
  Cambiar tema
</button>
```

## Comportamiento

1. Al montar, lee `localStorage['softrent-theme']` si existe.
2. Sin valor guardado, sigue `prefers-color-scheme` del sistema.
3. En cada cambio escribe `data-theme="dark"` en `<html>` (o lo elimina
   para volver a claro) y persiste la elección.
4. `localStorage` inaccesible (modo privado) no rompe nada: el tema vive en
   memoria esa sesión.

## Notas de integración

- `index.html` incluye un script pre-render que aplica el tema guardado
  antes del primer render para evitar destello. Si cambias la clave de
  almacenamiento (`softrent-theme`), actualiza ese script también.
- Un solo consumidor por página (`ThemeToggle`). No lo llames en varios
  componentes: cada instancia tendría su propio estado y se desincroniza.
  Si necesitas más consumidores, migra el estado a un contexto.
- El toggle de accesibilidad (`ThemeToggle`) usa `aria-pressed` y
  `aria-label` con el estado.
