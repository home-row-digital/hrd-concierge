import { TCR_BRAND_STATUSES } from '@/lib/constants/tcr';
export const BrandMetrics = {
    slug: 'brand-metrics',
    admin: {
        useAsTitle: 'tcrBrandId',
        defaultColumns: ['tcrBrandId', 'brandStatus', 'trustScore'],
        group: 'Compliance & Legal',
    },
    fields: [
        {
            name: 'brand',
            type: 'relationship',
            relationTo: 'brands',
            required: true,
        },
        {
            name: 'tcrBrandId',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'tcrBrandScore',
            type: 'text',
            required: true,
            label: 'Official TCR ID',
        },
        {
            name: 'brandStatus',
            type: 'select',
            options: [...TCR_BRAND_STATUSES],
            defaultValue: 'PENDING',
        },
        {
            name: 'trustScore',
            type: 'number',
            min: 0,
            max: 100,
            label: 'Twilio Trust Score',
        },
        {
            name: 'vettingClass',
            type: 'number',
            label: 'TCR Vetting Class',
            min: 1,
            max: 5,
            defaultValue: 1,
            admin: {
                step: 1,
            },
        },
        {
            name: 'tcrSubmissionSid',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'vettingError',
            type: 'text',
        },
        {
            name: 'optOutRate',
            type: 'number',
            label: 'Opt-Out Rate (Aggregated across campaigns)',
        },
    ],
};
