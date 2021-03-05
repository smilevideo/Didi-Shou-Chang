import styled from 'styled-components';

import { useState } from 'react';

const Container = styled.div`
  height: 40px;
`

const MessageInput = styled.textarea`
  resize: none;
  width: 100%;
  font: inherit;
  padding: 7px;
`

const ChatInput = (props) => {
  const { sendMessage, scrollChatToBottom } = props;

  const [messageInput, setMessageInput] = useState('');

  const handleKeyDown = (event) => {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault(); //stops the default behavior of the enter key adding a line break to the textarea element

      if (messageInput) {
        const message = { message: messageInput, type: 'chat' };
        sendMessage(message);
        setMessageInput('');
        scrollChatToBottom();
      }
    }
  }

  return (
    <Container>
      <MessageInput
        placeholder="Message Didi-Shou-Chang"
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
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