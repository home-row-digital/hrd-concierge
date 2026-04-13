export const AI_TONE_OPTIONS = [
  { label: 'Friendly', value: 'FRIENDLY' },
  { label: 'SALES-Y', value: 'SALESY' },
  { label: 'PROFESSIONAL', value: 'PROFESSIONAL' },
] as const;

export const AI_KNOWLEDGE_BASE_CATEGORIES = [
  { label: 'General', value: 'GENERAL' },
  { label: 'Pricing', value: 'PRICING' },
  { label: 'Policy', value: 'POLICY' },
  { label: 'Area', value: 'AREA' },
] as const;

export const AI_SENTIMENTS = [
  { label: 'Positive', value: 'POSITIVE' },
  { label: 'Neutral', value: 'NEUTRAL' },
  { label: 'Negative', value: 'NEGATIVE' },
  { label: 'Frustrated', value: 'FRUSTRATED' },
] as const;

export const AI_INTENTS = [
  { label: 'Inquiry', value: 'INQUIRY' },
  { label: 'Complaint', value: 'COMPLAINT' },
  { label: 'Booking', value: 'BOOKING' },
  { label: 'Support', value: 'SUPPORT' },
  { label: 'Spam', value: 'SPAM' },
] as const;

export type AiTone = (typeof AI_TONE_OPTIONS)[number]['value'];
export type AiKnowledgeBaseCat = (typeof AI_KNOWLEDGE_BASE_CATEGORIES)[number]['value'];
export type AiSentiment = (typeof AI_SENTIMENTS)[number]['value'];
export type AiIntent = (typeof AI_INTENTS)[number]['value'];
