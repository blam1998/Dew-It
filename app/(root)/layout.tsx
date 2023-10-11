import '../globals.css'
import '../animation.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ReactGA from 'react-ga4'

ReactGA.initialize("G-Q52BV44ZNC");
ReactGA.send({hitType: "pageview", page: "/", title: "Home Page"})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dew it',
  description: 'A todo application.',
}





export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
