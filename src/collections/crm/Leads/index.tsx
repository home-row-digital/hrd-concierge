import { CollectionConfig } from 'payload';

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    group: 'CRM & Execution',
    useAsTitle: 'phoneNumber',
    defaultColumns: ['firstName', 'lastName', 'phoneNumber'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
          required: true,
          admin: {
            placeholder: '+15551234567',
          },
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          options: ['LEAD', 'CUSTOMER', 'ARCHIVED'],
          defaultValue: 'LEAD',
        },
        {
          name: 'subStatus',
          type: 'select',
          options: ['NEW', 'APPT_SET', 'JOB_IN_PROGRESS', 'COMPLETED'],
          defaultValue: 'NEW',
        },
      ],
    },
    {
      name: 'metadata',
      type: 'json',
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
  ],
};
