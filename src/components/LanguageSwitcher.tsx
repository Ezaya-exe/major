import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/i18n/types'

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation()
  return (
    <div>
      <label htmlFor="app-language" className="sr-only">{t('nav.language')}</label>
      <select
        id="app-language"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="h-11 rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-sm font-medium text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <option value="en">{t('language.english')}</option>
        <option value="hi">{t('language.hindi')}</option>
        <option value="mr">{t('language.marathi')}</option>
      </select>
    </div>
  )
}
