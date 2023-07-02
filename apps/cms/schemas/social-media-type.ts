import { defineType, defineField } from 'sanity';

export const socialMediaType = defineType({
  title: 'Social Medias',
  name: 'socialMedias',
  type: 'document',
  fields: [
    defineField({
      title: 'Social Media',
      name: 'socialMedia',
      type: 'string',
      options: {
        list: [
          { title: 'Twitter', value: 'twitter' },
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Email', value: 'email' },
        ],
      },
    }),
    defineField({
      title: 'Handle',
      name: 'handle',
      type: 'string',
    }),
  ],
});
