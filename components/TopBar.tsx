import { Mail, Phone, MapPin } from 'lucide-react'

export function TopBar() {
  return (
    <div className="w-full bg-gradient-to-r from-white to-secondary/30 border-b border-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Phone and Email */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:(804)252-0967"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            aria-label="Call us"
          >
            <Phone size={16} className="text-primary" />
            <span className="text-xs sm:text-sm">(804) 252-0967</span>
          </a>

          {/* Decorative Divider */}
          <div className="hidden sm:block h-6 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          <a
            href="mailto:chachascarehome@gmail.com"
            className="items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:flex"
            aria-label="Email us"
          >
            <Mail size={16} className="text-primary" />
            <span className="text-xs sm:text-sm">chachascarehome@gmail.com</span>
          </a>
        </div>

        {/* Right: Location */}
        <div className="hidden md:flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Mechanicsville, VA 23111</span>
        </div>
      </div>
    </div>
  )
}
