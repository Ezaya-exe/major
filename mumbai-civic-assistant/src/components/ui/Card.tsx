import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  children: ReactNode
}

export function Card({ interactive = false, className = '', children, ...rest }: CardProps) {
  const base = 'bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-5'
  const interactiveCls = interactive
    ? 'text-left w-full transition-colors hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
    : ''
  return (
    <div className={[base, interactiveCls, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
