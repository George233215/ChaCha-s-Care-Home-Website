import { defineType, defineField } from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
        },
        {
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
        },
        {
          name: 'backgroundImage',
          title: 'Hero Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Main background image for the hero section',
        },
        {
          name: 'images',
          title: 'Hero Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'displayPosition',
                  title: 'Display Position',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Background', value: 'background' },
                      { title: 'Right Side', value: 'rightside' },
                    ],
                  },
                  description: 'Choose where this image appears in the hero section',
                },
                {
                  name: 'order',
                  title: 'Display Order',
                  type: 'number',
                  description: 'Order for animation sequence (1, 2, 3, etc.)',
                },
              ],
              preview: {
                select: {
                  image: 'image',
                  position: 'displayPosition',
                  order: 'order',
                },
                prepare(selection) {
                  const { image, position, order } = selection
                  return {
                    title: `Image ${order} - ${position}`,
                    media: image,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'animationDuration',
          title: 'Animation Duration (seconds)',
          type: 'number',
          initialValue: 3,
          description: 'How long each image displays before transitioning',
        },
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Image to display alongside the highlights',
        },
        {
          name: 'imagePosition',
          title: 'Image Position',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'right',
        },
        {
          name: 'imageOrientation',
          title: 'Image Orientation',
          type: 'string',
          options: {
            list: [
              { title: 'Portrait', value: 'portrait' },
              { title: 'Landscape', value: 'landscape' },
              { title: 'Square', value: 'square' },
            ],
          },
          initialValue: 'portrait',
          description: 'How the image should be displayed',
        },
        {
          name: 'highlights',
          title: 'Highlight Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
