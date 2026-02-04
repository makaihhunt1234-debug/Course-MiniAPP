import { getLocale } from './locale.js'

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat(getLocale(), {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(date))
}

export function formatRelativeDate(date: Date): string {
    const now = new Date()
    const diffMs = new Date(date).getTime() - now.getTime()
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
    const rtf = new Intl.RelativeTimeFormat(getLocale(), { numeric: 'auto' })

    if (Math.abs(diffDays) < 7) {
        return rtf.format(diffDays, 'day')
    }

    if (Math.abs(diffDays) < 30) {
        return rtf.format(Math.round(diffDays / 7), 'week')
    }

    return formatDate(date)
}
