import styled from 'styled-components';

import ChatInput from './ChatInput';
import ChatMessageContainer from './ChatMessageContainer';

const Container = styled.div`
  /* height: 100vh; */
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