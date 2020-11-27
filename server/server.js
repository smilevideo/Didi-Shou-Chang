const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

const broadcast = (ws, data, includeSelf = false) => {
  if (includeSelf) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      }
    );  
  }
  
  else {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      }
    );  
  }

  // think the below would sacrifice performance for less lines of code compared to above

  // wss.clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     if (client !== ws || includeSelf) {
  //       client.send(data);
  //     }
  //   }
  // });
}

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log(data);

    broadcast(ws, data, false);
  });
});