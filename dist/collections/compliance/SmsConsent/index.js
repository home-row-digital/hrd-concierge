export const SmsConsent = {
    slug: 'sms-consent',
    admin: {
        defaultColumns: ['id'],
        group: 'Compliance & Legal',
    },
    fields: [
        {
            name: 'smsLog',
            type: 'relationship',
            relationTo: 'sms-logs',
            required: true,
        },
        {
            name: 'body',
            type: 'textarea',
            required: true,
        },
    ],
};
