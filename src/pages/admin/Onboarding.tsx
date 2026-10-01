import { useState } from 'react'
import { CheckCircle, Circle } from '@phosphor-icons/react'
import { Container } from '../../components/layout/Container'
import { Card } from '../../components/ui/Card'
import { KpiTile } from '../../components/ui/KpiTile'
import { onboardingInicial } from '../../data/admin'
import { cn } from '../../lib/cn'
import { PageIntro } from '../shared'

/* Checklist por industria (sección 1.5); aquí se muestra con
 * el cliente en implementación de la vista de Clientes. */
export function AdminOnboarding() {
  const [pasos, setPasos] = useState(onboardingInicial)
  const hechos = pasos.filter((p) => p.hecho).length
  const cliente = 'Soda La Esquina'

  function alternar(id: string) {
    setPasos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hecho: !p.hecho } : p)),
    )
  }

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Onboarding"
        description="Checklist fijo por industria: conectar WhatsApp, cargar servicios, base de conocimiento, usuarios, prueba y salida en vivo."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <KpiTile value={cliente} label="Negocio en implementación" />
        <KpiTile
          value={`${hechos} de ${pasos.length}`}
          label="Pasos completados"
        />
      </div>

      <Card padded={false} className="overflow-hidden">
        <ul className="divide-y divide-line">
          {pasos.map((paso) => (
            <li key={paso.id}>
              <button
                type="button"
                onClick={() => alternar(paso.id)}
                aria-pressed={paso.hecho}
                className="flex w-full items-center gap-3 p-4 text-left outline-none transition-colors hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand sm:p-5"
              >
                {paso.hecho ? (
                  <CheckCircle
                    className="h-5 w-5 shrink-0 text-success"
                    aria-hidden="true"
                    weight="fill"
                  />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true" />
                )}
                <span
                  className={cn(
                    'text-sm',
                    paso.hecho ? 'text-ink-soft line-through' : 'text-ink',
                  )}
                >
                  {paso.nombre}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  )
}
