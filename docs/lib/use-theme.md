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
| `setTheme` | `(t: 'light' \| 'dark') => void` | Fija un tema explícito |
| `toggle` | `() => void` | Alterna entre claro y oscuro |

```tsx
const { theme, setTheme } = useTheme()

<button onClick={() => setTheme('dark')} aria-pressed={theme === 'dark'}>
  Oscuro
</button>
```

## Comportamiento

1. El tema por defecto es **oscuro**. Solo cambia a claro si el usuario
   lo elige y queda guardado en `localStorage['softrent-theme']`.
2. En cada cambio escribe `data-theme="dark"` en `<html>` (o lo elimina
   para volver a claro) y persiste la elección.
3. Estado compartido: `useTheme` lee un store módulo-level con
   suscriptores, así que varios consumidores (`ThemeToggle`, el selector
   del footer) se mantienen sincronizados.
4. `localStorage` inaccesible (modo privado) no rompe nada: el tema vive
   en memoria esa sesión.

## Notas de integración

- `index.html` incluye un script pre-render que aplica el tema guardado
  antes del primer render para evitar destello: si no hay elección
  guardada, deja el oscuro. Si cambias la clave de almacenamiento
  (`softrent-theme`), actualiza ese script también.
