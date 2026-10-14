import { useTranslation } from '@/i18n/useTranslation'

export function SkipToContent() {
  const { t } = useTranslation()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-3 focus:text-white focus:shadow-lg"
    >
      {t('skip.toContent')}
    </a>
  )
}
