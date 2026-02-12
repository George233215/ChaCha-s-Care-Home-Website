'use client'

import React from "react"

import { useState } from 'react'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'
import MapSection from '@/components/MapSection'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interestedIn: 'general',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          interestedIn: 'general',
        })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl animate-slide-in-left">
            Contact Cha Cha's Care Home in Mechanicsville, VA to learn more about our services, ask questions, or schedule a visit. We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-gray-200/60 bg-white rounded-lg">
                  <div className="flex gap-4 mb-4">
                    <Phone className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:(804)252-0967" className="text-accent hover:text-foreground transition-smooth">
                        (804) 252-0967
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-gray-200/60 bg-white rounded-lg">
                  <div className="flex gap-4 mb-4">
                    <Mail className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <a href="mailto:chachascarehome@gmail.com" className="text-accent hover:text-foreground transition-smooth">
                        chachascarehome@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-gray-200/60 bg-white rounded-lg\">
                  <div className="flex gap-4 mb-4">
                    <MapPin className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">Mechanicsville, VA 23111</p>
                      <p className="text-sm text-muted-foreground">Serving Richmond-area families</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-primary/40 rounded-lg">
                  <h3 className="font-bold mb-3">Available</h3>
                  <p className="text-sm opacity-90 mb-2">24/7 Care & Support</p>
                  <p className="text-xs opacity-75">Always available for emergencies and inquiries</p>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-lg border border-gray-200/60 bg-white rounded-xl overflow-hidden">
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">Thank you! We'll be in touch soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">First Name</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Inquiry about services"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Interested In</label>
                      <select
                        name="interestedIn"
                        value={formData.interestedIn}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="resident">Resident Inquiry</option>
                        <option value="service">Service Information</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" disabled={loading} size="lg" className="w-full">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Map placed at bottom for quick preview */}
      <MapSection />

      <Footer />
    </div>
  )
}
