export const UsageEvents = {
    slug: 'usage-events',
    admin: {
        group: 'Operations & Billing',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'operationType',
                    type: 'select',
                    options: ['SMS', 'VOICE', 'AI_TOKEN'],
                },
                {
                    name: 'eventRef',
                    type: 'text',
                    admin: {
                        description: 'The Twilio SID of the even (messageSid or callSid)',
                    },
                },
            ],
        },
        {
            name: 'brandId',
            type: 'text',
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'rawQuantity',
                    type: 'number',
                },
                {
                    name: 'unitPrice',
                    type: 'number',
                },
                {
                    name: 'totalCents',
                    type: 'number',
                },
            ],
        },
        {
            name: 'description',
            type: 'textarea',
        },
    ],
};
