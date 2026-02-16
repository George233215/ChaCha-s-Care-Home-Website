'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

interface StatItemProps {
  number: string
  label: string
  description?: string
}

function StatItem({ number, label, description }: StatItemProps) {
  const ref = useScrollReveal({ threshold: 0.2, margin: '0px 0px -50px 0px' })
  const isShortMetric = /^\d+([+%]|\s*\/\s*\d+)?$/.test(number.trim())

  return (
    <div
      ref={ref}
      className="scroll-reveal-scale text-center group h-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-6 shadow-lg transition-smooth-slow hover:-translate-y-1 hover:bg-white/10"
    >
      <div className="relative mb-4 min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center group-hover:scale-[1.02] transition-smooth">
        <div
          className={`font-bold bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent drop-shadow-lg leading-tight max-w-[12ch] mx-auto ${
            isShortMetric ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
          }`}
        >
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{label}</h3>
      {description && <p className="text-white/90 leading-relaxed">{description}</p>}
    </div>
  )
}

export default function StatsSection() {
  const titleRef = useScrollReveal({ threshold: 0.2, margin: '0px 0px -100px 0px' })

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-primary/85 to-primary/90 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="scroll-reveal-up text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-balance text-white drop-shadow-lg leading-tight">
            Trusted by Richmond-Area Families
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Years of dedication to providing compassionate, personalized care for our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem number="Experienced" label="Care Professionals" description="Dedicated to quality senior care" />
          <StatItem
            number="Trusted"
            label="By Local Families"
            description="Built on compassionate, personalized support"
          />
          <StatItem number="24/7" label="Professional Care" description="Round-the-clock support" />
          <StatItem number="100%" label="Dedication" description="To your loved one's wellbeing" />
        </div>
      </div>
    </section>
  )
}
