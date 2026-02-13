import Image from 'next/image'
import { getAboutData, urlFor } from '@/lib/sanity'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'About Us | Cha Cha\'s Care Home',
  description: 'Learn about Cha Cha\'s Care Home in Mechanicsville, VA - dedicated to providing compassionate assisted living and residential care with a home-style atmosphere.',
}

export const revalidate = 3600

export default async function AboutPage() {
  const aboutData = await getAboutData()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5 border-b border-border relative overflow-hidden">
        <div className="absolute top-8 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-primary/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm font-semibold text-primary">Compassionate, Family-Style Care</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 animate-fade-in-up">
            About Cha Cha's Care Home
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-slide-in-left">
            A home-style assisted living community in Mechanicsville, VA, dedicated to personalized care and compassionate support.
          </p>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-16 md:py-24 relative bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(28,77,141,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,170,255,0.08),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Cha Cha's Care Home is a compassionate assisted living community located in Mechanicsville, VA, serving families throughout the Richmond area. We specialize in providing personalized, home-style care for seniors who need support with daily activities while valuing independence and dignity.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our small, intimate setting ensures that each resident receives individualized attention from our dedicated care team, creating meaningful relationships and fostering a genuine sense of community.
              </p>
            </div>
            <div className="h-80 bg-secondary rounded-2xl overflow-hidden hover:shadow-lg transition-smooth-slow border border-primary/10">
              {aboutData?.image ? (
                <Image
                  src={urlFor(aboutData.image).url()}
                  alt="Cha Cha's Care Home"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-100">
                  Care Home Setting
                </div>
              )}
            </div>
          </div>
          <div className="mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Who We Serve */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-6 leading-tight">{aboutData?.serveCardsTitle || 'Who We Serve'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutData?.serveCards && aboutData.serveCards.length > 0 ? (
                aboutData.serveCards.map((card: any, idx: number) => (
                  <Card key={idx} className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60 bg-white rounded-xl">
                    {card.image ? (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={urlFor(card.image).url()}
                          alt={card.title}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-100 flex items-center justify-center text-muted-foreground">
                        {card.title}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                    </div>
                  </Card>
                ))
              ) : (
                <>
                  <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60 bg-white rounded-xl">
                    <h3 className="text-xl font-bold text-foreground mb-3">Seniors Needing Support</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Older adults who benefit from assistance with activities of daily living such as bathing, dressing, medication management, and mobility support.
                    </p>
                  </Card>
                  <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60 bg-white rounded-xl">
                    <h3 className="text-xl font-bold text-foreground mb-3">Home-Seeking Residents</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Individuals who appreciate a cozy, residential setting with close-knit staff relationships rather than a large institutional facility.
                    </p>
                  </Card>
                  <Card className="p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60 bg-white rounded-xl">
                    <h3 className="text-xl font-bold text-foreground mb-3">Personalized Care Seekers</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Those who value individualized attention and meaningful engagement within a smaller community setting.
                    </p>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Core Values */}
          {aboutData?.values && aboutData.values.length > 0 && (
            <div className="mb-16 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center leading-tight">{aboutData?.valuesTitle || 'Our Values'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
                {aboutData.values.map((value: any, idx: number) => (
                  <Card key={idx} className="overflow-hidden animate-scale-in hover:shadow-lg transition-smooth-slow border border-primary/10 rounded-xl">
                    {value.image ? (
                      <div className="h-40 overflow-hidden">
                        <Image
                          src={urlFor(value.image).url()}
                          alt={value.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gray-100 flex items-center justify-center text-muted-foreground text-sm">
                        {value.title}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-12 p-6 md:p-8 bg-primary/5 rounded-2xl border border-primary/15 animate-fade-in-up shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-5 leading-tight">Visit Us Today</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">Mechanicsville, VA 23111</p>
                <p className="text-muted-foreground text-sm">Serving the Richmond area</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Phone</h3>
                <a href="tel:(804)252-0967" className="text-accent hover:underline">
                  (804) 252-0967
                </a>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Available</h3>
                <p className="text-muted-foreground">24/7 Care & Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
