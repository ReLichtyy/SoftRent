const businesses = ['Barberías', 'Veterinarias', 'Estudios de tatuajes', 'Comercios pequeños']

function BrowserMock() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 flex-1 rounded-md bg-paper px-3 py-1 font-mono text-xs text-ink-soft">
          barberia-el-punto.softrent.cr
        </span>
      </div>
      <div className="space-y-2.5 px-4 py-5">
        <div className="h-3 w-2/3 rounded bg-line" />
        <div className="h-3 w-1/2 rounded bg-line" />
        <div className="mt-4 h-8 w-28 rounded-full bg-ink/80" />
      </div>
    </div>
  )
}

export default function Businesses() {
  return (
    <section id="negocio" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Tu sistema, con tu cara
          </h2>
          <p className="mt-4 max-w-md text-ink-soft">
            Nada de plantilla compartida con otros veinte negocios. Cada
            cliente recibe su propio sitio, en su propio subdominio, armado
            sobre lo que su negocio realmente necesita.
          </p>

          <p className="mt-8 text-sm text-ink-faint">Hoy diseñamos para</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {businesses.map((b) => (
              <li key={b} className="text-sm text-ink-soft">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BrowserMock />
        </div>
      </div>
    </section>
  )
}
