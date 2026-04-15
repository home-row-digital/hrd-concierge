export const Users = {
    slug: 'users',
    admin: {
        group: 'Operations & Billing',
        useAsTitle: 'email',
    },
    auth: true,
    fields: [
        {
            name: 'role',
            type: 'select',
            options: ['ADMIN', 'BRAND_MANAGER'],
        },
    ],
};
