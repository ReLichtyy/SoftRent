# KpiTile

Cifra destacada con su etiqueta, en tarjeta. Para bandas de
resultados y paneles de impacto.

```tsx
import { KpiTile } from '../ui/KpiTile'
```

## Cuándo usarlo

- Bandas de métricas del landing (Resultados en números).
- Pantallas de impacto de la app del cliente y la página de casos.

## Ejemplos

```tsx
<KpiTile value="1 min" label="Tiempo de primera respuesta" />

<KpiTile
  value="₡85.000"
  label="Cobrado esta semana"
  icon={<ChartLine className="h-5 w-5" />}
/>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `value` | `string` | — | Cifra, ya formateada |
| `label` | `string` | — | Etiqueta que explica la cifra |
| `icon` | `ReactNode` | — | Ícono opcional arriba de la cifra (Phosphor) |

Notas:

- Cuando la métrica es de demo y no de un cliente real, acompáñela
  de un Badge "Ejemplo de demo" (regla de la sección 3.4.7 del Notion).
- Los montos en colones se formatean con `colones()` de `lib/format`.
