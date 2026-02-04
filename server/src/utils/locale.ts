import { config } from '../config/env.js'

const LOCALE_MAP = {
    en: 'en-US',
    ru: 'ru-RU',
    uk: 'uk-UA'
} as const

export function getLocale(language = config.defaultLanguage): string {
    return LOCALE_MAP[language] ?? LOCALE_MAP.en
}
