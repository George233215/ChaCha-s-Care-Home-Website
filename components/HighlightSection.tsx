'use client'

import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { CheckCircle } from 'lucide-react'
import { urlFor } from '@/lib/sanity'

interface HighlightItem {
  title: string
  description: string
}

interface HighlightSectionProps {
  title: string
  subtitle: string
  highlights: HighlightItem[]
  imagePosition?: 'left' | 'right'
  image?: any
  imageOrientation?: 'portrait' | 'landscape' | 'square'
}

export default function HighlightSection({
  title,
  subtitle,
  highlights,
  imagePosition = 'right',
  image,
  imageOrientation = 'portrait',
}: HighlightSectionProps) {
  const textRef = useScrollReveal({ threshold: 0.2, margin: '0px 0px -100px 0px' })
  const imageRef = useScrollReveal({ threshold: 0.2, margin: '0px 0px -100px 0px' })

  // Determine image container height based on orientation
  const getImageHeight = () => {
    switch (imageOrientation) {
      case 'landscape':
        return 'h-[350px]'
      case 'square':
        return 'h-[450px]'
      case 'portrait':
      default:
        return 'h-[320px] sm:h-[420px] md:h-[550px]'
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
        >
          {/* Image Section */}
          <div
            ref={imageRef}
            className={`scroll-reveal-scale relative ${getImageHeight()} rounded-2xl overflow-hidden shadow-2xl group ${imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}`}
          >
            {image ? (
              <Image
                src={urlFor(image).url()}
                alt={title || 'Highlight section image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-primary/30" />
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/15 to-primary/25 flex items-center justify-center text-center p-6 border border-primary/30">
                  <div>
                    <div className="text-7xl mb-4">🏡</div>
                    <p className="text-white text-lg font-semibold drop-shadow-lg">Comfortable Home-Style Living</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Content Section */}
          <div
            ref={textRef}
            className={`scroll-reveal-left space-y-6 ${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}
          >
            <div>
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full" />
                Why Families Choose Cha Cha's Care Home
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-5 text-balance leading-tight">{title}</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">{subtitle}</p>
            </div>

            {/* Highlights List */}
            <div className="space-y-5 scroll-reveal-stagger">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start scroll-reveal-up group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-accent to-primary/80 text-white group-hover:shadow-lg group-hover:scale-110 transition-smooth">
                      <CheckCircle size={20} />
                    </div>
                  </div>
                  <div className="group-hover:translate-x-1 transition-smooth">
                    <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-foreground/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
