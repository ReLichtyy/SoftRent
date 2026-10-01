# Skeleton

Marcador de carga con el tamaño del contenido final. Para listas y
paneles mientras llegan los datos: cero saltos de diseño.

```tsx
import { Skeleton } from '../ui/Skeleton'
```

## Cuándo usarlo

- Listas de la app y del admin mientras cargan (Bandeja, Clientes).
- Cualquier bloque cuyo contenido tarde en llegar: dibuje el
  esqueleto con las mismas medidas del resultado final.

## Ejemplos

```tsx
<Skeleton className="h-4 w-32" />
<Skeleton className="h-3 w-3/4" />
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `className` | `string` | — | Tamaño y forma del esqueleto (se fusiona con `cn`) |

Notas:

- El elemento es `aria-hidden`: la carga se anuncia por contexto,
  no por el esqueleto.
- El pulso usa `animate-pulse`; con `prefers-reduced-motion` la
  animación se neutraliza desde `base.css`.
