import { Card } from '../ui/Card'
import { Container } from '../layout/Container'

const notes = [
  {
    text: 'La agenda vive en un cuaderno o en la cabeza de alguien.',
    rotate: '-rotate-1',
  },
  {
    text: 'Los mensajes de clientes se pierden entre chats de WhatsApp.',
    rotate: 'rotate-1',
  },
  {
    text: 'Las facturas se arman a mano cada fin de mes.',
    rotate: '-rotate-1',
  },
]

export default function PainPoints() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <p className="max-w-lg font-display text-2xl leading-snug text-ink sm:text-3xl">
          Si tu negocio se parece a esto, no es un problema de esfuerzo. Es un
          problema de herramientas.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {notes.map((note) => (
            <Card
              key={note.text}
              className={`text-sm leading-relaxed text-ink-soft ${note.rotate}`}
            >
              {note.text}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
