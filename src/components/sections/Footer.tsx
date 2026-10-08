import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CreditCard,
  MapPin,
  Moon,
  Receipt,
  Sun,
  WhatsappLogo,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import { LogoSymbol, LogoWordmark } from '../brand/Logo'
import { Container } from '../layout/Container'
import { Select } from '../ui/Select'
import { useTheme } from '../../lib/useTheme'
import { cn } from '../../lib/cn'
import { contacto } from '../../content/contacto'

// El año se evalúa una sola vez al cargar el módulo,
// no en cada render (función impura).
const year = new Date().getFullYear()

type Columna = {
  titulo: string
  enlaces: { texto: string; href: string; externo?: boolean }[]
}

/* Columnas del footer (sección 3.4.11): soluciones, demos,
 * empresa, legal y contacto directo. */
const columnas: Columna[] = [
  {
    titulo: 'Soluciones',
    enlaces: [
      { texto: 'Por dolor', href: '/soluciones' },
      { texto: 'Industrias', href: '/industrias' },
      { texto: 'Precios', href: '/precios' },
      { texto: 'Comenzar', href: '/comenzar' },
    ],
  },
  {
    titulo: 'Demos',
    enlaces: [
      { texto: 'Ver todas', href: '/demos' },
      { texto: 'SoftRent Citas', href: '/demos' },
      { texto: 'SoftRent Pedidos', href: '/demos' },
      { texto: 'SoftRent Servicios', href: '/demos' },
    ],
  },
  {
    titulo: 'Empresa',
    enlaces: [
      { texto: 'Nosotros', href: '/nosotros' },
      { texto: 'Casos y resultados', href: '/casos' },
      { texto: 'Cómo funciona', href: '/#top' },
    ],
  },
  {
    titulo: 'Legal',
    enlaces: [
      { texto: 'Privacidad', href: '/privacidad' },
      { texto: 'Términos', href: '/terminos' },
      { texto: 'Ley 8968', href: '/privacidad#ley-8968' },
    ],
  },
]

/* Franja de confianza local: hechos que respaldan a una pyme CR. */
const confianza = [
  { icono: MapPin, texto: 'Hecho en Costa Rica' },
  { icono: CreditCard, texto: 'SINPE Móvil' },
  { icono: Receipt, texto: 'Facturación electrónica' },
]

/** Selector de tema accesible: dos botones con aria-pressed
 * agrupados, sincronizados con el store del tema. */
function SelectorTema() {
  const { theme, setTheme } = useTheme()
  const opciones: { id: 'dark' | 'light'; texto: string; Icono: typeof Moon }[] = [
    { id: 'dark', texto: 'Oscuro', Icono: Moon },
    { id: 'light', texto: 'Claro', Icono: Sun },
  ]
  return (
    <div
      role="group"
      aria-label="Tema del sitio"
      className="inline-flex overflow-hidden rounded-sm border border-ink-inverse/20"
    >
      {opciones.map(({ id, texto, Icono }) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          aria-pressed={theme === id}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus',
            theme === id
              ? 'bg-ink-inverse/15 text-ink-inverse'
              : 'text-ink-inverse/60 hover:text-ink-inverse',
          )}
        >
          <Icono className="h-3.5 w-3.5" aria-hidden="true" />
          {texto}
        </button>
      ))}
    </div>
  )
}

/** Selector de idioma: Español activo; el selector queda listo
 * para cuando se agregue el inglés. */
function SelectorIdioma() {
  const [idioma, setIdioma] = useState('es')
  return (
    <Select
      label="Idioma"
      value={idioma}
      onChange={(e) => setIdioma(e.target.value)}
      className="w-36"
    >
      <option value="es">Español</option>
      <option value="en" disabled>
        English (próximamente)
      </option>
    </Select>
  )
}

export default function Footer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="bg-[#0f0e0d] text-[#aaa39b]">
        <Container className="max-w-[1140px] px-6 sm:px-6 min-[1600px]:max-w-[1240px]">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 border-t border-white/10 py-7 text-xs">
            <Link to="/" className="inline-flex items-center gap-2.5 text-base font-semibold text-[#ded8d0]">
              <LogoSymbol size={23} />SoftRent
            </Link>
            <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-x-5 gap-y-3">
              <Link className="hover:underline underline-offset-4" to="/soluciones">Soluciones</Link>
              <Link className="hover:underline underline-offset-4" to="/precios">Precios</Link>
              <Link className="hover:underline underline-offset-4" to="/nosotros">Nosotros</Link>
              <Link className="hover:underline underline-offset-4" to="/privacidad">Privacidad</Link>
              <Link className="hover:underline underline-offset-4" to="/terminos">Términos</Link>
            </nav>
            <span>Hecho en Costa Rica</span>
          </div>
        </Container>
      </footer>
    )
  }

  return (
    <footer className="bg-surface-inverse text-ink-inverse/60">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Marca y contacto directo */}
          <div>
            <LogoWordmark width={152} />
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Sistemas de reservas, mensajes y cobros para negocios de
              servicios en Costa Rica. Lo implementamos en días.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a
                  href={`https://wa.me/${contacto.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink-inverse/70 underline-offset-4 transition-colors hover:text-ink-inverse hover:underline"
                >
                  <WhatsappLogo className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp directo
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacto.correoSoporte}`}
                  className="inline-flex items-center gap-2 text-ink-inverse/70 underline-offset-4 transition-colors hover:text-ink-inverse hover:underline"
                >
                  <EnvelopeSimple className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {contacto.correoSoporte}
                </a>
              </li>
            </ul>
          </div>

          {columnas.map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-inverse/50">
                {col.titulo}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.enlaces.map((enlace) => (
                  <li key={enlace.texto}>
                    <Link
                      to={enlace.href}
                      className="text-ink-inverse/70 underline-offset-4 transition-colors hover:text-ink-inverse hover:underline"
                    >
                      {enlace.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      {/* Franja de confianza local */}
      <div className="border-t border-ink-inverse/15">
        <Container>
          <ul className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-3">
            {confianza.map((item) => (
              <li
                key={item.texto}
                className="flex items-center gap-2.5 text-sm text-ink-inverse/70"
              >
                <item.icono className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.texto}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Barra inferior: derechos y selectores */}
      <div className="border-t border-ink-inverse/15">
        <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-inverse/50">
            © {year} SoftRent. Sistemas a la medida para pymes de servicio.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <SelectorTema />
            <SelectorIdioma />
          </div>
        </Container>
      </div>
    </footer>
  )
}
