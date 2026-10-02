import { useState } from 'react'
import {
  Check,
  CheckCircle,
  Clock,
  MapPin,
  Sparkle,
  WhatsappLogo,
  ArrowRight,
  ArrowClockwise,
  ArrowUpRight,
} from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'

interface Especialista {
  id: string
  nombre: string
  rol: string
  rating: string
  avatar: string
}

interface Servicio {
  id: string
  nombre: string
  precio: number
  precioStr: string
  duracion: number
  duracionStr: string
  esAdicional?: boolean
}

const especialistas: Especialista[] = [
  { id: 'brandon', nombre: 'Brandon Hernández', rol: 'Barbero Master', rating: '4.9 ★', avatar: 'BH' },
  { id: 'esteban', nombre: 'Esteban Solano', rol: 'Colorista & Estilista', rating: '5.0 ★', avatar: 'ES' },
  { id: 'sofia', nombre: 'Dra. Sofía Vargas', rol: 'Especialista Clínico', rating: '4.9 ★', avatar: 'SV' },
]

const serviciosDisponibles: Servicio[] = [
  { id: 'corte', nombre: 'Corte Clásico Degradado', precio: 7000, precioStr: '₡7.000', duracion: 45, duracionStr: '45 min' },
  { id: 'barba', nombre: 'Barba Ritual con Toalla Caliente', precio: 5000, precioStr: '₡5.000', duracion: 30, duracionStr: '30 min' },
  { id: 'combo', nombre: 'Combo Corte + Barba Completo', precio: 11000, precioStr: '₡11.000', duracion: 75, duracionStr: '1h 15m' },
  { id: 'mascarilla', nombre: 'Mascarilla Facial Purificante', precio: 3000, precioStr: '₡3.000', duracion: 15, duracionStr: '15 min', esAdicional: true },
]

const ranurasHorarias = [
  { hora: '10:30 AM', disponible: true, recomendada: false },
  { hora: '11:45 AM', disponible: false, recomendada: false },
  { hora: '02:15 PM', disponible: true, recomendada: false },
  { hora: '03:45 PM', disponible: true, recomendada: true },
  { hora: '05:00 PM', disponible: true, recomendada: false },
]

