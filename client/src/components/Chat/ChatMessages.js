import styled from 'styled-components';

import ChatMessage from './ChatMessage';

const Container = styled.div`
`

const ChatMessages = (props) => {
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

export default ChatMessages;