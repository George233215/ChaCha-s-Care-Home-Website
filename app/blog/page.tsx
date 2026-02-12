import Link from 'next/link'
import { getAllBlogs } from '@/lib/sanity'
import { TopBar } from '@/components/TopBar'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export const metadata = {
  title: 'Blog & News | Cha Cha\'s Care Home',
  description: 'Senior care tips, health advice, activities updates, and community news from Cha Cha\'s Care Home in Mechanicsville, VA.',
}

export const revalidate = 3600

export default async function BlogPage() {
  const blogs = await getAllBlogs()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navigation />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">Blog & News</h1>
          <p className="text-lg text-muted-foreground max-w-2xl animate-slide-in-left">
            Senior health tips, care advice, activity highlights, and community updates from Cha Cha's Care Home.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
              {blogs.map((post) => (
                <Card key={post._id} className="overflow-hidden flex flex-col hover:shadow-lg transition-smooth-slow hover:scale-105 animate-scale-in">
                  <div className="relative h-48 bg-secondary flex items-center justify-center text-muted-foreground overflow-hidden group">
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:brightness-75 transition-smooth"
                      />
                    ) : (
                      <p>Featured Image</p>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    {post.category && (
                      <p className="text-sm text-accent font-semibold mb-2 uppercase">{post.category}</p>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</p>

                    <div className="flex flex-col gap-2 text-xs text-muted-foreground mb-4">
                      {post.author && (
                        <div className="flex gap-1 items-center">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                      )}
                      {post.publishedAt && (
                        <div className="flex gap-1 items-center">
                          <Calendar size={14} />
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <Button asChild variant="ghost" className="self-start -ml-3 hover:translate-x-1 transition-smooth">
                      <Link href={`/blog/${post.slug.current}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-smooth" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Blog posts coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
