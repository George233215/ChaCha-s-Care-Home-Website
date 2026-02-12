import { getAllTeamMembers } from '@/lib/sanity'
import { Navigation } from '@/components/Navigation'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Our Team | CareCare',
  description: 'Meet our dedicated team of healthcare professionals committed to providing exceptional care.',
}

export const revalidate = 3600

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Meet the dedicated professionals who provide exceptional care and support to our residents.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-secondary flex items-center justify-center text-muted-foreground overflow-hidden">
                    {member.image ? (
                      <Image
                        src={urlFor(member.image).url()}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:brightness-75 transition-smooth"
                      />
                    ) : (
                      <p>Member Photo</p>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-accent font-semibold mb-2">{member.position}</p>
                    {member.specialization && (
                      <p className="text-sm text-muted-foreground mb-3">
                        Specialization: {member.specialization}
                      </p>
                    )}
                    {member.experience && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {member.experience} years of experience
                      </p>
                    )}
                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                    {member.contact && (
                      <div className="space-y-2">
                        {member.contact.email && (
                          <div className="flex gap-2 items-center text-sm">
                            <Mail size={16} />
                            <a href={`mailto:${member.contact.email}`} className="text-accent hover:underline">
                              {member.contact.email}
                            </a>
                          </div>
                        )}
                        {member.contact.phone && (
                          <div className="flex gap-2 items-center text-sm">
                            <Phone size={16} />
                            <a href={`tel:${member.contact.phone}`} className="text-accent hover:underline">
                              {member.contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Team members coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
