import { defineType, defineField } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Values Title',
      type: 'string',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Value Description',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Value Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'serveCardsTitle',
      title: 'Who We Serve Title',
      type: 'string',
    }),
    defineField({
      name: 'serveCards',
      title: 'Who We Serve Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Card Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Card Description',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Card Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'history',
      title: 'History/Background',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'About Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
