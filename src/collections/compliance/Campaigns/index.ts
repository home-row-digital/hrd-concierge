import { TCR_CAMPAIGN_STATUSES } from '@/lib/constants/tcr';
import { CollectionConfig } from 'payload';

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'campaignName',
    defaultColumns: ['campaignName', 'campaignStatus'],
    group: 'Compliance & Legal',
  },
  fields: [
    {
      name: 'campaignName',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tcrCampaignSid',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'campaignStatus',
      type: 'select',
      options: [...TCR_CAMPAIGN_STATUSES],
      defaultValue: 'IN_REVIEW',
      required: true,
      index: true,
    },
    {
      name: 'messagingServiceId',
      type: 'text',
      required: true,
    },
  ],
};
