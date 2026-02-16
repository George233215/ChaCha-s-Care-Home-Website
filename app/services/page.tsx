import { getAllServices } from '@/lib/sanity'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import ServicesGrid from '@/components/ServicesGrid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Our Services | Cha Cha\'s Care Home',
  description: 'Comprehensive assisted living services including 24/7 supervision, medication management, and personalized daily care in Mechanicsville, VA.',
}

export const revalidate = 3600

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-14 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5 border-b border-border relative overflow-hidden">
        <div className="absolute top-8 right-0 w-56 h-56 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm font-semibold text-primary">Personalized Assisted Living</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance animate-fade-in-up">
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed animate-slide-in-left">
            At Cha Cha's Care Home, we provide comprehensive, personalized assisted living services designed to support your loved ones with dignity and compassion.
          </p>

          <div className="mt-8 max-w-3xl rounded-2xl border border-primary/20 bg-white/90 shadow-lg p-4 md:p-6 animate-fade-in-up">
            <p className="text-sm font-semibold text-primary mb-3">Monthly Room Pricing</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-primary/15 bg-secondary/20 p-4">
                <p className="text-sm text-muted-foreground">Shared Room</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">$5000<span className="text-sm font-medium text-muted-foreground">/month</span></p>
              </div>
              <div className="rounded-xl border border-primary/15 bg-secondary/20 p-4">
                <p className="text-sm text-muted-foreground">Private Room</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">$6000<span className="text-sm font-medium text-muted-foreground">/month</span></p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Residents can choose the room option that best fits their needs.</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services && services.length > 0 ? (
            <ServicesGrid services={services} />
          ) : (
            <div className="text-center py-10 md:py-12 border border-primary/10 bg-white rounded-2xl shadow-sm max-w-2xl mx-auto px-5 md:px-6">
              <p className="text-foreground font-semibold mb-2">Services are being updated.</p>
              <p className="text-muted-foreground mb-4">Please contact us for current availability and care options.</p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg opacity-90 mb-8 leading-relaxed">Contact Cha Cha's Care Home today to learn more about how we can support your loved one. Call (804) 252-0967 or schedule a visit.</p>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto transition-smooth">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
