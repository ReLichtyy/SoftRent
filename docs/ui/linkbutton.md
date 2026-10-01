# LinkButton

Enlace interno de react-router con apariencia de botón. Para enlaces
externos o acciones sin navegación usa [Button](button.md); para enlaces
de texto usa [Link](link.md).

```tsx
import { LinkButton } from '../ui/LinkButton'
```

## Cuándo usarlo

- Toda navegación interna que debe verse como acción principal o secundaria.
- Nunca para rutas externas: `Button` con `href` abre un `<a>` normal.

## Ejemplos

```tsx
<LinkButton to="/comenzar">Comenzar</LinkButton>

<LinkButton to="/precios" variant="secondary" size="sm">
  Ver precios
</LinkButton>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `to` | `string` | — | Ruta interna (react-router) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'link'` | `'primary'` | Estilo visual, igual que Button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño, igual que Button |
| `className` | `string` | — | Clases extra (se fusiona con `cn`) |
| `children` | `ReactNode` | — | Contenido del enlace |

Notas:

- Las clases de estilo son espejo de `ui/Button`; si cambia una primitiva,
  revisar la otra.
- Respeta foco visible, feedback `active:scale` y el radio de botones
  (`rounded-sm`) de los tokens.
