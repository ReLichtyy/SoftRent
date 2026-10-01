import Businesses from './components/sections/Businesses'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import Hero from './components/sections/Hero'
import HowItWorks from './components/sections/HowItWorks'
import NavBar from './components/sections/NavBar'
import PainPoints from './components/sections/PainPoints'
import Pillars from './components/sections/Pillars'

function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <NavBar />
      <main>
        <Hero />
        <PainPoints />
        <Pillars />
        <Businesses />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
