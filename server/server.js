import dotenv from 'dotenv';
import WebSocket from 'ws';
import fetch from 'node-fetch';

import Song from './Song.js';
import PriorityQ from './PriorityQ.js';

dotenv.config();

const wss = new WebSocket.Server({ port: 3030 });

const userList = [];

const messages = [];
const MAX_MESSAGES = 200;

const songPriorityQueue = new PriorityQ(); //handle max song queue limit on frontend

const songHistory = []; 
const MAX_SONGS_IN_HISTORY = 100;

let nowPlaying = {};
let songStartDate = 0;
let seekTime = 0;

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
  const songQueue = songPriorityQueue.flatten();

  const data = JSON.stringify(
    {
      type: 'welcome',
      songQueue,
      songHistory,
      seekTime,
      userList,
    }
  )
  sendToOne(ws, data);
};

const addUser = (username, timestamp) => {
  userList.push(username);

  const data = JSON.stringify(
    {
      type: 'userEnter',
      userList
    }
  );

  broadcast(data);

  addMessage({
    username,
    type: 'userEnter',
    timestamp
  });
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

const addSong = async (username, url, label, duration, timestamp) => {
  const newSong = new Song(username, url, label, duration);

  //no label implies song from provider URL, not upload
  if (!label) {
    const oEmbedData = await getOEmbedData(url);

    newSong.label = oEmbedData.title;

    //hacky way to fix react-player not being able to play the same url twice in a row 
    if (songPriorityQueue.length > 0 && songPriorityQueue.getSongAtIndex(songPriorityQueue.length - 1).url === url) { 
      const currentDate = Date.now();
      newSong.url = `${url}?in${currentDate}`;
    } 
  };

  songPriorityQueue.push(newSong);

  const songQueue = songPriorityQueue.flatten();

  const data = JSON.stringify(  
    {
      type: 'addSong',
      songQueue
    }
  );

  broadcast(data);

  addMessage({
    username,
    type: 'addSong',
    label: newSong.label,
    timestamp,
  });
};

const removeSong = (index, username, timestamp, label, url) => {
  if (index === 0) {
    nextSong();

    addMessage({
      username,
      type: 'skipSong',
      label,
      timestamp,
    });
  } 
  
  else {
    if (url.startsWith(process.env.S3_UPLOADS)) {
      const filename = url.substring(process.env.S3_UPLOADS.length + 1);

      fetch(encodeURI(`${process.env.S3_DELETE_ENDPOINT}/${filename}`), {
        method: 'DELETE',
      });
    };

    songPriorityQueue.removeSongAtIndex(index);

    const songQueue = songPriorityQueue.flatten();

    const data = JSON.stringify(
      {
        type: 'updateSongLists',
        songQueue,
        songHistory
      }
    );

    broadcast(data);

    addMessage({
      username,
      type: 'removeSong',
      label,
      timestamp,
    });
  };
};

const nextSong = () => {
  nowPlaying = {};
  seekTime = 0;

  const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }); 
  songHistory.unshift({...songPriorityQueue.shift(), timestamp});
  
  if (songHistory.length > MAX_SONGS_IN_HISTORY) {
    const song = songHistory.pop();

    if (song.url.startsWith(process.env.S3_UPLOADS)) {
      const filename = song.url.substring(process.env.S3_UPLOADS.length + 1);

      fetch(encodeURI(`${process.env.S3_DELETE_ENDPOINT}/${filename}`), {
        method: 'DELETE',
      });
    };
  };

  const songQueue = songPriorityQueue.flatten();

  const data = JSON.stringify(
    {
      type: 'updateSongLists',
      songQueue,
      songHistory
    }
  );

  broadcast(data);
};

const timerInterval = setInterval(() => {
  if (songPriorityQueue.length && !nowPlaying.duration) {
    nowPlaying = songPriorityQueue.getSongAtIndex(0);
    songStartDate = Date.now();
  }

  else if (songPriorityQueue.length) {
    seekTime = (Date.now() - songStartDate) / 1000;

    if (seekTime > nowPlaying.duration) {
      nextSong();
    }
  };
}, 500);

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

        addUser(username, timestamp);
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
        addSong(
          username, 
          clientMessage.url, 
          clientMessage.label, 
          clientMessage.duration,
          timestamp
        );
        break;

      case 'removeSong':
        removeSong(
          clientMessage.index,
          username, 
          timestamp,
          clientMessage.label,
          clientMessage.url,
        );
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