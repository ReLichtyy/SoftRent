import {
  MapPin,
  Receipt,
  WhatsappLogo,
  CreditCard,
} from '@phosphor-icons/react'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../layout/Container'
import { useScrollReveal } from '../../lib/useScrollReveal'
import { HeroCrmMockup } from './HeroCrmMockup'

/* Franja de confianza (sección 3.4.2): señalales locales
 * debajo del hero, sin logos de terceros. */
const confianzaItems = [
  { icono: MapPin, texto: 'Hecho en Costa Rica' },
  { icono: CreditCard, texto: 'Cobros por SINPE' },
  { icono: Receipt, texto: 'Facturación electrónica' },
  { icono: WhatsappLogo, texto: 'WhatsApp Business' },
]

/** Hero dividido: propuesta de valor y dos CTA a la izquierda, un CRM
 * con la IA trabajando adentro a la derecha. En pantallas angostas el
 * texto va arriba y el CRM debajo. */
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
              Su sistema, con IA integrada.
            </h1>
            <p
              data-hero
              className="mt-6 max-w-md text-lg leading-relaxed text-ink-inverse/75"
            >
              CRM a la medida para su pyme. La IA responde clientes, agenda
              citas y cobra por SINPE mientras usted atiende.
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
            <HeroCrmMockup />
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
