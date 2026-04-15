export const VoiceLogs = {
    slug: 'voice-logs',
    admin: {
        group: 'Communication Infrastructure',
        defaultColumns: ['callSid', 'direction'],
        useAsTitle: 'callSid',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'callSid',
                    type: 'text',
                    unique: true,
                    required: true,
                },
                {
                    name: 'direction',
                    type: 'select',
                    options: ['INBOUND', 'OUTBOUND_API'],
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'from',
                    type: 'text',
                },
                {
                    name: 'to',
                    type: 'text',
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'callType',
                    type: 'select',
                    options: ['AI_ASSISTANT', 'HUMAN_TO_HUMAN'],
                },
                {
                    name: 'status',
                    type: 'select',
                    options: ['RINGING', 'IN_PROGRESS', 'COMPLETED', 'BUSY', 'FAILED'],
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'duration',
                    type: 'number',
                    admin: {
                        description: 'Call duration in seconds',
                    },
                },
                {
                    name: 'usageCost',
                    type: 'number',
                    label: 'usage Cost (In Cents)',
                },
            ],
        },
        {
            name: 'campaign',
            type: 'relationship',
            relationTo: 'campaigns',
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
