import { Container } from '../layout/Container'

// El año se evalúa una sola vez al cargar el módulo,
// no en cada render (función impura).
const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-on-deep/60">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-base text-on-deep">SoftRent</p>
        <p className="text-sm">
          Sistemas de reservas, mensajes y facturación para negocios de
          servicios en Costa Rica.
        </p>
        <p className="text-sm">© {year} SoftRent</p>
      </Container>
    </footer>
  )
}
