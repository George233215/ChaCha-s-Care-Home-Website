'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity'

interface SanityImage {
  asset?: {
    _id?: string
    url?: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    left: number
    top: number
    right: number
    bottom: number
  }
}

interface CarouselImage {
  image?: SanityImage
  caption?: string
  _key?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  autoSlide?: boolean
  slideInterval?: number
  title?: string
}

export default function ImageCarousel({
  images,
  autoSlide = true,
  slideInterval = 4000,
  title,
}: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoSliding, setIsAutoSliding] = useState(autoSlide)

  // Filter out undefined images
  const validImages = images.filter((img) => img !== undefined)

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoSliding) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validImages.length)
    }, slideInterval)

    return () => clearInterval(timer)
  }, [isAutoSliding, slideInterval, validImages.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index % validImages.length)
    setIsAutoSliding(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % validImages.length)
    setIsAutoSliding(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + validImages.length) % validImages.length)
    setIsAutoSliding(false)
  }

  const handleMouseEnter = () => {
    setIsAutoSliding(false)
  }

  const handleMouseLeave = () => {
    if (autoSlide) {
      setIsAutoSliding(true)
    }
  }

  if (!validImages || validImages.length === 0) {
    return (
      <div className="w-full h-80 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground">
        No images available
      </div>
    )
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>}

      <div
        className="relative w-full overflow-hidden rounded-lg bg-secondary"
        style={{ aspectRatio: '16 / 9' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {validImages.map((imageItem, index) => {
            const imageUrl = imageItem.image ? urlFor(imageItem.image).url() : null
            return (
              <div
                key={imageItem._key || index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageItem.caption || `Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === currentSlide}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex flex-col items-center justify-center text-muted-foreground p-4">
                    <p className="text-lg text-center">{imageItem.caption || `Slide ${index + 1}`}</p>
                  </div>
                )}
                {imageItem.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-lg">{imageItem.caption}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-smooth"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background text-foreground p-2 rounded-full transition-smooth"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-smooth ${
                  index === currentSlide
                    ? 'bg-foreground w-8'
                    : 'bg-foreground/40 w-2 hover:bg-foreground/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 z-20 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm font-medium">
          {currentSlide + 1} / {validImages.length}
        </div>
      </div>
    </div>
  )
}