export function BookingSimulator() {
  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState<string>('brandon')
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>(['corte', 'mascarilla'])
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('03:45 PM')
  const [telefono, setTelefono] = useState<string>('8842-1920')
  const [nombre, setNombre] = useState<string>('Luis Ramírez')
  const [confirmado, setConfirmado] = useState<boolean>(false)
  const [mostrarNotificacion, setMostrarNotificacion] = useState<boolean>(false)

  const esp = especialistas.find((e) => e.id === especialistaSeleccionado) || especialistas[0]

  const totalPrecio = serviciosSeleccionados.reduce((acc, id) => {
    const s = serviciosDisponibles.find((srv) => srv.id === id)
    return acc + (s ? s.precio : 0)
  }, 0)

  const totalDuracion = serviciosSeleccionados.reduce((acc, id) => {
    const s = serviciosDisponibles.find((srv) => srv.id === id)
    return acc + (s ? s.duracion : 0)
  }, 0)

  const toggleServicio = (id: string) => {
    if (serviciosSeleccionados.includes(id)) {
      if (serviciosSeleccionados.length > 1) {
        setServiciosSeleccionados(serviciosSeleccionados.filter((s) => s !== id))
      }
    } else {
      setServiciosSeleccionados([...serviciosSeleccionados, id])
    }
  }

  const handleConfirmar = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmado(true)
    setMostrarNotificacion(true)
    setTimeout(() => {
      setMostrarNotificacion(false)
    }, 6000)
  }

  const handleReset = () => {
    setConfirmado(false)
    setMostrarNotificacion(false)
  }

  return (
    <div className="relative">
      {/* Toast de Simulación de WhatsApp en tiempo real */}
      {mostrarNotificacion && (
        <div className="absolute -top-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-emerald-500/20 bg-surface-sunken p-3.5 shadow-2xl backdrop-blur-xl sm:top-2 sm:max-w-md w-[92%] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <WhatsappLogo weight="fill" className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 text-xs">
            <p className="font-semibold text-ink">Barbería Don Luis · WhatsApp</p>
            <p className="text-ink-muted truncate">
              ¡Hola {nombre.split(' ')[0]}! Su cita para mañana a las {horaSeleccionada} quedó confirmada.
            </p>
          </div>
          <span className="text-[10px] text-ink-muted shrink-0">Ahora</span>
        </div>
      )}

      {/* Doble Bisel (Doppelrand Architecture) */}
      <div className="rounded-[2.5rem] bg-ink/[0.03] p-2 ring-1 ring-ink/10 dark:bg-white/[0.03] dark:ring-white/10">
        <div className="overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-ink/5 bg-surface p-6 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:border-white/5 dark:bg-surface-sunken">
          
          {/* Header de la App Simulada */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 font-bold text-brand">
                DL
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm sm:text-base text-ink">Barbería Don Luis</h4>
                  <Badge tone="success" dot className="text-[10px] py-0 px-2">
                    Cupos en vivo
                  </Badge>
                </div>
                <p className="text-xs text-ink-muted flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" /> San José, Barrio Escalante · Costa Rica
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                Cero Contraseñas
              </span>
              <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs text-ink-muted border border-ink/5">
                Reserva en 30s
              </span>
            </div>
          </div>

          {!confirmado ? (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Columna Izquierda: Los 4 Pasos Rápidos (7 cols) */}
              <div className="space-y-6 lg:col-span-7">
                {/* Paso 1: Especialista */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      1. Seleccione su Especialista
                    </p>
                    <span className="text-xs text-brand font-medium">Atención personalizada</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {especialistas.map((item) => {
                      const activo = item.id === especialistaSeleccionado
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setEspecialistaSeleccionado(item.id)}
                          className={`relative flex flex-col items-start rounded-2xl p-3.5 text-left transition-all duration-300 ${
                            activo
                              ? 'border-2 border-brand bg-brand/[0.04] shadow-xs'
                              : 'border border-ink/10 bg-surface-sunken hover:border-ink/20 dark:border-white/10'
                          }`}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink/5 text-xs font-bold text-ink dark:bg-white/10">
                              {item.avatar}
                            </span>
                            {activo && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                                <Check weight="bold" className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <p className="mt-2.5 font-semibold text-xs text-ink">{item.nombre}</p>
                          <p className="text-[11px] text-ink-muted truncate w-full">{item.rol}</p>
                          <p className="mt-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                            {item.rating}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Paso 2: Catálogo de Servicios y Adicionales */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      2. Servicios y Adicionales (Upselling)
                    </p>
                    <span className="text-xs text-ink-muted">Sume extras con 1 clic</span>
                  </div>
                  <div className="space-y-2">
                    {serviciosDisponibles.map((srv) => {
                      const sel = serviciosSeleccionados.includes(srv.id)
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleServicio(srv.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && toggleServicio(srv.id)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all duration-200 ${
                            sel
                              ? 'border-brand/40 bg-brand/[0.03] text-ink'
                              : 'border-ink/10 bg-surface-sunken/60 hover:bg-surface-sunken text-ink-muted dark:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                sel
                                  ? 'border-brand bg-brand text-white'
                                  : 'border-ink/20 dark:border-white/20'
                              }`}
                            >
                              {sel && <Check weight="bold" className="h-3.5 w-3.5" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-semibold text-ink">{srv.nombre}</p>
                                {srv.esAdicional && (
                                  <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-medium text-brand">
                                    Adicional
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-ink-muted flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {srv.duracionStr}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-xs text-ink font-mono">{srv.precioStr}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Paso 3: Horarios en Vivo */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2.5">
                    3. Horario Disponible para Mañana
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {ranurasHorarias.map((slot) => {
                      const activo = horaSeleccionada === slot.hora
                      return (
                        <button
                          key={slot.hora}
                          type="button"
                          disabled={!slot.disponible}
                          onClick={() => setHoraSeleccionada(slot.hora)}
                          className={`flex flex-col items-center justify-center rounded-xl py-2 px-1 text-xs transition-all ${
                            !slot.disponible
                              ? 'opacity-40 cursor-not-allowed bg-ink/5 line-through dark:bg-white/5'
                              : activo
                              ? 'bg-ink text-ink-inverse font-semibold shadow-sm'
                              : 'bg-surface-sunken hover:border-ink/30 border border-ink/10 dark:border-white/10 text-ink'
                          }`}
                        >
                          <span>{slot.hora}</span>
                          {slot.recomendada && (
                            <span className="text-[8px] text-brand font-medium">Recomendado</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Paso 4 y Resumen (5 cols) */}
              <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-surface-sunken/80 p-5 sm:p-6 dark:border-white/10 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-2 border-b border-ink/10 pb-4 dark:border-white/10">
                    <Sparkle weight="fill" className="h-4 w-4 text-brand" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                      4. Solo su Número (Sin Contraseña)
                    </p>
                  </div>

                  <form onSubmit={handleConfirmar} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-muted mb-1">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2 text-xs text-ink shadow-xs focus:border-brand focus:ring-1 focus:ring-brand dark:border-white/15"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-ink-muted mb-1">
                        Número de Teléfono (Costa Rica +506)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-xs text-ink-muted font-mono">
                          🇨🇷 +506
                        </span>
                        <input
                          type="tel"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          placeholder="8888-8888"
                          required
                          className="w-full rounded-xl border border-ink/15 bg-surface pl-20 pr-3 py-2 text-xs text-ink font-mono font-medium shadow-xs focus:border-brand focus:ring-1 focus:ring-brand dark:border-white/15"
                        />
                      </div>
                      <p className="mt-1.5 text-[10px] text-ink-muted">
                        No requiere usuario ni clave. Le enviaremos el comprobante y recordatorios a su WhatsApp.
                      </p>
                    </div>

                    {/* Resumen Financiero en Vivo */}
                    <div className="rounded-xl border border-ink/10 bg-surface p-3.5 space-y-2 dark:border-white/10">
                      <div className="flex justify-between text-xs text-ink-muted">
                        <span>Especialista</span>
                        <span className="font-medium text-ink">{esp.nombre.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between text-xs text-ink-muted">
                        <span>Horario</span>
                        <span className="font-medium text-ink">Mañana · {horaSeleccionada}</span>
                      </div>
                      <div className="flex justify-between text-xs text-ink-muted">
                        <span>Duración total</span>
                        <span className="font-medium text-ink">{totalDuracion} min</span>
                      </div>
                      <div className="border-t border-ink/10 pt-2 flex justify-between items-center dark:border-white/10">
                        <span className="text-xs font-semibold text-ink">Total a Pagar</span>
                        <span className="text-base font-bold text-brand font-mono">
                          ₡{totalPrecio.toLocaleString('es-CR')}
                        </span>
                      </div>
                      <div className="rounded-lg bg-emerald-500/10 p-2 text-[10px] text-emerald-700 dark:text-emerald-400">
                        Abono de garantía requerido: <strong>₡{(totalPrecio * 0.5).toLocaleString('es-CR')}</strong> (50% vía SINPE Móvil).
                      </div>
                    </div>

                    {/* Botón Principal (Nested CTA) */}
                    <button
                      type="submit"
                      className="group relative flex w-full items-center justify-between rounded-full bg-brand py-3 pl-6 pr-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-hover active:scale-[0.98]"
                    >
                      <span>Confirmar Reserva Inmediata</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                        <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* Pantalla de Confirmación Exitosa */
            <div className="my-8 flex flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle weight="fill" className="h-10 w-10" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                ¡Cita Confirmada con Éxito!
              </h3>
              <p className="mt-1 text-sm text-ink-muted max-w-md">
                Hemos enviado el ticket digital y la ubicación en Waze al WhatsApp de <strong>{nombre}</strong> ({telefono}).
              </p>

              {/* Tarjeta de Comprobante Digital */}
              <div className="mt-6 w-full max-w-md rounded-2xl border border-ink/10 bg-surface-sunken p-6 text-left shadow-sm dark:border-white/10">
                <div className="flex items-center justify-between border-b border-ink/10 pb-3 dark:border-white/10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand">Comprobante #SR-9412</p>
                    <p className="text-sm font-semibold text-ink">Barbería Don Luis</p>
                  </div>
                  <Badge tone="success" dot>
                    SINPE Validado
                  </Badge>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Profesional:</span>
                    <span className="font-semibold text-ink">{esp.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Fecha y Hora:</span>
                    <span className="font-semibold text-ink">Mañana · {horaSeleccionada}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Servicios:</span>
                    <span className="font-semibold text-ink">
                      {serviciosSeleccionados.map((id) => serviciosDisponibles.find((s) => s.id === id)?.nombre).join(' + ')}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-ink/10 pt-2 font-mono dark:border-white/10">
                    <span className="text-ink font-semibold">Total a Cancelar:</span>
                    <span className="text-brand font-bold">₡{totalPrecio.toLocaleString('es-CR')}</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a
                    href="https://waze.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-ink/15 bg-surface py-2 px-3 text-[11px] font-medium text-ink hover:bg-surface-sunken"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand" /> Abrir en Waze <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setMostrarNotificacion(true)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-ink/15 bg-surface py-2 px-3 text-[11px] font-medium text-ink hover:bg-surface-sunken"
                  >
                    <WhatsappLogo className="h-3.5 w-3.5 text-emerald-600" /> Ver WhatsApp
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-brand transition-colors"
              >
                <ArrowClockwise className="h-4 w-4" /> Probar otra reserva en vivo
              </button>
            </div>
          )}

          {/* Footer Informativo */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-4 text-[11px] text-ink-muted dark:border-white/10">
            <span>✨ Simulación exacta de la web pública (https://mivps-217-77-11-250.sslip.io/)</span>
            <span>Tecnología SoftRent · Hecho en Costa Rica 🇨🇷</span>
          </div>

        </div>
      </div>
    </div>
  )
}
