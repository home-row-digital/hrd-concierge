export const Contracts = {
    slug: 'contracts',
    admin: {
        defaultColumns: ['contractType', 'signedDated'],
        group: 'Compliance & Legal',
    },
    fields: [
        {
            name: 'contractType',
            type: 'select',
            options: ['MSA', 'DPA', 'BAA', 'ADDENDUM'],
        },
        {
            name: 'status',
            type: 'select',
            options: ['DRAFT', 'SENT', 'SIGNED', 'EXPIRED', 'VOIDED'],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'signedDate',
                    type: 'date',
                },
                {
                    name: 'signedByIp',
                    type: 'text',
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'signatureProvider',
                    type: 'select',
                    options: ['DOCUSIGN', 'PANDADOC', 'INTERNAL'],
                },
                {
                    name: 'envelopeId',
                    type: 'text',
                    index: true,
                },
            ],
        },
        {
            name: 'isPrimary',
            type: 'checkbox',
            defaultValue: true,
            label: 'IS Primary Contract',
        },
        {
            name: 'fileAttachment',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'metadata',
            type: 'json',
        },
        {
            name: 'brand',
            type: 'relationship',
            relationTo: 'brands',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'rateCard',
            type: 'relationship',
            relationTo: 'rate-cards',
            admin: {
                position: 'sidebar',
            },
        },
    ],
};
