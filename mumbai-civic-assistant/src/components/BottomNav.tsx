import { NavLink } from 'react-router-dom'
import type { ComponentType, SVGProps } from 'react'
import { useTranslation } from '@/i18n/useTranslation'
import { ChatIcon, ClipboardIcon, HomeIcon, ListIcon } from './icons'

type Item = {
  to: string
  key: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  end?: boolean
}

const ITEMS: Item[] = [
  { to: '/', key: 'nav.home', Icon: HomeIcon, end: true },
  { to: '/ask', key: 'nav.ask', Icon: ChatIcon },
  { to: '/report', key: 'nav.report', Icon: ClipboardIcon },
  { to: '/complaints', key: 'nav.complaints', Icon: ListIcon },
]

export function BottomNav() {
  const { t } = useTranslation()
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {ITEMS.map(({ to, key, Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-xs font-medium',
                  isActive ? 'text-primary-800' : 'text-slate-600',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      'grid h-8 w-12 place-items-center rounded-full transition-colors',
                      isActive ? 'bg-primary-100' : '',
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>{t(key)}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
