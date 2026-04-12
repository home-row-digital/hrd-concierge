import { CollectionConfig } from 'payload';

export const Conversations: CollectionConfig = {
  slug: 'lead-conversation',
  admin: {
    group: 'CRM & Execution',
  },
  fields: [
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'AI-updated TL;DR of the chat so far',
      },
    },
    {
      name: 'lastIntent',
      type: 'text',
      admin: {
        placeholder: 'ie: Booking, Dispute',
      },
    },
    {
      name: 'meta',
      type: 'json',
    },
  ],
};
