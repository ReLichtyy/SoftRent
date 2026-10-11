import Hero from '../../components/sections/Hero'
import HomeBusiness from '../../components/sections/HomeBusiness'
import RubrosCarousel from '../../components/sections/RubrosCarousel'
import '../../styles/home-atmosphere.css'

/** Hero interactivo → carrusel de rubros → base 04 por negocio y funciones. */
export function Home() {
  return (
    <div className="home-atmosphere">
      <Hero />
      <RubrosCarousel />
      <HomeBusiness />
    </div>
  )
}
