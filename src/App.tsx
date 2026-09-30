import Businesses from './components/Businesses'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import NavBar from './components/NavBar'
import PainPoints from './components/PainPoints'
import Pillars from './components/Pillars'

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
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
