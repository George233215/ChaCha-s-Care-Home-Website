'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    // { href: '/team', label: 'Team' }, // Disabled for future use
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90 shadow-lg border-0 backdrop-blur supports-[backdrop-filter]:bg-primary/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group" aria-label="Go to homepage">
            <Image src="/chachas logo.png" alt="Cha Cha's Care Home" width={160} height={65} className="h-16 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-smooth text-base font-medium relative group ${
                  pathname === link.href ? 'text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="px-8 py-2 text-base font-semibold rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-transform transform"
            >
              <Link href="/contact">
                <span className="relative z-10">Inquiry Now</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 text-white hover:text-white/80 transition-smooth"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-primary/50 backdrop-blur -mx-4 px-4 py-4 rounded-b-lg animate-fade-in">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md transition-smooth ${
                  pathname === link.href ? 'bg-white/20 text-white' : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-transform transform"
            >
              <Link href="/contact">
                <span className="relative z-10">Inquiry Now</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
