# Card

Contenedor de contenido elevado: borde + superficie, sin sombra (regla del
design base: las tarjetas usan borde, las sombras quedan para modales y
menús).

```tsx
import { Card } from '../ui/Card'
```

## Cuándo usarlo

- Bloques de contenido agrupados: listados, mockups, formularios cortos.
- Cuando necesites elevación real (modales, menús) usa sombra suave por
  fuera de Card, no aquí.

## Ejemplos

Con padding estándar (20px):

```tsx
<Card>
  <p className="font-display text-base">Agenda de hoy</p>
</Card>
```

Sin padding, para controlar el espaciado desde fuera (útil cuando la Card
contiene listas que llegan al borde):

```tsx
<Card padded={false} className="overflow-hidden">
  <ul>…</ul>
</Card>
```

Composición con utilidades del sistema:

```tsx
<Card className="w-full max-w-sm -rotate-1">…</Card>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `padded` | `boolean` | `true` | Relleno interno de 20px (`p-5`) |
| `children` | `ReactNode` | — | Contenido |
| `className` | `string` | — | Clases extra (se fusiona con `cn`) |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | Se delegan al `<div>` |

Card no impone estructura interna (título, cuerpo, acciones): compón con
los elementos que necesites. Es a propósito — las secciones actuales
agrupan distinto y una jerarquía fija obligaría a pelear contra el
componente.

## Accesibilidad

- `<div>` genérico. Si la tarjeta completa es interactiva, no metas un
  `onClick` en la Card: usa un enlace o botón dentro, o convierte la Card
  en enlace con semántica explícita.
- Contraste de fondo `--surface` con texto `--text` cumple AA en ambos
  temas (18.57:1 claro, 15.44:1 oscuro).

## Tokens usados

Radio de 12px (`rounded-md`, tarjetas) · `--surface` · `--border`.
