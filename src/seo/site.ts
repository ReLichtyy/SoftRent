/*
 * SEO del sitio: una sola fuente para el <head> de cada ruta.
 *
 * La usan tres consumidores y ninguno escribe etiquetas por su cuenta:
 *  - scripts/prerender.mjs, que escribe el HTML estático de cada página
 *    pública, el sitemap.xml y el robots.txt;
 *  - main.tsx, que actualiza el <head> en cada navegación del lado del
 *    cliente;
 *  - el shell de /app y /admin (noindex).
 *
 * Reglas (adaptadas del playbook de SEO de deska.dev):
 *  - Toda página declara canonical propio: sin él, una URL con ?utm= o
 *    /soluciones/:id compite como página aparte.
 *  - Toda página emite su bloque OpenGraph y Twitter completo. Si no, al
 *    compartirla en WhatsApp se ve el título del inicio.
 *  - El sufijo " | SoftRent" se escribe a mano también en og:title.
 *  - Las superficies que no son para buscadores llevan noindex, follow.
 *  - El JSON-LD describe solo lo que la página muestra.
 */

import { contacto } from '../content/contacto'

export const SITE_URL = 'https://www.softrent.dev'
export const SITE_NAME = 'SoftRent'
export const SITE_LOCALE = 'es_LA'
export const THEME_COLOR = '#0f0e0d'

/** Tarjeta para redes: JPEG bajo 300 KB, que es el límite en que
 * WhatsApp deja de mostrar la imagen sin avisar. Subir CARD_VERSION
 * cuando cambie el dibujo, para que las redes no sirvan la vieja. */
const CARD_VERSION = 1
export const SOCIAL_CARD = {
  url: `/og/softrent.jpg?v=${CARD_VERSION}`,
  width: 1200,
  height: 630,
  alt: 'SoftRent: tu negocio, potenciado por IA',
}

export type PageSeo = {
  /** Ruta canónica, sin barra final (salvo el inicio). */
  path: string
  /** Título sin sufijo; el inicio usa el suyo completo. */
  title: string
  description: string
  noindex?: boolean
  /** Bloques JSON-LD propios de la página. */
  jsonLd?: Record<string, unknown>[]
}

const organizacion = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/softrent-symbol.png`,
  email: contacto.correo,
  areaServed: { '@type': 'Country', name: 'Costa Rica' },
  description:
    'Software a la medida con IA integrada para pymes de servicios: reservas, pedidos, cobros y atención por WhatsApp y web.',
}

const sitioWeb = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'es',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

function migas(path: string, nombre: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: nombre, item: `${SITE_URL}${path}` },
    ],
  }
}

/** Páginas públicas indexables, en el orden del sitemap. Al agregar una
 * ruta pública en routes.tsx, agregarla aquí también o queda sin título
 * propio, sin prerender y fuera del sitemap. */
export const PUBLIC_PAGES: PageSeo[] = [
  {
    path: '/',
    title: 'SoftRent: software a la medida con IA para su negocio',
    description:
      'Sistemas de reservas, pedidos, cobros y atención por WhatsApp con IA integrada, hechos a la medida de pymes de servicios en Costa Rica. Pregúntele a su negocio y deje que avance solo.',
    jsonLd: [organizacion, sitioWeb],
  },
  {
    path: '/soluciones',
    title: 'Soluciones: lo que hace a mano, resuelto con un mensaje',
    description:
      'Agenda, chat y web, cobros y caja, inventario y precios, clientes nuevos y clientes que vuelven: cómo SoftRent resuelve con IA las tareas que su negocio repite cada día.',
  },
  {
    path: '/industrias',
    title: 'Industrias',
    description:
      'Citas, pedidos y servicios: tres industrias, cada una con su plantilla lista para ajustar a su negocio.',
  },
  {
    path: '/precios',
    title: 'Precios y planes',
    description:
      'Planes mensuales en colones y dólares para cada etapa de su negocio. Implementación de pago único, prorrateable en 3 meses.',
  },
  {
    path: '/demos',
    title: 'Demos en vivo',
    description:
      'Pruebe SoftRent antes de decidir: demos públicas de SoftRent Citas, Pedidos y Servicios, con el asistente de IA funcionando.',
  },
  {
    path: '/casos',
    title: 'Casos y resultados',
    description:
      'Ejemplos de lo que logra un negocio de servicios cuando responde, agenda y cobra solo con SoftRent.',
  },
  {
    path: '/nosotros',
    title: 'Nosotros',
    description:
      'Hacemos software para las pymes de servicios de Costa Rica: simple, en su idioma y a la medida.',
  },
  {
    path: '/comenzar',
    title: 'Comenzar: cuéntenos de su negocio',
    description:
      'Cuéntenos cómo funciona su negocio y le armamos una propuesta de sistema a la medida, sin compromiso.',
  },
  {
    path: '/privacidad',
    title: 'Privacidad',
    description:
      'Cómo tratamos los datos de su negocio y de sus clientes. En lenguaje claro, sin letra chica.',
  },
  {
    path: '/terminos',
    title: 'Términos del servicio',
    description: 'Las reglas claras de cómo trabajamos con su negocio.',
  },
]

// Migas de pan en todas las páginas internas.
for (const page of PUBLIC_PAGES) {
  if (page.path === '/') continue
  page.jsonLd = [...(page.jsonLd ?? []), migas(page.path, page.title.split(':')[0])]
}

const NOT_FOUND: PageSeo = {
  path: '/404',
  title: 'Página no encontrada',
  description: 'La dirección no existe o cambió.',
  noindex: true,
}

const PRIVATE: PageSeo = {
  path: '/app',
  title: 'Panel',
  description: 'Panel de SoftRent.',
  noindex: true,
}

const porRuta = new Map(PUBLIC_PAGES.map((p) => [p.path, p]))

/** SEO de cualquier ruta del sitio. */
export function seoForPath(pathname: string): PageSeo {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const exacta = porRuta.get(path)
  if (exacta) return exacta
  // /soluciones/:id abre la misma página en una fila: su canonical es /soluciones.
  if (/^\/soluciones\/[^/]+$/.test(path)) return porRuta.get('/soluciones')!
  if (path === '/app' || path.startsWith('/app/') || path === '/admin' || path.startsWith('/admin/')) {
    return { ...PRIVATE, path }
  }
  return NOT_FOUND
}

function fullTitle(page: PageSeo): string {
  return page.path === '/' ? page.title : `${page.title} | ${SITE_NAME}`
}

function absolute(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`
}

