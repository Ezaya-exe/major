import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface BaseProps {
  id: string
  label: string
  hint?: string
  error?: string
}

const wrapperCls = 'flex flex-col gap-1.5'

const fieldCls = (invalid: boolean) =>
  [
    'w-full rounded-lg border bg-white px-3 text-base text-slate-900 placeholder:text-slate-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    invalid ? 'border-red-700 focus-visible:ring-red-700' : 'border-slate-300',
  ].join(' ')

export const TextField = forwardRef<HTMLInputElement, BaseProps & InputHTMLAttributes<HTMLInputElement>>(
  function TextField({ id, label, hint, error, className = '', ...rest }, ref) {
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    return (
      <div className={wrapperCls}>
        <label htmlFor={id} className="text-sm font-medium text-slate-800">{label}</label>
        <input
          ref={ref}
          id={id}
          className={[fieldCls(!!error), 'h-12', className].filter(Boolean).join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {hint && !error ? <p id={hintId} className="text-sm text-slate-600">{hint}</p> : null}
        {error ? (
          <p id={errorId} role="alert" className="text-sm font-medium text-red-700">{error}</p>
        ) : null}
      </div>
    )
  },
)

export const TextAreaField = forwardRef<HTMLTextAreaElement, BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextAreaField({ id, label, hint, error, className = '', ...rest }, ref) {
    const hintId = hint ? `${id}-hint` : undefined
    const errorId = error ? `${id}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    return (
      <div className={wrapperCls}>
        <label htmlFor={id} className="text-sm font-medium text-slate-800">{label}</label>
        <textarea
          ref={ref}
          id={id}
          className={[fieldCls(!!error), 'py-3 min-h-[120px]', className].filter(Boolean).join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {hint && !error ? <p id={hintId} className="text-sm text-slate-600">{hint}</p> : null}
        {error ? (
          <p id={errorId} role="alert" className="text-sm font-medium text-red-700">{error}</p>
        ) : null}
      </div>
    )
  },
)
