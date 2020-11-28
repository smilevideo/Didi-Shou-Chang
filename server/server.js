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

  // alternate approach below, but probably sacrifices performance for less lines of code so no

  // wss.clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     if (client !== ws || includeSelf) {
  //       client.send(data);
  //     }
  //   }
  // });
}

wss.on('connection', (ws) => {
  let username;

  ws.on('message', (data) => {
    console.log(data);

    let returnData;

    const message = JSON.parse(data);
    switch (message.type) {
      case 'userEnter':
        username = message.username
        returnData = JSON.stringify(
          {
            message: `${username} has entered Didi-Shou-Chang.`,
            type: 'system'
          }
        );

        broadcast(ws, returnData, true);
        break;

      case 'chat':
        returnData = JSON.stringify(
          {
            ...JSON.parse(data), 
            username, 
            type: 'chat'
          }
        );

        broadcast(ws, returnData, true);
        break;

      default:
        console.log('missing or unrecognized message type');
    };
  });

  ws.on('close', () => {
    const returnData = JSON.stringify(
      {
        message: `${username} has left Didi-Shou-Chang.`,
        type: 'system'
      }
    )

    broadcast(ws, returnData, true);
  })
});