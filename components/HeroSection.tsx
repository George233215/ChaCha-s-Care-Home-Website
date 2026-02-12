'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TypeWriter } from '@/components/TypeWriter'

interface HeroSectionProps {
  data?: {
    hero?: {
      title?: string
      subtitle?: string
      ctaText?: string
      ctaLink?: string
    }
  }
}

export default function HeroSection({ data }: HeroSectionProps) {
  // Default values
  const defaultHero = {
    title: 'Home-Style Care You Can Trust',
    subtitle:
      'Experience premium senior living with 24/7 healthcare support, professional staff, and a welcoming community.',
    ctaText: 'Schedule a Visit',
    ctaLink: '/contact',
  }

  // Merge data with defaults, ensuring all values are defined
  const heroData = {
    title: data?.hero?.title || defaultHero.title,
    subtitle: data?.hero?.subtitle || defaultHero.subtitle,
    ctaText: data?.hero?.ctaText || defaultHero.ctaText,
    ctaLink: data?.hero?.ctaLink || defaultHero.ctaLink,
  }

  return (
    <section
      className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-care.jpg')" }}
    >
      {/* Dark overlay so text remains readable over the photo */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/6 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-96 h-96 bg-white/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="animate-fade-in-up">
            <TypeWriter
              texts={[
                heroData.title,
                'Professional 24/7 Care',
                'A Home Away From Home',
              ]}
              speed={50}
              delayBetween={2500}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance transition-smooth-slow drop-shadow-lg"
            />
            <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed text-balance animation-delay-100 drop-shadow">
              {heroData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animation-delay-200">
              <Button asChild size="lg" className="transition-smooth hover:scale-105 bg-white text-primary hover:bg-gray-50">
                <Link href={heroData.ctaLink}>{heroData.ctaText}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="transition-smooth hover:scale-105 bg-white/20 text-white border-white/50 hover:bg-white/30">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6 stagger">
              <div className="animate-fade-in-up bg-white/6 backdrop-blur p-4 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">25+</p>
                <p className="text-sm text-white/90">Years Experience</p>
              </div>
              <div className="animate-fade-in-up bg-white/6 backdrop-blur p-4 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-white/90">Happy Residents</p>
              </div>
              <div className="animate-fade-in-up bg-white/6 backdrop-blur p-4 rounded-lg border border-white/10">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-white/90">Healthcare Support</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl animate-slide-in-right">
            <div className="w-full h-full bg-gradient-to-br from-white/20 via-primary/20 to-primary/30 backdrop-blur flex items-center justify-center text-primary-foreground hover:scale-105 transition-smooth-slow border border-primary/30">
              <div className="text-center">
                <p className="text-xl drop-shadow-lg">Professional Care Home Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}