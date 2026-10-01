# PageTransition

Transición de página: envuelve el `<Outlet />` de un layout y
anima el contenido con un fade + desplazamiento sutil en cada
cambio de ruta. Estático con `prefers-reduced-motion`.

```tsx
import { PageTransition } from '../layout/PageTransition'
```

## Cuándo usarlo

- Una sola vez por layout, envolviendo el `<Outlet />`.
- Nunca dentro de una página ni anidado con otro PageTransition.

## Ejemplo

```tsx
<main className="flex-1">
  <PageTransition>
    <Outlet />
  </PageTransition>
</main>
```

## API

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `children` | `ReactNode` | Contenido de la ruta activa |

Notas:

- Anima solo `opacity` y `transform` (GPU-safe, sin reflow).
- Con movimiento reducido el contenido aparece sin animación:
  la accesibilidad no depende del motion.
