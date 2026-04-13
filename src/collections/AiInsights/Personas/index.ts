import { AI_TONE_OPTIONS } from '@/lib/constants/ai';
import { CollectionConfig } from 'payload';

export const Personas: CollectionConfig = {
  slug: 'personas',
  admin: {
    group: 'AI & Insights',
    useAsTitle: 'agentName',
    defaultColumns: ['agentName', 'tone', 'createdAt'],
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      unique: true,
    },
    {
      name: 'agentName',
      type: 'text',
      required: true,
      defaultValue: 'Kai',
    },
    {
      name: 'systemPrompt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tone',
      type: 'select',
      options: [...AI_TONE_OPTIONS],
      required: true,
      defaultValue: 'FRIENDLY',
    },
    {
      name: 'baseContext',
      type: 'richText',
    },
    {
      name: 'signature',
      type: 'text',
      admin: {
        description: 'How the Agent always ends every text',
      },
    },
  ],
};
