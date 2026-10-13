import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from '@/i18n/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MenuIcon } from './icons'

const PRIMARY = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/ask', key: 'nav.ask' },
  { to: '/report', key: 'nav.report' },
  { to: '/complaints', key: 'nav.complaints' },
] as const

export function AppHeader() {
  const { t } = useTranslation()
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-shell items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-primary-800">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-lg bg-primary-600 font-semibold text-white">M</span>
          <span className="text-base font-semibold leading-tight">{t('app.name')}</span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:flex md:items-center md:gap-1">
          {PRIMARY.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : undefined}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary-50 text-primary-800' : 'text-slate-700 hover:bg-slate-100',
                ].join(' ')
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <LanguageSwitcher />
          <details className="relative">
            <summary
              className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
              aria-label={t('nav.menu')}
            >
              <MenuIcon className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              <Link to="/about" className="block rounded-lg px-3 py-3 text-sm text-slate-800 hover:bg-slate-100">
                {t('nav.about')}
              </Link>
              <Link to="/feedback" className="block rounded-lg px-3 py-3 text-sm text-slate-800 hover:bg-slate-100">
                {t('nav.feedback')}
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
