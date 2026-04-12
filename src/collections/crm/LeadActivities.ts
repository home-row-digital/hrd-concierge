import { CollectionConfig } from 'payload';

export const LeadActivity: CollectionConfig = {
  slug: 'lead-activity',
  admin: {
    group: 'CRM & Execution',
    hidden: true,
  },
  fields: [
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      options: ['INBOUND_SMS', 'OUTBOUND_SMS', 'PHOTO_UPLOAD', 'CALL', 'STATUS_CHANGE'],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'referenceId',
      type: 'text',
      admin: {
        description: 'The ID of the specific document being referenced',
      },
    },
  ],
};
