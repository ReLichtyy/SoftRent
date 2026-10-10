import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { DemoEnVivo } from '../../components/sections/DemoEnVivo'
import supraPerfil from '../../assets/backgrounds/siluetas-v2/03-toyota-supra-perfil-izquierda.png'

/* El fondo de la foto es casi negro: la máscara difumina los cuatro
 * bordes hacia el fondo de la página, sin corte visible. */
const DIFUMINADO = [
  'linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)',
  'linear-gradient(to right, transparent 0%, #000 4%, #000 96%, transparent 100%)',
].join(', ')

export function Demos() {
  return (
    <Section className="py-16 sm:py-24">
      <Container>
        <DemoEnVivo />

        {/* La foto original deja el coche a la izquierda con mucho vacío a
         * la derecha: se recorta a la franja del coche (x 0–1010 de 1672,
         * centro vertical en el coche) para que ocupe todo el ancho. */}
        <div
          aria-hidden="true"
          style={{
            backgroundImage: `url(${supraPerfil})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '165.5% auto',
            backgroundPosition: '0% 57.8%',
            maskImage: DIFUMINADO,
            WebkitMaskImage: DIFUMINADO,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
          className="mt-4 aspect-[16/9] w-full"
        />
      </Container>
    </Section>
  )
}
