import { CollectionConfig } from 'payload';

export const ConsentLogs: CollectionConfig = {
  slug: 'consent-logs',
  admin: {
    useAsTitle: 'phoneNumber',
    defaultColumns: ['phoneNumber', 'type'],
  },
  fields: [
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['OPT_IN', 'OPT_OUT'],
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      options: ['SMS_KEYWORD', 'WEB_FORM', 'MANUAL_ADMIN', 'API_IMPORT'],
      required: true,
    },
    {
      name: 'consentDate',
      type: 'date',
      defaultValue: new Date().toISOString(),
    },
    {
      name: 'rawTextSnapshot',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The exact message body',
      },
    },
    {
      name: 'metadata',
      type: 'json',
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brand',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'proof',
      type: 'relationship',
      relationTo: 'sms-logs',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lookupKey',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
  ],
};
