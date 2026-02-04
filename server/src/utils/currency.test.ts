import { describe, it, expect } from 'vitest'
import { normalizeCurrency } from './currency.js'

describe('normalizeCurrency', () => {
    it('normalizes provided currency values', () => {
        expect(normalizeCurrency('usd', 'EUR')).toBe('USD')
        expect(normalizeCurrency('  gbp  ', 'EUR')).toBe('GBP')
    })

    it('falls back when value is missing', () => {
        expect(normalizeCurrency('', 'EUR')).toBe('EUR')
        expect(normalizeCurrency(undefined, 'EUR')).toBe('EUR')
    })
})
