const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
const userList = [];
const messages = [];
const MAX_MESSAGES = 100;

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const addUser = (username) => {
  userList.push(username);

  const data = JSON.stringify(
    {
      type: 'userEnter',
      userList
    }
  );

  broadcast(data);
};

const removeUser = (username) => {
  const index = userList.indexOf(username);
  userList.splice(index, 1);

  const data = JSON.stringify(
    {
      type: 'userLeave',
      userList
    }
  );

  broadcast(data);
}

const sendMessages = () => {
  const data = JSON.stringify(
    {
      type: 'messagesUpdate',
      messages
    }
  );

  broadcast(data);
};

const addMessage = (message) => {
  messages.push(message);

  if (messages.length > MAX_MESSAGES) {
    messages.shift();
  }

  sendMessages();
};

wss.on('connection', (ws) => {
  let username = '';

  ws.on('message', (data) => {
    console.log(data);

    // HH:mm format
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 

    const clientMessage = JSON.parse(data);
    switch (clientMessage.type) {
      case 'userEnter':
        username = clientMessage.username;

        addMessage({
          username,
          type: 'userEnter',
          timestamp
        });
        addUser(username);
        break;

      case 'chat':
        addMessage({
          message: clientMessage.message,
          username, 
          type: 'chat',
          timestamp
        });
        break;

      default:
        console.log('missing or unrecognized message type');
    };
  });

  ws.on('close', () => {
    // HH:mm format
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 

    addMessage({
      username,
      type: 'userLeave',
      timestamp
    });
    removeUser(username);
  });
});