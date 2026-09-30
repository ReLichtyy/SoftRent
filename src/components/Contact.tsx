export default function Contact() {
  return (
    <section id="contacto" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            No tenemos una prueba gratis. Tenemos algo mejor: tu sistema, de una vez.
          </h2>
          <p className="mt-5 text-paper/75">
            No armamos un producto genérico para que lo pruebes y veas si te
            sirve. Conversamos contigo, entendemos tu negocio y construimos
            directo lo que necesitas.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="mailto:hola@softrent.com"
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-brass hover:text-ink"
            >
              Escríbenos
            </a>
            <span className="font-mono text-sm text-paper/60">hola@softrent.com</span>
          </div>
        </div>
      </div>
    </section>
  )
}
