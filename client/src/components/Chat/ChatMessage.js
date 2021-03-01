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
  font-size: 0.9rem;
`

const Message = styled.span`
`

const SystemMessage = styled.span`
  color: green;
  opacity: 0.9;
`

const AddedSong = styled.span`
  color: rgba(0, 0, 255, 0.9);
`

const RemovedSong = styled.span`
  color: rgba(255, 0, 0, 0.9);
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
    case 'addSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <AddedSong>added a song to the queue.</AddedSong>

        </Container>
      )
    case 'removeSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <RemovedSong>removed a song from the queue.</RemovedSong>

        </Container>
      )
    default:
      return null;
  }
}

export default ChatMessage;