import { CollectionConfig } from 'payload';

export const SmsLogs: CollectionConfig = {
  slug: 'sms-logs',
  admin: {
    group: 'Communication Infrastructure',
    defaultColumns: ['messageSid', 'from', 'to', 'direction'],
    useAsTitle: 'messageSid',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'messageSid',
          type: 'text',
          unique: true,
          required: true,
        },
        {
          name: 'direction',
          type: 'select',
          options: ['INBOUND', 'OUTBOUND_API'],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'from',
          required: true,
          type: 'text',
          admin: {
            placeholder: 'E.164 (e.g.: "+1...")',
          },
        },
        {
          name: 'to',
          required: true,
          type: 'text',
          admin: {
            placeholder: 'E.164 (e.g.: "+1...")',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'segments',
          type: 'number',
        },
        {
          name: 'totalCost',
          type: 'number',
        },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: ['QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'UNDELIVERABLE'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sent_at',
      type: 'date',
      label: 'Sent At',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
