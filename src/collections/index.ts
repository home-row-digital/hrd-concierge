import { CollectionConfig } from 'payload';
import { CrmCollections } from './crm';
import { ComplianceCollections } from './compliance';
import { CommunicationCollections } from './communication';
import { OperationsCollections } from './operations';
import { Users } from './Users';
import { Media } from './Media';

export const collections: CollectionConfig[] = [
  ...CommunicationCollections,
  ...ComplianceCollections,
  ...CrmCollections,
  ...OperationsCollections,
  Users,
  Media,
];
