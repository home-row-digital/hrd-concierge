import { CrmCollections } from './crm';
import { ComplianceCollections } from './compliance';
import { CommunicationCollections } from './communication';
import { OperationsCollections } from './operations';
import { Users } from './Users';
import { Media } from './Media';
import { AiInsightsCollections } from './AiInsights';
export const collections = [
    ...CommunicationCollections,
    ...ComplianceCollections,
    ...CrmCollections,
    ...OperationsCollections,
    ...AiInsightsCollections,
    Users,
    Media,
];
