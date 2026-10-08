import { useState } from 'react'
import {
  CalendarCheck,
  CheckCircle,
  Funnel,
  ArrowsClockwise,
} from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'

type EstadoCita = 'Confirmada' | 'En Atención' | 'Atendido' | 'Pendiente'

interface CitaOperativa {
  id: string
  hora: string
  cliente: string
  telefono: string
  servicio: string
  staff: string
  precio: number
  precioStr: string
  estado: EstadoCita
}

const citasIniciales: CitaOperativa[] = [
  {
    id: 'c1',
    hora: '09:00 AM',
    cliente: 'Carlos Mendoza',
    telefono: '8812-4433',
    servicio: 'Corte Degradado',
    staff: 'Brandon H.',
    precio: 7000,
    precioStr: '₡7.000',
    estado: 'Atendido',
  },
  {
    id: 'c2',
    hora: '10:30 AM',
    cliente: 'Kevin Álvarez Solís',
    telefono: '8765-4321',
    servicio: 'Corte Clásico + Tinte',
    staff: 'Esteban S.',
    precio: 25000,
    precioStr: '₡25.000',
    estado: 'En Atención',
  },
  {
    id: 'c3',
    hora: '11:45 AM',
    cliente: 'Felipe Montero Díaz',
    telefono: '7011-2299',
    servicio: 'Barba Ritual + Toalla',
    staff: 'Brandon H.',
    precio: 5000,
    precioStr: '₡5.000',
    estado: 'Confirmada',
  },
  {
    id: 'c4',
    hora: '02:00 PM',
    cliente: 'Andrés Castro Vega',
    telefono: '8900-1122',
    servicio: 'Grooming Completo',
    staff: 'Brandon H.',
    precio: 12000,
    precioStr: '₡12.000',
    estado: 'Confirmada',
  },
  {
    id: 'c5',
    hora: '03:45 PM',
    cliente: 'Mauricio Quesada',
    telefono: '8344-5566',
    servicio: 'Corte Degradado + Mascarilla',
    staff: 'Esteban S.',
    precio: 10000,
    precioStr: '₡10.000',
    estado: 'Pendiente',
  },
]

