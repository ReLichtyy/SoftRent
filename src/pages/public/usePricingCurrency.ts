import { useEffect, useRef, useState } from 'react'
import { validExchange, type Currency } from '../../lib/pricing'

const CURRENCY_KEY = 'softrent-moneda'
const RATE_KEY = 'softrent-usd-crc-rate-v1'

function initialCurrency(): { currency: Currency; saved: boolean } {
  try {
    const saved = localStorage.getItem(CURRENCY_KEY)
    if (saved === 'CRC' || saved === 'USD') return { currency: saved, saved: true }
  } catch (error) {
    console.warn('No se pudo leer la moneda guardada. Se usará la zona horaria.', error)
  }
  return { currency: Intl.DateTimeFormat().resolvedOptions().timeZone === 'America/Costa_Rica' ? 'CRC' : 'USD', saved: false }
}

export function usePricingCurrency() {
  const [initial] = useState(initialCurrency)
  const [currency, setCurrency] = useState<Currency>(initial.currency)
  const [rate, setRate] = useState<number | null>(null)
  const [rateStatus, setRateStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const manual = useRef(initial.saved)

  useEffect(() => {
    let active = true
    const countryController = new AbortController()
    const rateController = new AbortController()
    const countryTimeout = window.setTimeout(() => countryController.abort(), 2500)
    const rateTimeout = window.setTimeout(() => rateController.abort(), 4000)

    async function country() {
      try {
        const response = await fetch('https://api.country.is/', { signal: countryController.signal })
        if (!response.ok) throw new Error(`Country lookup: HTTP ${response.status}`)
        const data = await response.json()
        if (typeof data.country !== 'string' || !/^[A-Z]{2}$/.test(data.country)) throw new Error('Invalid country')
        if (active && !manual.current) setCurrency(data.country === 'CR' ? 'CRC' : 'USD')
      } catch (error) {
        if (active) console.warn('No se pudo detectar el país. Puede elegir la moneda en los controles.', error)
      } finally {
        clearTimeout(countryTimeout)
      }
    }

    async function exchange() {
      try {
        try {
          const stored = localStorage.getItem(RATE_KEY)
          if (stored) {
            const cached: unknown = JSON.parse(stored)
            if (validExchange(cached)) {
              if (active) { setRate(cached.rate); setRateStatus('ready') }
              return
            }
          }
        } catch (error) {
          console.warn('No se pudo leer el cambio guardado. Se consultará en línea.', error)
        }
        const response = await fetch('https://open.er-api.com/v6/latest/USD', { signal: rateController.signal })
        if (!response.ok) throw new Error(`Exchange rate: HTTP ${response.status}`)
        const data = await response.json()
        const nextUpdate = data.time_next_update_unix * 1000
        const exchangeRate = { rate: data.rates?.CRC, updatedAt: data.time_last_update_unix * 1000, expiresAt: Math.min(nextUpdate, Date.now() + 86_400_000) }
        if (data.result !== 'success' || data.base_code !== 'USD' || !Number.isFinite(nextUpdate) || !validExchange(exchangeRate)) throw new Error('Invalid or outdated exchange rate')
        if (!active) return
        setRate(exchangeRate.rate)
        setRateStatus('ready')
        try { localStorage.setItem(RATE_KEY, JSON.stringify(exchangeRate)) }
        catch (error) { console.warn('El cambio se aplicó, pero no se pudo guardar.', error) }
      } catch (error) {
        if (active) {
          setRateStatus('error')
          console.warn('Conversión no disponible. El primer plan se muestra en USD.', error)
        }
      } finally {
        clearTimeout(rateTimeout)
      }
    }
    if (!initial.saved) void country()
    else clearTimeout(countryTimeout)
    void exchange()
    return () => {
      active = false
      clearTimeout(countryTimeout)
      clearTimeout(rateTimeout)
      countryController.abort()
      rateController.abort()
    }
  }, [initial.saved])

  function chooseCurrency(value: Currency) {
    manual.current = true
    setCurrency(value)
    try { localStorage.setItem(CURRENCY_KEY, value) }
    catch (error) { console.warn('La moneda se aplicó para esta visita, pero no se pudo guardar.', error) }
  }
  return { currency, chooseCurrency, rate, rateStatus }
}
