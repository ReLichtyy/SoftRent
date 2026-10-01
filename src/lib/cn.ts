import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Combina clases condicionales (clsx) resolviendo conflictos
 * de Tailwind a favor de la última clase pasada (tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
