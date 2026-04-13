import { AI_INTENTS, AI_SENTIMENTS } from '@/lib/constants/ai';
import { CollectionConfig } from 'payload';

export const AiInsights: CollectionConfig = {
  slug: 'ai-insights',
  admin: {
    group: 'AI & Insights',
  },
  fields: [
    {
      name: 'voiceLog',
      type: 'relationship',
      relationTo: 'voice-logs',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 180,
      admin: {
        description: '180-char max wrap-up of the call',
      },
    },
    {
      name: 'sentiment',
      type: 'select',
      options: [...AI_SENTIMENTS],
      defaultValue: 'NEUTRAL',
    },
    {
      name: 'intent',
      type: 'select',
      options: [...AI_INTENTS],
    },
    {
      name: 'extractedData',
      type: 'json',
    },
    {
      name: 'nextStep',
      type: 'textarea',
      admin: {
        description: "Bulleted list of AI's estimated next steps based on intent of call",
      },
    },
    {
      name: 'confidenceScore',
      type: 'number',
      min: 0.0,
      max: 1.0,
      admin: {
        step: 0.01,
        description: "Gemini's Confidence in this analysis (from 0.00 to 1.00)",
      },
    },
  ],
};
