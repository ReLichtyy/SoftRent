import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Question,
} from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Checkbox } from '../../components/ui/Checkbox'
import { DragAndDrop, type ArchivoContexto } from '../../components/ui/DragAndDrop'
import {
  FieldError,
  controlStyles,
  labelStyles,
} from '../../components/ui/FieldMessage'
import { Input } from '../../components/ui/Input'
import { LinkButton } from '../../components/ui/LinkButton'
import { Select } from '../../components/ui/Select'
import { demoIcon } from '../../lib/demo-icons'
import { bytes } from '../../lib/format'
import { cn } from '../../lib/cn'
import { track } from '../../lib/analytics'
import { demoPorId, demos } from '../../content/demos'
import { planPorId } from '../../content/planes'
import { soluciones } from '../../content/soluciones'
import type { DemoId } from '../../content/types'

type Industria = DemoId | 'otro'
type Canal = 'WhatsApp' | 'Correo'
type Datos = {
  nombre: string
  negocio: string
  whatsapp: string
  canal: Canal | ''
  correo: string
  tamano: string
}
type CampoContacto = 'nombre' | 'negocio' | 'whatsapp' | 'canal' | 'correo'

const TAMANOS = ['Solo yo', '2 a 3 personas', '4 a 9 personas', '10 o más']
const CANALES: Canal[] = ['WhatsApp', 'Correo']

const PASOS = ['Contacto', 'Su negocio', 'Listo'] as const

/** Los 6 dolores generales que se muestran: aplican a cualquier negocio.
 * Si llega uno distinto por ?problema, se agrega marcado. */
const DESCRIPCION_MIN = 20
const DESCRIPCION_MAX = 500

const DOLORES_GENERALES = [
  'mensajes-fuera-de-horario',
  'llamadas-sin-contestar',
  'herramientas-sueltas',
  'reportes-sin-conclusion',
  'clientes-que-no-vuelven',
  'atado-a-la-computadora',
]

const datosIniciales: Datos = {
  nombre: '',
  negocio: '',
  whatsapp: '',
  canal: '',
  correo: '',
  tamano: TAMANOS[0],
}

const fichaBase =
  'rounded-md border p-4 text-left outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]'

function fichaEstado(activa: boolean): string {
  return activa
    ? 'border-accent bg-accent-soft ring-1 ring-focus'
    : 'border-border bg-surface hover:border-ink-muted/40'
}

/** Pregunta con título y ayuda corta, usada en los grupos de fichas. */
function Pregunta({
  titulo,
  ayuda,
  children,
}: {
  titulo: string
  ayuda?: string
  children: ReactNode
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-heading-sm text-ink">{titulo}</legend>
      {ayuda && <p className="mt-1 text-sm text-ink-muted">{ayuda}</p>}
      {children}
    </fieldset>
  )
}

/** Flujo "Comenzar" (sección 3.4.10), variante B: primero el contacto
 * (nombre, negocio, WhatsApp), después el negocio y por último la
 * revisión. El dato rescatable queda capturado en el primer paso, así
 * que abandonar a mitad no pierde al cliente. Acepta ?demo, ?plan y
 * ?problema (id de una solución, llega marcado) para precargar; el
 * brief viaja por correo a SoftRent. */
