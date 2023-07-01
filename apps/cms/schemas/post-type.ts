import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.min(5),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Publish date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The URL slug for this blogpost, i.e. my-cool-post',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'simple-portable-text',
      title: 'Excerpt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'captioned-image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'content',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
