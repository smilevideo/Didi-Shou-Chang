import styled from 'styled-components';

import { useState } from 'react';

const ContainerForm = styled.form`
  grid-row: 2;
`

const MessageInput = styled.textarea`
  resize: none;
`

const ChatInput = (props) => {
  const { ws, scrollChatToBottom } = props;

  const [message, setMessage] = useState('');

  const sendMessage = (messageString) => {
    const message = { message: messageString, type: 'chat' };
    ws.send(JSON.stringify(message));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message) {
      sendMessage(message);
      setMessage('');
      scrollChatToBottom();
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  }

  return (
    <ContainerForm onSubmit={handleSubmit}>
      <MessageInput
        placeholder="Message Didi-Shou-Chang"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        cols={33}
        rows={3}
        autoFocus={true}
        maxLength={200}
        onKeyDown={handleKeyDown}
      >
        
      </MessageInput>
      
      <input type="submit" value={'Send'} />
    </ContainerForm>
  )
}

export default ChatInput