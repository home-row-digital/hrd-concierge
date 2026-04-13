import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import next from 'next/dist/server/next.js';
import { createServer } from 'node:http';
import { parse } from 'node:url';
import { getPayload } from 'payload';
import { WebSocketServer } from 'ws';
import { handleRelayConnection } from './services/twilio/relayHandler.js';
import { getPayloadClient } from './services/payload/getPayloadClient.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const payload = await getPayloadClient();

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Initialize wss without a path since we handled it manually
  const wss = new WebSocketServer({ noServer: true });

  // Handle Protocol Upgrade (HTTP -> WS)
  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '', true);

    if (pathname === '/api/voice/stream') {
      wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
    }

    // Next.js HMR upgrades are handled automatically by the 'handle' function
    // called in the createServer block, so we don't need an 'else' here.
  });

  wss.on('connection', async (socket) => {
    handleRelayConnection(socket, payload);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`> Server ready on port ${PORT}`));
});
