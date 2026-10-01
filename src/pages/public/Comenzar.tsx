import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowLeft, Check, Question } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Checkbox } from '../../components/ui/Checkbox'
import { DragAndDrop, type ArchivoContexto } from '../../components/ui/DragAndDrop'
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
import { PageIntro } from '../shared'

type Industria = DemoId | 'otro'
type Datos = {
  nombre: string
  negocio: string
  whatsapp: string
  correo: string
  tamano: string
}

const TAMANOS = ['Solo yo', '2 a 3 personas', '4 a 9 personas', '10 o más']

const PASOS = ['Industria', 'Dolores', 'Datos', 'Listo'] as const

const datosIniciales: Datos = {
  nombre: '',
  negocio: '',
  whatsapp: '',
  correo: '',
  tamano: '',
}

function pasoActual(paso: number): string {
  return PASOS[paso - 1] ?? ''
}

/** Flujo "Comenzar" (sección 3.4.10): cuatro pasos que convierten
 * el interés en un brief estructurado. Acepta ?demo y ?plan para
 * precargar; el brief viaja por correo a SoftRent. */
export function Comenzar() {
  const [searchParams] = useSearchParams()

  const demoParam = searchParams.get('demo')
  const planParam = searchParams.get('plan')
  const plan = planParam ? planPorId(planParam) : undefined

  const [paso, setPaso] = useState(1)
  const [industria, setIndustria] = useState<Industria | null>(
    demoParam && demoPorId(demoParam) ? (demoParam as DemoId) : null,
  )
  const [dolores, setDolores] = useState<string[]>([])
  const [datos, setDatos] = useState<Datos>(datosIniciales)
  const [consentimiento, setConsentimiento] = useState(false)
  const [archivos, setArchivos] = useState<ArchivoContexto[]>([])
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)

  const pasoRef = useRef<HTMLDivElement>(null)

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
    if (nuevo > paso) track('comenzar_paso', { paso: pasoActual(nuevo) })
    setPaso(nuevo)
  }

  function elegirIndustria(valor: Industria) {
    setIndustria(valor)
    setErrores({})
    irA(2)
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

  function validarCampo(campo: keyof Datos, valor: string): string {
    const v = valor.trim()
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
    campo: keyof Datos,
    evento: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const valor = evento.target.value
    setDatos((prev) => ({ ...prev, [campo]: valor }))
    // Validación en tiempo real: si el campo ya marcaba error, se revalida.
    setErrores((prev) =>
      prev[campo]
        ? { ...prev, [campo]: validarCampo(campo, valor) }
        : prev,
    )
  }

  function validarDatos(): boolean {
    const nuevos: Record<string, string> = {}
    ;(Object.keys(datos) as (keyof Datos)[]).forEach((campo) => {
      const error = validarCampo(campo, datos[campo])
      if (error) nuevos[campo] = error
    })
    if (!consentimiento) {
      nuevos.consentimiento =
        'Necesitamos su permiso para responderle por estos medios.'
    }
    setErrores(nuevos)
    return Object.keys(nuevos).length === 0
  }

  function continuar() {
    if (paso === 2 && dolores.length === 0) {
      setErrores({ dolores: 'Elija al menos un dolor para empezar.' })
      return
    }
    if (paso === 3 && !validarDatos()) return
    irA(paso + 1)
  }

  const doloresElegidos = soluciones.filter((s) => dolores.includes(s.id))
  const industriaNombre =
    industria === 'otro' || industria === null
      ? 'Por definir'
      : (demoPorId(industria)?.nombre ?? 'Por definir')

  const briefLineas = [
    `Nombre: ${datos.nombre}`,
    `Negocio: ${datos.negocio}`,
    `Industria: ${industriaNombre}`,
    `WhatsApp: ${datos.whatsapp}`,
    `Correo: ${datos.correo}`,
    `Tamaño del equipo: ${datos.tamano}`,
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
    track('comenzar_enviado', {
      industria: industriaNombre,
      dolores: dolores.length,
      plan: plan?.nombre ?? null,
      archivos: archivos.length,
    })
    setEnviado(true)
  }

  return (
    <Section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <PageIntro
            title="Comenzar"
            description="Cuéntenos cómo trabaja su negocio y le preparamos una propuesta. Toma menos de 90 segundos."
          />

          {/* Indicador de pasos */}
          <ol className="mt-10 flex items-center gap-2" aria-label="Progreso">
            {PASOS.map((nombre, i) => {
              const n = i + 1
              const hecho = paso > n
              const activo = paso === n
              return (
                <li key={nombre} className="flex items-center gap-2">
                  <span
                    aria-current={activo ? 'step' : undefined}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors',
                      hecho && 'bg-brand text-on-brand',
                      activo && 'bg-brand/10 text-brand ring-1 ring-brand',
                      !hecho && !activo && 'bg-surface-2 text-ink-soft',
                    )}
                  >
                    {hecho ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      n
                    )}
                  </span>
                  <span
                    className={cn(
                      'hidden text-xs sm:block',
                      activo ? 'text-ink' : 'text-ink-soft',
                    )}
                  >
                    {nombre}
                  </span>
                  {n < PASOS.length && (
                    <span aria-hidden="true" className="h-px w-4 bg-line sm:w-6" />
                  )}
                </li>
              )
            })}
          </ol>

          <div ref={pasoRef} key={paso} className="mt-8">
            {paso === 1 && (
              <fieldset>
                <legend className="font-display text-xl text-ink">
                  ¿A qué se dedica su negocio?
                </legend>
                <p className="mt-1 text-sm text-ink-soft">
                  Toque la tarjeta que más se parezca a su negocio. Puede
                  cambiarla después, nada queda fijo todavía.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {demos.map((demo) => {
                    const Icono = demoIcon(demo.id)
                    return (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => elegirIndustria(demo.id)}
                        aria-pressed={industria === demo.id}
                        className={cn(
                          'flex items-start gap-3 rounded-md border p-4 text-left outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
                          industria === demo.id
                            ? 'border-brand bg-brand/5 ring-1 ring-brand'
                            : 'border-line bg-surface hover:border-ink-soft/40',
                        )}
                      >
                        <span className="shrink-0 text-brand">
                          <Icono className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-display text-lg text-ink">
                            {demo.nombre.replace('SoftRent ', '')}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                            {demo.industria}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                  <button
                    type="button"
                    onClick={() => elegirIndustria('otro')}
                    aria-pressed={industria === 'otro'}
                    className={cn(
                      'flex items-start gap-3 rounded-md border p-4 text-left outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:col-span-2',
                      industria === 'otro'
                        ? 'border-brand bg-brand/5 ring-1 ring-brand'
                        : 'border-line bg-surface hover:border-ink-soft/40',
                    )}
                  >
                    <span className="shrink-0 text-ink-soft">
                      <Question className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-lg text-ink">
                        Aún no lo sé
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                        Conversamos y encontramos la forma de ayudarle.
                      </span>
                    </span>
                  </button>
                </div>
                <p className="mt-4 text-sm text-ink-soft">
                  ¿Prefiere ver ejemplos funcionando primero?{' '}
                  <LinkButton to="/demos" variant="link" size="sm">
                    Vea las demos
                  </LinkButton>
                </p>
              </fieldset>
            )}

            {paso === 2 && (
              <fieldset>
                <legend className="font-display text-xl text-ink">
                  ¿Qué le gustaría resolver primero?
                </legend>
                <p className="mt-1 text-sm text-ink-soft">
                  Elija todos los que le suenen.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {soluciones.map((s) => {
                    const activo = dolores.includes(s.id)
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => alternarDolor(s.id)}
                        aria-pressed={activo}
                        className={cn(
                          'rounded-md border p-4 text-left text-sm leading-relaxed outline-none transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
                          activo
                            ? 'border-brand bg-brand/5 text-ink ring-1 ring-brand'
                            : 'border-line bg-surface text-ink-soft hover:border-ink-soft/40',
                        )}
                      >
                        {s.dolor}
                      </button>
                    )
                  })}
                </div>
                {errores.dolores && (
                  <p className="mt-3 text-xs text-danger">{errores.dolores}</p>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={continuar}>
                    Continuar
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => irA(1)}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Atrás
                  </Button>
                </div>
              </fieldset>
            )}

            {paso === 3 && (
              <Card className="flex flex-col gap-4">
                <div>
                  <h2 className="font-display text-xl text-ink">
                    Para enviarle la propuesta
                  </h2>
                  {plan && (
                    <p className="mt-2">
                      <Badge tone="brand">Plan de interés: {plan.nombre}</Badge>
                    </p>
                  )}
                </div>

                <Input
                  label="Su nombre"
                  value={datos.nombre}
                  onChange={(e) => cambiarDato('nombre', e)}
                  onBlur={() =>
                    setErrores((prev) => ({
                      ...prev,
                      nombre: validarCampo('nombre', datos.nombre),
                    }))
                  }
                  error={errores.nombre || undefined}
                  autoComplete="name"
                />
                <Input
                  label="Nombre del negocio"
                  value={datos.negocio}
                  onChange={(e) => cambiarDato('negocio', e)}
                  onBlur={() =>
                    setErrores((prev) => ({
                      ...prev,
                      negocio: validarCampo('negocio', datos.negocio),
                    }))
                  }
                  error={errores.negocio || undefined}
                />
                <Input
                  label="WhatsApp"
                  hint="Con código de país, por ejemplo +506 8888 8888."
                  value={datos.whatsapp}
                  onChange={(e) => cambiarDato('whatsapp', e)}
                  onBlur={() =>
                    setErrores((prev) => ({
                      ...prev,
                      whatsapp: validarCampo('whatsapp', datos.whatsapp),
                    }))
                  }
                  error={errores.whatsapp || undefined}
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Input
                  label="Correo"
                  type="email"
                  value={datos.correo}
                  onChange={(e) => cambiarDato('correo', e)}
                  onBlur={() =>
                    setErrores((prev) => ({
                      ...prev,
                      correo: validarCampo('correo', datos.correo),
                    }))
                  }
                  error={errores.correo || undefined}
                  autoComplete="email"
                />
                <Select
                  label="Tamaño del equipo"
                  value={datos.tamano}
                  onChange={(e) => cambiarDato('tamano', e)}
                  error={errores.tamano || undefined}
                >
                  <option value="">Elija una opción</option>
                  {TAMANOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
                <Checkbox
                  label="Acepto que SoftRent use estos datos solo para responder mi consulta."
                  checked={consentimiento}
                  onChange={(e) => {
                    setConsentimiento(e.target.checked)
                    setErrores((prev) => ({ ...prev, consentimiento: '' }))
                  }}
                  error={errores.consentimiento || undefined}
                />

                <div className="rounded-md border border-line bg-surface-2/50 p-4">
                  <h3 className="font-display text-base text-ink">
                    ¿Tiene a la mano su menú, catálogo o lista de precios?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    No es obligatorio. Si los comparte, su propuesta llega más
                    precisa y montamos su asistente más rápido.
                  </p>
                  <DragAndDrop
                    className="mt-3"
                    archivos={archivos}
                    onAgregar={agregarArchivos}
                    onQuitar={quitarArchivo}
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={continuar}>
                    Continuar
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => irA(2)}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Atrás
                  </Button>
                </div>
              </Card>
            )}

            {paso === 4 && (
              <Card className="flex flex-col gap-5">
                {enviado ? (
                  <>
                    <Badge tone="success" dot>
                      Brief listo
                    </Badge>
                    <h2 className="font-display text-xl text-ink">
                      Gracias, {datos.nombre.split(' ')[0] || 'de corazón'}.
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      Su correo se abrió con el brief completo. Si no se abrió,
                      envíe el mensaje a hola@softrent.com y seguimos igual.
                      Le respondemos en menos de un día hábil con los
                      siguientes pasos.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-xl text-ink">
                      Revise su brief
                    </h2>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-soft">Industria</dt>
                        <dd className="text-right text-ink">
                          {industriaNombre}
                        </dd>
                      </div>
                      {plan && (
                        <div className="flex justify-between gap-4">
                          <dt className="text-ink-soft">Plan de interés</dt>
                          <dd className="text-right text-ink">{plan.nombre}</dd>
                        </div>
                      )}
                      {archivos.length > 0 && (
                        <div className="flex justify-between gap-4">
                          <dt className="text-ink-soft">Contexto compartido</dt>
                          <dd className="text-right text-ink">
                            {archivos.length}{' '}
                            {archivos.length === 1 ? 'archivo' : 'archivos'}
                          </dd>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-soft">Negocio</dt>
                        <dd className="text-right text-ink">{datos.negocio}</dd>
                      </div>
                      <div className="justify-between gap-4 sm:flex">
                        <dt className="text-ink-soft">Qué quiere resolver</dt>
                        <dd className="mt-2 text-ink sm:mt-0 sm:text-right">
                          {doloresElegidos.map((d) => (
                            <span key={d.id} className="block">
                              {d.dolor}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
                    <Button href={mailto} onClick={enviar}>
                      Enviar por correo
                    </Button>
                    <p className="text-xs leading-relaxed text-ink-soft">
                      Se abre su correo con el brief ya redactado. Le
                      respondemos en menos de un día hábil.
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-fit"
                      onClick={() => irA(3)}
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Atrás
                    </Button>
                  </>
                )}
              </Card>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
