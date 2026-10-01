import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type WordScrubProps = {
  text: string
  className?: string
}

/** Párrafo cuyas palabras suben de opacidad 0.14 a 1
 * conforme el usuario avanza el scroll. Estático con
 * movimiento reducido. */
export function WordScrub({ text, className }: WordScrubProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (
      !el ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const words = el.querySelectorAll<HTMLElement>('[data-word]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            end: 'center 42%',
            scrub: 0.6,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} data-word>
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
