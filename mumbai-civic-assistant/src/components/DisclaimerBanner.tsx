import { InfoIcon } from './icons'
import { useTranslation } from '@/i18n/useTranslation'

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()
  return (
    <div role="note" className="flex items-start gap-3 rounded-xl border border-primary-200 bg-primary-50 p-3 text-primary-900">
      <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className={compact ? 'text-sm' : 'text-base'}>{t('disclaimer.short')}</p>
    </div>
  )
}
