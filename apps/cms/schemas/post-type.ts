import { defineField, defineType } from 'sanity';
import { imageField } from './custom-fields/image-field';
import { portableTextField } from './custom-fields/portable-text-field';

export const postType = defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The URL slug for this blogpost, i.e. my-cool-post',
      options: {
        source: 'title',
      },
    }),
    imageField,
    portableTextField,
  ],
});
