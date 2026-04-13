import { CollectionConfig } from 'payload';

export const Transcriptions: CollectionConfig = {
  slug: 'transcriptions',
  admin: {
    group: 'AI & Insights',
    useAsTitle: 'speaker',
  },
  fields: [
    {
      name: 'voiceLog',
      type: 'relationship',
      relationTo: 'voice-logs',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'speaker',
      type: 'select',
      options: ['AI_ASSISTANT', 'LEAD', 'REPRESENTATIVE'],
    },
    {
      name: 'textContent',
      type: 'textarea',
    },
    {
      name: 'timestamp',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Offset (in MS) in the conversation for seeking',
      },
    },
    {
      name: 'isLive',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Distinguish real-time data from batch data',
      },
    },
  ],
};
