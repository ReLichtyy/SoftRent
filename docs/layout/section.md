# Section

Sección de página con tono de fondo del sistema. Aporta el ritmo vertical
del sitio y separa bloques sin inventar fondos sueltos.

```tsx
import { Section } from '../layout/Section'
```

## Tonos

| Tono | Clases | Uso |
| --- | --- | --- |
| `bg` (por defecto) | sin fondo extra | Secciones sobre el fondo de página |
| `surface` | borde superior + `--surface` al 60% | Bandas alternas para agrupar contenido |
| `deep` | fondo `--surface-inverse`, texto claro fijo | Hero y CTA final (bloques de marca) |

## Ejemplos

```tsx
<Section id="pilares" tone="surface">
  <Container className="py-20 sm:py-28">…</Container>
</Section>
```

```tsx
<Section id="contacto" tone="deep">
  <Container className="py-20 sm:py-28">…</Container>
</Section>
```

```tsx
<Section id="como-funciona" className="border-t border-border">
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `tone` | `'bg' \| 'surface' \| 'deep'` | `'bg'` | Fondo de la sección |
| `className` | `string` | — | Clases extra (se fusiona con `cn`) |
| `...props` | `HTMLAttributes<HTMLElement>` | — | Se delegan al `<section>` (incluye `id` para anclas) |

## Reglas

- Toda sección visible del sitio es un `<section>` con `id` (ancla de
  navegación y `aria-labelledby` cuando aplique).
- El padding vertical lo aporta el `Container` interior, nunca la Section,
  para que las bandas `surface`/`deep` sangren a todo el ancho.
- En `deep` el texto es `--ink-inverse` fijo (claro en ambos temas): no uses
  tokens de texto normales dentro de bloques `deep`.

## Tokens usados

`--surface`, `--border`, `--surface-inverse`, `--ink-inverse`.
