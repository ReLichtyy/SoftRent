import {
  MapPin,
  Receipt,
  WhatsappLogo,
  CreditCard,
} from '@phosphor-icons/react'
import { LinkButton } from '../ui/LinkButton'
import { Container } from '../layout/Container'
import { ChatMockup } from './ChatMockup'
import { useScrollReveal } from '../../lib/useScrollReveal'

/* Franja de confianza (sección 3.4.2): señalales locales
 * debajo del hero, sin logos de terceros. */
const confianzaItems = [
  { icono: MapPin, texto: 'Hecho en Costa Rica' },
  { icono: CreditCard, texto: 'Cobros por SINPE' },
  { icono: Receipt, texto: 'Facturación electrónica' },
  { icono: WhatsappLogo, texto: 'WhatsApp Business' },
]

/** Hero según el wireframe 2.7: fondo brand-deep, propuesta
 * de valor en una línea, dos CTA y mockup vivo del chatbot. */
export default function Hero() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-hero]',
    stagger: 0.09,
    y: 22,
    immediate: true,
  })

  return (
    <section ref={scope} className="bg-brand-deep text-on-deep">
      <div className="pt-16 pb-0 sm:pt-20">
        <Container>
          <div className="grid items-center gap-14 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20">
            <div>
              <h1
                data-hero
                className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.15rem]"
              >
                Su negocio responde, agenda y cobra solo.
              </h1>
              <p
                data-hero
                className="mt-6 max-w-md text-lg leading-relaxed text-on-deep/75"
              >
                Reservas, mensajes y cobros por WhatsApp. Lo implementamos
                en días, no en meses.
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

            <div data-hero className="flex justify-center lg:justify-end">
              <ChatMockup />
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-on-deep/15">
        <Container>
          <ul
            data-hero
            className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 sm:grid-cols-4"
          >
            {confianzaItems.map((item) => (
              <li
                key={item.texto}
                className="flex items-center gap-2 text-sm text-on-deep/70"
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
