import { useState, useEffect } from 'react'
import {
  CaretLeft,
  CaretRight,
  Eye,
  X,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import { reservasGalleryItems, type ReservasGalleryItem } from '../../content/reservasGallery'

type CategoriaFiltro = 'todas' | 'cliente' | 'whatsapp' | 'admin' | 'ia'

export function GalleryLightbox() {
  const [categoria, setCategoria] = useState<CategoriaFiltro>('todas')
  const [itemSeleccionado, setItemSeleccionado] = useState<ReservasGalleryItem | null>(null)
  const [pagina, setPagina] = useState<number>(1)
  const ITEMS_POR_PAGINA = 8

  const itemsFiltrados = reservasGalleryItems.filter((item) => {
    if (categoria === 'todas') return true
    return item.category === categoria
  })

  const totalPaginas = Math.ceil(itemsFiltrados.length / ITEMS_POR_PAGINA)
  const itemsVisibles = itemsFiltrados.slice(0, pagina * ITEMS_POR_PAGINA)

  const abrirModal = (item: ReservasGalleryItem) => {
    setItemSeleccionado(item)
  }

  const cerrarModal = () => {
    setItemSeleccionado(null)
  }

  const irSiguiente = () => {
    if (!itemSeleccionado) return
    const currentIndex = itemsFiltrados.findIndex((i) => i.id === itemSeleccionado.id)
    if (currentIndex < itemsFiltrados.length - 1) {
      setItemSeleccionado(itemsFiltrados[currentIndex + 1])
    } else {
      setItemSeleccionado(itemsFiltrados[0])
    }
  }

  const irAnterior = () => {
    if (!itemSeleccionado) return
    const currentIndex = itemsFiltrados.findIndex((i) => i.id === itemSeleccionado.id)
    if (currentIndex > 0) {
      setItemSeleccionado(itemsFiltrados[currentIndex - 1])
    } else {
      setItemSeleccionado(itemsFiltrados[itemsFiltrados.length - 1])
    }
  }

  // Bloqueo del scroll del body cuando el modal está abierto
  useEffect(() => {
    if (itemSeleccionado) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [itemSeleccionado])

  // Navegación con teclado (Escape, Flecha Izquierda, Flecha Derecha)
  useEffect(() => {
    if (!itemSeleccionado) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setItemSeleccionado(null)
      if (e.key === 'ArrowRight') {
        const currentIndex = itemsFiltrados.findIndex((i) => i.id === itemSeleccionado.id)
        if (currentIndex < itemsFiltrados.length - 1) {
          setItemSeleccionado(itemsFiltrados[currentIndex + 1])
        } else {
          setItemSeleccionado(itemsFiltrados[0])
        }
      }
      if (e.key === 'ArrowLeft') {
        const currentIndex = itemsFiltrados.findIndex((i) => i.id === itemSeleccionado.id)
        if (currentIndex > 0) {
          setItemSeleccionado(itemsFiltrados[currentIndex - 1])
        } else {
          setItemSeleccionado(itemsFiltrados[itemsFiltrados.length - 1])
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [itemSeleccionado, itemsFiltrados])

  return (
    <div>
      {/* Selector de Categorías */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => { setCategoria('todas'); setPagina(1) }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              categoria === 'todas'
                ? 'bg-brand text-white shadow-xs'
                : 'bg-surface-sunken hover:bg-ink/5 border border-ink/10 text-ink dark:border-white/10'
            }`}
          >
            Todas (75)
          </button>
          <button
            type="button"
            onClick={() => { setCategoria('cliente'); setPagina(1) }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              categoria === 'cliente'
                ? 'bg-brand text-white shadow-xs'
                : 'bg-surface-sunken hover:bg-ink/5 border border-ink/10 text-ink dark:border-white/10'
            }`}
          >
            Solo con el Número (24)
          </button>
          <button
            type="button"
            onClick={() => { setCategoria('whatsapp'); setPagina(1) }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              categoria === 'whatsapp'
                ? 'bg-brand text-white shadow-xs'
                : 'bg-surface-sunken hover:bg-ink/5 border border-ink/10 text-ink dark:border-white/10'
            }`}
          >
            WhatsApp & SINPE (12)
          </button>
          <button
            type="button"
            onClick={() => { setCategoria('ia'); setPagina(1) }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              categoria === 'ia'
                ? 'bg-brand text-white shadow-xs'
                : 'bg-surface-sunken hover:bg-ink/5 border border-ink/10 text-ink dark:border-white/10'
            }`}
          >
            Cerebro IA & RAG (7)
          </button>
          <button
            type="button"
            onClick={() => { setCategoria('admin'); setPagina(1) }}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              categoria === 'admin'
                ? 'bg-brand text-white shadow-xs'
                : 'bg-surface-sunken hover:bg-ink/5 border border-ink/10 text-ink dark:border-white/10'
            }`}
          >
            Admin & Staff (32)
          </button>
        </div>

        <span className="text-xs text-ink-muted">
          Mostrando {itemsVisibles.length} de {itemsFiltrados.length} pantallas
        </span>
      </div>

      {/* Rejilla de Tarjetas de Pantallas */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {itemsVisibles.map((item) => (
          <div
            key={item.id}
            onClick={() => abrirModal(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ink/10 bg-surface p-2.5 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg dark:border-white/10 dark:bg-surface-sunken/60"
          >
            {/* Imagen Preview */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink/5 dark:bg-white/5">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-md">
                  <Eye className="h-4 w-4 text-brand" /> Ver en HD (1920x1080)
                </span>
              </div>
              <span className="absolute top-2 left-2 rounded-md bg-ink/80 px-2 py-0.5 text-[10px] font-mono font-bold text-white backdrop-blur-xs">
                #{String(item.id).padStart(2, '0')}
              </span>
            </div>

            {/* Metadatos y Gancho Comercial */}
            <div className="p-2 pt-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand truncate">
                  {item.categoryLabel}
                </span>
                <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] font-mono text-ink-muted border border-ink/5">
                  {item.metric}
                </span>
              </div>
              <h5 className="mt-1.5 text-xs font-semibold text-ink line-clamp-2 leading-snug">
                {item.title}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Cargar Más */}
      {pagina < totalPaginas && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setPagina((prev) => prev + 1)}
            className="flex items-center gap-2 rounded-full border border-ink/20 bg-surface px-6 py-2.5 text-xs font-semibold text-ink shadow-xs hover:border-brand hover:text-brand transition-all"
          >
            <span>Cargar más pantallas ({itemsFiltrados.length - itemsVisibles.length} restantes)</span>
          </button>
        </div>
      )}

      {/* Modal Lightbox en Pantalla Completa (Full Screen Modal) */}
      {itemSeleccionado && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={cerrarModal}
        >
          <div
            className="relative w-full max-w-5xl rounded-[2.5rem] bg-ink/[0.05] p-2 ring-1 ring-white/10 dark:ring-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-white/10 bg-surface text-ink shadow-2xl dark:bg-surface-sunken">
              
              {/* Header del Lightbox */}
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-brand px-2.5 py-1 text-xs font-mono font-bold text-white">
                    #{String(itemSeleccionado.id).padStart(2, '0')} / 75
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-brand uppercase tracking-wider">
                      {itemSeleccionado.categoryLabel}
                    </p>
                    <p className="text-sm font-semibold text-ink truncate max-w-lg">
                      {itemSeleccionado.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block rounded-full bg-surface-sunken px-3 py-1 text-xs font-mono text-ink-muted border border-ink/10">
                    {itemSeleccionado.metric}
                  </span>
                  <button
                    type="button"
                    onClick={cerrarModal}
                    title="Cerrar modal (Esc)"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 text-ink dark:bg-white/10 dark:hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Contenedor de la Imagen en Alta Resolución */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/90">
                <img
                  src={itemSeleccionado.src}
                  alt={itemSeleccionado.title}
                  className="h-full w-full object-contain"
                />

                {/* Flecha Anterior */}
                <button
                  type="button"
                  onClick={irAnterior}
                  title="Anterior (Flecha Izquierda)"
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-brand transition-colors"
                >
                  <CaretLeft weight="bold" className="h-6 w-6" />
                </button>

                {/* Flecha Siguiente */}
                <button
                  type="button"
                  onClick={irSiguiente}
                  title="Siguiente (Flecha Derecha)"
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-brand transition-colors"
                >
                  <CaretRight weight="bold" className="h-6 w-6" />
                </button>
              </div>

              {/* Footer del Lightbox con CTA de Negocio */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 px-6 py-4 dark:border-white/10">
                <div className="text-xs text-ink-muted">
                  <p className="font-semibold text-ink">Estrategia Comercial SoftRent:</p>
                  <p>Resolución nativa 1920×1080 · Diseñado para venta de alto valor a dueños de negocios.</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="http://localhost:5174"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-sunken"
                  >
                    <span>Abrir en Local (5174)</span>
                    <ArrowSquareOut className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="/comenzar"
                    className="rounded-full bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand-hover"
                  >
                    Implementar en mi Local
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