export function StaffAgendaBoard() {
  const [citas, setCitas] = useState<CitaOperativa[]>(citasIniciales)
  const [filtroStaff, setFiltroStaff] = useState<string>('todos')
  const [mensajeSync, setMensajeSync] = useState<string | null>(null)

  const cambiarEstado = (id: string, nuevoEstado: EstadoCita) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c))
    )
    const cita = citas.find((c) => c.id === id)
    setMensajeSync(
      `Estado de ${cita?.cliente} actualizado a "${nuevoEstado}" (Sincronizado vía WhatsApp)`
    )
    setTimeout(() => {
      setMensajeSync(null)
    }, 4000)
  }

  const citasFiltradas = citas.filter((c) => {
    if (filtroStaff === 'todos') return true
    return c.staff.toLowerCase().includes(filtroStaff.toLowerCase())
  })

  const totalFacturado = citas
    .filter((c) => c.estado === 'Atendido' || c.estado === 'En Atención')
    .reduce((acc, c) => acc + c.precio, 0)

  const citasAtendidasCount = citas.filter((c) => c.estado === 'Atendido').length
  const citasEnAtencionCount = citas.filter((c) => c.estado === 'En Atención').length

  const handleReset = () => {
    setCitas(citasIniciales)
    setMensajeSync('Agenda restablecida a valores iniciales')
    setTimeout(() => setMensajeSync(null), 3000)
  }

  return (
    <div className="rounded-[2.5rem] bg-ink/[0.03] p-2 ring-1 ring-ink/10 dark:bg-white/[0.03] dark:ring-white/10">
      <div className="overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-ink/5 bg-surface p-6 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:border-white/5 dark:bg-surface-sunken">
        
        {/* Cabecera del Panel Operativo */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <CalendarCheck weight="fill" className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm sm:text-base text-ink">
                  Agenda Operativa de Trabajo (Staff)
                </h4>
                <Badge tone="success" dot className="text-[10px] py-0 px-2">
                  En Vivo
                </Badge>
              </div>
              <p className="text-xs text-ink-muted">
                Ruta activa: <code className="font-mono text-[11px] text-ink">https://reservas.softrent.dev/citas/agenda</code>
              </p>
            </div>
          </div>

          {/* Filtro de Especialista */}
          <div className="flex items-center gap-2">
            <Funnel className="h-4 w-4 text-ink-muted" />
            <select
              value={filtroStaff}
              onChange={(e) => setFiltroStaff(e.target.value)}
              className="rounded-xl border border-ink/15 bg-surface px-3 py-1.5 text-xs text-ink shadow-xs focus:border-brand dark:border-white/15"
            >
              <option value="todos">Todos los profesionales (2)</option>
              <option value="brandon">Brandon Hernández</option>
              <option value="esteban">Esteban Solano</option>
            </select>
            <button
              type="button"
              onClick={handleReset}
              title="Restablecer citas"
              className="p-1.5 rounded-xl border border-ink/10 text-ink-muted hover:text-ink hover:bg-surface-sunken"
            >
              <ArrowsClockwise className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notificación de Sincronización en Vivo */}
        {mensajeSync && (
          <div className="mt-4 rounded-xl border border-brand/20 bg-brand/[0.04] p-2.5 text-center text-xs font-medium text-brand animate-in fade-in duration-300">
            {mensajeSync}
          </div>
        )}

        {/* Tarjetas de Métricas de Caja y Flujo de Hoy */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-ink/10 bg-surface-sunken p-3.5 dark:border-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              Citas Hoy
            </p>
            <p className="mt-1 font-display text-xl font-bold text-ink">{citas.length}</p>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">100% asistencias</span>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-surface-sunken p-3.5 dark:border-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              En Atención
            </p>
            <p className="mt-1 font-display text-xl font-bold text-amber-600 dark:text-amber-400">
              {citasEnAtencionCount}
            </p>
            <span className="text-[10px] text-ink-muted">Sillón ocupado</span>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-surface-sunken p-3.5 dark:border-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              Atendidas / Cobradas
            </p>
            <p className="mt-1 font-display text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {citasAtendidasCount}
            </p>
            <span className="text-[10px] text-ink-muted">Con factura fiscal</span>
          </div>

          <div className="rounded-2xl border border-brand/20 bg-brand/[0.03] p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand">
              Facturación en Curso
            </p>
            <p className="mt-1 font-mono text-xl font-bold text-brand">
              ₡{totalFacturado.toLocaleString('es-CR')}
            </p>
            <span className="text-[10px] text-ink-muted">SINPE + Efectivo</span>
          </div>
        </div>

        {/* Lista Interactiva de Citas del Día */}
        <div className="mt-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Citas de Hoy · Viernes 12 de Octubre (Toque un botón para cambiar estado en vivo):
          </p>

          <div className="space-y-2.5">
            {citasFiltradas.map((cita) => {
              return (
                <div
                  key={cita.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-surface p-4 transition-all duration-300 hover:border-ink/20 hover:shadow-xs dark:border-white/10 dark:bg-surface-sunken/40"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Hora y Precio */}
                    <div className="w-20 shrink-0">
                      <p className="font-mono text-xs font-bold text-ink">{cita.hora}</p>
                      <p className="font-mono text-[11px] text-brand font-semibold">{cita.precioStr}</p>
                    </div>

                    {/* Detalle del Cliente y Servicio */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-xs text-ink truncate">{cita.cliente}</p>
                        <span className="text-[10px] text-ink-muted font-mono">({cita.telefono})</span>
                      </div>
                      <p className="text-xs text-ink-muted truncate">
                        {cita.servicio} · <span className="font-medium text-ink">{cita.staff}</span>
                      </p>
                    </div>
                  </div>

                  {/* Estado y Botones de Acción de 1 Toque */}
                  <div className="flex items-center justify-between sm:justify-end gap-2.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-ink/5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        cita.estado === 'Atendido'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : cita.estado === 'En Atención'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 animate-pulse'
                          : cita.estado === 'Confirmada'
                          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                          : 'bg-ink/5 text-ink-muted'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {cita.estado}
                    </span>

                    {/* Botones de Cambio de Estado Rápido */}
                    <div className="flex items-center gap-1.5">
                      {cita.estado !== 'En Atención' && cita.estado !== 'Atendido' && (
                        <button
                          type="button"
                          onClick={() => cambiarEstado(cita.id, 'En Atención')}
                          className="rounded-xl border border-ink/15 bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors"
                        >
                          Atender
                        </button>
                      )}

                      {cita.estado === 'En Atención' && (
                        <button
                          type="button"
                          onClick={() => cambiarEstado(cita.id, 'Atendido')}
                          className="rounded-xl bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        >
                          <CheckCircle weight="bold" className="h-3 w-3" /> Cobrar ₡
                        </button>
                      )}

                      {cita.estado === 'Pendiente' && (
                        <button
                          type="button"
                          onClick={() => cambiarEstado(cita.id, 'Confirmada')}
                          className="rounded-xl bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
                        >
                          Confirmar
                        </button>
                      )}

                      {cita.estado === 'Atendido' && (
                        <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle weight="fill" className="h-3.5 w-3.5" /> Listo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4 text-[11px] text-ink-muted dark:border-white/10">
          <span>⚡ La pantalla de trabajo táctil para usar en tablet de recepción o celular del staff.</span>
          <span>Cero sobrecarga visual · Control total en 1 clic</span>
        </div>

      </div>
    </div>
  )
}
