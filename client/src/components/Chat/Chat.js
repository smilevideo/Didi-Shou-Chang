import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Container = styled.div`

`

const ChatMessageContainer = styled.div`
  height: 45vh;
  width: 50ch;
  overflow-y: auto;
  
  border: 1px solid black;
  
  ul {
    margin: 10px;
    padding: 0;
  }
`


const Chat = (props) => {
  const { messages, ws } = props;

  const [initialScrollComplete, setInitialScrollComplete] = useState(false);
  const endRef = useRef(null);

  const scrollChatToBottom = () => {
    // endRef.current.scrollIntoView({ behavior: 'smooth' });
    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  // scroll chat to bottom once initial messages are loaded
  useEffect(() => {
    if (!initialScrollComplete && messages.length > 0) {
      scrollChatToBottom();
      setInitialScrollComplete(true);
    }
  }, [messages, initialScrollComplete]);

  return (
    <Container>
      <ChatMessageContainer>
        <ul>
          {messages.map((message, index) => {
            return (
              <ChatMessage
                key={index}
                message={message}
              />)
          })}
        </ul>
        
        <div ref={endRef} />
      </ChatMessageContainer>

      <ChatInput
        ws={ws}
        scrollChatToBottom={scrollChatToBottom}
      />
    </Container>
  )
}

export default Chat;