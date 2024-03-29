import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Container = styled.div`
  height: calc(100vh - 310px);
`

const ChatMessageContainer = styled.div`
  height: calc(100% - 40px);
  overflow-y: auto;
  
  border: 1px solid rgb(45, 55, 65);
  
  ul {
    margin: 5px 5px 10px 10px;
    padding: 0;
  }
`

const Chat = (props) => {
  const { messages, sendMessage } = props;

  const [initialScrollComplete, setInitialScrollComplete] = useState(false);
  const endRef = useRef(null);

  const scrollChatToBottom = () => {
    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  // scroll chat to bottom once initial messages are loaded
  useEffect(() => {
    scrollChatToBottom();

    if (!initialScrollComplete && messages.length > 0) {
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
              />
            )
          })}
        </ul>
        
        <div ref={endRef} />
      </ChatMessageContainer>

      <ChatInput
        sendMessage={sendMessage}
        scrollChatToBottom={scrollChatToBottom}
      />
    </Container>
  )
}

export default Chat;