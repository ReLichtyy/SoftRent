import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type ScrollRevealOptions = {
  /** Selector de los elementos a animar dentro del scope;
   * vacío = se anima el propio scope. */
  selector?: string
  /** Desfase entre elementos, en segundos. */
  stagger?: number
  /** Desplazamiento inicial en px. */
  y?: number
  /** true = anima al montar (hero); false = al entrar en viewport. */
  immediate?: boolean
}

/** Revelado suave (fade + subida) al entrar en viewport,
 * con ScrollTrigger y limpieza estricta. Estático si el
 * usuario prefiere movimiento reducido. */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const { selector, stagger = 0, y = 26, immediate = false } = options
  const scope = useRef<T>(null)

  useEffect(() => {
    const el = scope.current
    if (!el || prefersReducedMotion()) return

    const targets = selector ? el.querySelectorAll(selector) : [el]
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          ...(immediate
            ? { delay: 0.15 }
            : {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 82%',
                  once: true,
                },
              }),
        },
      )
    }, el)

    return () => ctx.revert()
  }, [selector, stagger, y, immediate])

  return scope
}
