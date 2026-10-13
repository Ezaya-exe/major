import { Card } from '@/components/ui/Card'
import { useTranslation } from '@/i18n/useTranslation'

export function PlaceholderPage({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation()
  return (
    <section className="py-6">
      <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{t(titleKey)}</h1>
      <Card className="mt-4">
        <p className="text-base text-slate-700">{t('placeholder.body')}</p>
      </Card>
    </section>
  )
}
