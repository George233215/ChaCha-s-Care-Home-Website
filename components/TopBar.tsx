import { Mail, Phone, MapPin } from 'lucide-react'

export function TopBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Phone and Email */}
        <div className="flex items-center gap-6">
          <a
            href="tel:(804)252-0967"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            aria-label="Call us"
          >
            <Phone size={16} className="text-primary" />
            <span>(804) 252-0967</span>
          </a>

          <a
            href="mailto:chachascarehome@gmail.com"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors hidden sm:flex"
            aria-label="Email us"
          >
            <Mail size={16} className="text-primary" />
            <span>chachascarehome@gmail.com</span>
          </a>
        </div>

        {/* Right: Location */}
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Mechanicsville, VA 23111</span>
        </div>
      </div>
    </div>
  )
}
