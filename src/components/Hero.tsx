type Appointment = {
  time: string
  client: string
  service: string
  status: 'Confirmada' | 'Pendiente' | 'Facturada'
}

const appointments: Appointment[] = [
  { time: '09:00', client: 'Carla M.', service: 'Corte + barba', status: 'Confirmada' },
  { time: '11:30', client: 'Veterinaria Rex', service: 'Consulta', status: 'Pendiente' },
  { time: '15:00', client: 'Taller Luna', service: 'Mantenimiento', status: 'Facturada' },
]

const statusStyle: Record<Appointment['status'], string> = {
  Confirmada: 'text-teal',
  Pendiente: 'text-brass-dark',
  Facturada: 'text-ink-faint',
}

const statusDot: Record<Appointment['status'], string> = {
  Confirmada: 'bg-teal',
  Pendiente: 'bg-brass',
  Facturada: 'bg-ink-faint',
}

function DaySheet() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-line bg-card p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="font-display text-base">Agenda de hoy</p>
        <p className="font-mono text-xs text-ink-faint">Mié 30 set</p>
      </div>

      <ul className="space-y-3">
        {appointments.map((a) => (
          <li
            key={a.time}
            className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0"
          >
            <span className="font-mono text-sm text-ink-soft">{a.time}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm text-ink">{a.client}</span>
              <span className="block truncate text-xs text-ink-faint">{a.service}</span>
            </span>
            <span className={`flex items-center gap-1.5 text-xs ${statusStyle[a.status]}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${statusDot[a.status]}`} />
              {a.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-paper px-3 py-2.5 text-xs text-ink-soft">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
        Recordatorio enviado a 3 clientes por WhatsApp
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Tu negocio ya sabe cómo trabaja. Tu software todavía no.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            SoftRent diseña el sistema de reservas, mensajes y facturación de
            tu negocio, hecho para cómo trabajas tú, no para una plantilla
            genérica.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-teal"
            >
              Cuéntanos tu negocio
            </a>
            <a
              href="#como-funciona"
              className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <DaySheet />
        </div>
      </div>
    </section>
  )
}
