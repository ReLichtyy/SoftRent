import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { LinkButton } from '../../components/ui/LinkButton'
import { PageIntro } from '../shared'

export function Terminos() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="max-w-2xl space-y-8">
        <PageIntro
          title="Términos del servicio"
          description="Las reglas claras de cómo trabajamos con su negocio."
        />

        <div className="space-y-6 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="font-display text-lg text-ink">Qué incluye</h2>
            <p className="mt-2">
              SoftRent diseña, implementa y mantiene el sistema de
              reservas, mensajes y cobros de su negocio. La suscripción
              mensual cubre el uso de la plataforma, las actualizaciones y
              el soporte en español. La implementación inicial se cobra
              una sola vez, según el alcance acordado en su propuesta.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-ink">Precios y pagos</h2>
            <p className="mt-2">
              Los precios publicados no incluyen IVA. La suscripción se
              cobra por mes; si paga anual, le regalamos dos meses. Si un
              cobro falla, le avisamos y el sistema sigue activo durante
              10 días antes de suspenderse.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-ink">Sus datos</h2>
            <p className="mt-2">
              Los datos de su negocio son suyos. Puede exportarlos cuando
              quiera; al cancelar se los entregamos y la copia se elimina
              después de 30 días. Los detalles completos están en la
              política de privacidad.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg text-ink">Cambios y garantía</h2>
            <p className="mt-2">
              Las metas concretas de su sistema se firman en la propuesta:
              si no las cumplimos, lo trabajamos sin costo hasta
              cumplirlas. Cualquier cambio de precio se avisa con 30 días
              de anticipación.
            </p>
          </div>
        </div>

        <LinkButton to="/privacidad" variant="secondary" size="sm">
          Ver la política de privacidad
        </LinkButton>
      </Container>
    </Section>
  )
}
