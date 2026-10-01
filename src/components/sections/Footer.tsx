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
      className="inline-flex overflow-hidden rounded-sm border border-on-deep/20"
    >
      {opciones.map(({ id, texto, Icono }) => (
        <button
          key={id}
          type="button"
          onClick={() => setTheme(id)}
          aria-pressed={theme === id}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand',
            theme === id
              ? 'bg-on-deep/15 text-on-deep'
              : 'text-on-deep/60 hover:text-on-deep',
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

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-on-deep/60">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Marca y contacto directo */}
          <div>
            <p className="font-display text-lg text-on-deep">SoftRent</p>
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
                  className="inline-flex items-center gap-2 text-on-deep/70 underline-offset-4 transition-colors hover:text-on-deep hover:underline"
                >
                  <WhatsappLogo className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp directo
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacto.correoSoporte}`}
                  className="inline-flex items-center gap-2 text-on-deep/70 underline-offset-4 transition-colors hover:text-on-deep hover:underline"
                >
                  <EnvelopeSimple className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {contacto.correoSoporte}
                </a>
              </li>
            </ul>
          </div>

          {columnas.map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-deep/50">
                {col.titulo}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.enlaces.map((enlace) => (
                  <li key={enlace.texto}>
                    <Link
                      to={enlace.href}
                      className="text-on-deep/70 underline-offset-4 transition-colors hover:text-on-deep hover:underline"
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
      <div className="border-t border-on-deep/15">
        <Container>
          <ul className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-3">
            {confianza.map((item) => (
              <li
                key={item.texto}
                className="flex items-center gap-2.5 text-sm text-on-deep/70"
              >
                <item.icono className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.texto}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Barra inferior: derechos y selectores */}
      <div className="border-t border-on-deep/15">
        <Container className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-on-deep/50">
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
