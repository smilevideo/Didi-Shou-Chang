import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import NowPlaying from 'components/LeftColumn/NowPlaying';
import Tabs from 'components/LeftColumn/Tabs';
import SongQueue from 'components/LeftColumn/SongQueue';
import SongHistory from 'components/LeftColumn/SongHistory';

import AudioPlayer from 'components/CenterColumn/AudioPlayer';
import SongUpload from 'components/CenterColumn/SongUpload';
import SongByURLInput from 'components/CenterColumn/SongByURLInput';
import QueueFull from 'components/CenterColumn/QueueFull';
import Footer from 'components/CenterColumn/Footer';

import Chat from 'components/RightColumn/Chat';
import UserList from 'components/RightColumn/UserList';

const Container = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  grid-template-rows: 100vh;
`;

const LeftColumn = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
`;

const CenterColumn = styled.div`
  grid-column: 2;
  display: grid;
  
  grid-template-rows: 55% 1fr 30px;
  grid-template-columns: 100%;
  justify-content: center;
  align-items: center;

  position: relative;

  &:before {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: ${props => props.showBackground ? props.volume : '0'};
    content: "";
    background-image: url('/assets/a.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
`;

const RightColumn = styled.div`
  grid-column: 3;
  display: flex;
  flex-direction: column;
`;

const beep2 = new Audio('/assets/beep2.mp3');

const DidiShouChang = (props) => {
  const { username } = props;

  const ws = useRef(null);

  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [songQueue, setSongQueue] = useState([]);
  const [songHistory, setSongHistory] = useState([]);
  const [seekTime, setSeekTime] = useState(0);

  const [volume, setVolume] = useState(1);

  const [leftColumnTab, setLeftColumnTab] = useState('FUTURE');

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

      switch (message.type) {
        case 'messagesUpdate':
          setMessages(message.messages);
          break;

        case 'userEnter':
          setUserList(message.userList);
          break;

        case 'userLeave':
          setUserList(message.userList);
          break;

        case 'welcome':
          setSongQueue(message.songQueue);
          setSongHistory(message.songHistory);
          setSeekTime(message.seekTime);

          beep2.play();
          break;

        case 'addSong':
          setSongQueue(message.songQueue);
          break;

        case 'updateSongLists':
          setSongQueue(message.songQueue);
          setSongHistory(message.songHistory);
          break;

        default:
          console.log('missing or unrecognized message type');
      };
    };

    return () => ws.current.close();
  }, [username]);

  const sendMessage = (message) => {
    ws.current.send(JSON.stringify(message));
  };

  return (
    <Container>
      <LeftColumn>
        <NowPlaying 
          song={songQueue[0]}
          sendMessage={sendMessage}
          volume={volume}
          setVolume={setVolume}
        />

        <Tabs tab={leftColumnTab} setTab={setLeftColumnTab} />
        
        {(leftColumnTab === 'PAST') && (
          <SongHistory songHistory={songHistory} />
        )}

        {(leftColumnTab === 'FUTURE') && (
          <SongQueue 
            songQueue={songQueue} 
            sendMessage={sendMessage} 
            volume={volume}
            setVolume={setVolume}
          />
        )}
        
        
      </LeftColumn>

      <CenterColumn showBackground={songQueue.length} volume={volume} >
        <AudioPlayer 
          song={songQueue.length ? songQueue[0] : null} 
          seekTime={seekTime} 
          volume={volume}
          setVolume={setVolume}
        />

        {(songQueue.length < 50) ? 
          <div>
            <SongUpload sendMessage={sendMessage} />
            <SongByURLInput sendMessage={sendMessage} />
          </div> 
          :
          <QueueFull />
        }
      
        <Footer />
      </CenterColumn>
      
      <RightColumn>
        <UserList userList={userList} username={username} />
        <Chat messages={messages} sendMessage={sendMessage} />
      </RightColumn>
    </Container>
  )
}

export default DidiShouChang