import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

/** Transición de página: cada cambio de ruta anima el contenido
 * con un fade + desplazamiento sutil. Estático si el usuario
 * prefiere movimiento reducido. */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
    )
  }, [children])

  return <div ref={ref}>{children}</div>
}
