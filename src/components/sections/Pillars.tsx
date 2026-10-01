import type { ReactNode } from 'react'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'

type Pillar = {
  title: string
  description: string
  accent: string
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-6 w-6',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const pillars: Pillar[] = [
  {
    title: 'Reservas',
    description:
      'Tus clientes agendan solos, según los cupos reales que tienes disponibles. Vos ves un solo calendario, no tres.',
    accent: 'border-t-brand',
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 9.5h17" />
        <path d="M8 3v3.5M16 3v3.5" />
        <circle cx="9" cy="14" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Comunicación',
    description:
      'Un asistente responde preguntas frecuentes y avisa de citas por WhatsApp o correo, y te avisa a ti cuando algo necesita tu criterio.',
    accent: 'border-t-info',
    icon: (
      <svg {...iconProps}>
        <path d="M4 5.5h16v10H9.5L5 19v-3.5H4z" />
        <path d="M8 9.5h8M8 12.5h5" />
      </svg>
    ),
  },
  {
    title: 'Facturación',
    description:
      'Cada cita o venta genera su comprobante solo. Al cierre de mes ya tienes el resumen listo, sin armarlo a mano.',
    accent: 'border-t-success',
    icon: (
      <svg {...iconProps}>
        <path d="M6 3.5h12v17l-2.5-1.6L13 20.5l-2.5-1.6L8 20.5l-2-1.6z" />
        <path d="M9 8h6M9 11.5h6M9 15h3.5" />
      </svg>
    ),
  },
]

export default function Pillars() {
  return (
    <Section id="pilares" tone="surface">
      <Container className="py-20 sm:py-28">
        <h2 className="max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl">
          Tres piezas, un mismo sistema
        </h2>
        <p className="mt-4 max-w-md text-ink-soft">
          No son tres apps distintas peleando entre sí. Es un solo sistema
          construido para tu negocio.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {pillars.map((p) => (
            <div key={p.title} className={`border-t-2 pt-5 ${p.accent}`}>
              <div className="text-ink-soft">{p.icon}</div>
              <h3 className="mt-4 font-display text-xl text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
