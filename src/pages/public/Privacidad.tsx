import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { LinkButton } from '../../components/ui/LinkButton'
import { PageIntro } from '../shared'

export function Privacidad() {
  return (
    <Section className="py-16 sm:py-24">
      <Container className="max-w-2xl space-y-8">
        <PageIntro
          title="Privacidad"
          description="Cómo tratamos los datos de su negocio y de sus clientes. En lenguaje claro, sin letra chica."
        />

        <div className="space-y-6 text-sm leading-relaxed text-ink-muted">
          <div>
            <h2 className="text-heading-md text-ink">Qué datos tratamos</h2>
            <p className="mt-2">
              Los datos que usted nos entrega para construir su sistema:
              servicios, precios, horarios y la información de sus clientes
              que usted decide cargar. También las conversaciones que el
              asistente atiende en su nombre.
            </p>
          </div>

          <div id="ley-8968">
            <h2 className="text-heading-md text-ink">
              Ley 8968 de protección de datos personales
            </h2>
            <p className="mt-2">
              Tratamos los datos personales conforme a la Ley 8968 y su
              reglamento: recolectamos solo lo necesario, con un fin
              concreto, y no los usamos para nada distinto. Cada contacto
              guarda su consentimiento y puede pedir la baja de sus datos
              en cualquier momento.
            </p>
          </div>

          <div>
            <h2 className="text-heading-md text-ink">Quién puede verlos</h2>
            <p className="mt-2">
              Solo el equipo que atiende su negocio, con accesos por rol:
              dueño, agente o solo lectura. Las conversaciones quedan
              registradas y son revisables. No vendemos ni compartimos
              datos con terceros.
            </p>
          </div>

          <div>
            <h2 className="text-heading-md text-ink">Sus derechos</h2>
            <p className="mt-2">
              Puede pedirnos acceder, corregir, exportar o eliminar sus
              datos escribiendo a hola@softrent.com. Al cancelar su
              suscripción, se los entregamos exportados y conservamos la
              copia por 30 días, después se elimina.
            </p>
          </div>
        </div>

        <LinkButton to="/terminos" variant="secondary" size="sm">
          Ver los términos del servicio
        </LinkButton>
      </Container>
    </Section>
  )
}
