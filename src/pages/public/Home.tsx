import ComoTrabajamos from '../../components/sections/ComoTrabajamos'
import Contact from '../../components/sections/Contact'
import Faq from '../../components/sections/Faq'
import Hero from '../../components/sections/Hero'
import Industrias from '../../components/sections/Industrias'
import Planes from '../../components/sections/Planes'
import Problemas from '../../components/sections/Problemas'
import Resultados from '../../components/sections/Resultados'
import Seguridad from '../../components/sections/Seguridad'

/** Inicio público según el wireframe 2.7 del Notion. */
export function Home() {
  return (
    <>
      <Hero />
      <Problemas />
      <ComoTrabajamos />
      <Industrias />
      <Resultados />
      <Planes />
      <Seguridad />
      <Faq />
      <Contact />
    </>
  )
}
