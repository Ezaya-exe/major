import { useTranslation } from '@/i18n/useTranslation'

export function LoadingState({ label }: { label?: string }) {
  const { t } = useTranslation()
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 py-10 text-slate-600">
      <svg className="h-7 w-7 animate-spin text-primary-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="text-base">{label ?? t('state.loading')}</p>
    </div>
  )
}
