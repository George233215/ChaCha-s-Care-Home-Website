import { getServiceBySlug, getAllServices, urlFor } from '@/lib/sanity'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'

export const revalidate = 3600

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service: any) => ({
    slug: service.slug.current,
  }))
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug)
  
  return {
    title: `${service?.title || 'Service'} | Cha Cha's Care Home`,
    description: service?.description || 'Learn more about our services at Cha Cha\'s Care Home',
  }
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params
  const service = await getServiceBySlug(resolvedParams.slug)

  if (!service) {
    notFound()
  }

  // Render portable text blocks
  const renderContent = (blocks: any[]) => {
    if (!blocks) return null
    
    return blocks.map((block: any, idx: number) => {
      if (block._type === 'block') {
        return (
          <div key={idx} className="mb-6">
            {block.children?.map((child: any, childIdx: number) => (
              <div key={childIdx}>
                {child.text && (
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {child.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )
      }
      return null
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-primary/5 border-b border-border relative overflow-hidden">
        <div className="absolute top-8 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Button asChild variant="ghost" className="mb-4 -ml-3">
            <Link href="/services">{"< Back to Services"}</Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 animate-fade-in-up">
            {service.title}
          </h1>
          {service.description && (
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-slide-in-left">
              {service.description}
            </p>
          )}
        </div>
      </section>

      {/* Service Detail */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
            {/* Image */}
            <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300 border border-primary/10">
              {service.image ? (
                <Image
                  src={urlFor(service.image).url()}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <div className="text-6xl mb-2">[Image]</div>
                    <p>Service Image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="bg-white border border-primary/10 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-foreground mb-6">About This Service</h2>
              
              {service.fullDescription && service.fullDescription.length > 0 ? (
                <div className="prose prose-sm max-w-none mb-8">
                  {renderContent(service.fullDescription)}
                </div>
              ) : (
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  {service.description}
                </p>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/15">
                  <h3 className="text-xl font-bold text-foreground mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature: any, idx: number) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground">{feature.name}</p>
                          {feature.description && (
                            <p className="text-sm text-foreground/70">{feature.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-10 text-center border border-primary/20 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5 leading-tight">
              Interested in This Service?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Contact Cha Cha's Care Home today to learn more about how this service can support your loved one. Our compassionate team is ready to help.
            </p>
            <Button asChild size="lg" className="transition-smooth">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Other Services */}
          <div className="mt-12 pt-10 border-t border-border">
            <h3 className="text-2xl font-bold text-foreground mb-8">Our Other Services</h3>
            <div className="flex justify-center items-center">
              <Button asChild size="lg" className="transition-all bg-primary text-white">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

