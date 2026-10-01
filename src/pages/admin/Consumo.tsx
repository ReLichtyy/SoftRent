import { Container } from '../../components/layout/Container'
import { Card } from '../../components/ui/Card'
import { colones } from '../../lib/format'
import { consumo } from '../../data/admin'
import { PageIntro } from '../shared'

export function AdminConsumo() {
  const totalIA = consumo.reduce((s, c) => s + c.conversacionesIA, 0)
  const totalWA = consumo.reduce((s, c) => s + c.mensajesWhatsApp, 0)
  const totalCosto = consumo.reduce((s, c) => s + c.costoEstimado, 0)

  return (
    <Container className="max-w-5xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Consumo por cliente"
        description="Conversaciones con IA y mensajes de WhatsApp del mes, con el costo variable estimado (sección 1.4)."
      />

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <caption className="border-b border-line px-4 py-3 text-left text-xs text-ink-soft">
            Resumen del mes: {totalIA} conversaciones con IA · {totalWA}{' '}
            mensajes de WhatsApp · costo variable estimado {colones(totalCosto)}
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-xs text-ink-soft">
              <th scope="col" className="px-4 py-2.5 font-medium">Negocio</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Conversaciones IA</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Mensajes WhatsApp</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Costo estimado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {consumo.map((c) => (
              <tr key={c.id}>
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                  {c.negocio}
                </th>
                <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                  {c.conversacionesIA}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                  {c.mensajesWhatsApp}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                  {colones(c.costoEstimado)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Container>
  )
}
