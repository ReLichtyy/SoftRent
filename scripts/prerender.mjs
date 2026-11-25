/*
 * Prerender del sitio público, después de `vite build` (cliente) y
 * `vite build --ssr` (dist-ssr). Escribe:
 *
 *  - un HTML con contenido real por cada página pública (dist/precios.html,
 *    ...), con su <head> de src/seo/site.ts. Vercel los sirve con cleanUrls;
 *  - dist/404.html, que Vercel devuelve con estado 404 para cualquier
 *    ruta que no exista;
 *  - dist/app-shell.html, el shell vacío y noindex de /app y /admin
 *    (vercel.json reescribe esas rutas hacia él);
 *  - dist/sitemap.xml y dist/robots.txt, desde la misma lista de páginas.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// React de producción en el render del servidor (sin avisos de desarrollo).
process.env.NODE_ENV = 'production'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, renderHead, seoForPath, PUBLIC_PAGES, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/
const ROOT_DIV = '<div id="root"></div>'
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  throw new Error('dist/index.html no tiene el bloque seo:start/seo:end o el <div id="root"></div>.')
}

// Cada página pública es un chunk lazy con su propio CSS. Sin enlazarlo en
// el HTML, el contenido prerenderizado se ve sin estilos hasta que el JS
// pide el chunk. El manifest de Vite dice qué archivos tiene cada fuente.
const manifest = JSON.parse(readFileSync(join(dist, '.vite', 'manifest.json'), 'utf8'))

function sourceFor(path) {
  if (path === '/') return null // el inicio va en el chunk de entrada
  if (path === '/404') return 'src/pages/NotFound.tsx'
  const name = path.slice(1)
  return `src/pages/public/${name[0].toUpperCase()}${name.slice(1)}.tsx`
}

function routeAssets(path) {
  const src = sourceFor(path)
  if (!src) return ''
  if (!manifest[src]) throw new Error(`El manifest de Vite no tiene ${src} (ruta ${path}).`)
  const css = new Set()
  const js = new Set()
  const visit = (key) => {
    const entry = manifest[key]
    if (!entry || entry.isEntry || js.has(entry.file)) return
    js.add(entry.file)
    for (const file of entry.css ?? []) css.add(file)
    for (const dep of entry.imports ?? []) visit(dep)
  }
  visit(src)
  // Lo que la plantilla ya enlaza (vendor, runtime) no se repite.
  for (const file of [...css, ...js]) {
    if (!template.includes(`/${file}`)) continue
    css.delete(file)
    js.delete(file)
  }
  return [
    ...[...css].map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
    ...[...js].map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
  ].join('\n    ')
}

function page(head, body = '', assets = '') {
  return template
    .replace(SEO_BLOCK, () => head)
    .replace('</head>', () => (assets ? `  ${assets}\n  </head>` : '</head>'))
    .replace(ROOT_DIV, () => `<div id="root">${body}</div>`)
}

function fileFor(path) {
  return path === '/' ? join(dist, 'index.html') : join(dist, `${path.slice(1)}.html`)
}

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

for (const { path } of PUBLIC_PAGES) {
  const { html, head } = await render(path)
  if (!html.includes('<h1')) throw new Error(`La página ${path} se prerenderizó sin <h1>.`)
  write(fileFor(path), page(head, html, routeAssets(path)))
  console.log(`prerender  ${path}`)
}

{
  const { html, head } = await render('/__pagina-que-no-existe__')
  write(join(dist, '404.html'), page(head, html, routeAssets('/404')))
  console.log('prerender  404.html')
}

write(join(dist, 'app-shell.html'), page(renderHead(seoForPath('/app'))))
console.log('shell      app-shell.html')

// Sin <lastmod>: una fecha que no refleja un cambio real de contenido hace
// que Google descarte el campo para todo el archivo.
const urls = PUBLIC_PAGES.filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc></url>`)
  .join('\n')
write(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

// /app y /admin no se bloquean aquí: un Disallow impide que Google lea su
// noindex, y una URL bloqueada pero enlazada igual se indexa sin snippet.
write(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)
console.log(`sitemap    ${PUBLIC_PAGES.length} URLs, robots.txt`)

rmSync(ssrDir, { recursive: true, force: true })
// El manifest no se publica: solo servía al prerender.
rmSync(join(dist, '.vite'), { recursive: true, force: true })
