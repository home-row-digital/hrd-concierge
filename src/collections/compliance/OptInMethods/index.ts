import { CollectionConfig } from 'payload';

export const OptInMethods: CollectionConfig = {
  slug: 'optin-methods',
  fields: [
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
    },
    {
      name: 'type',
      type: 'select',
      options: ['WEB', 'KEYWORD', 'VERBAL', 'PAPER_FORM'],
    },
    {
      name: 'proof',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
