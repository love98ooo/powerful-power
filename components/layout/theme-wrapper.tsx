'use client'

import { useTheme } from '@/components/theme/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar currentTheme={theme} />
      {children}
      <Sidebar onThemeChange={setTheme} currentTheme={theme} />
    </div>
  )
} 