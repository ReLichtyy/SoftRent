import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChatsCircle, X } from '@phosphor-icons/react'
import { useChat } from '../../lib/chat/useChat'
import { nombreDemo, avisoPrivacidad } from '../../lib/chat/engine'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { cn } from '../../lib/cn'

/** Chip del submódulo activo (regla 2): "Hablando de: Citas". */
function ModuleChip({ modulo }: { modulo: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-info-soft px-2.5 py-0.5 text-xs font-medium text-info">
      Hablando de: {modulo}
    </span>
  )
}

/** Formulario de captura de lead y traspaso (3.5). */
function LeadCapture({
  onEnviado,
}: {
  onEnviado: (resumen: string) => void
}) {
  const [nombre, setNombre] = useState('')
  const [negocio, setNegocio] = useState('')
  const [contacto, setContacto] = useState('')
  const [necesidad, setNecesidad] = useState('')
  const [consentimiento, setConsentimiento] = useState(false)
  const [error, setError] = useState('')

  function enviar() {
    if (!nombre.trim() || !contacto.trim()) {
      setError('Necesitamos su nombre y un WhatsApp o correo para responderle.')
      return
    }
    if (!consentimiento) {
      setError('Necesitamos su permiso para escribirle.')
      return
    }
    const brief = [
      `Nombre: ${nombre}`,
      `Negocio: ${negocio}`,
      `Contacto: ${contacto}`,
      `Necesidad: ${necesidad || 'Por definir en la conversación'}`,
      'Origen: chatbot del sitio',
    ].join('\n')
    onEnviado('Gracias. Su solicitud quedó lista para que una persona de SoftRent le escriba en menos de un día hábil.')
    window.location.href = `mailto:hola@softrent.com?subject=${encodeURIComponent(
      `Diagnóstico SoftRent - ${negocio || nombre}`,
    )}&body=${encodeURIComponent(brief)}`
  }

  return (
    <div className="space-y-2.5 border-t border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">Para que le escribamos:</p>
      <div className="grid grid-cols-2 gap-2.5">
        <Input
          label="Su nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="col-span-1"
        />
        <Input
          label="Negocio"
          value={negocio}
          onChange={(e) => setNegocio(e.target.value)}
        />
      </div>
      <Input
        label="WhatsApp o correo"
        value={contacto}
        onChange={(e) => setContacto(e.target.value)}
      />
      <Input
        label="Qué necesita, en una línea"
        value={necesidad}
        onChange={(e) => setNecesidad(e.target.value)}
      />
      <Checkbox
        label="Acepto que SoftRent use estos datos para escribirme."
        checked={consentimiento}
        onChange={(e) => setConsentimiento(e.target.checked)}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      <Button size="sm" className="w-full" onClick={enviar}>
        Enviar
      </Button>
    </div>
  )
}

/** Chatbot del sitio (sección 3.5): launcher flotante y ventana
 * de chat con módulo core + submódulo de demo activo. */
export default function Chat() {
  const chat = useChat()
  const [texto, setTexto] = useState('')
  const [mostrarPrivacidad, setMostrarPrivacidad] = useState(true)
  const listaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)

  const abierto = chat.estado !== 'cerrado'

  /* Enfoque controlado y anuncios de mensajes nuevos. */
  useEffect(() => {
    if (abierto) {
      inputRef.current?.focus()
    } else {
      launcherRef.current?.focus()
    }
  }, [abierto])

  useEffect(() => {
    listaRef.current?.scrollTo({ top: listaRef.current.scrollHeight })
  }, [chat.mensajes.length, chat.estado])

  /* Entrada del launcher cuando el chunk termina de cargar. */
  const launcherAnimRef = useRef<HTMLButtonElement | null>(null)
  const cerrado = !abierto
  useEffect(() => {
    const el = launcherAnimRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.85, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)', delay: 0.8 },
    )
  }, [cerrado])

  return (
    <>
      {!abierto && (
        <button
          ref={(n) => { launcherRef.current = n; launcherAnimRef.current = n }}
          type="button"
          onClick={chat.abrir}
          aria-label="Abrir el asistente de SoftRent"
          className="fixed bottom-5 right-5 z-50 flex h-12 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-on-accent shadow-md outline-none transition-transform duration-200 ease-[var(--ease-out)] hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        >
          <ChatsCircle className="h-5 w-5" aria-hidden="true" />
          Hable con el asistente
        </button>
      )}

      {abierto && (
        <div
          role="dialog"
          aria-label="Asistente de SoftRent"
          className={cn(
            'fixed z-50 flex flex-col overflow-hidden rounded-md border border-border bg-surface text-ink shadow-lg',
            'inset-x-3 bottom-3 top-14',
            'sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-auto sm:h-[560px] sm:max-h-[calc(100dvh-2.5rem)] sm:w-[380px]',
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">Asistente SoftRent</p>
              {chat.moduloActivo && (
                <ModuleChip modulo={nombreDemo(chat.moduloActivo)} />
              )}
            </div>
            <button
              type="button"
              onClick={chat.cerrar}
              aria-label="Cerrar el chat"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink-muted outline-none transition-colors hover:bg-surface-sunken hover:text-ink focus-visible:ring-2 focus-visible:ring-focus"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={listaRef}
            className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {chat.mensajes.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed',
                  m.autor === 'bot'
                    ? 'bg-surface-sunken text-ink'
                    : 'ms-auto bg-accent text-on-accent',
                )}
              >
                {m.texto}
              </div>
            ))}
            {chat.estado === 'escribiendo' && (
              <div className="flex w-fit items-center gap-1 rounded-md bg-surface-sunken px-3 py-2.5">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted [animation-delay:300ms]" />
              </div>
            )}
          </div>

          {chat.quickReplies.length > 0 && chat.estado !== 'enviado' && (
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2.5">
              {chat.quickReplies.map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => chat.enviar(opcion)}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs text-ink-muted outline-none transition-colors hover:border-accent hover:text-accent-text focus-visible:ring-2 focus-visible:ring-focus"
                >
                  {opcion}
                </button>
              ))}
            </div>
          )}

          {chat.estado === 'lead' && (
            <LeadCapture onEnviado={chat.leadEnviado} />
          )}

          {chat.estado === 'enviado' && (
            <p className="border-t border-border px-4 py-3 text-xs text-ink-muted">
              Solicitud enviada. Le respondemos en menos de un día hábil.
            </p>
          )}

          {mostrarPrivacidad && (
            <div className="flex items-start justify-between gap-2 border-t border-border bg-surface-sunken px-4 py-2.5">
              <p className="text-xs leading-relaxed text-ink-muted">
                {avisoPrivacidad}
              </p>
              <button
                type="button"
                onClick={() => setMostrarPrivacidad(false)}
                aria-label="Cerrar el aviso de privacidad"
                className="shrink-0 text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-focus"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {chat.estado !== 'lead' && chat.estado !== 'enviado' && (
            <form
              className="flex items-center gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault()
                chat.enviar(texto)
                setTexto('')
              }}
            >
              <input
                ref={inputRef}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escriba su pregunta"
                aria-label="Escriba su pregunta"
                className="w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-base text-ink placeholder:text-ink-subtle outline-none transition-colors hover:border-ink-muted focus:border-focus focus:shadow-[0_0_0_1px_var(--focus-ring)]"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Enviar
              </Button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
