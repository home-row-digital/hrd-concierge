import { getPayloadClient } from '../payload/getPayloadClient';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Factory to get Brand-specific Gemini client
 */
async function getBrandAiClient(brandId: string) {
  const payload = await getPayloadClient();

  const configQuery = await payload.find({
    collection: 'provider-configs',
    where: { brandId: { equals: brandId } },
    limit: 1,
  });

  const config = configQuery.docs[0];

  if (!config) {
    throw new Error(`Critical Error: No Infrastructure config found for Brand ${brandId}`);
  }

  const apiKey = config.gcpApiKey;
  if (!apiKey) {
    throw new Error(`AI Gateway Error: Missing API Key for GCP Project: ${config.gcpProjectId}`);
  }

  return new GoogleGenerativeAI(apiKey);
}

export async function generateAiResponse(
  userText: string,
  systemPrompt: string,
  leadId: string,
  brandId: string,
) {
  try {
    const genAI = await getBrandAiClient(brandId);

    // Using FLahs model for Voice keeps latency under 500ms
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 150, // Keep AI from rambling
        temperature: 0.7,
      },
    });

    const payload = await getPayloadClient();

    // Fetch 'memory' from 'conversations' (convo summary)
    const conversation = await payload.find({
      collection: 'lead-conversation',
      where: { lead: { equals: leadId } },
      limit: 1,
    });

    const contextSummary = conversation.docs[0]?.summary || 'No previous contact.';

    // The Chat turn
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `System Instruction: ${systemPrompt}` }],
        },
        {
          role: 'model',
          parts: [{ text: `Context Memory: ${contextSummary}. I am ready.` }],
        },
      ],
    });

    const result = await chat.sendMessage(userText);
    const responseText = result.response.text();

    // Clean up markdown so AI doesn't speak "asterisk"
    return responseText.replace(/[*#_]/g, '').trim();
  } catch (err) {
    console.error(`[BRAND AI FAILURE - ${brandId}]:`, err);
    return "I'm sorry, I'm having a slight connection issue. What were you saying?";
  }
}
