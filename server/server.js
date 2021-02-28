const WebSocket = require('ws');
const fetch = require('node-fetch');

const wss = new WebSocket.Server({ port: 3030 });

const userList = [];

const messages = [];
const MAX_MESSAGES = 100;

const songQueue = []; //handle max song queue limit on frontend

const songHistory = []; 
const MAX_SONGS_IN_HISTORY = 50;

let nowPlaying = {};

let seekTime = 0;

const timerInterval = setInterval(() => {
  if (songQueue.length && !nowPlaying.duration) {
    nowPlaying = songQueue[0];
  }

  else if (songQueue.length) {
    seekTime += 1;

    if (seekTime >= nowPlaying.duration) {
      nextSong();
    }
  }
}, 1000);

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
};

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
};

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
};

const addSong = async (username, url, label, duration) => {
  // TODO: order the queue so that each user takes turn playing songs, maybe not necessarily here

  //no label implies song from provider URL, not upload
  if (!label) {
    const oEmbedData = await getOEmbedData(url);

    //hacky way to fix react-player not being able to play the same url twice in a row 
    // -- adding ?in to the end of the url seems to still let it play for both yt and sc
    if (songQueue.length > 0 && songQueue[songQueue.length - 1].url === url) { 
      songQueue.push({
        username,
        url: `${url}?in`,
        label: oEmbedData.title,
        duration
      });
    } 
    
    else {
      songQueue.push({
        username,
        url,
        label: oEmbedData.title,
        duration
      });
    };
  }
  
  else {
    songQueue.push({
      username,
      url,
      label,
      duration
    });
  };

  const data = JSON.stringify(
    {
      type: 'addSong',
      songQueue
    }
  );

  broadcast(data);
};

const removeSong = (index) => {
  if (index === 0) {
    nextSong();
  } else {
    songQueue.splice(index, 1);
  };

  const data = JSON.stringify(
    {
      type: 'updateSongLists',
      songQueue,
      songHistory
    }
  );

  broadcast(data);
};

const nextSong = () => {
  nowPlaying = {};
  seekTime = 0;

  const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 
  songHistory.unshift({...songQueue.shift(), timestamp});
  
  if (songHistory.length > MAX_SONGS_IN_HISTORY) {
    songHistory.pop();
  };

  const data = JSON.stringify(
    {
      type: 'updateSongLists',
      songQueue,
      songHistory
    }
  );

  broadcast(data);
};

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
        const { url, label, duration } = clientMessage;

        addSong(username, url, label, duration);

        addMessage({
          username,
          type: 'addSong',
          timestamp,
        });
        break;

      case 'removeSong':
        const { index } = clientMessage;

        removeSong(index);

        addMessage({
          username,
          type: 'removeSong',
          timestamp,
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