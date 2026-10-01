import { useCallback, useEffect, useRef, useState } from 'react'
import {
  activarSubmodulo,
  bienvenida,
  responder,
  type AccionChat,
} from '../../lib/chat/engine'
import type { DemoId } from '../../content/types'
import { track } from '../analytics'

export type MensajeChat = {
  id: string
  autor: 'bot' | 'usuario'
  texto: string
}

export type EstadoChat = 'cerrado' | 'abierto' | 'escribiendo' | 'lead' | 'enviado'

const HUMANO = 'Hablar con alguien'
const DEMOS = 'Ver demos'

function id(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

/** Máquina de estados del chat (sección 3.5): mensajes,
 * submódulo activo, captura de lead y traspaso a humano. */
export function useChat() {
  const [estado, setEstado] = useState<EstadoChat>('cerrado')
  const [mensajes, setMensajes] = useState<MensajeChat[]>([])
  const [quickReplies, setQuickReplies] = useState<string[]>([])
  const [moduloActivo, setModuloActivo] = useState<DemoId | null>(null)
  const [moduloPropuesto, setModuloPropuesto] = useState<DemoId | null>(null)
  const [mensajesEnviados, setMensajesEnviados] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const abrir = useCallback(() => {
    setEstado((prev) => (prev === 'cerrado' ? 'abierto' : prev))
    track('chat_abierto')
    if (mensajes.length === 0) {
      const bien = bienvenida()
      setMensajes([{ id: id(), autor: 'bot', texto: bien.texto }])
      const quick = bien.acciones.find((a) => a.tipo === 'quickReplies')
      setQuickReplies(
        (quick as { tipo: 'quickReplies'; opciones: string[] } | undefined)
          ?.opciones ?? [],
      )
    }
  }, [mensajes.length])

  const cerrar = useCallback(() => setEstado('cerrado'), [])

  const aplicarAcciones = useCallback(
    (acciones: AccionChat[]) => {
      const quick = acciones.find((a) => a.tipo === 'quickReplies') as
        | { tipo: 'quickReplies'; opciones: string[] }
        | undefined
      setQuickReplies(quick?.opciones ?? [])

      const sugerencia = acciones.find((a) => a.tipo === 'sugerirModulo') as
        | { tipo: 'sugerirModulo'; demo: DemoId }
        | undefined
      setModuloPropuesto(sugerencia?.demo ?? null)

      if (acciones.some((a) => a.tipo === 'handoff')) {
        track('chat_handoff')
      }
      if (acciones.some((a) => a.tipo === 'ofrecerLead')) {
        setEstado('lead')
        track('chat_lead_ofrecido')
      }
    },
    [],
  )

  const enviar = useCallback(
    (texto: string) => {
      const limpio = texto.trim()
      if (limpio === '') return
      if (estado === 'enviado') return

      // Aceptar el cambio de módulo propuesto (regla 3: propuesto, no forzado).
      if (
        moduloPropuesto &&
        /(si|dale|cuenteme| cuentame|claro|ok)/.test(limpio.toLowerCase())
      ) {
        const descripcion = activarSubmodulo(moduloPropuesto)
        if (descripcion) {
          setModuloActivo(moduloPropuesto)
          setModuloPropuesto(null)
          track('chat_modulo_activado', { modulo: moduloPropuesto })
        }
      }

      const nuevos: MensajeChat[] = [
        ...mensajes,
        { id: id(), autor: 'usuario', texto: limpio },
      ]
      setMensajes(nuevos)
      setQuickReplies([])
      const enviados = mensajesEnviados + 1
      setMensajesEnviados(enviados)

      if (limpio === HUMANO) {
        setEstado('lead')
        track('chat_handoff')
        setMensajes([
          ...nuevos,
          {
            id: id(),
            autor: 'bot',
            texto: 'Con gusto. Le dejo el formulario para que una persona de SoftRent le escriba; fuera de horario le respondemos al día hábil siguiente.',
          },
        ])
        return
      }

      if (limpio === DEMOS) {
        setMensajes([
          ...nuevos,
          {
            id: id(),
            autor: 'bot',
            texto: 'La demo de Citas está en vivo: sus clientes eligen horario, confirman y reciben recordatorios por WhatsApp. La encuentra en la página de Demos, o le cuento de ella aquí mismo.',
          },
        ])
        setQuickReplies(['Cuénteme de Citas', '¿Cuánto cuesta?'])
        return
      }

      setEstado('escribiendo')
      const respuesta = responder(limpio, moduloActivo, enviados)
      const delay = Math.min(400 + respuesta.texto.length * 4, 1600)
      timerRef.current = window.setTimeout(() => {
        setMensajes((prev) => [
          ...prev,
          { id: id(), autor: 'bot', texto: respuesta.texto },
        ])
        setEstado((prev) => (prev === 'escribiendo' ? 'abierto' : prev))
        aplicarAcciones(respuesta.acciones)
      }, delay)
    },
    [aplicarAcciones, estado, mensajes, mensajesEnviados, moduloActivo, moduloPropuesto],
  )

  const leadEnviado = useCallback((resumen: string) => {
    setMensajes((prev) => [
      ...prev,
      {
        id: id(),
        autor: 'bot',
        texto: resumen,
      },
    ])
    setEstado('enviado')
    track('chat_lead_enviado')
  }, [])

  return {
    estado,
    mensajes,
    quickReplies,
    moduloActivo,
    abrir,
    cerrar,
    enviar,
    leadEnviado,
  }
}
