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
      <section className="py-16 md:py-20 bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance animate-fade-in-up">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl animate-slide-in-left">
            At Cha Cha's Care Home, we provide comprehensive, personalized assisted living services designed to support your loved ones with dignity and compassion.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8">Contact Cha Cha's Care Home today to learn more about how we can support your loved one. Call (804) 252-0967 or schedule a visit.</p>
          <Button asChild size="lg" variant="secondary" className="transition-smooth hover:scale-105">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
