import styled from 'styled-components';

const Container = styled.li`
  list-style-type: none;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

const Username = styled.span`
  font-weight: bold;
`

const Timestamp = styled.span`
  font-size: 12px;
`

const Message = styled.span`
`

const SystemMessage = styled.span`
  font-style: italic;
`

const ChatMessage = (props) => {
  const { type, message, username, timestamp } = props.message;

  switch (type) {
    case 'chat':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <Message>{message}</Message>
        </Container>
      )
    case 'userEnter':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <SystemMessage>has entered Didi-Shou-Chang.</SystemMessage>
        </Container>
      ) 
    case 'userLeave':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <SystemMessage>has left Didi-Shou-Chang.</SystemMessage>
        </Container>
      )
    default:
      return null;
  }
}

export default ChatMessage;