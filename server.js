const express = require('express');
const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static('public'));

// Edit your IPs here
const TARGETS = [
  { label: 'pfsense Gateway',    ip: '192.168.1.1' },
  { label: 'Google DNS',       ip: '8.8.8.8'     },
  { label: 'Cloudflare DNS',ip: '1.1.1.1'     },
  { label: 'p1 proxy',  ip: '54.144.16.194' },
  { label: 'p2 proxy',  ip: '54.198.49.157' },
  { label: 'p3 proxy',  ip: '18.209.166.130' },
  { label: 'p4 proxy',  ip: '52.91.215.81' },
];

wss.on('connection', (ws) => {
  const processes = [];

  TARGETS.forEach((target, index) => {
    // Linux uses -i for interval; Windows uses -t for continuous
    const ping = spawn('ping', ['-i', '1', target.ip]);

    ping.stdout.on('data', (data) => {
      if (ws.readyState === 1) {
        ws.send(JSON.stringify({
          index,
          label: target.label,
          ip: target.ip,
          line: data.toString().trim()
        }));
      }
    });

    ping.stderr.on('data', (data) => {
      if (ws.readyState === 1) {
        ws.send(JSON.stringify({ index, label: target.label, ip: target.ip, line: `ERROR: ${data}` }));
      }
    });

    processes.push(ping);
  });

  ws.on('close', () => {
    processes.forEach(p => p.kill());
  });
});

server.listen(3000, () => console.log('Ping Monitor running at http://localhost:3000'));