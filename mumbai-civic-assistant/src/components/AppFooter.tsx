import { Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/useTranslation'

export function AppFooter() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-shell px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-600">{t('disclaimer.short')}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li><Link to="/about" className="text-primary-700 hover:underline">{t('footer.about')}</Link></li>
          <li><Link to="/feedback" className="text-primary-700 hover:underline">{t('footer.feedback')}</Link></li>
        </ul>
      </div>
    </footer>
  )
}
