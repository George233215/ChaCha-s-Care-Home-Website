'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Card } from '@/components/ui/card'

interface Feature {
  _id: string
  title: string
  description: string
  order: number
  highlighted?: boolean
}

interface FeaturesSectionProps {
  features: Feature[]
}

function FeatureCard({ feature }: { feature: Feature }) {
  const ref = useScrollReveal({ threshold: 0.15, margin: '0px 0px -50px 0px' })

  return (
    <div ref={ref} className="scroll-reveal-scale">
      <Card
        className={`p-6 hover:shadow-lg transition-smooth-slow hover:scale-105 hover:-translate-y-1 cursor-pointer h-full ${
          feature.highlighted ? 'border-accent border-2' : ''
        }`}
      >
        <div className="mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
            <span className="text-2xl animate-pulse-slow">✓</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
      </Card>
    </div>
  )
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  const titleRef = useScrollReveal({ threshold: 0.2, margin: '0px 0px -100px 0px' })

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal-up text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our comprehensive approach to senior care ensures comfort, safety, and dignity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature._id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
