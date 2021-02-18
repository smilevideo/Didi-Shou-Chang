import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import Chat from 'components/Chat/Chat';
import UserList from 'components/UserList';
import SongQueue from 'components/SongQueue';
import SongHistory from 'components/SongHistory';
import SongByURLInput from 'components/SongByURLInput';
import AudioPlayer from 'components/AudioPlayer';

import FillerVisuals from 'components/FillerVisuals';

const Container = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  grid-template-rows: 1fr;
`;

const LeftColumn = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
`

const CenterColumn = styled.div`
  grid-column: 2;
  display: grid;
  
  grid-template-rows: 18vh 1fr 18vh;
  justify-content: center;
  align-items: center;
`

const RightColumn = styled.div`
  grid-column: 3;
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
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

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
      <LeftColumn>
        <SongQueue songQueue={songQueue} />
        <SongHistory songHistory={songHistory} />
      </LeftColumn>

      <CenterColumn>
        {/* <SongUpload /> */}
        {songQueue.length > 0 && <>
          <AudioPlayer song={songQueue[0]} />
        </>}

        <FillerVisuals />

        <SongByURLInput ws={ws.current} />
      </CenterColumn>
      
      <RightColumn>
        <UserList userList={userList} />
        <Chat messages={messages} ws={ws.current} />
      </RightColumn>
    </Container>
  )
}

export default DidiShouChang