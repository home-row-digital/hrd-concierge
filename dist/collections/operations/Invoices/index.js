export const Invoices = {
    slug: 'invoices',
    admin: {
        group: 'Operations & Billing',
        useAsTitle: 'invoiceNumber',
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'brand',
                    type: 'relationship',
                    relationTo: 'brands',
                    required: true,
                    admin: {
                        description: 'Keeps the link to the owner.',
                    },
                },
                {
                    name: 'invoiceNumber',
                    type: 'text',
                    required: true,
                    unique: true,
                    admin: {
                        description: 'Unique ID for accounting',
                    },
                },
            ],
        },
        {
            name: 'billingPeriod',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'start',
                            type: 'date',
                            required: true,
                        },
                        {
                            name: 'end',
                            type: 'date',
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'usageSnapshot',
            type: 'json',
            required: true,
            admin: {
                description: "Store the final counts (e.g., 502 mins, 1000 sms) so you don't need the Ledger",
            },
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'subtotal',
                    type: 'number',
                    required: true,
                    admin: {
                        description: 'Base Fee (in cents)',
                    },
                },
                {
                    name: 'overageAmount',
                    type: 'number',
                    required: true,
                    admin: {
                        description: 'Total overages (in cents)',
                    },
                },
                {
                    name: 'totalAmount',
                    type: 'number',
                    required: true,
                    admin: {
                        description: 'The final sum (Base + Overages + Fines)',
                    },
                },
            ],
        },
        {
            name: 'paymentStatus',
            type: 'select',
            required: true,
            defaultValue: 'UNPAID',
            options: [
                { label: 'Unpaid', value: 'UNPAID' },
                { label: 'Paid', value: 'PAID' },
                { label: 'Void', value: 'VOID' },
                { label: 'Refunded', value: 'REFUNDED' },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'stripeInvoiceId',
                    type: 'text',
                    index: true,
                    admin: {
                        description: 'Index this. Essential for webhook lookups',
                    },
                },
                {
                    name: 'stripeInvoiceUrl',
                    type: 'text',
                    admin: {
                        description: "Direct link to Stripe's hosted PDF",
                    },
                },
            ],
        },
    ],
};
