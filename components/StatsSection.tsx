'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface StatItemProps {
  number: string
  label: string
  description?: string
}

function StatItem({ number, label, description }: StatItemProps) {
  const ref = useScrollReveal({ threshold: 0.2, margin: '0px 0px -50px 0px' })

  return (
    <div
      ref={ref}
      className="scroll-reveal-scale text-center group hover:transform transition-smooth-slow"
    >
      <div className="relative mb-4 group-hover:scale-110 transition-smooth">
        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent drop-shadow-lg">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{label}</h3>
      {description && <p className="text-white/90">{description}</p>}
    </div>
  )
}

export default function StatsSection() {
  const titleRef = useScrollReveal({ threshold: 0.2, margin: '0px 0px -100px 0px' })

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-primary/85 to-primary/90 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="scroll-reveal-up text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-white drop-shadow-lg">
            Trusted by Richmond-Area Families
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Years of dedication to providing compassionate, personalized care for our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem number="25+" label="Years of Experience" description="Serving seniors with excellence" />
          <StatItem
            number="500+"
            label="Happy Residents"
            description="Families who trust us with their loved ones"
          />
          <StatItem number="24/7" label="Professional Care" description="Round-the-clock support" />
          <StatItem number="100%" label="Dedication" description="To your loved one's wellbeing" />
        </div>
      </div>
    </section>
  )
}
