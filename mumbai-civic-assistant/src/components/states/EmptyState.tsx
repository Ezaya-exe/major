import type { ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title, description, icon, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      {icon ? <div className="text-slate-400" aria-hidden="true">{icon}</div> : null}
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {description ? <p className="max-w-reading text-base text-slate-600">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
