export async function handleRelayConnection(socket: any, payload: any) {
  socket.on('error', (err: any) => console.error('WebSocket Error:', err));

  // session stores data for THIS specific call
  let session = {
    voiceLogId: null as string | null,
    systemPrompt: null as string | null,
    turn: 1,
  };

  socket.on('message', async (data: Buffer) => {
    try {
      // Filter out Twilio KeepAlive empty strings
      const rawData = data.toString();
      // if (!rawData.trim()) return;

      const msg = JSON.parse(data.toString());

      switch (msg.type) {
        case 'setup':
          // Twilio introduces itself and passes our parameters
          session.voiceLogId = msg.customParameters?.voiceLogId;
          session.systemPrompt = msg.customParameters?.systemPrompt;
          console.log(`Relay Setup for Log ID: ${session.voiceLogId}`);

          // CRITICAL: Send a token immediately to acknowledge setup
          // This prevents the "8-second silence" before Twilio hangs up.
          // if (socket.readyState === 1) {
          //   socket.send(
          //     JSON.stringify({
          //       type: 'text',
          //       token: 'Connection established.', // KEY MUST BE 'token'
          //       last: true,
          //     }),
          //   );
          // }
          break;

        case 'prompt':
          console.log(`User said: ${msg.voicePrompt}`);

          // GENERATE RESPONSE: This is where you'd call OpenAI/Groq
          const aiResponse = 'I can hear you! Your voice is being processed by the new relay.';

          // SEND TEXT: Twilio turns this into speech (TTS)
          if (socket.readyState === 1) {
            socket.send(
              JSON.stringify({
                type: 'text',
                token: aiResponse,
                last: true, // Tells Twilio the AI is finished speaking
              }),
            );
          }

          // LOGGING: Save the conversation to the DB in the background
          if (session.voiceLogId) {
            payload
              .create({
                collection: 'transcriptions',
                data: {
                  voiceLog: session.voiceLogId,
                  speaker: 'AI_ASSISTANT',
                  textContent: aiResponse,
                  turnNumber: session.turn++,
                },
              })
              .catch((e: any) => console.error('DB Logging failed:', e));
          }
          break;

        case 'terminate':
          console.log('Twilio terminated the call session.');
          socket.close();
          break;

        case 'interrupt':
          console.log('User interrupted the AI.');
          // In a real app, you'd stop your LLM generation here.
          break;

        // Handles internal Ping so it doesn't fall through
        case 'ping':
          socket.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (err) {
      console.error('RELAY PROCESSING ERROR:', err);
    }
  });

  socket.on('close', (code: number) => {
    console.log(`[RELAY] Socket Closed. Code: ${code}`);
  });
}
