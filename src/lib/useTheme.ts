import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'softrent-theme'

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* sin localStorage se queda en el tema oscuro */
  }
  return 'dark'
}

/* Store mínimo del tema: el navbar y el footer pueden cambiarlo a
 * la vez y todas las instancias de useTheme se sincronizan. */
let temaActual: Theme = readInitialTheme()
const suscriptores = new Set<(tema: Theme) => void>()

function aplicar(tema: Theme) {
  temaActual = tema
  if (tema === 'dark') {
    document.documentElement.dataset.theme = 'dark'
  } else {
    delete document.documentElement.dataset.theme
  }
  try {
    localStorage.setItem(STORAGE_KEY, tema)
  } catch {
    /* modo privado: el tema solo vive en memoria */
  }
  suscriptores.forEach((avisar) => avisar(tema))
}

function suscribir(avisar: () => void) {
  suscriptores.add(avisar)
  return () => {
    suscriptores.delete(avisar)
  }
}

function cambiarTema(tema: Theme) {
  if (tema !== temaActual) aplicar(tema)
}

/** Tema del sitio. El tema por defecto es el oscuro; persiste la
 * elección del usuario y respeta el claro solo si la pidió.
 * Todas las instancias comparten el mismo estado. */
export function useTheme() {
  // En el servidor y durante la hidratación vale el tema del prerender
  // (oscuro); después, el tema guardado.
  const theme = useSyncExternalStore(suscribir, () => temaActual, () => 'dark' as Theme)

  return {
    theme,
    setTheme: cambiarTema,
    toggle: () => cambiarTema(temaActual === 'dark' ? 'light' : 'dark'),
  }
}