export type HeadTag =
  | { tag: 'meta'; key: string; attrs: Record<string, string> }
  | { tag: 'link'; key: string; attrs: Record<string, string> }

/** Etiquetas del <head> de una página, salvo <title> y JSON-LD. Cada una
 * lleva una clave estable para que el cliente la reemplace al navegar. */
export function headTags(page: PageSeo): HeadTag[] {
  const title = fullTitle(page)
  const image = absolute(SOCIAL_CARD.url)
  const meta = (key: string, attrs: Record<string, string>): HeadTag => ({ tag: 'meta', key, attrs })
  const tags: HeadTag[] = [
    meta('description', { name: 'description', content: page.description }),
    meta('robots', {
      name: 'robots',
      content: page.noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    }),
    meta('og:type', { property: 'og:type', content: 'website' }),
    meta('og:site_name', { property: 'og:site_name', content: SITE_NAME }),
    meta('og:locale', { property: 'og:locale', content: SITE_LOCALE }),
    meta('og:title', { property: 'og:title', content: title }),
    meta('og:description', { property: 'og:description', content: page.description }),
    meta('og:image', { property: 'og:image', content: image }),
    meta('og:image:type', { property: 'og:image:type', content: 'image/jpeg' }),
    meta('og:image:width', { property: 'og:image:width', content: String(SOCIAL_CARD.width) }),
    meta('og:image:height', { property: 'og:image:height', content: String(SOCIAL_CARD.height) }),
    meta('og:image:alt', { property: 'og:image:alt', content: SOCIAL_CARD.alt }),
    meta('twitter:card', { name: 'twitter:card', content: 'summary_large_image' }),
    meta('twitter:title', { name: 'twitter:title', content: title }),
    meta('twitter:description', { name: 'twitter:description', content: page.description }),
    meta('twitter:image', { name: 'twitter:image', content: image }),
  ]
  // Las páginas noindex no declaran canonical ni og:url: no hay versión
  // canónica que promover.
  if (!page.noindex) {
    tags.push(
      meta('og:url', { property: 'og:url', content: absolute(page.path) }),
      { tag: 'link', key: 'canonical', attrs: { rel: 'canonical', href: absolute(page.path) } },
    )
  }
  return tags
}

export function documentTitle(page: PageSeo): string {
  return fullTitle(page)
}

/** JSON-LD listo para un <script>. Escapa <, > y & para que ningún texto
 * pueda cerrar la etiqueta. */
export function jsonLdText(page: PageSeo): string | null {
  if (!page.jsonLd?.length) return null
  const graph = { '@context': 'https://schema.org', '@graph': page.jsonLd }
  return JSON.stringify(graph).replace(/[<>&]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)
}

/** Atributos HTML escapados, para el prerender. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** El bloque <head> de una página como texto, para el HTML estático. */
export function renderHead(page: PageSeo): string {
  const lines = [`<title>${esc(documentTitle(page))}</title>`]
  for (const t of headTags(page)) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(' ')
    lines.push(`<${t.tag} data-seo="${t.key}" ${attrs} />`)
  }
  const ld = jsonLdText(page)
  if (ld) lines.push(`<script type="application/ld+json" data-seo="jsonld">${ld}</script>`)
  return lines.join('\n    ')
}

/** Aplica el <head> de una página en el navegador (navegación del cliente). */
export function applyHead(page: PageSeo): void {
  document.title = documentTitle(page)
  const wanted = headTags(page)
  const keys = new Set(wanted.map((t) => t.key))
  for (const el of document.head.querySelectorAll<HTMLElement>('[data-seo]')) {
    const key = el.dataset.seo!
    if (key !== 'jsonld' && !keys.has(key)) el.remove()
  }
  for (const t of wanted) {
    let el = document.head.querySelector<HTMLElement>(`[data-seo="${t.key}"]`)
    if (!el || el.tagName.toLowerCase() !== t.tag) {
      el?.remove()
      el = document.createElement(t.tag)
      el.dataset.seo = t.key
      document.head.appendChild(el)
    }
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v)
  }
  const ld = jsonLdText(page)
  let script = document.head.querySelector<HTMLScriptElement>('script[data-seo="jsonld"]')
  if (!ld) {
    script?.remove()
  } else {
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = 'jsonld'
      document.head.appendChild(script)
    }
    script.textContent = ld
  }
}
