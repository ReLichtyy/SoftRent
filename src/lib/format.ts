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
