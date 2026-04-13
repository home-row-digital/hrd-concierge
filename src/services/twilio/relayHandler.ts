import { Payload } from 'payload';
import { generateAiResponse } from '../ai/gemini';

export async function handleRelayConnection(socket: any, payload: Payload) {
  let voiceLogId: string;
  let leadId: string;
  let personaId: string;
  let startTime = Date.now();

  socket.on('message', async (data: Buffer) => {
    try {
      const msg = JSON.parse(data.toString());

      switch (msg.type) {
        case 'setup':
          voiceLogId = msg.customParameters?.voiceLogId;
          leadId = msg.customParameters?.leadId;
          personaId = msg.customParameters?.personaId;
          console.log(`[RELAY] Session Linked: ${voiceLogId}`);
          break;

        case 'prompt':
          if (!voiceLogId || !personaId) {
            console.error('[RELAY] Received prompt before setup!');
            return;
          }

          // Log Lead Input
          await payload.create({
            collection: 'transcriptions',
            data: {
              voiceLog: Number(voiceLogId),
              speaker: 'LEAD',
              textContent: msg.voicePrompt,
              timestamp: Date.now() - startTime,
              isLive: true,
            },
          });

          // Fetch Persona & Generate Response
          const persona = await payload.findByID({ collection: 'personas', id: personaId });
          const aiResponse = await generateAiResponse(
            msg.voicePrompt,
            persona.systemPrompt,
            leadId,
            typeof persona.brand === 'object'
              ? persona.brand!.id.toString()
              : persona.brand!.toString(),
          );

          // Send back to Twilio
          socket.send(
            JSON.stringify({
              type: 'text',
              token: aiResponse,
              last_token: true, // Tells Twilio AI is done speaking
            }),
          );

          // Log AI response
          await payload.create({
            collection: 'transcriptions',
            data: {
              voiceLog: Number(voiceLogId),
              speaker: 'AI_ASSISTANT',
              textContent: aiResponse,
              timestamp: Date.now() - startTime,
              isLive: true,
            },
          });
          break;

        case 'terminate':
          console.log(`[RELAY] Terminated: ${voiceLogId}`);
          break;
      }
    } catch (err) {
      console.error('[RELAY ERROR]', err);
    }
  });

  socket.on('close', () => console.log('Relay Socket Closed'));
}
