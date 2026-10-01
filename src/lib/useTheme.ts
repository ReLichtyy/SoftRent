import { useEffect, useState } from 'react'

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

function cambiarTema(tema: Theme) {
  if (tema !== temaActual) aplicar(tema)
}

/** Tema del sitio. El tema por defecto es el oscuro; persiste la
 * elección del usuario y respeta el claro solo si la pidió.
 * Todas las instancias comparten el mismo estado. */
export function useTheme() {
  const [theme, setLocal] = useState<Theme>(temaActual)

  useEffect(() => {
    const avisar = (tema: Theme) => setLocal(tema)
    suscriptores.add(avisar)
    return () => {
      suscriptores.delete(avisar)
    }
  }, [])

  return {
    theme,
    setTheme: cambiarTema,
    toggle: () => cambiarTema(temaActual === 'dark' ? 'light' : 'dark'),
  }
}
