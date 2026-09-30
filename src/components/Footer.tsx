export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display text-base text-paper">SoftRent</p>
        <p className="text-sm">
          Sistemas de reservas, mensajes y facturación para negocios de
          servicios en Costa Rica.
        </p>
        <p className="text-sm">© {year} SoftRent</p>
      </div>
    </footer>
  )
}
