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
    <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
      <p className="max-w-lg font-display text-2xl leading-snug text-ink sm:text-3xl">
        Si tu negocio se parece a esto, no es un problema de esfuerzo. Es un
        problema de herramientas.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note.text}
            className={`rounded-lg border border-line bg-card p-5 text-sm leading-relaxed text-ink-soft ${note.rotate}`}
          >
            {note.text}
          </div>
        ))}
      </div>
    </section>
  )
}
