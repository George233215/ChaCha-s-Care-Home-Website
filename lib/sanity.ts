import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'
const rawWriteToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
const writeToken = rawWriteToken?.trim().replace(/^['"]|['"]$/g, '')

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Query functions
export async function getHomeData() {
  return client.fetch(`*[_type == "home"][0]`)
}

export async function getAllServices() {
  return client.fetch(`*[_type == "service"] | order(order asc)`)
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(`*[_type == "service" && slug.current == $slug][0]`, { slug })
}

export async function getAllTeamMembers() {
  return client.fetch(`*[_type == "teamMember"] | order(order asc)`)
}

export async function getAllTestimonials() {
  return client.fetch(`*[_type == "testimonial"] | order(publishedAt desc)`)
}

export async function getFeaturedTestimonials() {
  return client.fetch(`*[_type == "testimonial" && featured == true] | order(publishedAt desc)`)
}

export async function getAllGalleries() {
  return client.fetch(`*[_type == "gallery"] | order(publishedAt desc)`)
}

export async function getGalleriesByCategory(category: string) {
  return client.fetch(`*[_type == "gallery" && category == $category] | order(publishedAt desc)`, {
    category,
  })
}

export async function getAllBlogs() {
  return client.fetch(`*[_type == "blog"] | order(publishedAt desc)`)
}

export async function getBlogBySlug(slug: string) {
  return client.fetch(`*[_type == "blog" && slug.current == $slug][0]`, { slug })
}

export async function getAboutData() {
  return client.fetch(`*[_type == "about"][0]`)
}

export async function getAllFeatures() {
  return client.fetch(`*[_type == "feature"] | order(order asc)`)
}

export async function getContactSubmissions() {
  return client.fetch(`*[_type == "contact"] | order(submittedAt desc)`)
}

export async function submitContact(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  interestedIn: string
}) {
  if (!writeToken) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN (or SANITY_API_TOKEN)')
  }
  if (writeToken.length < 20) {
    throw new Error('Invalid Sanity API token format. Use a full write token from manage.sanity.io')
  }

  return writeClient.create({
    _type: 'contact',
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'new',
  })
}
