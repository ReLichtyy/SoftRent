import { proceso } from '../../content/proceso'
import type { ModuloCore } from '../types'

/*
 * Módulo core del chatbot: SoftRent, proceso, contacto y límites.
 * El proceso y los precios NO viven aquí: se importan de content/
 * (regla 4 de enrutamiento, sección 3.5).
 */

export const coreSoftrent: ModuloCore = {
  id: 'softrent',
  nombre: 'SoftRent',
  queEs:
    'SoftRent diseña e implementa el sistema de reservas, mensajes y cobros de su negocio. Lo construimos nosotros, en días, y usted lo revisa todo desde el celular.',
  proceso: proceso.map((paso) => ({
    paso: paso.nombre,
    detalle: paso.softrentHace,
  })),
  contacto: {
    correo: 'hola@softrent.com',
  },
  noHace: [
    'Inventar precios, funciones o demos que no estén en el catálogo',
    'Confirmar pagos sin verificación de una persona',
    'Dar diagnósticos médicos, veterinarios o legales',
    'Prometer tiempos o resultados que SoftRent no firmó en la propuesta',
  ],
}
