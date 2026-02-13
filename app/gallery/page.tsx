import { getAllGalleries } from '@/lib/sanity'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import ImageCarousel from '@/components/ImageCarousel'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Gallery | Cha Cha\'s Care Home',
  description: 'Visual tour of our home-style facilities, common areas, activities, and the warm community we\'ve built in Mechanicsville, VA.',
}

export const revalidate = 3600

export default async function GalleryPage() {
  const galleries = await getAllGalleries()

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
            <span className="text-sm font-semibold text-primary">Life At Cha Cha's</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 animate-fade-in-up">Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-slide-in-left">
            Take a visual tour of Cha Cha's Care Home, including our comfortable living spaces, dining areas, common rooms, and the activities our residents enjoy.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {galleries && galleries.length > 0 ? (
            <div className="space-y-12">
              {galleries.map((gallery) => (
                <div key={gallery._id} className="animate-fade-in-up bg-white rounded-2xl border border-primary/10 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">{gallery.title}</h2>
                  {gallery.description && <p className="text-muted-foreground mb-6 leading-relaxed">{gallery.description}</p>}
                  <div className="mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                  </div>

                  {/* Carousel Section */}
                  {gallery.images && gallery.images.length > 0 && (
                    <div className="mb-10">
                      <ImageCarousel
                        images={gallery.images}
                        autoSlide={true}
                        slideInterval={5000}
                        title="Featured Images"
                      />
                    </div>
                  )}

                  {/* Grid View */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-5">All Photos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
                      {gallery.images && gallery.images.length > 0 ? (
                        gallery.images.map((item, idx) => {
                          const imageUrl = item.image ? urlFor(item.image).url() : null
                          return (
                            <Card
                              key={idx}
                              className="overflow-hidden h-64 bg-secondary hover:shadow-lg transition-smooth-slow hover:scale-105 cursor-pointer animate-scale-in relative group"
                            >
                              {imageUrl ? (
                                <>
                                  <Image
                                    src={imageUrl}
                                    alt={item.caption || `Gallery Image ${idx + 1}`}
                                    fill
                                    className="object-cover group-hover:brightness-75 transition-smooth"
                                  />
                                  {item.caption && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-smooth">
                                      <p className="text-white text-sm font-medium">{item.caption}</p>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground p-4 bg-gradient-to-br from-secondary to-secondary/50">
                                  <p className="text-center text-sm">{item.caption || `Gallery Image ${idx + 1}`}</p>
                                </div>
                              )}
                            </Card>
                          )
                        })
                      ) : (
                        <p className="text-muted-foreground col-span-full">No images in this gallery.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Gallery images coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
