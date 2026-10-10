import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hourglass, Lightning, type Icon } from '@phosphor-icons/react'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import { LinkButton } from '../ui/LinkButton'
import { areas, tipos } from '../../content/soluciones'
import type { Solucion } from '../../content/types'
import { ArtefactoSolucion } from './ArtefactoSolucion'
import { FlechaSolucion } from './FlechaSolucion'

gsap.registerPlugin(ScrollTrigger)

export type SolucionEscenaProps = {
  item: Solucion
  icono: Icon
  /** Alterna el fondo entre escenas para separarlas. */
  tono: 'bg' | 'surface'
}

/** Una solución por sección: el problema de hoy (pasos a mano) → una
 * flecha con el tipo de mensaje → la tarjeta-artefacto con lo que
 * SoftRent responde o deja hecho. Al entrar en viewport se encadena:
 * problema, pasos, flecha dibujada, artefacto, barras y pasos del
 * proceso. Estática con movimiento reducido. */
export function SolucionEscena({ item, icono: Icono, tono }: SolucionEscenaProps) {
  const escena = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = escena.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '[data-comparacion]', start: 'top 78%', once: true },
      })
      tl.from('[data-hoy]', { opacity: 0, x: -24, duration: 0.7 })
        .from('[data-paso]', { opacity: 0, y: 8, duration: 0.4, stagger: 0.1 }, '-=0.35')
        .fromTo(
          '[data-trazo]',
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.6, stagger: 0.25, ease: 'power2.inOut' },
          '-=0.1',
        )
        .from('[data-artefacto]', { opacity: 0, y: 28, scale: 0.97, duration: 0.8 }, '-=0.35')

      /* Detalles del artefacto: solo los que existen en esta pieza. */
      const detalles: [string, gsap.TweenVars][] = [
        ['[data-barra]', { scaleX: 0, duration: 0.7, stagger: 0.08 }],
        ['[data-nodo]', { opacity: 0, y: 8, duration: 0.45, stagger: 0.1 }],
        ['[data-check]', { opacity: 0, x: -8, duration: 0.4, stagger: 0.14 }],
      ]
      detalles
        .filter(([sel]) => el.querySelector(sel))
        .forEach(([sel, vars], i) => tl.from(sel, vars, i === 0 ? '-=0.4' : '<'))
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Section
      ref={escena}
      id={item.id}
      tone={tono}
      className="scroll-mt-20 py-20 sm:py-28"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2.5 text-xs font-medium text-ink-muted">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent-soft text-accent-text">
                <Icono className="h-4 w-4" aria-hidden="true" />
              </span>
              {areas[item.area]}
              {item.tipo === 'instruccion' && (
                <span className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-ink">
                  <Lightning className="h-3.5 w-3.5 text-accent-text" weight="fill" aria-hidden="true" />
                  Lo hace por usted
                </span>
              )}
            </p>
            <h2 className="mt-5 text-balance font-display text-display-sm text-ink sm:text-display-md">
              {item.beneficio}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {item.respuesta}
            </p>
          </div>
          <LinkButton
            to={`/comenzar?problema=${item.id}&demo=${item.demo}`}
            variant="link" className="self-start px-0 lg:self-auto">
            Lo quiero en mi negocio
          </LinkButton>
        </div>

        <div
          data-comparacion
          className="mt-12 grid gap-6 lg:mt-16 lg:items-start lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,6fr)] lg:gap-5"
        >
          <div
            data-hoy
            className="rounded-md border border-dashed border-border-strong/50 p-6 sm:p-7 lg:sticky lg:top-36"
          >
            <p className="text-eyebrow uppercase text-ink-subtle">
              Hoy, con un sistema sin IA
            </p>
            <h3 className="mt-3 text-balance text-heading-lg text-ink">
              {item.dolor}
            </h3>

            <ol className="mt-6">
              {item.friccion.map((paso, i) => (
                <li key={paso} data-paso className="relative flex gap-3 pb-4 last:pb-0">
                  {i < item.friccion.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-[11px] top-6 border-s border-dashed border-border-strong/50"
                    />
                  )}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-strong/50 text-[11px] font-medium tabular-nums text-ink-muted">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-ink-muted">{paso}</span>
                </li>
              ))}
            </ol>

            <p className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs font-medium text-warning">
              <Hourglass className="h-4 w-4" aria-hidden="true" />
              {item.friccion.length} pasos a mano, cada vez. Con SoftRent:{' '}
              {item.conversacion.length === 1
                ? '1 mensaje.'
                : `${item.conversacion.length} mensajes.`}
            </p>
          </div>

          {/* Problema y flecha quedan fijos mientras pasa un artefacto alto. */}
          <div className="lg:sticky lg:top-36 lg:pt-28">
            <FlechaSolucion etiqueta={tipos[item.tipo]} />
          </div>

          <div data-artefacto>
            <ArtefactoSolucion item={item} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
