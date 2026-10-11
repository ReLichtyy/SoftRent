import { test } from 'node:test'
import assert from 'node:assert/strict'
import { planes } from '../src/content/planes.ts'
import { planPrice, validExchange } from '../src/lib/pricing.ts'

test('first plan converts its USD base; other CRC prices remain fixed', () => {
  assert.deepEqual(planes.slice(0, 3).map(p => planPrice(p, 'CRC', false, 500)?.monthly), [39000, 64900, 129900])
})

test('annual pricing charges ten months and rounds only final amounts', () => {
  assert.deepEqual(planPrice(planes[0], 'CRC', true, 455.58), { currency: 'CRC', monthly: 29613, yearly: 355352 })
  assert.deepEqual(planPrice(planes[0], 'USD', true, null), { currency: 'USD', monthly: 65, yearly: 780 })
  assert.equal(planPrice(planes[1], 'CRC', true, 500)?.monthly, 54083)
})

test('missing or invalid conversion falls back to explicitly labeled USD', () => {
  for (const rate of [null, 0, -1, NaN, Infinity]) {
    assert.deepEqual(planPrice(planes[0], 'CRC', false, rate), { currency: 'USD', monthly: 78, yearly: 780 })
  }
})

test('cache rejects stale, future, malformed and unbounded rates', () => {
  const now = 1_800_000_000_000
  const valid = { rate: 500, updatedAt: now - 3600000, expiresAt: now + 3600000 }
  assert.equal(validExchange(valid, now), true)
  for (const value of [null, {}, { ...valid, rate: '500' }, { ...valid, rate: NaN }, { ...valid, updatedAt: now + 1 }, { ...valid, updatedAt: now - 172800000 }, { ...valid, expiresAt: now }, { ...valid, expiresAt: now + 86400001 }]) {
    assert.equal(validExchange(value, now), false)
  }
})

test('each displayed offer routes to its recognized onboarding plan', () => {
  assert.deepEqual(planes.slice(0, 3).map(p => p.servicios), [1, 2, 3])
  for (const plan of planes) assert.equal(new URL(plan.ctaRuta, 'https://example.test').searchParams.get('plan'), plan.id)
})
