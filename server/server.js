const WebSocket = require('ws');
const fetch = require('node-fetch');

const wss = new WebSocket.Server({ port: 3030 });

const userList = [];

const messages = [];
const MAX_MESSAGES = 100;

const songQueue = [];
const songHistory = [];

let nowPlaying = {};

let seekTime = 0;

const timerInterval = setInterval(() => {
  if (songQueue.length && !nowPlaying.duration) {
    nowPlaying = songQueue[0];
  }

  else if (songQueue.length) {
    seekTime += 1;

    if (seekTime >= nowPlaying.duration) {
      nowPlaying = {};
      seekTime = 0;
      
      nextSong();
    }
  }
}, 1000);

const getOEmbedData = async (url) => {
  // hacky way to check if soundcloud
  if (url.includes('soundcloud.')) {
    const fetchUrl = `https://www.soundcloud.com/oembed?url=${url}&format=json`;
    
    const response = await fetch(fetchUrl);

    return response.json();
  }

  // otherwise assume youtube
  else {
    const fetchUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;

    const response = await fetch(fetchUrl);

    return response.json();
  }
}

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
      songHistory,
      seekTime
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

const addSong = (username, duration, url) => {
  getOEmbedData(url)
    .then((oEmbedData) => {
      songQueue.push({
        username,
        url, 
        duration,
        oEmbedData
      });
    
      const data = JSON.stringify(
        {
          type: 'addSong',
          songQueue
        }
      );
    
      broadcast(data);
    });
}

const nextSong = () => {
  const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 
  songHistory.push({...songQueue.shift(), timestamp});

  const data = JSON.stringify(
    {
      type: 'nextSong',
      songQueue,
      songHistory
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
        const { url, duration }  = clientMessage;

        addMessage({
          username,
          type: 'addSong',
          timestamp,
          url
        });
        addSong(username, duration, url);
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