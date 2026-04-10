import { CollectionConfig } from 'payload';

export const CampaignCompliance: CollectionConfig = {
  slug: 'campaign-compliance',
  fields: [
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaign',
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
