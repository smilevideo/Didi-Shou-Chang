const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
const userList = [];
const messages = [];
const MAX_MESSAGES = 100;

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
};

const addUser = (username) => {
  userList.push(username);

  const returnData = JSON.stringify(
    {
      type: 'userListUpdate',
      userList
    }
  );

  broadcast(null, returnData, true);
};

const removeUser = (username) => {
  const index = userList.indexOf(username);
  userList.splice(index, 1);

  const returnData = JSON.stringify(
    {
      type: 'userListUpdate',
      userList
    }
  );

  broadcast(null, returnData, true);
}

wss.on('connection', (ws) => {
  let username = '';

  ws.on('message', (data) => {
    console.log(data);
    let returnData = '';

    // HH:mm format
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 

    const message = JSON.parse(data);
    switch (message.type) {
      case 'userEnter':
        username = message.username;

        returnData = JSON.stringify(
          {
            message: `${username} has entered Didi-Shou-Chang.`,
            type: 'system',
            timestamp
          }
        );

        broadcast(ws, returnData, true);
        addUser(username);
        break;

      case 'chat':
        returnData = JSON.stringify(
          {
            ...JSON.parse(data), 
            username, 
            type: 'chat',
            timestamp
          }
        );

        broadcast(ws, returnData, true);
        break;

      default:
        console.log('missing or unrecognized message type');
    };
  });

  ws.on('close', () => {
    // HH:mm format
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 

    const returnData = JSON.stringify(
      {
        message: `${username} has left Didi-Shou-Chang.`,
        type: 'system',
        timestamp
      }
    )

    broadcast(ws, returnData, true);
    removeUser(username);
  });
});