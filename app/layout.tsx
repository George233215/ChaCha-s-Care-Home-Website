import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ChatWidget from '@/components/ChatWidget'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://chachacarehome.com'),
  title: {
    default: "Cha Cha's Care Home | Assisted Living in Mechanicsville, VA",
    template: "%s | Cha Cha's Care Home",
  },
  description:
    'Cha Cha\'s Care Home provides compassionate assisted living and residential care services in Mechanicsville, Virginia. We offer personalized elderly care in a warm, home-like environment.',
  keywords: [
    'assisted living Mechanicsville VA',
    'residential care home Virginia',
    'elderly care home',
    'senior living Mechanicsville',
  ],
  authors: [{ name: "Cha Cha's Care Home" }],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chachacarehome.com',
    siteName: "Cha Cha's Care Home",
    title: "Cha Cha's Care Home | Assisted Living in Mechanicsville, VA",
    description:
      'Compassionate assisted living and residential elderly care in Mechanicsville, Virginia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cha Cha's Care Home | Assisted Living in Mechanicsville, VA",
    description:
      'Compassionate assisted living and residential elderly care in Mechanicsville, Virginia.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
