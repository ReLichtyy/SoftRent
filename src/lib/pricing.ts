import type { Plan } from '../content/types'

export type Currency = 'CRC' | 'USD'
export type ExchangeRate = { rate: number; updatedAt: number; expiresAt: number }
const DAY = 86_400_000

export function validExchange(value: unknown, now = Date.now()): value is ExchangeRate {
  if (!value || typeof value !== 'object') return false
  const data = value as Record<string, unknown>
  return typeof data.rate === 'number' && Number.isFinite(data.rate) && data.rate > 0
    && typeof data.updatedAt === 'number' && Number.isFinite(data.updatedAt)
    && data.updatedAt <= now && now - data.updatedAt < 2 * DAY
    && typeof data.expiresAt === 'number' && Number.isFinite(data.expiresAt)
    && data.expiresAt > now && data.expiresAt <= now + DAY
}

export function planPrice(plan: Plan, requested: Currency, annual: boolean, rate: number | null) {
  const validRate = rate !== null && Number.isFinite(rate) && rate > 0
  const currency = requested === 'CRC' && plan.precioMensual === null && !validRate ? 'USD' : requested
  const base = currency === 'USD' ? plan.precioUsd
    : plan.precioMensual ?? (plan.precioUsd !== undefined && validRate ? plan.precioUsd * rate : undefined)
  if (base === undefined) return null
  return { currency, monthly: Math.round(base * (annual ? 10 / 12 : 1)), yearly: Math.round(base * 10) }
}

export function pricingMoney(amount: number, currency: Currency) {
  return currency === 'USD'
    ? `US$${amount.toLocaleString('en-US')}`
    : `₡${amount.toLocaleString('de-DE')}`
}
