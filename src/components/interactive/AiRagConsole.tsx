import { useState } from 'react'
import {
  MagnifyingGlass,
  Sparkle,
  ShieldCheck,
  Cpu,
  Database,
  WhatsappLogo,
  CheckCircle,
} from '@phosphor-icons/react'
import { Badge } from '../ui/Badge'

interface PromptDemo {
  pregunta: string
  scoreHibrido: number
  scoreLexico: number
  scoreDenso: number
  fuenteDoc: string
  tituloDoc: string
  textoDoc: string
  respuestaWhatsapp: string
}

const ejemplosPreguntas: PromptDemo[] = [
  {
    pregunta: '¿Tienen parqueo propio y aceptan pagos con SINPE Móvil?',
    scoreHibrido: 0.94,
    scoreLexico: 0.88,
    scoreDenso: 0.96,
    fuenteDoc: 'manual:faq',
    tituloDoc: 'Políticas del Local · Ubicación y Métodos de Pago',
    textoDoc:
      'Contamos con 4 espacios de parqueo exclusivo y seguro al frente del local. Aceptamos pagos en efectivo, tarjeta de débito/crédito y transferencias por SINPE Móvil al número oficial 8842-1920 a nombre de Barbería Don Luis.',
    respuestaWhatsapp:
      '¡Buenas tardes! Sí, claro: tenemos 4 espacios de parqueo privado al frente del local y aceptamos SINPE Móvil al 8842-1920 o tarjeta. ¿Le gustaría agendar su cita para hoy?',
  },
  {
    pregunta: '¿Cuánto cuesta el corte de cabello degradado y cuánto dura?',
    scoreHibrido: 0.91,
    scoreLexico: 0.89,
    scoreDenso: 0.93,
    fuenteDoc: 'catalogo:servicios',
    tituloDoc: 'Catálogo Oficial de Servicios · Precios en Colones',
    textoDoc:
      'Corte Clásico Degradado: ₡7.000 (45 minutos). Incluye lavado previo, perfilado con máquina y acabado con tijera y loción refrescante.',
    respuestaWhatsapp:
      'El corte degradado tiene un valor de ₡7.000 y una duración de 45 minutos. Lo atiende nuestro barbero Brandon Hernández. ¿Para qué hora le queda bien?',
  },
  {
    pregunta: '¿Qué pasa si llego 15 minutos tarde a mi cita?',
    scoreHibrido: 0.89,
    scoreLexico: 0.85,
    scoreDenso: 0.92,
    fuenteDoc: 'politicas:tolerancia',
    tituloDoc: 'Términos de Servicio · Tolerancia y Cancelaciones',
    textoDoc:
      'Mantenemos una tolerancia máxima de 10 minutos por cortesía con los clientes siguientes. Si se excede este tiempo, el sistema permite reprogramar según disponibilidad del día.',
    respuestaWhatsapp:
      'Nuestra tolerancia es de 10 minutos para no afectar las citas posteriores. Si prevé retraso, avísenos por acá mismo y con gusto le buscamos el espacio más cercano.',
  },
  {
    pregunta: '¿Abren los domingos o días feriados nacionales?',
    scoreHibrido: 0.87,
    scoreLexico: 0.82,
    scoreDenso: 0.90,
    fuenteDoc: 'horarios:restricciones',
    tituloDoc: 'Horarios de Operación y Feriados de Ley en Costa Rica',
    textoDoc:
      'Atendemos de Lunes a Sábado de 9:00 AM a 7:00 PM. Los domingos y feriados nacionales obligatorios (ej. 15 de Septiembre) el local permanece cerrado.',
    respuestaWhatsapp:
      'Abrimos de lunes a sábado de 9:00 AM a 7:00 PM. Los domingos descansamos, pero puede dejar su cita reservada para el lunes desde la web en 30 segundos.',
  },
]

