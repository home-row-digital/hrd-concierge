export const ProviderConfigs = {
    slug: 'provider-configs',
    admin: {
        group: 'Communication Infrastructure',
        defaultColumns: ['twilioSubAccountSid', 'gcpQuotaTier'],
        useAsTitle: 'twilioSubAccountSid',
    },
    fields: [
        {
            name: 'brand',
            type: 'relationship',
            relationTo: 'brands',
            required: true,
        },
        {
            name: 'twilioSubAccountSid',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'twilioAuthToken',
            type: 'text',
        },
        {
            name: 'gcpProjectId',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'gcpProjectNumber',
            type: 'text',
        },
        {
            name: 'gcpApiKey',
            type: 'text',
        },
        {
            name: 'gcpServiceAccountEmail',
            type: 'text',
        },
        {
            name: 'gcpProjectStatus',
            type: 'select',
            options: ['PROVISIONING', 'ACTIVE', 'SUSPENDED', 'ERROR'],
            defaultValue: 'PROVISIONING',
        },
        {
            name: 'gcpSpendBudgetCap',
            label: 'Google Cloud Spend Cap (Cents)',
            type: 'number',
            defaultValue: 5000,
        },
        {
            name: 'gcpQuotaTier',
            type: 'select',
            options: ['HIGH', 'LOW'],
            defaultValue: 'HIGH',
        },
    ],
};
