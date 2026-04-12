import dotenv from 'dotenv';
import next from 'next/dist/server/next.js';
import { createServer } from 'node:http';
import { parse } from 'node:url';
import path from 'path';
import { getPayload } from 'payload';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const { default: config } = await import('./payload.config.js');

  const server = createServer(async (req, res) => {
    const host = req.headers.host || '';
    const parts = host.split('.');
    const subdomain = parts.length > 2 ? parts[0] : null;

    const parsedUrl = parse(req.url!, true);
    const { pathname } = parsedUrl;

    // ROUTING
    switch (pathname) {
      default:
        handle(req, res, parsedUrl);
    }
  });

  // Initialize wss without a path since we handled it manually
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url || '', true);

    if (pathname === '/voice') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }

    // Next.js HMR upgrades are handled automatically by the 'handle' function
    // called in the createServer block, so we don't need an 'else' here.
  });

  wss.on('connection', async (socket, req) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const brandId = url.searchParams.get('brandId');

    console.log(`Brand Connected: ${brandId}`);

    socket.on('message', async (data) => {
      try {
        const msg = JSON.parse(data.toString());

        if (msg.type === 'prompt') {
          // THIS IS WHERE THE MAGIC HAPPENS!
          console.log('Twilio is asking for an AI response...');
        }
      } catch (err) {
        console.error(`Error parsing WebSocket message: ${err}`);
      }
    });

    socket.on('close', () => console.log(`Brand ${brandId} disconnected`));
  });

  server.listen(3000, () => console.log(`> Server ready on http://localhost:3000`));
});
