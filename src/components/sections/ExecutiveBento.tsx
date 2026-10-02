import {
  WhatsappLogo,
  CalendarCheck,
  Receipt,
  ArrowUpRight,
  Sparkle,
  CheckCircle,
  Clock,
  ShieldCheck,
} from '@phosphor-icons/react'
import { Container } from '../layout/Container'
import { Badge } from '../ui/Badge'

/**
 * Vanguard_UI_Architect: ExecutiveBento (Awwwards / $150k Agency Experience)
 * 
 * - Archetype: Editorial Luxury & Warm Structuralism (Doppelrand Double-Bezel)
 * - Motion: Fluid mass-spring interpolation via cubic-bezier(0.32, 0.72, 0, 1)
 * - Micro-Aesthetics: Button-in-Button trailing icons, nested concentric shells,
 *   ambient light dissipation, micro-eyebrow tracking.
 * - Mobile Collapse: Standardized single-column stack below 768px with touch clearance.
 */
export default function ExecutiveBento() {

  return (
    <section className="relative overflow-hidden bg-bg py-28 text-ink sm:py-36">
      {/* Ambient background architectural noise & subtle radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(234,27,37,0.04),transparent_80%)]"
      />

      <Container>
        {/* Editorial Header with Micro-Eyebrow */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3 py-1 shadow-xs dark:border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-ink-muted">
              Infraestructura Autónoma
            </span>
          </div>

          <h2 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-ink">
            El estándar ejecutivo para negocios que no duermen.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Tres subsistemas coordinados en milisegundos: recepción conversacional,
            sincronización de agenda sin sobreventa y cobro SINPE con factura fiscal directa.
          </p>
        </div>

        {/* Asymmetrical Bento Grid with Double-Bezel Enclosures */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8">
          
          {/* Card 1: Primary WhatsApp AI Engine (Col 7 / Big Anchor) */}
          <div className="group md:col-span-12 lg:col-span-7">
            {/* Outer Bezel (Shell) */}
            <div className="rounded-[2.5rem] bg-ink/[0.03] p-2 ring-1 ring-ink/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink/[0.05] dark:bg-white/[0.03] dark:ring-white/10 dark:hover:bg-white/[0.05]">
              {/* Inner Core (Concentric Math: 2.5rem - 0.5rem = 2rem) */}
              <div className="relative flex flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-ink/5 bg-surface p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:border-white/5 dark:bg-surface-sunken dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] sm:p-10 min-h-[460px]">
                
                {/* Top Badge & Live Pulse */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <WhatsappLogo weight="light" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold tracking-tight">Recepción 24/7</p>
                      <p className="text-xs text-ink-muted">WhatsApp Business API</p>
                    </div>
                  </div>
                  <Badge tone="success" dot className="px-3 py-1 text-xs">
                    0.4s latencia media
                  </Badge>
                </div>

                {/* Simulated Interactive Chat Stream */}
                <div className="my-8 space-y-3.5">
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-sunken p-4 text-sm text-ink border border-ink/5 dark:border-white/5 shadow-xs">
                      <p className="font-medium text-xs text-ink-muted mb-1">Cliente · 11:42 PM</p>
                      <p>Hola, ¿tienen espacio mañana a las 3:00 PM para corte y barba?</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-ink text-ink-inverse p-4 text-sm shadow-md">
                      <div className="flex items-center gap-1.5 text-xs text-ink-inverse/70 mb-1">
                        <Sparkle weight="fill" className="h-3 w-3 text-brand" />
                        <span>Asistente SoftRent</span>
                      </div>
                      <p>¡Buenas noches! Mañana a las 3:00 PM está ocupado, pero tengo espacio a las <strong>3:45 PM</strong> o a las <strong>5:00 PM</strong> con Brandon. ¿Cuál le sirve mejor?</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-ink-muted pt-1">
                    <Clock weight="light" className="h-4 w-4 text-brand" />
                    <span>Confirmación y reserva de abono completada en menos de 2 minutos.</span>
                  </div>
                </div>

                {/* Bottom Architectural Spec */}
                <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-ink-muted">
                    Reglas de negocio personalizadas por local y profesional.
                  </p>
                  <span className="text-xs font-semibold tracking-wider text-brand uppercase">
                    Cero mensajes sin respuesta →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Automatic Invoicing & SINPE Móvil (Col 5) */}
          <div className="group md:col-span-12 lg:col-span-5">
            <div className="rounded-[2.5rem] bg-ink/[0.03] p-2 ring-1 ring-ink/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink/[0.05] dark:bg-white/[0.03] dark:ring-white/10 dark:hover:bg-white/[0.05]">
              <div className="relative flex flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-ink/5 bg-surface p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:border-white/5 dark:bg-surface-sunken dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] sm:p-10 min-h-[460px]">
                
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink/5 text-ink dark:bg-white/10 dark:text-white">
                    <Receipt weight="light" className="h-6 w-6" />
                  </div>
                  
                  <h3 className="mt-6 font-display text-2xl tracking-tight sm:text-3xl text-ink">
                    Cobra con SINPE y factura a Hacienda.
                  </h3>
                  
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Validación automática de comprobantes. El cliente abona el 50% para congelar su cita y el sistema timbra el XML fiscal al instante.
                  </p>
                </div>

                {/* Machined Physical Receipt Visual Component */}
                <div className="my-6 rounded-2xl border border-border bg-surface-sunken p-4.5">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div>
                      <p className="text-xs font-semibold">Comprobante SINPE</p>
                      <p className="text-[11px] text-ink-muted">Ref #982410 • Recibido</p>
                    </div>
                    <p className="font-display text-lg text-ink font-semibold">₡12.000</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
                    <span className="flex items-center gap-1.5 text-success">
                      <CheckCircle weight="fill" className="h-4 w-4" />
                      Factura electrónica enviada
                    </span>
                    <span className="font-mono text-[10px]">Hacienda CR v4.3</span>
                  </div>
                </div>

                {/* Sub-Metric */}
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <ShieldCheck weight="light" className="h-4 w-4 text-brand" />
                  <span>Sin cuadernos de notas, sin cuentas perdidas.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Autonomous Agenda & Anti-Overbooking (Full-width / Col 12) */}
          <div className="group md:col-span-12">
            <div className="rounded-[2.5rem] bg-ink/[0.03] p-2 ring-1 ring-ink/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink/[0.05] dark:bg-white/[0.03] dark:ring-white/10 dark:hover:bg-white/[0.05]">
              <div className="relative flex flex-col justify-between overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-ink/5 bg-surface p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:border-white/5 dark:bg-surface-sunken dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] sm:p-10 lg:flex-row lg:items-center lg:gap-12">
                
                <div className="max-w-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <CalendarCheck weight="light" className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 font-display text-2xl tracking-tight sm:text-3xl text-ink">
                    Calendario coordinado en tiempo real.
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Los cupos se abren o cierran automáticamente según la velocidad de atención.
                    Los recordatorios se despachan solos 24 h y 2 h antes, reduciendo las ausencias al mínimo histórico.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-ink-muted">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand" />
                      <span>Sincronización multi-dispositivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-success" />
                      <span>Bloqueo instantáneo por abono</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-info" />
                      <span>WhatsApp Cloud API certificada</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Nested CTA: The "Button-in-Button" Island Pattern */}
                <div className="mt-8 lg:mt-0 flex flex-col items-start lg:items-end">
                  <a
                    href="/comenzar"
                    className="group/btn relative inline-flex items-center gap-4 rounded-full bg-brand pl-7 pr-3 py-3 text-sm font-medium text-white shadow-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:bg-brand/90 hover:shadow-lg"
                  >
                    <span>Comenzar implementación</span>
                    {/* Nested Island trailing circle */}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px]">
                      <ArrowUpRight weight="bold" className="h-4 w-4 text-white" />
                    </span>
                  </a>
                  <p className="mt-2.5 text-[11px] text-ink-muted">
                    Entrega llave en mano en 48 horas en Costa Rica.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