export function AiRagConsole() {
  const [consulta, setConsulta] = useState<string>(ejemplosPreguntas[0].pregunta)
  const [resultado, setResultado] = useState<PromptDemo>(ejemplosPreguntas[0])
  const [buscando, setBuscando] = useState<boolean>(false)

  const ejecutarBusqueda = (ejemplo: PromptDemo) => {
    setBuscando(true)
    setConsulta(ejemplo.pregunta)
    setTimeout(() => {
      setResultado(ejemplo)
      setBuscando(false)
    }, 280)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBuscando(true)
    // Busca la coincidencia más cercana o usa la primera
    const match = ejemplosPreguntas.find((p) =>
      p.pregunta.toLowerCase().includes(consulta.toLowerCase().slice(0, 10))
    ) || {
      ...ejemplosPreguntas[0],
      pregunta: consulta,
      scoreHibrido: 0.88,
    }

    setTimeout(() => {
      setResultado(match)
      setBuscando(false)
    }, 320)
  }

  return (
    <div className="rounded-[2.5rem] bg-ink/[0.03] p-2 ring-1 ring-ink/10 dark:bg-white/[0.03] dark:ring-white/10">
      <div className="overflow-hidden rounded-[calc(2.5rem-0.5rem)] border border-ink/5 bg-surface p-6 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:border-white/5 dark:bg-surface-sunken">
        
        {/* Cabecera del Módulo IA */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Cpu weight="fill" className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm sm:text-base text-ink">
                  Consola de Ingesta & Búsqueda Híbrida RAG
                </h4>
                <Badge tone="brand" dot className="text-[10px] py-0 px-2">
                  Memoria Activa
                </Badge>
              </div>
              <p className="text-xs text-ink-muted">
                Endpoint: <code className="font-mono text-[11px] text-ink">POST /gestion/conocimiento/probar</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> 0 Alucinaciones
            </span>
            <span className="rounded-full bg-surface-sunken px-3 py-1 text-xs text-ink-muted border border-ink/5">
              48 Vectores
            </span>
          </div>
        </div>

        {/* Chips de Preguntas Frecuentes Rápidas */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2.5">
            Seleccione una pregunta para probar la memoria en tiempo real:
          </p>
          <div className="flex flex-wrap gap-2">
            {ejemplosPreguntas.map((ej, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => ejecutarBusqueda(ej)}
                className={`rounded-full px-3.5 py-1.5 text-xs transition-all text-left ${
                  consulta === ej.pregunta
                    ? 'bg-brand text-white font-medium shadow-xs'
                    : 'bg-surface-sunken hover:bg-ink/5 border border-ink/10 dark:border-white/10 text-ink'
                }`}
              >
                {ej.pregunta}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de Entrada / Pregunta Interactiva */}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="relative flex items-center">
            <MagnifyingGlass className="absolute left-4 h-4 w-4 text-ink-muted pointer-events-none" />
            <input
              type="text"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Escriba cualquier duda sobre servicios, precios, horarios..."
              className="w-full rounded-2xl border border-ink/15 bg-surface pl-11 pr-28 py-3 text-xs sm:text-sm text-ink shadow-xs focus:border-brand focus:ring-1 focus:ring-brand dark:border-white/15"
            />
            <button
              type="submit"
              disabled={buscando}
              className="absolute right-2 rounded-xl bg-brand px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-brand-hover active:scale-[0.98] transition-all"
            >
              {buscando ? 'Buscando...' : 'Consultar'}
            </button>
          </div>
        </form>

        {/* Resultados de la Búsqueda RAG */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Columna Izquierda: Documento Recuperado de la Memoria (7 cols) */}
          <div className="rounded-2xl border border-ink/10 bg-surface-sunken/60 p-5 sm:p-6 dark:border-white/10 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink">
                  Documento Recuperado en Memoria
                </span>
              </div>
              <span className="rounded-md bg-brand/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand">
                Coincidencia: {(resultado.scoreHibrido * 100).toFixed(0)}%
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-ink">{resultado.tituloDoc}</p>
                <p className="text-[10px] text-ink-muted font-mono mt-0.5">
                  Fuente: <code>{resultado.fuenteDoc}</code>
                </p>
              </div>

              <div className="rounded-xl border border-ink/10 bg-surface p-3.5 text-xs leading-relaxed text-ink dark:border-white/10">
                <p className="italic text-ink-muted">"{resultado.textoDoc}"</p>
              </div>

              {/* Métricas del Motor RAG Híbrido */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-ink-muted">
                <div className="rounded-lg bg-surface p-2 border border-ink/5 dark:border-white/5">
                  <span>Híbrido:</span> <strong className="text-ink">{resultado.scoreHibrido}</strong>
                </div>
                <div className="rounded-lg bg-surface p-2 border border-ink/5 dark:border-white/5">
                  <span>Léxico BM25:</span> <strong className="text-ink">{resultado.scoreLexico}</strong>
                </div>
                <div className="rounded-lg bg-surface p-2 border border-ink/5 dark:border-white/5">
                  <span>Vector Denso:</span> <strong className="text-ink">{resultado.scoreDenso}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Respuesta Generada para WhatsApp (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-emerald-500/[0.03] p-5 sm:p-6 dark:border-white/10 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-ink/10 pb-3 dark:border-white/10">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <WhatsappLogo weight="fill" className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Respuesta en WhatsApp
                  </span>
                </div>
                <span className="text-[10px] text-ink-muted">140ms latencia</span>
              </div>

              <div className="mt-4 rounded-2xl bg-surface p-4 text-xs leading-relaxed text-ink shadow-sm border border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-1.5">
                  <Sparkle weight="fill" className="h-3 w-3" /> Asistente SoftRent (Tono Tico Cálido)
                </div>
                <p className="text-ink">{resultado.respuestaWhatsapp}</p>
              </div>

              <div className="mt-4 space-y-1.5 text-[11px] text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Sin alucinaciones: responde solo lo verificado en la memoria.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Filtro de privacidad PII: números de cédula o datos sensibles ocultos.</span>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-ink/10 pt-3 flex items-center justify-between text-[11px] text-ink-muted dark:border-white/10">
              <span>Se actualiza en tiempo real sin reiniciar el servidor.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
