import styled from 'styled-components';

import { useState } from 'react';

const Container = styled.div`
  height: 43px;
`

const MessageInput = styled.textarea`
  resize: none;
  width: 100%;
  font: inherit;
  padding: 10px;
`

const ChatInput = (props) => {
  const { ws, scrollChatToBottom } = props;

  const [message, setMessage] = useState('');

  const sendMessage = (messageString) => {
    const message = { message: messageString, type: 'chat' };
    ws.send(JSON.stringify(message));
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault(); //stops the default behavior of the enter key adding a line break to the textarea element

      if (message) {
        sendMessage(message);
        setMessage('');
        scrollChatToBottom();
      }
    }
  }

  return (
    <Container>
      <MessageInput
        placeholder="Message Didi-Shou-Chang"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        autoFocus={true}
        maxLength={200}
        onKeyDown={handleKeyDown}
        rows={1}
      >
        
      </MessageInput>
    </Container>
  )
}

export default ChatInput