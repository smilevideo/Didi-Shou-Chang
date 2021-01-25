import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import Chat from 'components/Chat/Chat';
import UserList from 'components/UserList';
import SongQueue from 'components/SongQueue';
import SongHistory from 'components/SongHistory';
import SongUpload from 'components/SongUpload';
import SongByURLInput from 'components/SongByURLInput';
import AudioPlayer from 'components/AudioPlayer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  grid-template-rows: 1fr;
`;

const Column = styled.div`
  grid-column: ${props => props.gridColumn};
  display: flex;
  flex-direction: column;
`

const beep1 = new Audio('/assets/beep1.mp3');
const beep2 = new Audio('/assets/beep2.mp3');

const DidiShouChang = (props) => {
  const { username } = props;

  const ws = useRef(null);

  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [songQueue, setSongQueue] = useState([]);
  const [songHistory, setSongHistory] = useState([]);

  // connect and set up WebSocket on initialize
  useEffect(() => {
    const WEBSOCKET_URL = 'ws://localhost:3030'
    ws.current = new WebSocket(WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log('connected');
      const message = {username, type: 'userEnter'};
      ws.current.send(JSON.stringify(message));
    };
  
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'messagesUpdate') {
        setMessages(message.messages);
      }

      else if (message.type === 'userEnter') {
        setUserList(message.userList);
        beep2.play();
      }

      else if (message.type === 'userLeave') {
        setUserList(message.userList);
        beep1.play();
      }

      else if (message.type === 'welcome') {
        setSongQueue(message.songQueue);
        setSongHistory(message.songHistory);
      }

      else if (message.type === 'addSong') {
        setSongQueue(message.songQueue);
      }
    };

    return () => ws.current.close();
  }, [username]);

  return (
    <Container>
      <Column gridColumn={1}>
        <SongQueue songQueue={songQueue} />
        <SongHistory songHistory={songHistory} />
      </Column>

      <Column gridColumn={2}>
        {/* <SongUpload /> */}
        <SongByURLInput ws={ws.current} />
        {songQueue.length > 0 && <AudioPlayer url={songQueue[0].url} />}
      </Column>
      
      <Column gridColumn={3}>
        <UserList userList={userList} />
        <Chat messages={messages} ws={ws.current} />
      </Column>
    </Container>
  )
}

export default DidiShouChang