import { Outlet } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import { BottomNav } from './BottomNav'
import { SkipToContent } from './ui/SkipToContent'

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 pb-16 md:pb-0">
      <SkipToContent />
      <AppHeader />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-shell flex-1 px-4 py-6 sm:px-6 lg:px-8"
      >
        <Outlet />
      </main>
      <AppFooter />
      <BottomNav />
    </div>
  )
}
