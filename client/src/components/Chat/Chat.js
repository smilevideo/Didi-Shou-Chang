import { useEffect, useState, useRef } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import UserList from './UserList';

const Chat = (props) => {
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

  const submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { message: messageString, type: 'chat' };
    ws.current.send(JSON.stringify(message));
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              message={message}
            />)
        })}
      </ul>

      <ChatInput
        ws={ws.current}
        onSubmitMessage={(messageString) => submitMessage(messageString)}
      />

      <UserList userList={userList} />
    </div>
  )
}

export default Chat