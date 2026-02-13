import Link from 'next/link'
import Image from 'next/image'
import { getHomeData, getAllFeatures, getAllServices, urlFor } from '@/lib/sanity'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Home as HomeIcon } from 'lucide-react'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import ServicesGrid from '@/components/ServicesGrid'
import HighlightSection from '@/components/HighlightSection'
import CommitmentSection from '@/components/CommitmentSection'
import StatsSection from '@/components/StatsSection'

export const revalidate = 3600 // ISR - revalidate every hour

export default async function Home() {
  const homeData = await getHomeData()
  const features = await getAllFeatures()
  const services = await getAllServices()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <HeroSection data={homeData} />

      {/* Introduction Section */}
      {homeData?.introduction && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-secondary/30 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-10 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-semibold text-primary">About Our Care</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance leading-tight">
                  {homeData.introduction.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {homeData.introduction.description}
                </p>
                <Button asChild size="lg" className="transition-all">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
              </div>
              <div className="relative w-full aspect-[4/3] max-h-[460px] bg-gradient-to-br from-secondary to-primary/10 rounded-2xl overflow-hidden animate-slide-in-right group hover:shadow-xl transition-all duration-500">
                {homeData.introduction?.image ? (
                  <Image
                    src={urlFor(homeData.introduction.image).url()}
                    alt={homeData.introduction.title || 'Care Home Introduction'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                    <div className="text-center">
                      <HomeIcon className="mx-auto h-14 w-14 mb-2" />
                      <p className="text-lg">Care Home Image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Highlight Section with Image */}
      {homeData?.highlight && (
        <HighlightSection
          title={homeData.highlight.title}
          subtitle={homeData.highlight.subtitle}
          highlights={homeData.highlight.highlights || []}
          imagePosition={homeData.highlight.imagePosition || 'right'}
          image={homeData.highlight.image}
          imageOrientation={homeData.highlight.imageOrientation || 'portrait'}
        />
      )}

      {/* Fallback if no highlight data */}
      {!homeData?.highlight && (
        <HighlightSection
          title="Personalized Care in a Home-Like Environment"
          subtitle="At Cha Cha's Care Home, we believe in treating every resident like family. Our small, intimate community provides the perfect balance of professional care and warm, home-style living."
          highlights={[
            {
              title: 'Home-Style Atmosphere',
              description: 'A warm, comfortable living environment that feels like home, not an institution.',
            },
            {
              title: '24/7 Professional Care',
              description: 'Trained staff available around the clock to provide supervision and assistance.',
            },
            {
              title: 'Personalized Attention',
              description: 'Small-community setting ensures each resident receives individualized care and engagement.',
            },
            {
              title: 'Activities & Community',
              description: 'Regular activities, outings, and social engagement to maintain quality of life.',
            },
          ]}
          imagePosition="right"
        />
      )}

      {/* Commitment Section */}
      <CommitmentSection />

      {/* Features Section */}
      {features && features.length > 0 && <FeaturesSection features={features} />}

      {/* Divider */}
      <div className="py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Preview */}
      {services && services.length > 0 && (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">Featured Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 text-balance leading-tight">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Comprehensive care services tailored to meet your needs
              </p>
            </div>
            <ServicesGrid services={services.slice(0, 3)} />
            <div className="text-center mt-10 animate-fade-in-up">
              <Button asChild size="lg" className="transition-all bg-primary text-white">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="py-2 md:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary via-primary/85 to-primary/90 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-lg text-balance leading-tight">Schedule Your Visit Today</h2>
          <p className="text-lg text-white/95 mb-10 max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            Experience Cha Cha's Care Home firsthand. Our compassionate team is ready to welcome you and your loved ones. Call us at (804) 252-0967 or fill out our contact form.
          </p>
          <Button asChild size="lg" className="transition-all bg-white text-primary font-semibold px-8 py-3">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
