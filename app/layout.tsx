import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IslaMind — A quiet space for your mind',
  description:
    'Track your mood, write freely, and explore gentle self-reflection. IslaMind is a mobile-first AI-assisted mental wellness companion for you. Not therapy — thoughtful.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#2F7D72',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && process.env.VERCEL === '1' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}
