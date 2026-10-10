import { useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import {
  FilePdf,
  FileXls,
  Image,
  TrashSimple,
  UploadSimple,
} from '@phosphor-icons/react'
import { bytes } from '../../lib/format'
import { cn } from '../../lib/cn'

export type ArchivoContexto = {
  id: string
  nombre: string
  tamano: number
  tipo: string
}

export type DragAndDropProps = {
  /** Archivos ya cargados (estado controlado). */
  archivos: ArchivoContexto[]
  /** Agrega archivos validados al estado del padre. */
  onAgregar: (nuevos: ArchivoContexto[]) => void
  /** Quita un archivo por id. */
  onQuitar: (id: string) => void
  /** Máximo de archivos simultáneos. @default 5 */
  maxArchivos?: number
  /** Tamaño máximo por archivo, en bytes. @default 10485760 (10 MB) */
  maxBytes?: number
  /** Versión compacta: solo el botón y la lista, sin zona de arrastre.
   * @default false */
  compacto?: boolean
  /** Texto del botón en la versión compacta.
   * @default "Agregar archivo" */
  textoBoton?: string
  className?: string
}

/* Tipos aceptados: menú, catálogo o lista de precios en PDF,
 * imagen u hoja de cálculo. Nada de ejecutables ni de vídeo. */
const ACEPTADOS =
  'image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt'

const EXTENSIONES_VALIDAS = [
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf', 'doc', 'docx',
  'xls', 'xlsx', 'csv', 'txt',
]

function esValido(nombre: string): boolean {
  const ext = nombre.split('.').pop()?.toLowerCase() ?? ''
  return EXTENSIONES_VALIDAS.includes(ext)
}

function iconoDe(tipo: string, nombre: string) {
  if (tipo.startsWith('image/')) return Image
  if (/\.(xls|xlsx|csv)$/i.test(nombre)) return FileXls
  return FilePdf
}

function idArchivo(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

/** Zona de arrastre para archivos de contexto del negocio: menú,
 * catálogo de servicios o lista de precios (PDF, imagen u hoja de
 * cálculo). Validación de tipo y tamaño, lista con vista previa y
 * opción de eliminar. Accesible por teclado. */
export function DragAndDrop({
  archivos,
  onAgregar,
  onQuitar,
  maxArchivos = 5,
  maxBytes = 10 * 1024 * 1024,
  compacto = false,
  textoBoton = 'Agregar archivo',
  className,
}: DragAndDropProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [arrastrando, setArrastrando] = useState(false)
  const [error, setError] = useState('')
  const inputId = useId()
  const errorId = `${inputId}-error`
  const restantes = maxArchivos - archivos.length

  function validar(lista: FileList | File[]): ArchivoContexto[] {
    const buenos: ArchivoContexto[] = []
    const fallos: string[] = []
    for (const file of Array.from(lista)) {
      if (!esValido(file.name)) {
        fallos.push(`"${file.name}" no es un tipo permitido`)
        continue
      }
      if (file.size > maxBytes) {
        fallos.push(`"${file.name}" pesa más de ${bytes(maxBytes)}`)
        continue
      }
      buenos.push({
        id: idArchivo(),
        nombre: file.name,
        tamano: file.size,
        tipo: file.type,
      })
    }
    if (buenos.length > restantes) {
      fallos.push(
        `Puede subir hasta ${maxArchivos} archivos; le quedan ${Math.max(restantes, 0)} espacios`,
      )
    }
    setError(fallos.join('. '))
    return buenos.slice(0, Math.max(restantes, 0))
  }

  function alElegir(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const validos = validar(e.target.files)
      if (validos.length > 0) onAgregar(validos)
    }
    e.target.value = ''
  }

  function alSoltar(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setArrastrando(false)
    if (e.dataTransfer.files) {
      const validos = validar(e.dataTransfer.files)
      if (validos.length > 0) onAgregar(validos)
    }
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {compacto ? (
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={restantes <= 0}
            className="inline-flex h-10 items-center gap-2 rounded-sm border border-border-strong bg-surface px-4 text-sm font-medium text-ink outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-surface-sunken active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-45"
          >
            <UploadSimple className="size-4" aria-hidden="true" weight="bold" />
            {textoBoton}
          </button>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACEPTADOS}
            multiple
            onChange={alElegir}
            className="sr-only"
            aria-label="Subir archivos de contexto del negocio"
          />
        </div>
      ) : (
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setArrastrando(true)
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={alSoltar}
        className={cn(
          'rounded-md border border-dashed p-4 text-center transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-out)]',
          arrastrando
            ? 'scale-[1.01] border-accent bg-accent-soft'
            : 'border-border bg-surface hover:border-ink-muted/40',
          restantes <= 0 && 'opacity-60',
        )}
      >
        <UploadSimple
          className={cn(
            'mx-auto h-6 w-6 text-ink-muted transition-[color,transform] duration-200 ease-[var(--ease-out)]',
            arrastrando && 'scale-110 text-accent-text',
          )}
          aria-hidden="true"
          weight="bold"
        />
        <p className="mt-2 text-sm text-ink">
          Arrastre aquí su menú, catálogo o lista de precios
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          PDF, imagen u hoja de cálculo. Hasta {maxArchivos} archivos de{' '}
          {bytes(maxBytes)} cada uno.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={restantes <= 0}
          className="mt-3 inline-flex h-9 items-center rounded-sm border border-border bg-surface px-4 text-sm font-medium text-ink outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-surface-sunken active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-45"
        >
          Elegir archivo
        </button>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACEPTADOS}
          multiple
          onChange={alElegir}
          className="sr-only"
          aria-label="Subir archivos de contexto del negocio"
        />
      </div>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}

      {archivos.length > 0 && (
        <ul className="space-y-2" aria-label="Archivos listos">
          {archivos.map((archivo) => {
            const Icono = iconoDe(archivo.tipo, archivo.nombre)
            return (
              <li
                key={archivo.id}
                className="flex items-center gap-3 rounded-md border border-border bg-surface p-3"
              >
                <Icono className="h-5 w-5 shrink-0 text-accent-text" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-ink">
                    {archivo.nombre}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {bytes(archivo.tamano)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => onQuitar(archivo.id)}
                  aria-label={`Eliminar ${archivo.nombre}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink-muted outline-none transition-colors hover:bg-danger-soft hover:text-danger focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <TrashSimple className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
