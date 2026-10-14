import {
  createContext, useCallback, useEffect, useMemo, useState, type ReactNode,
} from 'react'
import type { Dictionary, Language } from './types'
import en from './dictionaries/en.json'
import hi from './dictionaries/hi.json'
import mr from './dictionaries/mr.json'

const DICTIONARIES: Record<Language, Dictionary> = { en, hi, mr }
const FALLBACK: Dictionary = en
const STORAGE_KEY = 'mca.language'
const DEFAULT_LANG: Language = 'en'

type I18nContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLanguage(): Language | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'en' || raw === 'hi' || raw === 'mr') return raw
  } catch { /* storage blocked */ }
  return null
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(
    () => readStoredLanguage() ?? DEFAULT_LANG,
  )

  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem(STORAGE_KEY, language) } catch { /* noop */ }
  }, [language])

  const setLanguage = useCallback((l: Language) => setLanguageState(l), [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = DICTIONARIES[language] ?? FALLBACK
      let value = dict[key] ?? FALLBACK[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.split(`{${k}}`).join(String(v))
        }
      }
      return value
    },
    [language],
  )

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
