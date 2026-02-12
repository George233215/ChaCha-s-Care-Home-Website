import { defineType, defineField } from 'sanity'

export const featureType = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Feature Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Feature Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Feature Icon',
      type: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlight This Feature',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
