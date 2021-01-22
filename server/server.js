const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

const userList = [];

const messages = [];
const MAX_MESSAGES = 100;

const songQueue = [];
const songHistory = [];

const nowPlaying = {};
const currentSeekTime = 0;

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const sendToOne = (ws, data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client === ws) {
      client.send(data);
    }
  });
}

const welcomeNewUser = (ws) => {
  const data = JSON.stringify(
    {
      type: 'welcome',
      songQueue,
      songHistory
    }
  )
  sendToOne(ws, data);
}

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

const addMessage = (message) => {
  messages.push(message);

  if (messages.length > MAX_MESSAGES) {
    messages.shift();
  }

  const data = JSON.stringify(
    {
      type: 'messagesUpdate',
      messages
    }
  );

  broadcast(data);
};

const addSong = (username, url) => {
  songQueue.push({
    username,
    url
  });

  const data = JSON.stringify(
    {
      type: 'addSong',
      songQueue
    }
  );

  broadcast(data);
}

wss.on('connection', (ws) => {
  let username = '';
  welcomeNewUser(ws);

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

      case 'addSong':
        const url = clientMessage.url

        addMessage({
          username,
          type: 'addSong',
          timestamp,
          url
        });
        addSong(username, url);
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