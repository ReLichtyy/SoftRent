import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { tipos } from '../../content/soluciones'
import type { Solucion } from '../../content/types'
import { ArtefactoSolucion } from './ArtefactoSolucion'
import { FlechaSolucion } from './FlechaSolucion'

gsap.registerPlugin(ScrollTrigger)

/** Una solución: título y la escena que la explica → flecha con la
 * forma en que ocurre → el artefacto con lo que SoftRent responde o
 * deja hecho. Al entrar en pantalla la flecha se dibuja y el
 * artefacto aparece con sus barras y pasos; el texto nunca se oculta.
 * Estática con movimiento reducido. */
export function SolucionFila({ item, imagen }: { item: Solucion; imagen?: string }) {
  const fila = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = fila.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      })
      tl.fromTo(
        '[data-trazo]',
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.55, stagger: 0.2, ease: 'power2.inOut' },
      ).from('[data-artefacto]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.35')

      /* Detalles del artefacto: solo los que existen en esta pieza. */
      const detalles: [string, gsap.TweenVars][] = [
        ['[data-barra]', { scaleX: 0, duration: 0.7, stagger: 0.08 }],
        ['[data-nodo]', { opacity: 0, y: 8, duration: 0.45, stagger: 0.1 }],
        ['[data-check]', { opacity: 0, x: -8, duration: 0.4, stagger: 0.12 }],
      ]
      detalles
        .filter(([sel]) => el.querySelector(sel))
        .forEach(([sel, vars], i) => tl.from(sel, vars, i === 0 ? '-=0.4' : '<'))
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <article ref={fila} id={item.id} className="sol-row" aria-labelledby={`${item.id}-titulo`}>
      <div className="sol-row-copy">
        <h4 id={`${item.id}-titulo`}>{item.beneficio}</h4>
        <p>{item.ejemplo}</p>
      </div>
      <div className="sol-row-arrow">
        <FlechaSolucion etiqueta={tipos[item.tipo]} solo={item.tipo === 'automatico'} />
      </div>
      <div data-artefacto className="sol-row-art">
        <ArtefactoSolucion item={item} />
      </div>
      {imagen && (
        <img
          className="sol-row-car"
          src={imagen}
          alt=""
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
        />
      )}
    </article>
  )
}