export function Comenzar() {
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const planParam = searchParams.get('plan')
  const problemaParam = searchParams.get('problema')
  const plan = planParam ? planPorId(planParam) : undefined

  const [paso, setPaso] = useState(1)
  const [industria, setIndustria] = useState<Industria | null>(
    demoParam && demoPorId(demoParam) ? (demoParam as DemoId) : null,
  )
  const [industriaOtra, setIndustriaOtra] = useState('')
  const [dolores, setDolores] = useState<string[]>(
    problemaParam && soluciones.some((s) => s.id === problemaParam)
      ? [problemaParam]
      : [],
  )
  const [datos, setDatos] = useState<Datos>(datosIniciales)
  const [consentimiento, setConsentimiento] = useState(false)
  const [archivos, setArchivos] = useState<ArchivoContexto[]>([])
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)
  const [descripcion, setDescripcion] = useState('')

  const pasoRef = useRef<HTMLDivElement>(null)
  const descripcionRef = useRef<HTMLTextAreaElement>(null)

  /* El área de texto crece con lo que el usuario escribe. */
  useEffect(() => {
    const el = descripcionRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [descripcion, paso])

  /* Transición suave entre pasos; estática con movimiento reducido. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = pasoRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
    )
  }, [paso])

  function irA(nuevo: number) {
    if (nuevo > paso) track('comenzar_paso', { paso: PASOS[nuevo - 1] })
    setPaso(nuevo)
  }

  function elegirIndustria(valor: Industria) {
    setIndustria(valor)
    setErrores((prev) => ({ ...prev, industria: '' }))
  }

  function alternarDolor(id: string) {
    setDolores((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    )
    setErrores((prev) => ({ ...prev, dolores: '' }))
  }

  /* Archivos de contexto: opcionales, nunca bloquean el envío. */
  function agregarArchivos(nuevos: ArchivoContexto[]) {
    setArchivos((prev) => [...prev, ...nuevos].slice(0, 5))
    track('comenzar_archivo', { total: nuevos.length })
  }

  function quitarArchivo(id: string) {
    setArchivos((prev) => prev.filter((a) => a.id !== id))
  }

  function validarCampo(campo: CampoContacto, valor: string): string {
    const v = valor.trim()
    if (campo === 'canal') return v === '' ? 'Elija por dónde le escribimos.' : ''
    if (campo === 'correo' && datos.canal !== 'Correo' && v === '') return ''
    if (v === '') return 'Este campo es obligatorio.'
    if (campo === 'nombre' && v.length < 2) return 'Díganos su nombre.'
    if (campo === 'negocio' && v.length < 2) return 'Díganos el nombre del negocio.'
    if (campo === 'whatsapp' && !/^[+0-9][0-9\s-]{7,}$/.test(v))
      return 'Escriba un número válido, con código de país si es de fuera.'
    if (campo === 'correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return 'Escriba un correo válido.'
    return ''
  }

  function cambiarDato(
    campo: CampoContacto | 'tamano',
    evento: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const valor = evento.target.value
    setDatos((prev) => ({ ...prev, [campo]: valor }))
    // Validación en tiempo real: si el campo ya marcaba error, se revalida.
    if (campo !== 'tamano') {
      setErrores((prev) =>
        prev[campo]
          ? { ...prev, [campo]: validarCampo(campo, valor) }
          : prev,
      )
    }
  }

  function validarAlSalir(campo: CampoContacto) {
    setErrores((prev) => ({ ...prev, [campo]: validarCampo(campo, datos[campo]) }))
  }

  function elegirCanal(canal: Canal) {
    setDatos((prev) => ({ ...prev, canal }))
    setErrores((prev) => ({ ...prev, canal: '', correo: '' }))
  }

  function validarContacto(): boolean {
    const nuevos: Record<string, string> = {}
    ;(['nombre', 'negocio', 'whatsapp', 'canal', 'correo'] as const).forEach(
      (campo) => {
        const error = validarCampo(campo, datos[campo])
        if (error) nuevos[campo] = error
      },
    )
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  const descripcionLargo = descripcion.trim().length
  /* Cuenta lo completado: texto de 20+ caracteres y archivo; basta con uno. */
  const completados =
    Number(descripcionLargo >= DESCRIPCION_MIN) + Number(archivos.length > 0)

  function validarNegocio(): boolean {
    const nuevos: Record<string, string> = {}
    if (industria === null) nuevos.industria = 'Elija la opción que más se parezca.'
    if (dolores.length === 0) nuevos.dolores = 'Elija al menos una para empezar.'
    if (descripcionLargo > 0 && descripcionLargo < DESCRIPCION_MIN)
      nuevos.descripcion = `Escriba al menos ${DESCRIPCION_MIN} caracteres o borre el texto.`
    else if (descripcionLargo === 0 && archivos.length === 0)
      nuevos.descripcion =
        'Cuéntenos cómo funciona su negocio o agregue un archivo.'
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  function continuar() {
    if (paso === 1) {
      if (!validarContacto()) return
      // El WhatsApp ya está en mano: aunque abandone aquí, hay a quién escribirle.
      track('comenzar_contacto', { canal: datos.canal })
    }
    if (paso === 2 && !validarNegocio()) return
    setErrores({})
    irA(paso + 1)
  }

  const visibles = [
    ...DOLORES_GENERALES.flatMap((id) => soluciones.filter((s) => s.id === id)),
    ...soluciones.filter(
      (s) => dolores.includes(s.id) && !DOLORES_GENERALES.includes(s.id),
    ),
  ]

  const doloresElegidos = soluciones.filter((s) => dolores.includes(s.id))
  const industriaNombre =
    industria === null
      ? 'Por definir'
      : industria === 'otro'
        ? industriaOtra.trim() || 'Otro'
        : (demoPorId(industria)?.nombre.replace('SoftRent ', '') ?? 'Por definir')

  const briefLineas = [
    `Nombre: ${datos.nombre}`,
    `Negocio: ${datos.negocio}`,
    `Industria: ${industriaNombre}`,
    `WhatsApp: ${datos.whatsapp}`,
    `Canal preferido: ${datos.canal}`,
    datos.correo.trim() ? `Correo: ${datos.correo}` : '',
    datos.tamano ? `Tamaño del equipo: ${datos.tamano}` : '',
    descripcion.trim() ? `Cómo funciona el negocio:
${descripcion.trim()}` : '',
    `Qué quiere resolver:`,
    ...doloresElegidos.map((d) => `- ${d.dolor}`),
    ...(archivos.length > 0
      ? ['Contexto compartido:', ...archivos.map((a) => `- ${a.nombre} (${bytes(a.tamano)})`)]
      : []),
    plan ? `Plan de interés: ${plan.nombre}` : '',
    'Origen: sitio web, flujo Comenzar',
  ].filter((linea) => linea !== '')

  const mailto = `mailto:hola@softrent.com?subject=${encodeURIComponent(
    `Diagnóstico SoftRent - ${datos.negocio || 'nuevo interés'}`,
  )}&body=${encodeURIComponent(briefLineas.join('\n'))}`

  function enviar() {
    if (!consentimiento) {
      setErrores({
        consentimiento:
          'Necesitamos su permiso para responderle por estos medios.',
      })
      return
    }
    track('comenzar_enviado', {
      industria: industriaNombre,
      dolores: dolores.length,
      plan: plan?.nombre ?? null,
      archivos: archivos.length,
      canal: datos.canal,
    })
    setEnviado(true)
    window.location.href = mailto
  }

  const faltan = PASOS.length - paso
  const progreso = (paso / PASOS.length) * 100

  return (
    <Section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="min-w-0">
            <header className="max-w-2xl">
              <h1 className="font-display text-display-sm tracking-tight text-ink sm:text-display-md">
                Cuéntenos de su negocio y le armamos la propuesta
              </h1>
            </header>

            {/* Progreso: barra que avanza + nombre de cada paso */}
            <div className="mt-10 max-w-2xl">
              <div
                className="h-1.5 overflow-hidden rounded-full bg-surface-sunken"
                role="progressbar"
                aria-label="Progreso del formulario"
                aria-valuemin={1}
                aria-valuemax={PASOS.length}
                aria-valuenow={paso}
                aria-valuetext={`Paso ${paso} de ${PASOS.length}: ${PASOS[paso - 1]}`}
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[var(--ease-out)]"
                  style={{ width: `${progreso}%` }}
                />
              </div>
              <ol className="mt-3 flex items-center justify-between gap-2 text-sm">
                {PASOS.map((nombre, i) => {
                  const n = i + 1
                  const hecho = paso > n
                  const activo = paso === n
                  return (
                    <li
                      key={nombre}
                      aria-current={activo ? 'step' : undefined}
                      className={cn(
                        'flex items-center gap-1.5',
                        activo ? 'font-medium text-ink' : 'text-ink-muted',
                      )}
                    >
                      {hecho && (
                        <Check
                          className="size-4 text-accent-text"
                          weight="bold"
                          aria-hidden="true"
                        />
                      )}
                      {nombre}
                    </li>
                  )
                })}
              </ol>
            </div>

            <div ref={pasoRef} key={paso} className="mt-6 max-w-2xl">
              {paso === 1 && (
                <Card className="flex flex-col gap-5 sm:p-7">
                  <div>
                    <h2 className="text-heading-lg text-ink">
                      ¿Le armamos su Sistema con IA?
                    </h2>
                    {plan && (
                      <p className="mt-2">
                        <Badge tone="brand">Plan de interés: {plan.nombre}</Badge>
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Su nombre"
                      value={datos.nombre}
                      onChange={(e) => cambiarDato('nombre', e)}
                      onBlur={() => validarAlSalir('nombre')}
                      error={errores.nombre || undefined}
                      autoComplete="name"
                    />
                    <Input
                      label="Nombre del negocio"
                      value={datos.negocio}
                      onChange={(e) => cambiarDato('negocio', e)}
                      onBlur={() => validarAlSalir('negocio')}
                      error={errores.negocio || undefined}
                      autoComplete="organization"
                    />
                  </div>
                  <Input
                    label="WhatsApp"
                    placeholder="+506 8888 8888"
                    value={datos.whatsapp}
                    onChange={(e) => cambiarDato('whatsapp', e)}
                    onBlur={() => validarAlSalir('whatsapp')}
                    error={errores.whatsapp || undefined}
                    inputMode="tel"
                    autoComplete="tel"
                  />

                  <Pregunta
                    titulo="¿Dónde prefiere que le escribimos?"
                  >
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {CANALES.map((canal) => (
                        <button
                          key={canal}
                          type="button"
                          onClick={() => elegirCanal(canal)}
                          aria-pressed={datos.canal === canal}
                          className={cn(
                            fichaBase,
                            'flex items-center justify-between gap-2 py-3 text-sm font-medium text-ink',
                            fichaEstado(datos.canal === canal),
                          )}
                        >
                          {canal}
                          {datos.canal === canal && (
                            <Check
                              className="size-4 text-accent-text"
                              weight="bold"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    <FieldError id="canal-error" error={errores.canal || undefined} className="mt-2" />
                  </Pregunta>

                  {datos.canal === 'Correo' && (
                    <Input
                      label="Su correo"
                      type="email"
                      value={datos.correo}
                      onChange={(e) => cambiarDato('correo', e)}
                      onBlur={() => validarAlSalir('correo')}
                      error={errores.correo || undefined}
                      autoComplete="email"
                    />
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Button type="button" size="lg" onClick={continuar}>
                      Seguir con mi negocio
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <span className="text-sm text-ink-muted">
                      Faltan {faltan} pasos.
                    </span>
                  </div>
                </Card>
              )}

              {paso === 2 && (
                <Card className="flex flex-col gap-7 sm:p-7">
                  <div>
                    <h2 className="text-heading-lg text-ink">
                      Ahora, su negocio
                    </h2>
                  </div>

                  <Pregunta
                    titulo="¿A qué se dedica su negocio?"
                  >
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {demos.map((demo) => {
                        const Icono = demoIcon(demo.id)
                        return (
                          <button
                            key={demo.id}
                            type="button"
                            onClick={() => elegirIndustria(demo.id)}
                            aria-pressed={industria === demo.id}
                            className={cn(
                              fichaBase,
                              'flex flex-col items-center justify-center gap-2 text-center',
                              fichaEstado(industria === demo.id),
                            )}
                          >
                            <span className="text-accent-text">
                              <Icono className="size-6" aria-hidden="true" />
                            </span>
                            <span className="block text-heading-md text-ink">
                              {demo.nombre.replace('SoftRent ', '')}
                            </span>
                          </button>
                        )
                      })}
                      <button
                        type="button"
                        onClick={() => elegirIndustria('otro')}
                        aria-pressed={industria === 'otro'}
                        className={cn(
                          fichaBase,
                          'flex flex-col items-center justify-center gap-2 text-center',
                          fichaEstado(industria === 'otro'),
                        )}
                      >
                        <span className="text-ink-muted">
                          <Question className="size-6" aria-hidden="true" />
                        </span>
                        <span className="block text-heading-md text-ink">
                          Otro
                        </span>
                        <span className="block text-xs leading-relaxed text-ink-muted">
                          Escriba a qué se dedica y lo vemos juntos.
                        </span>
                      </button>
                    </div>
                    {industria === 'otro' && (
                      <Input
                        className="mt-4"
                        label="¿A qué se dedica su negocio?"
                        placeholder="Ejemplo: taller de motos, asesoría"
                        value={industriaOtra}
                        onChange={(e) => setIndustriaOtra(e.target.value)}
                      />
                    )}
                    <FieldError id="industria-error" error={errores.industria || undefined} className="mt-2" />
                    <p className="mt-3 text-sm text-ink-muted">
                      ¿Prefiere ver ejemplos funcionando primero?{' '}
                      <LinkButton to="/demos" variant="link" size="sm">
                        Vea las demos
                      </LinkButton>
                    </p>
                  </Pregunta>

                  <Pregunta
                    titulo="¿Qué le gustaría resolver primero?"
                  >
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {visibles.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => alternarDolor(s.id)}
                          aria-pressed={dolores.includes(s.id)}
                          className={cn(
                            fichaBase,
                            'flex items-center justify-center text-center text-sm leading-relaxed',
                            dolores.includes(s.id)
                              ? 'border-accent bg-accent-soft text-ink ring-1 ring-focus'
                              : 'border-border bg-surface text-ink-muted hover:border-ink-muted/40',
                          )}
                        >
                          {s.dolor}
                        </button>
                      ))}
                    </div>
                    <FieldError id="dolores-error" error={errores.dolores || undefined} className="mt-2" />
                  </Pregunta>

                  <Select
                    label="Tamaño del equipo"
                    value={datos.tamano}
                    onChange={(e) => cambiarDato('tamano', e)}
                  >
                    {TAMANOS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>

                  <Pregunta titulo="Introducción de su negocio">
                    <div className="mt-3 flex flex-col gap-1.5">
                      <label htmlFor="descripcion-negocio" className={labelStyles}>
                        Cuéntenos cómo funciona su negocio
                      </label>
                      <div className="relative">
                        <textarea
                          id="descripcion-negocio"
                          ref={descripcionRef}
                          className={cn(
                            controlStyles,
                            'h-auto min-h-24 resize-none overflow-hidden py-2.5 pb-9 leading-6',
                          )}
                          placeholder="Opcional"
                          rows={3}
                          maxLength={DESCRIPCION_MAX}
                          value={descripcion}
                          onChange={(e) => {
                            setDescripcion(e.target.value)
                            setErrores((prev) => ({ ...prev, descripcion: '' }))
                          }}
                          aria-invalid={errores.descripcion ? true : undefined}
                          aria-describedby={
                            errores.descripcion ? 'descripcion-negocio-error' : undefined
                          }
                        />
                        <span
                          className={cn(
                            'pointer-events-none absolute bottom-2.5 left-3 text-xs tabular-nums',
                            descripcionLargo > 0 && descripcionLargo < DESCRIPCION_MIN
                              ? 'text-danger'
                              : 'text-ink-muted',
                          )}
                        >
                          {descripcionLargo}/{DESCRIPCION_MAX}
                        </span>
                      </div>
                      <FieldError
                        id="descripcion-negocio-error"
                        error={errores.descripcion || undefined}
                      />
                    </div>
                    <p
                      className="mt-3 text-sm text-ink-muted tabular-nums"
                      aria-label={`Completado ${completados} de 2`}
                    >
                      Completado {completados}/2
                    </p>
                    <DragAndDrop
                      compacto
                      textoBoton="Agregar archivo (opcional)"
                      className="mt-3"
                      archivos={archivos}
                      onAgregar={(nuevos) => {
                        agregarArchivos(nuevos)
                        setErrores((prev) => ({ ...prev, descripcion: '' }))
                      }}
                      onQuitar={quitarArchivo}
                    />
                  </Pregunta>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" size="lg" onClick={continuar}>
                      Terminar
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => irA(1)}>
                      <ArrowLeft className="size-4" aria-hidden="true" />
                      Atrás
                    </Button>
                  </div>
                </Card>
              )}

              {paso === 3 && enviado && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-md border border-success/40 bg-success-soft p-5 text-success transition-colors duration-200 ease-[var(--ease-out)] hover:border-success sm:p-6"
                >
                  <CheckCircle
                    className="mt-0.5 size-6 shrink-0"
                    weight="fill"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="text-heading-md text-ink">
                      Listo, {datos.nombre.trim().split(' ')[0]}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      Su correo se abrió con el mensaje completo. Si no se
                      abrió, envíelo a hola@softrent.com. Le escribimos por{' '}
                      {datos.canal} en menos de un día hábil.
                    </p>
                  </div>
                </div>
              )}

              {paso === 3 && !enviado && (
                <Card className="flex flex-col gap-5 sm:p-7">
                  <div>
                    <h2 className="text-heading-lg text-ink">
                      Listo, revise para terminar
                    </h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      Su contacto ya quedó registrado. Revise que todo esté
                      bien y envíelo.
                    </p>
                  </div>
                  <dl className="divide-y divide-border rounded-md border border-border text-sm">
                    <Fila etiqueta="Nombre" valor={datos.nombre} />
                    <Fila etiqueta="Negocio" valor={datos.negocio} />
                    <Fila etiqueta="WhatsApp" valor={datos.whatsapp} />
                    <Fila
                      etiqueta="Le escribimos por"
                      valor={datos.canal === 'Correo' && datos.correo.trim() ? `Correo (${datos.correo.trim()})` : datos.canal}
                    />
                    <Fila etiqueta="Industria" valor={industriaNombre} />
                    {plan && <Fila etiqueta="Plan de interés" valor={plan.nombre} />}
                    <div className="gap-4 px-4 py-3 sm:flex sm:justify-between">
                      <dt className="text-ink-muted">Su negocio</dt>
                      <dd className="mt-2 text-ink sm:mt-0 sm:max-w-[60%] sm:text-right">
                        <span className="block whitespace-pre-wrap break-words">
                          {descripcion.trim() || 'Sin texto'}
                        </span>
                        <span className="mt-1 block text-ink-muted">
                          {archivos.length === 0
                            ? 'Sin archivos'
                            : `${archivos.length} ${archivos.length === 1 ? 'archivo' : 'archivos'}`}
                        </span>
                      </dd>
                    </div>
                  </dl>
                  <Checkbox
                    label="Acepto que SoftRent use estos datos solo para responder mi consulta."
                    checked={consentimiento}
                    onChange={(e) => {
                      setConsentimiento(e.target.checked)
                      setErrores((prev) => ({ ...prev, consentimiento: '' }))
                    }}
                    error={errores.consentimiento || undefined}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" size="lg" onClick={enviar}>
                      Enviar por correo
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => irA(2)}>
                      <ArrowLeft className="size-4" aria-hidden="true" />
                      Atrás
                    </Button>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Se abre su correo con el mensaje ya redactado. Le
                    respondemos en menos de un día hábil.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3">
      <dt className="text-ink-muted">{etiqueta}</dt>
      <dd className="text-right text-ink">{valor}</dd>
    </div>
  )
}
