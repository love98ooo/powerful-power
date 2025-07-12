import './globals.css'
import type { Metadata } from 'next'
import { I18nProvider } from './i18n/i18n-context'
import { ThemeProvider } from '@/components/theme/theme-provider'

export const metadata: Metadata = {
  title: 'Powerful Power - PC电源信息汇总',
  description: 'PC电源信息汇总网站，收集和整理PC电源的信息',
  icons: {
    icon: '/favicon-light.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <I18nProvider>
              {children}
            </I18nProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
