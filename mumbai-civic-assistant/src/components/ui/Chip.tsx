import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  icon?: ReactNode
}

export function Chip({
  selected = false,
  icon,
  className = '',
  children,
  type = 'button',
  ...rest
}: ChipProps) {
  const base =
    'inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
  const state = selected
    ? 'bg-primary-100 border-primary-500 text-primary-900'
    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={[base, state, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
    </button>
  )
}
