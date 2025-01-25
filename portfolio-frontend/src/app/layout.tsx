// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/app/provider'
// import { ploneClient } from '@/lib/plone'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HiPHEN',
  description: 'Full-stack developer portfolio',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch data server-side
  // const client = ploneClient()
  const [projectsResponse, skillsResponse] = [{ items: [] }, { items: [] }];

  // Create initial store state
  const preloadedState = {
    content: {
      data: {
        projects: projectsResponse.items,
        skills: skillsResponse.items,
        siteSettings: {
          title: "HiPHEN's Portfolio",
          description: "Full-stack developer portfolio",
        },
      },
      loading: false,
      error: null,
    },
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider preloadedState={preloadedState}>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}