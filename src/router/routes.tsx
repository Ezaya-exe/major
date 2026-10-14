import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/AppShell'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { AskPage } from '@/pages/AskPage'
import { ComplaintPage } from '@/pages/ComplaintPage'

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <PlaceholderPage titleKey="app.name" />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <PlaceholderPage titleKey="nav.home" /> },
      { path: 'ask', element: <AskPage /> },
      { path: 'report', element: <PlaceholderPage titleKey="nav.report" /> },
      { path: 'complaints', element: <ComplaintPage /> },
      { path: 'complaints/:id', element: <PlaceholderPage titleKey="nav.complaints" /> },
      { path: 'about', element: <PlaceholderPage titleKey="nav.about" /> },
      { path: 'feedback', element: <PlaceholderPage titleKey="nav.feedback" /> },
      { path: '*', element: <PlaceholderPage titleKey="notFound.title" /> },
    ],
  },
])
