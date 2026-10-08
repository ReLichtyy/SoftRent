import Hero from '../../components/sections/Hero'
import HomeBusiness from '../../components/sections/HomeBusiness'
import RubrosCarousel from '../../components/sections/RubrosCarousel'

/** Hero interactivo → carrusel de rubros → base 04 por negocio y funciones. */
export function Home() {
  return (
    <>
      <Hero />
      <RubrosCarousel />
      <HomeBusiness />
    </>
  )
}
