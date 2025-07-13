import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeWrapper } from '@/components/layout/theme-wrapper'


export const metadata: Metadata = {
  title: 'Powerful Power',
  description: 'PC电源信息的综合数据库',
  icons: {
    icon: '/favicon.svg',
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
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
