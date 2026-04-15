export const RateCards = {
    slug: 'rate-cards',
    admin: {
        group: 'Operations & Billing',
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        description: 'Unique name (e.g., "2026 Enterprise Tier")',
                    },
                },
                {
                    name: 'isDefault',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: 'For automatic provisioning.',
                    },
                },
            ],
        },
        {
            name: 'baseMonthly',
            type: 'number',
            required: true,
            admin: {
                description: 'Charge: Monthly subscription fee',
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'includedMinutes',
                    type: 'number',
                    required: true,
                    admin: {
                        description: 'Voice minutes per month',
                    },
                },
                {
                    name: 'includedSMS',
                    type: 'number',
                    required: true,
                    admin: {
                        description: 'SMS segments per month',
                    },
                },
                {
                    name: 'includedAITokens',
                    type: 'number',
                    required: true,
                    admin: {
                        description: 'AI Tokens per month',
                    },
                },
            ],
        },
        {
            label: 'Voice Rates',
            type: 'collapsible',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'overageRateMin',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Charge: What customer pays after quota',
                            },
                        },
                        {
                            name: 'costPerMin',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Cost: What Twilio/Carrier charges US',
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: 'SMS Rates',
            type: 'collapsible',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'overageRateSMS',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Charge: What customer pays after quota',
                            },
                        },
                        {
                            name: 'costPerSMS',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Cost: What Twilio/Carrier charges US',
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: 'AI & Processing Rates',
            type: 'collapsible',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'aiTokenRate',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Charge: Customer price per 1k tokens.',
                            },
                        },
                        {
                            name: 'costPerToken',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Cost: What Google/AI provider charges US',
                            },
                        },
                    ],
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'transcriptRate',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Charge: Price for post-call processing',
                            },
                        },
                        {
                            name: 'recordingRate',
                            type: 'number',
                            required: true,
                            admin: {
                                description: 'Charge: Storage fee for audio',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};
