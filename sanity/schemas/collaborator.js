import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collaborator',
  title: 'Collaborator',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
