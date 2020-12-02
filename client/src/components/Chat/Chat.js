import styled from 'styled-components';

import ChatInput from './ChatInput';
import ChatMessageContainer from './ChatMessageContainer';

const Container = styled.div`

`

const Chat = (props) => {
  const { messages, ws } = props;

  return (
    <Container>
      <ChatMessageContainer messages={messages} />

      <ChatInput
        ws={ws}
      />
    </Container>
  )
}

export default Chat;