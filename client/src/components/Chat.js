import { useEffect, useState, useRef } from 'react';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const Chat = (props) => {
  const { username } = props;
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

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
      addMessage(message);
    };

    return () => ws.current.close();
  }, [username]);

  const submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { username: username, message: messageString, type: 'chat' };
    ws.current.send(JSON.stringify(message));
    setMessages([message, ...messages]);
  };

  return (
    <div>
      <ChatInput
        ws={ws.current}
        onSubmitMessage={(messageString) => submitMessage(messageString)}
      />

      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={index}
            message={message}
          />)
      })}
    </div>
  )
}

export default Chat