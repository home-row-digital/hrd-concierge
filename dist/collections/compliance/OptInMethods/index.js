export const OptInMethods = {
    slug: 'optin-methods',
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
