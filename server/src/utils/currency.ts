import { getLocale } from './locale.js'

export function normalizeCurrency(value: string | null | undefined, fallback: string): string {
    const trimmed = typeof value === 'string' ? value.trim() : ''
    return (trimmed || fallback).toUpperCase()
}

export function formatCurrency(amount: number, currency: string, locale = getLocale()): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

export function formatSignedCurrency(
    amount: number,
    currency: string,
    isNegative = true,
    locale = getLocale()
): string {
    const formatted = formatCurrency(Math.abs(amount), currency, locale)
    return isNegative ? `-${formatted}` : formatted
}
