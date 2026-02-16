import { getAllTestimonials } from '@/lib/sanity'
import { Navigation } from '@/components/Navigation'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Testimonials | Cha Cha\'s Care Home',
  description: 'Read heartfelt testimonials from families and residents who have experienced compassionate care at Cha Cha\'s Care Home in Mechanicsville, VA.',
}

export const revalidate = 3600

export default async function TestimonialsPage() {
  const testimonials = (await getAllTestimonials()) as any[]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">Testimonials</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl animate-slide-in-left">
            Hear directly from our residents and their families about their experience with Cha Cha's Care Home and the compassionate support they've received.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {testimonials && testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger">
              {testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="p-6 md:p-8 hover:shadow-lg transition-smooth-slow hover:scale-105 animate-scale-in">
                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? 'fill-accent text-accent' : 'text-border'}
                        />
                      ))}
                    </div>
                  )}

                  {/* Testimonial Text */}
                  <p className="text-foreground text-base md:text-lg mb-6 italic leading-relaxed">
                    {`"${testimonial.testimonial}"`}
                  </p>

                  {/* Author with Image */}
                  <div className="border-t border-border pt-4 flex gap-4 items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                      {testimonial.image ? (
                        <Image
                          src={urlFor(testimonial.image).url()}
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Photo
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{testimonial.clientName}</p>
                      {testimonial.clientRole && (
                        <p className="text-sm text-muted-foreground">{testimonial.clientRole}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Testimonials coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
