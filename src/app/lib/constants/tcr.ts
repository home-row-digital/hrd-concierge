export const TCR_BUSINESS_TYPES = [
  { label: 'Private Corporation', value: 'PRIVATE_PROFIT' },
  { label: 'Public Corporation', value: 'PUBLIC_PROFIT' },
  { label: 'LLC', value: 'LLC' },
  { label: 'Partnership', value: 'PARTNERSHIP' },
  { label: 'Sole Proprietor', value: 'SOLE_PROP' },
  { label: 'Non-Profit', value: 'NON_PROFIT' },
  { label: 'Government', value: 'GOVERNMENT' },
] as const;

export const TCR_VERTICALS = [
  { label: 'Automotive', value: 'AUTOMOTIVE' },
  { label: 'Agriculture', value: 'AGRICULTURE' },
  { label: 'Communication', value: 'COMMUNICATION' },
  { label: 'Construction & Trade Services', value: 'CONSTRUCTION' },
  { label: 'Education', value: 'EDUCATION' },
  { label: 'Energy & Utilities', value: 'ENERGY' },
  { label: 'Entertainment', value: 'ENTERTAINMENT' },
  { label: 'Financial Services', value: 'FINANCIAL' },
  { label: 'Gambling / Gaming', value: 'GAMBLING' },
  { label: 'Healthcare & Life Sciences', value: 'HEALTHCARE' },
  { label: 'Hospitality & Travel', value: 'HOSPITALITY' },
  { label: 'Manufacturing', value: 'MANUFACTURING' },
  { label: 'Professional Services (Legal/CPA)', value: 'PROFESSIONAL' },
  { label: 'Real Estate', value: 'REAL_ESTATE' },
  { label: 'Retail & Consumer Products', value: 'RETAIL' },
  { label: 'Technology & IT', value: 'TECHNOLOGY' },
  { label: 'Transportation & Logistics', value: 'TRANSPORTATION' },
  { label: 'Political', value: 'POLITICAL' },
] as const;

export const TCR_CAMPAIGN_STATUSES = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'In Review', value: 'IN_REVIEW' },
  { label: 'Verified', value: 'VERIFIED' },
  { label: 'Failed / Rejected', value: 'FAILED' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Expired', value: 'EXPIRED' },
] as const;

export const TCR_BRAND_STATUSES = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Vetting In Progress', value: 'VETTING_IN_PROGRESS' },
  { label: 'Failed', value: 'FAILED' },
  { label: 'In Review', value: 'IN_REVIEW' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Expired', value: 'EXPIRED' },
  { label: 'Deleted', value: 'DELETED' },
] as const;

export type TcrBrandStatus = (typeof TCR_BRAND_STATUSES)[number]['value'];
export type TcrBusinessType = (typeof TCR_BUSINESS_TYPES)[number]['value'];
export type TcrVertical = (typeof TCR_VERTICALS)[number]['value'];
export type CampaignStatus = (typeof TCR_CAMPAIGN_STATUSES)[number]['value'];
