import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, HeartHandshake, Pill, Utensils, Car, Activity, HandHeart } from 'lucide-react'

interface Service {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  features?: Array<{
    name: string
    description: string
  }>
}

interface ServicesGridProps {
  services: Service[]
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  // Service icons mapping
  const serviceIcons = [HeartHandshake, Pill, Utensils, Car, Activity, HandHeart]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
      {services.map((service, index) => (
        <div
          key={service._id}
          className="group relative flex flex-col h-full animate-scale-in"
        >
          {/* Card with elevated shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/15 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10" />
          
          <Card
            className="relative p-6 md:p-7 flex flex-col h-full bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer border border-primary/15 overflow-hidden rounded-2xl"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
            
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon container - Enhanced */}
              <div className="mb-5 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-[1.02] transition-all duration-300 border-2 border-primary/30 group-hover:border-primary/60 group-hover:shadow-md group-hover:bg-primary/25">
                {(() => {
                  const Icon = serviceIcons[index % serviceIcons.length]
                  return <Icon className="h-9 w-9 text-primary" aria-hidden="true" />
                })()}
              </div>

              {/* Title with accent underline */}
              <div className="mb-4">
                <h3 className="text-xl font-bold leading-tight text-primary mb-2 group-hover:text-primary/90 transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
              </div>

              {/* Description */}
              <p className="text-foreground/70 mb-5 flex-grow leading-relaxed text-sm">
                {service.description}
              </p>

              {/* Features List - Modern design */}
              {service.features && service.features.length > 0 && (
                <div className="mb-5 space-y-2 bg-primary/5 rounded-xl p-4 border border-primary/10">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="text-sm text-foreground/80 flex gap-3 items-start animate-fade-in-up group/item"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0 group-hover/item:scale-110 transition-transform" />
                      <span className="group-hover/item:text-primary transition-colors font-medium">{feature.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Learn More Button - Modern style */}
              <Button
                asChild
                className="mt-auto rounded-lg font-semibold w-full bg-primary text-white transition-all duration-300"
              >
                <Link href={`/services/${service.slug.current}`} className="flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>
        </div>
      ))}
    </div>
  )
}
