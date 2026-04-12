import { CollectionConfig } from 'payload';

export const Locations: CollectionConfig = {
  slug: 'lead-locations',
  admin: {
    group: 'CRM & Execution',
    useAsTitle: 'streetAddress',
    defaultColumns: ['streetAddress', 'locationType'],
  },
  fields: [
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'streetAddress',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'zip',
      type: 'text',
      required: true,
    },
    {
      name: 'locationType',
      type: 'select',
      options: ['PRIMARY', 'RENTAL', 'BILLING'],
      required: true,
    },
  ],
};
