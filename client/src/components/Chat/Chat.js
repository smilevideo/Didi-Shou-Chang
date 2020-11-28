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

    const addMessage = (message) => {
      setMessages(previousMessages => [message, ...previousMessages]);
    };


    ws.current.onopen = () => {
      console.log('connected');
      const message = {username, type: 'userEnter'};
      ws.current.send(JSON.stringify(message));
    };
  
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'system' || message.type === 'chat') {
        addMessage(message);
      }
      else if (message.type === 'userListUpdate') {
        setUserList(message.userList);
      }
    };

    return () => ws.current.close();
  }, [username]);

  // set maximum number of messages to store and show;
  const MAX_MESSAGES = 100;
  useEffect(() => {
    if (messages.length > MAX_MESSAGES) {
      messages.pop();
    }
  }, [messages]);


  const submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { message: messageString, type: 'chat' };
    ws.current.send(JSON.stringify(message));
  };

  return (
    <div>
      <ChatInput
        ws={ws.current}
        onSubmitMessage={(messageString) => submitMessage(messageString)}
      />

      <ul>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              message={message}
            />)
        })}
      </ul>

      <UserList userList={userList} />
    </div>
  )
}

export default Chat