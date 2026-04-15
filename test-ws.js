import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end('HTTP works!');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('✅ TEST WS CONNECTED!');
  ws.send('Hello from local test!');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Test server on http://127.0.0.1:3000');
});
