import { TCR_BUSINESS_TYPES, TCR_VERTICALS } from '@/app/lib/constants/tcr';
import { CollectionConfig } from 'payload';

export const BrandProfiles: CollectionConfig = {
  slug: 'brand-profiles',
  admin: {
    useAsTitle: 'legalBusinessName',
    defaultColumns: ['legalBusinessName', 'websiteUrl'],
    group: 'Compliance & Legal',
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'legalBusinessName',
          type: 'text',
          required: true,
          label: 'Legal Entity Name',
        },
        {
          name: 'taxId',
          type: 'text',
          required: true,
          label: 'EIN/TaxID',
          admin: {
            placeholder: 'XX-XXXXXXX',
            description: 'Exactly as shown on the CP-575 or 147C form',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'entityType',
          type: 'select',
          required: true,
          label: 'Entity Type',
          options: [...TCR_BUSINESS_TYPES],
        },
        {
          name: 'vertical',
          type: 'select',
          required: true,
          options: [...TCR_VERTICALS],
        },
      ],
    },
    {
      name: 'streetAddress',
      type: 'text',
      label: 'Street Address',
      required: true,
      admin: {
        description: 'Exactly as shown on IRS form',
      },
    },
    {
      type: 'row',
      fields: [
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
      ],
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Marketing Site URL',
    },
  ],
};
