import Hero from '../../components/sections/Hero'
import ParaQuien from '../../components/sections/ParaQuien'
import PorQue from '../../components/sections/PorQue'
import ProblemaDatos from '../../components/sections/ProblemaDatos'
import RubrosCarousel from '../../components/sections/RubrosCarousel'

/** Inicio público: el administrador pregunta a su negocio en lenguaje
 * normal. Hero con demo en vivo → carrusel de rubros → el problema (datos sin respuestas) →
 * por qué SoftRent → para quién. Las demás secciones siguen en
 * components/sections, fuera de la home por ahora. */
export function Home() {
  return (
    <>
      <Hero />
      <RubrosCarousel />
      <ProblemaDatos />
      <PorQue />
      <ParaQuien />
    </>
  )
}
