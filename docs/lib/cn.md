# cn

Utilidad de clases: combina clases condicionales y resuelve conflictos de
Tailwind a favor de la última clase pasada.

```tsx
import { cn } from '../lib/cn'
```

## Qué hace

Une `clsx` (condicionales) con `tailwind-merge` (resolución de conflictos):

```tsx
cn('rounded-md border border-border bg-surface', isOpen && 'bg-surface-sunken', className)
// 'rounded-md border border-border bg-surface-sunken' si isOpen
```

Si dos clases compiten por la misma propiedad, gana la última:

```tsx
cn('bg-surface', 'bg-accent')  // → 'bg-accent'
```

Esto es lo que permite que `className` de un componente sobrescriba sus
estilos por defecto sin `!important`.

## Orden obligatorio en componentes

```tsx
className={cn(
  baseStyles,        // 1. Base: siempre aplica
  variantStyles[v],  // 2. Variantes: según props
  isOpen && '…',     // 3. Condicionales: según estado
  className,         // 4. Overrides del consumidor: siempre ganan
)}
```

## Cuándo NO usarla

- Clases calculadas dinámicamente tipo `` `w-[${width}px]` ``: no son
  detectables por Tailwind. Usa una variable CSS:
  `style={{ '--w': `${width}px` }}` + `w-[var(--w)]`.
- Para nombres de clase condicionales que no vienen de Tailwind, `clsx`
  solo ya alcanza (aquí no aplica: todo el estilo es Tailwind).
