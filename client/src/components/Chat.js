import { useEffect, useState } from 'react';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'ws://localhost:3030'

const ws = new WebSocket(URL);


const Chat = (props) => {
  const { username } = props;
  const [messages, setMessages] = useState([]);

  ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected');
  };

  ws.onmessage = (event) => {
    // on receiving a message, add it to the list of messages
    console.log(event);
    const message = JSON.parse(event.data);
    addMessage(message);
  };

  ws.onclose = () => {
    console.log('disconnected');
  };

  const addMessage = (message) => {
    setMessages([message, ...messages]);
  };

  const submitMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { username: username, message: messageString };
    ws.send(JSON.stringify(message));
    addMessage(message);
  };

  return (
    <div>
      <ChatInput
        ws={ws}
        onSubmitMessage={(messageString) => submitMessage(messageString)}
      />

      {messages.map((message, index) => {
        return (
          <ChatMessage
            key={index}
            message={message.message}
            username={message.username}
          />)
      })}
    </div>
  )
}

export default Chat