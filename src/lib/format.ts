/** Formatea un monto en colones: 29900 -> "₡29.900". */
export function colones(monto: number): string {
  return (
    '₡' +
    monto.toLocaleString('es-CR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  )
}

/** Formatea el tamaño de un archivo: 1536 -> "1,5 KB". */
export function bytes(tamano: number): string {
  if (tamano < 1024) return `${tamano} B`
  if (tamano < 1024 * 1024) {
    return `${(tamano / 1024).toLocaleString('es-CR', {
      maximumFractionDigits: 1,
    })} KB`
  }
  return `${(tamano / (1024 * 1024)).toLocaleString('es-CR', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} MB`
}
