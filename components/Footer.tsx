import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
      
      {/* Top Decorative Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg className="w-full h-12 fill-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section - Enhanced */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <Image src="/chachas logo.png" alt="Cha Cha's Care Home" width={180} height={70} className="h-16 w-auto" />
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Home-style assisted living in Mechanicsville, VA, providing personalized care and compassionate support for seniors. Your family is our family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Services', href: '/services' },
                { label: 'About Us', href: '/about' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                '24/7 Supervision',
                'Assisted Living',
                'Medication Management',
                'Transportation Support',
                'Recreational Activities',
              ].map((service) => (
                <li key={service} className="text-gray-300 text-sm flex items-start gap-2">
                  <Heart className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Location Only */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              Location
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3 items-start text-gray-300">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Mechanicsville, VA 23111</p>
                  <p className="text-xs text-gray-400 mt-1">Excellence in senior care since day one</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Cha Cha's Care Home. All rights reserved.
            </p>
          </div>
        </div>

        {/* Optional: Trust Badge */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            Made with love in Mechanicsville, Virginia
          </p>
        </div>
      </div>
    </footer>
  )
}
