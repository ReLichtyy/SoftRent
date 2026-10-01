/*
 * Juez determinista para el suite de agent-eval (tasks/eval-suite.yaml).
 * Uso: node tasks/judge.mjs <id-de-tarea>
 *
 * Sale con código 0 solo si: el proyecto instala, compila (npm run
 * build), pasa lint (oxlint) y los checks específicos de la tarea.
 * Multiplataforma: el juez corre en cmd.exe en Windows, por eso la
 * lógica vive aquí y no en el test_cmd del YAML.
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const task = process.argv[2]

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', shell: true })
}

function read(path) {
  return readFileSync(path, 'utf8')
}

function dirty(paths) {
  return execSync(`git status --porcelain -- ${paths}`, {
    encoding: 'utf8',
    shell: true,
  }).trim()
}

function assert(cond, mensaje) {
  if (!cond) throw new Error(mensaje)
}

const checks = {
  'agregar-demo': () => {
    const demos = read('src/content/demos.ts')
    const tipos = read('src/content/types.ts')
    const registro = read('src/knowledge/index.ts')
    assert(
      demos.includes("'gimnasios'"),
      'Falta la entrada de gimnasios en src/content/demos.ts',
    )
    assert(
      tipos.includes("'gimnasios'"),
      'Falta gimnasios en el tipo DemoId de src/content/types.ts',
    )
    assert(
      existsSync('src/knowledge/demos/gimnasios.ts'),
      'Falta el submodulo src/knowledge/demos/gimnasios.ts',
    )
    assert(
      registro.includes('gimnasios'),
      'Falta el registro en src/knowledge/index.ts',
    )
    assert(
      dirty('src/pages src/components') === '',
      'Se modificaron archivos de pages o components; la demo debia agregarse solo en la capa de contenido',
    )
  },

  'primitiva-progress': () => {
    assert(
      existsSync('src/components/ui/Progress.tsx'),
      'Falta src/components/ui/Progress.tsx',
    )
    const progress = read('src/components/ui/Progress.tsx')
    assert(
      progress.includes('progressbar'),
      'Progress debe usar role="progressbar"',
    )
    assert(
      progress.includes('aria-valuenow'),
      'Progress debe exponer aria-valuenow',
    )
    assert(
      existsSync('docs/ui/progress.md'),
      'Falta la documentacion docs/ui/progress.md',
    )
    const indice = read('docs/index.md')
    assert(
      indice.includes('progress.md'),
      'Falta la fila de Progress en docs/index.md',
    )
  },

  'pantalla-reportes': () => {
    assert(
      existsSync('src/pages/app/Reportes.tsx'),
      'Falta src/pages/app/Reportes.tsx',
    )
    const router = read('src/router.tsx')
    assert(
      router.includes('/app/reportes'),
      'Falta la ruta /app/reportes en src/router.tsx',
    )
    const layout = read('src/pages/_layouts/AppLayout.tsx')
    assert(
      layout.includes('Reportes'),
      'Falta la entrada Reportes en la navegacion del AppLayout',
    )
    const pagina = read('src/pages/app/Reportes.tsx')
    assert(
      pagina.includes('PageIntro') && pagina.includes('KpiTile') && pagina.includes('StatusList'),
      'Reportes debe usar PageIntro, KpiTile y StatusList como las demas pantallas',
    )
  },

  'faq-fuente-unica': () => {
    const faq = read('src/content/faq.ts')
    const total = (faq.match(/pregunta:/g) ?? []).length
    assert(
      total >= 12,
      `Se esperaban al menos 12 preguntas en content/faq.ts y hay ${total}`,
    )
    assert(
      dirty('src/components/sections/Faq.tsx') === '',
      'Se modifico Faq.tsx; las preguntas debian mostrarse solas desde content/faq',
    )
  },
}

if (!task || !checks[task]) {
  console.error('Uso: node tasks/judge.mjs <' + Object.keys(checks).join('|') + '>')
  process.exit(2)
}

if (!existsSync('node_modules')) {
  run('npm install --no-audit --no-fund --loglevel=error')
}

run('npm run build')
run('npm run lint')

try {
  checks[task]()
  console.log('JUDGE PASS: ' + task)
} catch (error) {
  console.error('JUDGE FAIL: ' + error.message)
  process.exit(1)
}
