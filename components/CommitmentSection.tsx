'use client'

import React from "react"

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Heart, Shield, Users, Zap } from 'lucide-react'

interface CommitmentItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function CommitmentItem({ icon, title, description }: CommitmentItemProps) {
  const ref = useScrollReveal({ threshold: 0.15, margin: '0px 0px -50px 0px' })

  return (
    <div
      ref={ref}
      className="scroll-reveal-scale p-6 md:p-7 rounded-xl border border-blue-200 bg-white hover:border-accent hover:shadow-lg transition-smooth-slow group hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:from-accent/40 group-hover:to-accent/20 transition-smooth">
        <div className="text-primary group-hover:text-accent transition-smooth">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  )
}

export default function CommitmentSection() {
  const titleRef = useScrollReveal({ threshold: 0.2, margin: '0px 0px -100px 0px' })

  const commitments = [
    {
      icon: <Heart size={24} />,
      title: 'Compassionate Care',
      description: 'We treat every resident with the dignity, respect, and compassion they deserve, as if they were family.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Safety First',
      description: 'Our facilities meet all safety standards with trained staff ensuring a secure environment 24/7.',
    },
    {
      icon: <Users size={24} />,
      title: 'Community Focused',
      description: 'We foster meaningful relationships and connections between residents, creating a true home community.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Quality of Life',
      description: 'Activities, engagement, and personalized attention ensure residents enjoy an active, fulfilling life.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="scroll-reveal-up text-center mb-12">
          <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full" />
            Our Commitment
            <span className="w-1 h-5 bg-accent rounded-full" />
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-5 text-balance leading-tight">
            Excellence in Every Aspect of Care
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our commitment to Cha Cha's Care Home residents goes beyond providing services. We're dedicated to creating a
            nurturing environment where dignity, safety, and happiness are paramount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, idx) => (
            <CommitmentItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
