import type { DemoId } from '../content/types'
import { submoduloCitas } from './demos/citas'
import { submoduloPedidos } from './demos/pedidos'
import { submoduloServicios } from './demos/servicios'
import { coreSoftrent } from './core/softrent'
import type { ModuloCore, SubmoduloDemo } from './types'

/*
 * Registro de conocimiento del chatbot (sección 3.5).
 * Regla: una demo nueva funciona con su entrada en content/demos
 * + su archivo en knowledge/demos + una línea en este registro.
 * Nunca requiere tocar componentes.
 */

export const core: ModuloCore = coreSoftrent

export const submodulos: Record<DemoId, SubmoduloDemo> = {
  citas: submoduloCitas,
  pedidos: submoduloPedidos,
  servicios: submoduloServicios,
}
