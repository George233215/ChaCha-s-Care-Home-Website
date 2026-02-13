import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import ChatWidget from '@/components/ChatWidget'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Premium Care Home | Compassionate Senior Living',
  description:
    'Discover our comprehensive care services offering safe, comfortable living for seniors with professional healthcare and community support.',
  keywords: [
    'care home',
    'senior living',
    'assisted living',
    'healthcare services',
    'elderly care',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Premium Care Home | Compassionate Senior Living',
    description: 'Safe, comfortable living for seniors with professional healthcare support.',
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
