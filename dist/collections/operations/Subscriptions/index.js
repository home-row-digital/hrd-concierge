export const Subscriptions = {
    slug: 'subscriptions',
    admin: {
        group: 'Operations & Billing',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'brand',
                    type: 'relationship',
                    relationTo: 'brands', // Ensure this matches your Brands collection slug
                    required: true,
                    admin: {
                        description: 'Who owns this?',
                    },
                },
                {
                    name: 'rateCard',
                    type: 'relationship',
                    relationTo: 'rate-cards',
                    required: true,
                    admin: {
                        description: 'The Link: Which prices do we use?',
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'status',
                    type: 'select',
                    required: true,
                    defaultValue: 'ACTIVE',
                    options: [
                        { label: 'Active', value: 'ACTIVE' },
                        { label: 'Past Due', value: 'PAST_DUE' },
                        { label: 'Canceled', value: 'CANCELED' },
                    ],
                },
                {
                    name: 'currentPeriodEnd',
                    type: 'date',
                    required: true,
                    admin: {
                        description: 'When do the "Included Quotas" reset?',
                        date: {
                            pickerAppearance: 'dayAndTime',
                        },
                    },
                },
            ],
        },
    ],
};
