export const LearningQueue = {
    slug: 'learning-queue',
    admin: {
        group: 'AI & Insights',
    },
    fields: [
        {
            name: 'brand',
            type: 'relationship',
            relationTo: 'brands',
            unique: true,
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'detectedFact',
            type: 'textarea',
            admin: {
                description: 'Example: "We now offer solar roofing"',
            },
        },
        {
            name: 'sourceMessage',
            type: 'textarea',
            admin: {
                description: 'The text context that triggered the new fact',
            },
        },
        {
            name: 'confidence',
            type: 'number',
            min: 0,
            max: 100,
            admin: {
                step: 1,
                description: 'AI\'s certainty that this is a "new fact".',
            },
        },
    ],
};
