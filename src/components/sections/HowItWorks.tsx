import { Container } from '../layout/Container'
import { Section } from '../layout/Section'

const steps = [
  {
    n: '1',
    title: 'Nos escribes',
    text: 'Nos cuentas cómo trabaja tu negocio hoy: cómo agendas, cómo cobras, qué se te complica.',
  },
  {
    n: '2',
    title: 'Conversamos el detalle',
    text: 'Nuestro asistente conversa contigo y arma un brief claro de lo que tu sistema necesita hacer.',
  },
  {
    n: '3',
    title: 'Construimos tu sistema',
    text: 'Reservas, mensajes y facturación, conectados entre sí y hechos para tu flujo de trabajo.',
  },
  {
    n: '4',
    title: 'Lo lanzamos',
    text: 'Tu sistema sale en vivo en tu propio subdominio, y seguimos ajustándolo contigo después.',
  },
]

export default function HowItWorks() {
  return (
    <Section id="como-funciona" className="border-t border-line">
      <Container className="py-20 sm:py-28">
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          Cómo pasamos de conversación a sistema
        </h2>

        <ol className="mt-12 divide-y divide-line border-t border-line">
          {steps.map((step) => (
            <li
              key={step.n}
              className="grid gap-4 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-8"
            >
              <span className="font-display text-3xl text-ink-soft/60">
                {step.n}
              </span>
              <div className="max-w-xl">
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
