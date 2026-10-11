import { chromium } from 'file:///C:/Users/Joshua/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs'
import assert from 'node:assert/strict'

const base = process.env.PRICING_TEST_URL || 'http://127.0.0.1:5176'
const browser = await chromium.launch({ headless: true })
const errors = []
const rateResponse = { result: 'success', base_code: 'USD', rates: { CRC: 500 }, time_last_update_unix: Math.floor(Date.now() / 1000) - 3600, time_next_update_unix: Math.floor(Date.now() / 1000) + 3600 }
async function newPage(options = {}, failRate = false, delayedCountry = false) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, timezoneId: 'America/Costa_Rica', ...options })
  page.on('pageerror', e => errors.push(e.message))
  await page.route('https://api.country.is/', async r => {
    if (delayedCountry) await new Promise(resolve => setTimeout(resolve, 1200))
    await r.fulfill({ json: { country: 'CR' } })
  })
  await page.route('https://open.er-api.com/**', r => failRate ? r.abort() : r.fulfill({ json: rateResponse }))
  return page
}
try {
  const page = await newPage()
  await page.goto(`${base}/precios`)
  await page.waitForFunction(() => document.querySelector('.plan-1 .price')?.textContent.includes('39.000'))
  await page.waitForTimeout(500)
  assert.deepEqual(await page.locator('.service-stack').evaluateAll(es => es.map(e => e.children.length)), [1, 2, 3])
  assert.equal(await page.locator('.catalog-card').count(), 4)
  assert.equal(await page.locator('h1').count(), 1)
  assert.equal(await page.locator('.pricing-page').getByText('Precios ilustrativos').count(), 0)
  await page.getByRole('button', { name: /Anual/ }).click()
  assert.match(await page.locator('.plan-1 .price').innerText(), /32.500/)
  assert.match(await page.locator('.plan-1 .bill-note').innerText(), /390.000 facturados al año/)
  await page.getByRole('button', { name: 'USD $', exact: true }).click()
  assert.match(await page.locator('.plan-1 .price').innerText(), /US\$65/)
  await page.getByRole('button', { name: 'Mensual', exact: true }).click()
  assert.match(await page.locator('.plan-1 .price').innerText(), /US\$78/)
  await page.getByRole('button', { name: 'CRC ₡', exact: true }).click()
  await page.locator('.catalog-link').first().click()
  await page.waitForURL(/#servicios$/)
  await page.waitForTimeout(500)
  assert.ok(await page.locator('#servicios').evaluate(e => e.getBoundingClientRect().top >= 65))
  const visual = page.locator('.catalog-visual').first()
  await visual.hover({ position: { x: 30, y: 30 } })
  await page.waitForTimeout(50)
  assert.ok(await visual.locator('.graphite-face').evaluate(e => e.style.getPropertyValue('--ry')))
  await page.mouse.move(0, 0)
  await page.locator('#servicios').screenshot({ path: '.impeccable/review/app-services-final.png' })
  for (const width of [1440, 1100, 900, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 950 })
    const checks = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.catalog-card')]
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        faces: cards.map(e => {
          const title = e.querySelector('.graphite-title').getBoundingClientRect()
          const foot = e.querySelector('.graphite-foot').getBoundingClientRect()
          const face = e.querySelector('.graphite-face').getBoundingClientRect()
          return { overlap: title.bottom > foot.top, clipped: title.right > face.right, width: face.width }
        }),
        separators: cards.slice(1).map((e, i) => innerWidth <= 480 || (innerWidth <= 1050 && i >= 1)
          ? getComputedStyle(e).borderTopWidth !== '0px'
          : getComputedStyle(e, '::after').width === '1px'),
      }
    })
    assert.equal(checks.overflow, false, `overflow at ${width}`)
    assert.equal(checks.faces.some(c => c.overlap || c.clipped), false, `card text at ${width}: ${JSON.stringify(checks.faces)}`)
    assert.ok(checks.separators.every(Boolean), `dividers at ${width}`)
    assert.ok(Math.max(...checks.faces.map(c => c.width)) - Math.min(...checks.faces.map(c => c.width)) < 1, `unequal cards at ${width}`)
    if (width === 390) {
      await page.locator('#servicios').scrollIntoViewIfNeeded()
      await page.screenshot({ path: '.impeccable/review/app-services-mobile.png' })
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  for (const [count, id] of [[1, 'arranque'], [2, 'crecimiento'], [3, 'pro']]) {
    await page.goto(`${base}/precios`)
    await page.locator(`.plan-${count} .button`).click()
    await page.waitForURL(new RegExp(`/comenzar\\?plan=${id}$`))
    await page.locator('.pricing-page').waitFor({ state: 'detached' })
    assert.equal(await page.locator('.pricing-page').count(), 0)
    assert.ok((await page.locator('body').innerText()).includes(`${count} servicio`), `onboarding recognizes ${id}`)
  }
  await page.goto(`${base}/precios`)
  await page.locator('.proposal-button').click()
  await page.waitForURL(/\/comenzar\?plan=medida$/)
  await page.locator('.pricing-page').waitFor({ state: 'detached' })
  assert.ok((await page.locator('body').innerText()).includes('A la medida'))
  const failure = await newPage({}, true)
  await failure.goto(`${base}/precios`)
  await failure.getByText('Conversión no disponible; precio en USD.').waitFor()
  assert.match(await failure.locator('.plan-1 .price').innerText(), /US\$78/)
  assert.match(await failure.locator('.plan-2 .price').innerText(), /64.900/)
  const race = await newPage({}, false, true)
  await race.goto(`${base}/precios`)
  await race.getByRole('button', { name: 'USD $', exact: true }).click()
  await race.waitForTimeout(1500)
  assert.equal(await race.getByRole('button', { name: 'USD $', exact: true }).getAttribute('aria-pressed'), 'true')
  await race.reload()
  assert.equal(await race.getByRole('button', { name: 'USD $', exact: true }).getAttribute('aria-pressed'), 'true')
  await race.emulateMedia({ reducedMotion: 'reduce' })
  await race.locator('.catalog-visual').first().hover()
  assert.equal(await race.locator('.catalog-visual .graphite-face').first().evaluate(e => getComputedStyle(e).transform), 'none')
  assert.deepEqual(errors, [])
  console.log('PASS: six responsive widths, four metal tones/dividers, monthly/annual CRC/USD, four onboarding CTAs, exchange failure, saved/manual currency, reduced motion; no runtime errors.')
} finally {
  await browser.close()
}
