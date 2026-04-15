export const Media = {
    slug: 'media',
    admin: {
        group: 'Operations & Billing',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
    upload: true,
};
