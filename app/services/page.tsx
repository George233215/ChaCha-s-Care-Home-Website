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
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5 border-b border-border relative overflow-hidden">
        <div className="absolute top-8 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm font-semibold text-primary">Personalized Assisted Living</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance animate-fade-in-up">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-slide-in-left">
            At Cha Cha's Care Home, we provide comprehensive, personalized assisted living services designed to support your loved ones with dignity and compassion.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {services && services.length > 0 ? (
            <ServicesGrid services={services} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No services available yet.</p>
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">Contact Cha Cha's Care Home today to learn more about how we can support your loved one. Call (804) 252-0967 or schedule a visit.</p>
          <Button asChild size="lg" variant="secondary" className="transition-smooth">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
