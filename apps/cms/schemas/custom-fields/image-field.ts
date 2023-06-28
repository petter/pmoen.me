import { defineField } from 'sanity';

export const imageField = defineField({
  name: 'imageField',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      description:
        'Alternative text for screen readers. Should be descriptive but not repetetive, i.e. should not be "Image of..." as the screen reader already knows it is an image.',
      validation: (Rule) =>
        Rule.error('You have to fill out the alternative text.').required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
});
