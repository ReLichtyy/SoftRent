# DragAndDrop

Zona de arrastre para archivos de contexto del negocio: menú, catálogo
de servicios o lista de precios (PDF, imagen u hoja de cálculo).
Valida tipo y tamaño, lista cada archivo con su peso y permite
eliminarlo. Accesible por teclado.

```tsx
import { DragAndDrop, type ArchivoContexto } from '../ui/DragAndDrop'
```

## Cuándo usarlo

- Flujo Comenzar, paso de datos: contexto opcional que enriquece el brief.
- Cualquier superficie donde el cliente comparta documentos de su negocio.

## Ejemplos

```tsx
const [archivos, setArchivos] = useState<ArchivoContexto[]>([])

<DragAndDrop
  archivos={archivos}
  onAgregar={(nuevos) => setArchivos((prev) => [...prev, ...nuevos])}
  onQuitar={(id) => setArchivos((prev) => prev.filter((a) => a.id !== id))}
/>
```

## API

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `archivos` | `ArchivoContexto[]` | — | Archivos cargados (estado controlado) |
| `onAgregar` | `(nuevos: ArchivoContexto[]) => void` | — | Agrega archivos validados |
| `onQuitar` | `(id: string) => void` | — | Elimina un archivo por id |
| `maxArchivos` | `number` | `5` | Máximo de archivos simultáneos |
| `maxBytes` | `number` | `10485760` | Tamaño máximo por archivo (10 MB) |
| `className` | `string` | — | Se fusiona con `cn` |

Notas:

- Tipos aceptados: `png jpg jpeg gif webp pdf doc docx xls xlsx csv txt`
  (por extensión). Nada de ejecutables ni de vídeo.
- El estado es controlado: el componente no guarda archivos propios.
- El error de validación se anuncia con `role="alert"`; el input oculto
  lleva `aria-label` y el botón "Elegir archivo" abre el selector
  nativo, así que funciona sin arrastre (móvil incluido).
- Al llegar al máximo, la zona queda deshabilitada con `opacity-60`.
