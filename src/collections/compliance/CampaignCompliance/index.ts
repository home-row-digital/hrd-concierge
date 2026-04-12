import { CollectionConfig } from 'payload';

export const CampaignCompliance: CollectionConfig = {
  slug: 'campaign-compliance',
  admin: {
    group: 'Compliance & Legal',
  },
  fields: [
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
    },
    {
      name: 'tcrCampaignSid',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'messagingServiceId',
      type: 'text',
    },
  ],
};
