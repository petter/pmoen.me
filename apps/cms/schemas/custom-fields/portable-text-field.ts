import { defineField } from 'sanity';

export const portableTextField = defineField({
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [{ title: 'URL', name: 'href', type: 'string' }],
          },
        ],
      },
    },
    { type: 'captioned-image' },
    {
      type: 'code',
      options: {
        languageAlternatives: [
          { title: 'Bash', value: 'bash' },
          { title: 'CSS', value: 'css' },
          { title: 'Diff', value: 'diff' },
          { title: 'C#', value: 'csharp' },
          { title: 'F#', value: 'fsharp' },
          { title: 'Haskell', value: 'haskell' },
          { title: 'HTML', value: 'html' },
          { title: 'Java', value: 'java' },
          { title: 'JS / JSX', value: 'jsx' },
          { title: 'JSON', value: 'json' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'Plain text', value: 'text' },
          { title: 'Python', value: 'python' },
          { title: 'Rust', value: 'rust' },
          { title: 'Scala', value: 'scala' },
          { title: 'SCSS', value: 'scss' },
          { title: 'Swift', value: 'swift' },
          { title: 'TS / TSX', value: 'tsx' },
        ],
      },
    },
  ],
});
