import {
  MapPin,
  ChatsCircle,
  PlugsConnected,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { HeroLiveDemo } from './HeroLiveDemo'

/* Franja de confianza (sección 3.4.2): señalales locales
 * debajo del hero, sin logos de terceros. */
const confianzaItems = [
  { icono: ChatsCircle, texto: 'Pregunte en lenguaje normal' },
  { icono: WhatsappLogo, texto: 'Desde su chat de WhatsApp' },
  { icono: PlugsConnected, texto: 'Conecta con sus otras herramientas' },
  { icono: MapPin, texto: 'Hecho en Costa Rica' },
]

/** Hero dividido: propuesta de valor y dos CTA a la izquierda, un demo
 * interactivo del producto a la derecha (el visitante responde en el
 * chat y recorre las vistas). En pantallas angostas el texto va arriba
 * y el demo debajo. */
export default function Hero() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-hero]',
    stagger: 0.09,
    y: 22,
    immediate: true,
  })

  return (
    <section ref={scope} className="bg-surface-inverse text-ink-inverse">
      <Container className="pt-16 pb-14 lg:pt-20 lg:pb-16">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div>
            <h1
              data-hero
              className="text-balance font-display text-display-md sm:text-display-lg"
            >
              Pregúntele a su negocio.{' '}
              <span className="italic text-[#ff6b70]">Ya sabe la respuesta.</span>
            </h1>
            <p
              data-hero
              className="mt-6 max-w-lg text-lg leading-relaxed text-ink-inverse/75"
            >
              Un sistema con IA integrada: usted pregunta como hablaría con
              un empleado, desde el panel o su chat de WhatsApp, y recibe la
              respuesta con sus propios datos.
            </p>

            <div data-hero className="mt-9 flex flex-wrap items-center gap-4">
              <LinkButton to="/comenzar" size="lg">
                Comenzar
              </LinkButton>
              <LinkButton to="/demos" variant="secondary" size="lg">
                Ver demos
              </LinkButton>
            </div>
          </div>

          <div data-hero>
            <HeroLiveDemo />
          </div>
        </div>
      </Container>

      <div className="border-t border-ink-inverse/15">
        <Container>
          <ul
            data-hero
            className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 sm:grid-cols-4"
          >
            {confianzaItems.map((item) => (
              <li
                key={item.texto}
                className="flex items-center gap-2 text-sm text-ink-inverse/70"
              >
                <item.icono className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.texto}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
