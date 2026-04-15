export const NurtureState = {
    slug: 'nurture-state',
    admin: {
        group: 'CRM & Execution',
    },
    fields: [
        {
            name: 'lead',
            type: 'relationship',
            relationTo: 'leads',
            unique: true,
        },
        {
            name: 'lastSummary',
            type: 'textarea',
            admin: {
                description: 'AI-written current situation snapshot',
            },
        },
        {
            name: 'nextStep',
            type: 'text',
        },
        {
            name: 'objections',
            type: 'array',
            fields: [
                {
                    name: 'objection',
                    type: 'text',
                },
            ],
        },
    ],
};
