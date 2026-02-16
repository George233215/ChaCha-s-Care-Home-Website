'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'

interface HeroSectionProps {
  data?: {
    hero?: {
      title?: string
      subtitle?: string
      ctaText?: string
      ctaLink?: string
      backgroundImage?: any
      images?: Array<{
        image: any
        displayPosition: 'background' | 'rightside'
        order: number
      }>
      animationDuration?: number
    }
  }
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Default values
  const defaultHero = {
    title: 'Home-Style Care You Can Trust',
    subtitle:
      'Experience premium senior living with 24/7 healthcare support, professional staff, and a welcoming community.',
    ctaText: 'Schedule a Visit',
    ctaLink: '/contact',
  }

  const images = data?.hero?.images || []
  const animationDuration = data?.hero?.animationDuration || 3

  // Get the background image (prioritize dedicated backgroundImage field)
  const backgroundImageUrl = data?.hero?.backgroundImage
    ? urlFor(data.hero.backgroundImage).url()
    : '/hero-care.jpg'

  // Separate images by position (for animated carousel)
  const rightSideImages = images
    .filter((img) => img.displayPosition === 'rightside')
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  // Get current carousel image
  const currentRightImage = rightSideImages[currentImageIndex % Math.max(rightSideImages.length, 1)]

  // Rotate carousel images
  useEffect(() => {
    if (rightSideImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rightSideImages.length)
    }, animationDuration * 1000)

    return () => clearInterval(interval)
  }, [rightSideImages.length, animationDuration])

  // Merge data with defaults
  const heroData = {
    title: data?.hero?.title || defaultHero.title,
    subtitle: data?.hero?.subtitle || defaultHero.subtitle,
    ctaText: data?.hero?.ctaText || defaultHero.ctaText,
    ctaLink: data?.hero?.ctaLink || defaultHero.ctaLink,
  }

  // Heading sequence (looping: show -> hold -> fade -> next)
  const headings = [heroData.title, 'Professional 24/7 Care', 'A Home Away From Home']
  const [headingIndex, setHeadingIndex] = useState(0)
  const [headingVisible, setHeadingVisible] = useState(true)

  useEffect(() => {
    let mounted = true
    const displayDuration = 2200 // ms each heading stays visible
    const fadeDuration = 600 // ms for fade-out animation

    const loop = async () => {
      while (mounted) {
        setHeadingVisible(true)
        await new Promise((r) => setTimeout(r, displayDuration))
        setHeadingVisible(false)
        await new Promise((r) => setTimeout(r, fadeDuration))
        setHeadingIndex((i) => (i + 1) % headings.length)
      }
    }

    loop()
    return () => {
      mounted = false
    }
  }, [headings.length])

  return (
    <section
      className="relative min-h-[75vh] md:min-h-[85vh] pt-10 md:pt-16 flex items-center overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Dark overlay so text remains readable over the photo */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/6 rounded-full blur-3xl animate-float-y" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-96 h-96 bg-white/8 rounded-full blur-3xl animate-float-y" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="animate-fade-in-up">
            <div className="space-y-2">
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-0 text-balance drop-shadow-lg ${
                  headingVisible ? 'animate-fade-in' : 'animate-fade-out'
                }`}
                aria-live="polite"
              >
                {headings[headingIndex]}
              </h1>
            </div>
            <p
              className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed text-balance drop-shadow"
              style={{ animationDelay: '100ms' }}
            >
              {heroData.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '200ms' }}>
              <Button asChild size="lg" className="transition-smooth bg-white text-primary">
                <Link href={heroData.ctaLink}>{heroData.ctaText}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="transition-smooth bg-white/20 text-white border-white/50"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
              <div className="animate-fade-in-up bg-white/8 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/12 transition-smooth">
                <p className="text-2xl font-bold text-white">Experienced</p>
                <p className="text-sm text-white/90">Professional Care Team</p>
              </div>
              <div className="animate-fade-in-up bg-white/8 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/12 transition-smooth">
                <p className="text-2xl font-bold text-white">Trusted</p>
                <p className="text-sm text-white/90">By Local Families</p>
              </div>
              <div className="animate-fade-in-up bg-white/8 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/12 transition-smooth">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-white/90">Healthcare Support</p>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Carousel Images */}
          <div className="relative w-full aspect-[4/5] max-h-[500px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl animate-slide-in-right">
            {currentRightImage?.image ? (
              <Image
                key={currentImageIndex}
                src={urlFor(currentRightImage.image).url()}
                alt="Professional Care Home"
                fill
                className="object-cover transition-opacity duration-1000 animate-fade-in"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/20 via-primary/20 to-primary/30 backdrop-blur flex items-center justify-center text-primary-foreground border border-primary/30">
                <div className="text-center">
                  <Home className="mx-auto mb-3 h-12 w-12" />
                  <p className="text-xl drop-shadow-lg">Professional Care Home Image</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

            {/* Image indicators */}
            {rightSideImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/25 backdrop-blur px-3 py-2 rounded-full border border-white/20">
                {rightSideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex % rightSideImages.length
                        ? 'bg-white w-6'
                        : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
