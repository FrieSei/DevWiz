import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { NextApiRequest } from 'next';
import { auth } from '@clerk/nextjs';
import { FileProcessingEvent } from '@/lib/websocket/types';

const wss = new WebSocketServer({ noServer: true });

const server = createServer((req, res) => {
  res.writeHead(404);
  res.end();
});

server.on('upgrade', async (request: NextApiRequest, socket, head) => {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } catch (error) {
    console.error('WebSocket upgrade error:', error);
    socket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
    socket.destroy();
  }
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString()) as FileProcessingEvent;
      // Handle incoming messages if needed
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};