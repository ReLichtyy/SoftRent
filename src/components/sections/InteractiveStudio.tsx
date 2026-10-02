import { useState } from 'react'
import {
  CalendarCheck,
  Cpu,
  DeviceMobile,
  Images,
} from '@phosphor-icons/react'
import { Container } from '../layout/Container'
import { BookingSimulator } from '../interactive/BookingSimulator'
import { AiRagConsole } from '../interactive/AiRagConsole'
import { StaffAgendaBoard } from '../interactive/StaffAgendaBoard'
import { GalleryLightbox } from '../interactive/GalleryLightbox'

type ModoSistema = 'reserva' | 'ia' | 'agenda' | 'galeria'

interface PestanaConfig {
  id: ModoSistema
  titulo: string
  subtitulo: string
  badge: string
  icono: typeof DeviceMobile
}

const pestanas: PestanaConfig[] = [
  {
    id: 'reserva',
    titulo: 'Reservas Solo con el Número',
    subtitulo: 'Flujo Cliente (30 segundos)',
    badge: 'Cero Fricción',
    icono: DeviceMobile,
  },
  {
    id: 'ia',
    titulo: 'Cerebro IA & Memoria RAG',
    subtitulo: 'Búsqueda Híbrida 24/7',
    badge: '0 Alucinaciones',
    icono: Cpu,
  },
  {
    id: 'agenda',
    titulo: 'Agenda & Staff Operativo',
    subtitulo: 'Panel Administrador',
    badge: '1 Toque',
    icono: CalendarCheck,
  },
  {
    id: 'galeria',
    titulo: 'Galería de 75 Pantallas',
    subtitulo: 'Catálogo Visual HD',
    badge: '75 Activos',
    icono: Images,
  },
]

export default function InteractiveStudio() {
  const [modoActivo, setModoActivo] = useState<ModoSistema>('reserva')

  return (
    <section id="estudio-interactivo" className="relative overflow-hidden bg-bg py-28 text-ink sm:py-36 border-t border-ink/5 dark:border-white/5">
      {/* Luz ambiental sutil y textura arquitectónica */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(234,27,37,0.035),transparent_70%)]"
      />

      <Container>
        {/* Encabezado Editorial con Micro-Eyebrow */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3.5 py-1 shadow-xs dark:border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-ink-muted">
              Estudio Interactivo en Vivo
            </span>
          </div>

          <h2 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-ink">
            Pruébelo con sus propias manos antes de contratar.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted max-w-2xl mx-auto">
            Interactúe en tiempo real con los cuatro módulos centrales: la experiencia de reserva sin contraseñas,
            la consola de memoria RAG de la IA, el tablero operativo del staff y las 75 pantallas comerciales del sistema.
          </p>
        </div>

        {/* Selector de Modos (Doppelrand Outer Shell & Concentric Pills) */}
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-4xl rounded-[2rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/10 dark:bg-white/[0.03] dark:ring-white/10">
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {pestanas.map((p) => {
                const Icono = p.icono
                const activo = modoActivo === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setModoActivo(p.id)}
                    className={`group relative flex flex-col items-start rounded-[calc(2rem-0.375rem)] p-3.5 text-left transition-all duration-300 ${
                      activo
                        ? 'bg-surface text-ink shadow-sm ring-1 ring-ink/10 dark:bg-surface-sunken dark:ring-white/10'
                        : 'hover:bg-surface/50 text-ink-muted hover:text-ink'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                          activo
                            ? 'bg-brand/10 text-brand'
                            : 'bg-ink/5 text-ink-muted group-hover:text-ink dark:bg-white/10'
                        }`}
                      >
                        <Icono weight={activo ? 'fill' : 'light'} className="h-4 w-4" />
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          activo
                            ? 'bg-brand/10 text-brand'
                            : 'bg-ink/5 text-ink-muted dark:bg-white/5'
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs font-bold leading-tight text-ink">
                      {p.titulo}
                    </p>
                    <p className="text-[11px] text-ink-muted truncate w-full mt-0.5">
                      {p.subtitulo}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Área Interactiva Dinámica */}
        <div className="mt-12 transition-all duration-500">
          {modoActivo === 'reserva' && <BookingSimulator />}
          {modoActivo === 'ia' && <AiRagConsole />}
          {modoActivo === 'agenda' && <StaffAgendaBoard />}
          {modoActivo === 'galeria' && <GalleryLightbox />}
        </div>

      </Container>
    </section>
  )
}
