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

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const payload = await response.json().catch(() => ({}))

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
      } else {
        setErrorMessage(payload?.error || 'We could not send your message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-14 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5 border-b border-border relative overflow-hidden">
        <div className="absolute top-8 right-0 w-56 h-56 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm font-semibold text-primary">We're Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed animate-slide-in-left">
            Contact Cha Cha's Care Home in Mechanicsville, VA to learn more about our services, ask questions, or schedule a visit. We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-14 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-primary/15 bg-white rounded-xl">
                  <div className="flex gap-4">
                    <Phone className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:(804)252-0967" className="text-accent hover:text-foreground transition-smooth">
                        (804) 252-0967
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-primary/15 bg-white rounded-xl">
                  <div className="flex gap-4">
                    <Mail className="text-accent flex-shrink-0" size={24} />
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <a href="mailto:Chachacare@gmail.com" className="text-accent hover:text-foreground transition-smooth break-all">
                        Chachacare@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-primary/15 bg-white rounded-xl">
                  <div className="flex gap-4">
                    <MapPin className="text-accent flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">Mechanicsville, VA 23111</p>
                      <p className="text-sm text-muted-foreground">Serving Richmond-area families</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 md:p-6 bg-primary text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 animate-scale-in border border-primary/40 rounded-xl">
                  <h3 className="font-bold mb-3">Available</h3>
                  <p className="text-sm opacity-90 mb-2">24/7 Care & Support</p>
                  <p className="text-xs opacity-75">Always available for emergencies and inquiries</p>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-5 md:p-8 shadow-lg border border-primary/15 bg-white rounded-2xl overflow-hidden">
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">Thank you! We'll be in touch soon.</p>
                  </div>
                )}
                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Michael"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Anderson"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="michael.anderson@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="804-555-0147"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Service Consultation Request"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Interested In</label>
                      <select
                        name="interestedIn"
                        value={formData.interestedIn}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-3 py-2 border border-border rounded-md bg-background text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please share your care needs, preferred timeline, and best contact method."
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

      {/* Location highlight (map removed) */}
      <section className="pb-14 md:pb-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-sm">
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-accent/10 blur-2xl" />
            <div className="relative p-5 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <MapPin className="text-primary" size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary/80 font-semibold mb-1">Our Location</p>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Mechanicsville, VA 23111</h3>
                  <p className="text-muted-foreground">Proudly serving Richmond-area families with compassionate care.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                <span>Visits available by appointment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

