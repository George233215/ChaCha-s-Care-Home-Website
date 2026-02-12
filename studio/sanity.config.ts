import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// IMPORTANT: Replace with your actual Sanity project credentials
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2b0anlve'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Care Home CMS',
  projectId,
  dataset,
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})