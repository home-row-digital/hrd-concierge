import { CollectionConfig } from 'payload';

export const LeadMedia: CollectionConfig = {
  slug: 'lead-media',
  upload: true,
  admin: {
    group: 'CRM & Execution',
    defaultColumns: ['category'],
  },
  fields: [
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
      required: true,
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'lead-locations',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: ['PRE_SERVICE', 'POST_SERVICE', 'CONTRACT', 'DAMAGE_DETAIL'],
    },
    {
      name: 'aiAnalysis',
      type: 'textarea',
    },
  ],
};
