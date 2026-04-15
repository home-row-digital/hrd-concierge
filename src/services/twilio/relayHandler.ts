export async function handleRelayConnection(socket: any, payload: any) {
  let session = {
    voiceLogId: null as string | null,
    turn: 1,
  };

  console.log('[RELAY] Socket connected.');

  socket.on('message', async (data: Buffer) => {
    try {
      const raw = data.toString().trim();

      // PROTECT AGAINST 1006: Skip non-JSON heartbeats/preambles
      if (!raw || !raw.startsWith('{')) return;

      const msg = JSON.parse(raw);

      switch (msg.type) {
        case 'setup':
          session.voiceLogId = msg.customParameters?.voiceLogId;
          console.log(`[RELAY] Setup received. ID: ${session.voiceLogId}`);

          socket.send(
            JSON.stringify({
              type: 'text',
              token: 'System online. How can I help you today?',
              last: true,
            }),
          );
          break;

        case 'prompt':
          console.log(`[USER]: ${msg.voicePrompt}`);

          const aiResponse = 'I can hear you clearly. The relay is working.';

          socket.send(
            JSON.stringify({
              type: 'text',
              token: aiResponse,
              last: true,
            }),
          );

          /* --- PAYLOAD LOGGING (COMMENTED OUT FOR TESTING) ---
          if (session.voiceLogId && session.voiceLogId !== 'TEST_MODE') {
            payload.create({
              collection: 'transcriptions',
              data: {
                voiceLog: session.voiceLogId,
                speaker: 'AI_ASSISTANT',
                textContent: aiResponse,
                turnNumber: session.turn++,
              },
            }).catch((e: any) => console.error('DB Fail:', e));
          }
          -------------------------------------------------- */
          break;

        case 'ping':
          // Mandatory to prevent 1006 timeout
          socket.send(JSON.stringify({ type: 'pong' }));
          break;

        case 'terminate':
          socket.close();
          break;
      }
    } catch (err) {
      console.error('[RELAY CRASH PREVENTED]:', err);
    }
  });

  socket.on('close', (code: number) => console.log(`[RELAY] Closed: ${code}`));
}
