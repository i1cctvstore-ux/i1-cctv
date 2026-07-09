'use client'

import { useState } from 'react'
import { LoginScreen } from '@/components/login-screen'
import { AppShell } from '@/components/app-shell'
import { DashboardPage } from '@/components/dashboard/dashboard-page'
import { EmployeeManagement } from '@/components/employees/employee-management'
import { ModulePlaceholder } from '@/components/module-placeholder'
import { NAV_ITEMS, type PageKey } from '@/lib/nav-config'

export default function Page() {
  // Mock auth state — cukup useState untuk keperluan preview/navigasi
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState<PageKey>('dashboard')
  const [userEmail, setUserEmail] = useState('admin@i1cctv.id')

  function handleLogin(email: string) {
    setUserEmail(email)
    setActivePage('dashboard')
    setIsAuthenticated(true)
  }

  function handleLogout() {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const userName = 'Budi Santoso'
  const activeItem = NAV_ITEMS.find((i) => i.key === activePage)

  function renderPage() {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage userName={userName} />
      case 'user-role':
        return <EmployeeManagement />
      default:
        return (
          activeItem && (
            <ModulePlaceholder
              title={activeItem.label}
              description={activeItem.description}
              icon={activeItem.icon}
            />
          )
        )
    }
  }

  return (
    <AppShell
      activePage={activePage}
      onNavigate={setActivePage}
      onLogout={handleLogout}
      userName={userName}
      userEmail={userEmail}
    >
      {renderPage()}
    </AppShell>
  )
}
