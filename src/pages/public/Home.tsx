import ComoTrabajamos from '../../components/sections/ComoTrabajamos'
import Contact from '../../components/sections/Contact'
import ExecutiveBento from '../../components/sections/ExecutiveBento'
import InteractiveStudio from '../../components/sections/InteractiveStudio'
import Faq from '../../components/sections/Faq'
import Hero from '../../components/sections/Hero'
import MarqueeCards from '../../components/sections/MarqueeCards'
import Planes from '../../components/sections/Planes'
import Problemas from '../../components/sections/Problemas'
import Producto from '../../components/sections/Producto'
import Resultados from '../../components/sections/Resultados'
import Seguridad from '../../components/sections/Seguridad'

/** Inicio público: vende como una app (estilo TakeControl) — hero
 * centrado, marquesina de resultados, producto en tres movimientos,
 * bento ejecutivo de alta gama, estudio interactivo en vivo, y luego dolor,
 * proceso, cifras, planes y cierre. */
export function Home() {
  return (
    <>
      <Hero />
      <MarqueeCards />
      <Producto />
      <ExecutiveBento />
      <InteractiveStudio />
      <Problemas />
      <ComoTrabajamos />
      <Resultados />
      <Planes />
      <Seguridad />
      <Faq />
      <Contact />
    </>
  )
}
