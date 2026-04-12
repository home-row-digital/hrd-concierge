import { CollectionConfig } from 'payload';

export const TwilioNumbers: CollectionConfig = {
  slug: 'twilio-numbers',
  admin: {
    group: 'Communication Infrastructure',
    useAsTitle: 'phoneNumber',
    defaultColumns: ['label', 'phoneNumber', 'status'],
  },
  fields: [
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'E.164 (e.g.: "+15551234567")',
      },
    },
    {
      name: 'twilioNumberSid',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
    },
    {
      name: 'status',
      type: 'select',
      options: ['ACTIVE', 'PENDING_TRANSFER', 'RELEASED'],
      required: true,
    },
    {
      name: 'capabilities',
      type: 'select',
      options: ['SMS', 'MMS', 'VOICE'],
      hasMany: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Unique Human-Readable Label',
      },
    },
  ],
};
