import { PawPrint, PenNib, Scissors, ShoppingCart } from '@phosphor-icons/react'
import { Card } from '../ui/Card'
import { Container } from '../layout/Container'
import { LinkButton } from '../ui/LinkButton'
import { useScrollReveal } from '../../lib/useScrollReveal'

/* La pregunta que cada administrador haría el lunes por la mañana.
 * Respuestas ilustrativas; la sección lo aclara al pie. */
const casos = [
  {
    icono: ShoppingCart,
    nombre: 'Supermercados y comercios',
    pregunta: '¿Qué productos se me están agotando?',
    respuesta:
      'Leche y arroz: alcanza para 2 días. ¿Genero el pedido al proveedor?',
  },
  {
    icono: Scissors,
    nombre: 'Barberías y salones',
    pregunta: '¿Quién no ha vuelto en un mes?',
    respuesta:
      'Cinco clientes frecuentes. ¿Les mando un mensaje con su hora favorita?',
  },
  {
    icono: PawPrint,
    nombre: 'Veterinarias',
    pregunta: '¿Qué mascotas tienen la vacuna pendiente?',
    respuesta:
      'Siete esta semana. Puedo recordárselo a sus dueños por WhatsApp.',
  },
  {
    icono: PenNib,
    nombre: 'Estudios de tatuajes',
    pregunta: '¿Qué depósitos siguen sin confirmar?',
    respuesta:
      'Tres citas sin depósito. Una es mañana: ¿le escribo al cliente?',
  },
]

/** Para quién: la pregunta típica de cada administrador con su
 * respuesta. Cierra con los dos CTA. */
export default function ParaQuien() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.09,
  })

  return (
    <section ref={scope} className="py-20 sm:py-28">
      <Container>
        <h2
          data-reveal
          className="max-w-2xl text-balance font-display text-display-sm text-ink sm:text-display-md"
        >
          Para negocios que atienden gente todos los días.
        </h2>
        <p
          data-reveal
          className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted"
        >
          Si usted administra un negocio con clientes, agenda o inventario,
          hay preguntas que hoy le toma tiempo responder.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {casos.map((c) => (
            <Card key={c.nombre} data-reveal className="flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent-soft text-accent-text">
                  <c.icono className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-heading-md text-ink">{c.nombre}</h3>
              </div>
              <div className="mt-5 space-y-2.5">
                <p className="ms-auto w-fit max-w-[88%] rounded-sm bg-accent px-3 py-2 text-sm text-on-accent">
                  {c.pregunta}
                </p>
                <p className="w-fit max-w-[92%] rounded-sm bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-ink">
                  {c.respuesta}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink-subtle">
          Ejemplos ilustrativos: cada sistema se adapta a los datos de su
          negocio.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <LinkButton to="/comenzar" size="lg">
            Comenzar
          </LinkButton>
          <LinkButton to="/demos" variant="secondary" size="lg">
            Ver demos
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
