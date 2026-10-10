import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarBlank, ChatCircleText, Check, Pause, Play } from '@phosphor-icons/react'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { HeroLiveDemo } from './HeroLiveDemo'
import '../../styles/hero-showcase.css'

/** The approved model hero, mounted directly with the site's real components. */
export default function Hero() {
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(true)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreference = () => setReducedMotion(preference.matches)
    let inView = true
    const onVisibility = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      onVisibility()
    })
    if (previewRef.current) observer.observe(previewRef.current)
    preference.addEventListener('change', onPreference)
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', onPreference)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  function focusDemo() {
    const preview = previewRef.current
    preview?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')?.focus({ preventScroll: true })
    preview?.scrollIntoView({ block: 'center', behavior: reducedMotion || paused ? 'instant' : 'smooth' })
  }

  return (
    <section className="hero-showcase" data-theme="dark"
      data-motion={paused || reducedMotion || !visible ? 'paused' : 'running'} aria-labelledby="home-hero-title">
      <div className="hs-intro">
        <h1 id="home-hero-title">Tu negocio, potenciado por <span className="hs-title-ai">IA</span>.<br /><span>Pregunta. Agenda. Haz que avance.</span></h1>
        <ul className="hs-use-cases" aria-label="Qué puedes hacer">
          <li>Pregúntale a tu negocio</li>
          <li>Automatiza tareas</li>
        </ul>
        <div className="hs-actions">
          <Button onClick={focusDemo} className="hs-cta">Prueba tu sistema con IA <ArrowRight size={17} aria-hidden="true" /></Button>
          <LinkButton to="/demos" variant="secondary" className="hs-cta"><CalendarBlank size={17} aria-hidden="true" />Explorar demos</LinkButton>
        </div>
        <Link to="/soluciones" className="hs-text-link">IA integrada, software a tu medida <ArrowRight size={13} aria-hidden="true" /></Link>
      </div>

      <div className="hs-preview">
        <div ref={previewRef} className="hs-workspace">
          <div className="hs-scene">
            <div className="hs-background" aria-hidden="true" />
            <aside className="hs-context hs-agenda" aria-hidden="true">
              <div className="hs-context-title"><CalendarBlank size={15} />Su agenda</div>
              <p className="hs-context-date">Todo empieza con una cita.</p>
              <div className="hs-calendar">{['L', 'M', 'M', 'J', 'V', '12', '13', '14', '15', '16'].map((day, i) => <span key={i} className={day === '14' ? 'is-selected' : undefined}>{day}</span>)}</div>
              <div className="hs-appointment"><span className="hs-dot" /><div>Consulta inicial<small>09:00 · Confirmada</small></div></div>
              <div className="hs-appointment"><span className="hs-dot hs-muted" /><div>Seguimiento<small>10:30 · Por confirmar</small></div></div>
            </aside>
            <div className="hs-live-demo">
              <HeroLiveDemo showcase />
              <p className="hero-demo-note">Demo con datos de ejemplo. Las acciones son simuladas.</p>
            </div>
            <aside className="hs-context hs-activity" aria-hidden="true">
              <div className="hs-context-title"><Check size={15} />Todo conectado</div>
              {[['Conversación atendida', 'Asistente de WhatsApp'], ['Cita confirmada', 'Agenda sincronizada'], ['Recordatorio preparado', 'Seguimiento automático']].map(([title, subtitle]) =>
                <div className="hs-activity-row" key={title}><span className="hs-dot" /><div>{title}<small>{subtitle}</small></div></div>)}
            </aside>
            <div className="hs-dock">
              <span><span className="hs-dot" />Tu negocio, conectado</span>
              <button type="button" onClick={focusDemo}><ChatCircleText size={14} aria-hidden="true" />Probar IA</button>
              <button type="button" className="hs-motion" disabled={reducedMotion}
                aria-label={reducedMotion ? 'Animaciones reducidas' : paused ? 'Activar animaciones' : 'Pausar animaciones'}
                title={reducedMotion ? 'Animaciones reducidas' : paused ? 'Activar animaciones' : 'Pausar animaciones'}
                aria-pressed={paused || reducedMotion} onClick={() => setPaused(value => !value)}>
                {paused || reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
