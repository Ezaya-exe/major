import { Button } from '@/components/ui/Button'
import { AlertIcon } from '@/components/icons'
import { useTranslation } from '@/i18n/useTranslation'

interface Props {
  title?: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
}

export function ErrorState({ title, description, onRetry, retryLabel }: Props) {
  const { t } = useTranslation()
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="text-red-700" aria-hidden="true"><AlertIcon className="h-8 w-8" /></div>
      <h2 className="text-lg font-semibold text-slate-900">{title ?? t('state.error.title')}</h2>
      <p className="max-w-reading text-base text-slate-600">{description ?? t('state.error.body')}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry} className="mt-2">
          {retryLabel ?? t('state.error.retry')}
        </Button>
      ) : null}
    </div>
  )
}
