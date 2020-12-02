import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

import ChatMessage from './ChatMessage';

const Container = styled.div`
  height: 45vh;
  width: 50ch;
  overflow-y: auto;
  
  border: 1px solid black;
  
  ul {
    margin: 10px;
    padding: 0;
  }
`

const ChatMessageContainer = (props) => {
  const { messages } = props;

  const [scrolled, setScrollled] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    if (!scrolled && messages.length > 0) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
      setScrollled(true);
    }
  }, [messages, scrolled]);

  return (
    <Container>
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
    </Container>
  )
}

export default ChatMessageContainer;