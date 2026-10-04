import type { ReactNode } from 'react'
import {
  ChatsCircle,
  Clock,
  PlugsConnected,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { Card } from '../ui/Card'
import { Container } from '../layout/Container'
import { cn } from '../../lib/cn'
import { useScrollReveal } from '../../lib/useScrollReveal'

type Beneficio = {
  titulo: string
  texto: string
  icono: typeof ChatsCircle
  /** Columnas que ocupa en la cuadrícula de 6 (escritorio). */
  span: string
  visual: ReactNode
}

function Burbuja({
  de,
  children,
}: {
  de: 'admin' | 'ia'
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'w-fit max-w-[88%] rounded-sm px-3 py-2 text-sm leading-relaxed',
        de === 'admin'
          ? 'ms-auto bg-accent text-on-accent'
          : 'bg-surface-sunken text-ink',
      )}
    >
      {children}
    </div>
  )
}

/* Cuatro beneficios en lenguaje de negocio. Filas de 6 columnas:
 * 4+2 y 3+3, sin huecos. API aparece nombrado pero explicado por lo
 * que hace; el detalle técnico vive fuera de la home. */
const beneficios: Beneficio[] = [
  {
    titulo: 'Busque en su negocio hablando',
    texto:
      'Ventas, clientes, citas, inventario: pregunte como le hablaría a un empleado y obtenga la respuesta, sin filtros ni reportes.',
    icono: ChatsCircle,
    span: 'lg:col-span-4',
    visual: (
      <div className="mt-6 space-y-2.5">
        <Burbuja de="admin">¿Qué fue lo más vendido este mes?</Burbuja>
        <Burbuja de="ia">
          Corte clásico, con 38 servicios. Subió frente al mes pasado.
        </Burbuja>
      </div>
    ),
  },
  {
    titulo: 'En su chat de WhatsApp',
    texto:
      'Consulte su negocio desde el mismo chat que ya usa todos los días.',
    icono: WhatsappLogo,
    span: 'lg:col-span-2',
    visual: (
      <div className="mt-6 space-y-2.5">
        <Burbuja de="admin">¿Cómo va el día?</Burbuja>
        <Burbuja de="ia">4 citas hoy, 1 por confirmar.</Burbuja>
      </div>
    ),
  },
  {
    titulo: 'Conecta con lo que ya usa',
    texto:
      'Por su API, su sistema habla con su facturación, su contabilidad o su sitio web. Nadie copia datos a mano.',
    icono: PlugsConnected,
    span: 'lg:col-span-3',
    visual: (
      <ul className="mt-6 flex flex-wrap gap-2">
        {['Facturación', 'Contabilidad', 'Su sitio web', 'WhatsApp'].map(
          (nombre) => (
            <li
              key={nombre}
              className="rounded-full border border-border bg-surface-sunken px-3 py-1 text-xs font-medium text-ink-muted"
            >
              {nombre}
            </li>
          ),
        )}
      </ul>
    ),
  },
  {
    titulo: 'Atiende a sus clientes, siempre',
    texto:
      'La IA responde, agenda y confirma a cualquier hora. Usted solo revisa el resultado.',
    icono: Clock,
    span: 'lg:col-span-3',
    visual: (
      <div className="mt-6 space-y-2.5">
        <Burbuja de="ia">Su cita quedó para mañana a las 10:30.</Burbuja>
        <p className="text-xs text-ink-subtle">Agendado a las 11:48 p. m.</p>
      </div>
    ),
  },
]

/** Por qué SoftRent: cuatro beneficios con mini conversaciones. El
 * texto habla del resultado para el administrador, no de la tecnología. */
export default function PorQue() {
  const scope = useScrollReveal<HTMLElement>({
    selector: '[data-reveal]',
    stagger: 0.09,
  })

  return (
    <section
      ref={scope}
      className="border-t border-border bg-surface-sunken py-20 sm:py-28"
    >
      <Container>
        <h2
          data-reveal
          className="max-w-2xl text-balance font-display text-display-sm text-ink sm:text-display-md"
        >
          La IA no es un extra. Es cómo usted maneja el negocio.
        </h2>

        <div className="mt-12 grid grid-flow-dense gap-5 lg:grid-cols-6">
          {beneficios.map((b) => (
            <Card
              key={b.titulo}
              data-reveal
              className={cn('flex flex-col p-6 sm:p-8', b.span)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent-soft text-accent-text">
                <b.icono className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-heading-lg text-ink">{b.titulo}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
                {b.texto}
              </p>
              {b.visual}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
