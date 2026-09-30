const links = [
  { href: '#pilares', label: 'Qué hacemos' },
  { href: '#negocio', label: 'Para tu negocio' },
  { href: '#como-funciona', label: 'Cómo funciona' },
]

function Logomark() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="var(--color-ink)" />
      <path
        d="M10 20v-8q0-2 2-2h7q3 0 3 3t-3 3h-5.5"
        stroke="var(--color-paper)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="22" r="2" fill="var(--color-brass)" />
    </svg>
  )
}

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <Logomark />
          <span className="font-display text-lg font-medium tracking-tight">
            SoftRent
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-teal"
        >
          Hablemos
        </a>
      </div>
    </header>
  )
}
