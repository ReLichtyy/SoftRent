# CardImage

Tarjeta con imagen de portada, distintivo, título, descripción y una
acción. Para vitrinas de demos y destacados con portada.

```tsx
import { CardImage } from '../ui/CardImage'
```

## Cuándo usarlo

- Demo en vivo que se quiera destacar (landing y página de Demos).
- Cualquier tarjeta cuya portada sea una imagen real.

## Ejemplos

```tsx
<CardImage
  imageSrc="https://picsum.photos/seed/softrent-demo-citas/960/600"
  imageAlt="Vista previa del sistema de reservas"
  badge={{ label: 'Demo en vivo', tone: 'success', dot: true }}
  title="Sistema de Reservas y Citas 24/7"
  description="Vea cómo sus clientes eligen horario y confirman."
  href="https://mivps-217-77-11-250.sslip.io/"
  ctaLabel="Ver demo en vivo"
  external
/>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `imageSrc` | `string` | — | Imagen de portada |
| `imageAlt` | `string` | — | Texto alternativo real de la imagen |
| `badge` | `{ label, tone?, dot? }` | — | Distintivo del cuerpo, nunca sobre la imagen |
| `title` | `string` | — | Título |
| `description` | `string` | — | Descripción |
| `href` | `string` | — | Destino de la acción |
| `ctaLabel` | `string` | — | Texto del botón |
| `external` | `boolean` | `false` | true abre en pestaña nueva con `noopener` |
| `className` | `string` | — | Clases extra |

Notas:

- La imagen lleva `width`/`height` y `loading="lazy"`: sin saltos de
  diseño y sin competir con el LCP.
- Escala suavemente en hover dentro del recorte (solo `transform`).
