import styled from 'styled-components';

import ChatMessage from './ChatMessage';

const Container = styled.div`
`

const ChatMessageContainer = (props) => {
  const { messages } = props;

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
    </Container>
  )
}

export default ChatMessageContainer;