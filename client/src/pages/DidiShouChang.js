import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import Chat from 'components/Chat/Chat';
import UserList from 'components/UserList';

const Container = styled.div`
  background-image: url('/assets/a.gif');
  color: white;
  font-weight: bold;
`;

const DidiShouChang = (props) => {
  const { username } = props;

  const ws = useRef(null);

  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);

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
      else if (message.type === 'userListUpdate') {
        setUserList(message.userList);
      }
    };

    return () => ws.current.close();
  }, [username]);

  return (
    <Container>
      <Chat messages={messages} ws={ws.current} />
      <img src="/assets/a.jpg" alt="warp" />
      <UserList userList={userList} />
    </Container>
  )
}

export default DidiShouChang