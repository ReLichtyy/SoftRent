import { useState } from 'react'
import { Container } from '../../components/layout/Container'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Select } from '../../components/ui/Select'
import { negocioDemo, usuarios, type UsuarioApp } from '../../data/app'
import { PageIntro } from '../shared'

const roles: { id: UsuarioApp['rol']; label: string }[] = [
  { id: 'dueño', label: 'Dueño' },
  { id: 'agente', label: 'Agente' },
  { id: 'lectura', label: 'Solo lectura' },
]

export function AppAjustes() {
  const [equipo, setEquipo] = useState(usuarios)

  function cambiarRol(usuario: UsuarioApp, rol: string) {
    setEquipo((prev) =>
      prev.map((u) =>
        u.id === usuario.id ? { ...u, rol: rol as UsuarioApp['rol'] } : u,
      ),
    )
  }

  return (
    <Container className="max-w-4xl space-y-8 py-8 sm:py-10">
      <PageIntro
        title="Ajustes"
        description="Su equipo y quién ve qué. Solo el dueño puede cambiar plan, pagos y datos fiscales."
      />

      <Card padded={false} className="overflow-hidden">
        <p className="border-b border-border px-4 py-3 text-sm font-medium text-ink">
          Equipo
        </p>
        <ul className="divide-y divide-border">
          {equipo.map((u) => (
            <li key={u.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">{u.nombre}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Recibe avisos por {u.canal}
                </p>
              </div>
              <Select
                label={`Rol de ${u.nombre}`}
                value={u.rol}
                onChange={(e) => cambiarRol(u, e.target.value)}
                disabled={u.rol === 'dueño'}
                className="sm:w-40"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </Select>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-heading-md text-ink">Negocio</h2>
          <Badge tone="brand">{negocioDemo.nombre}</Badge>
        </div>
        <p className="text-sm leading-relaxed text-ink-muted">
          Horario, servicios, precios y base de conocimiento se ajustan desde
          la pantalla del Asistente y la Agenda. Para cambios del negocio
          (nombre, cédula, datos fiscales), escríbanos y lo actualizamos por
          usted.
        </p>
      </Card>
    </Container>
  )
}
