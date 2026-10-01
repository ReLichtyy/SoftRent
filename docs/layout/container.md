# Container

Ancho máximo de página con padding lateral consistente. Es el único lugar
donde se define el ancho de contenido del sitio.

```tsx
import { Container } from '../layout/Container'
```

## Ejemplos

```tsx
<Container>
  <h2 className="font-display text-3xl">Título de sección</h2>
</Container>
```

Alineación o espaciado vertical desde fuera (las clases se fusionan):

```tsx
<Container className="flex h-16 items-center justify-between">
```

```tsx
<Container className="py-20 sm:py-28">…</Container>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `className` | `string` | — | Clases extra (se fusiona con `cn`) |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | Se delegan al `<div>` |

Base fija: `max-w-6xl` de ancho, `px-5` en móvil y `px-8` desde `sm`.
El espaciado vertical no está incluido: cada sección define el suyo en
múltiplos de 4px (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64, sección 2.4 del
Notion).

## Cuándo usarlo

- Una vez por sección, envolviendo el contenido alineado.
- Para anchos distintos (texto de lectura estrecho, mockups) no modifiques
  Container: crea una variante o usa utilidades en el hijo.
