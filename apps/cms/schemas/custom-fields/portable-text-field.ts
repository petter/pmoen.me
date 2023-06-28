import { defineField } from 'sanity';

export const portableTextField = defineField({
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
    },
  ],
});
