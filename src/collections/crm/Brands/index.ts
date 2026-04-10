import { CollectionConfig } from 'payload';

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    group: 'CRM & Execution',
    useAsTitle: 'brandName',
    defaultColumns: ['brandName', 'healthStatus'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly unique slug for brand',
      },
    },
    {
      name: 'brandName',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'registeredPhone',
          type: 'text',
          label: 'Public Phone',
          required: true,
          admin: {
            placeholder: '+15551234567',
          },
        },
        {
          name: 'supportEmail',
          type: 'email',
          required: true,
          admin: {
            placeholder: 'brand@example.com',
          },
        },
      ],
    },
    {
      name: 'healthStatus',
      type: 'select',
      options: ['Healthy', 'Warning', 'Suspended', 'Banned', 'Pending'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'emergencyHalt',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'IF CHECKED, ALL API ACTIVITY FOR BRAND IS HALTED. Prevents spam/abuse and compromised API credentials',
      },
    },
  ],
};
