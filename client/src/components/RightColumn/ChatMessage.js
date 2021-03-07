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

const UserJoined = styled.span`
  color: rgb(0, 150, 0);
`

const UserLeft = styled.span`
  color: rgb(0, 150, 0);

  font-style: italic;
`

const AddedSong = styled.span`
  color: rgb(0, 0, 200);
`

const RemovedSong = styled.span`
  color: rgb(200, 0, 0);
`

const SongLabel = styled.span`
  color: rgb(51, 51, 51);
  font-weight: 500;
`

const ChatMessage = (props) => {
  const { type, message, username, timestamp, label } = props.message;

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
          <UserJoined>has entered Didi-Shou-Chang.</UserJoined>
        </Container>
      ) 
    case 'userLeave':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <UserLeft>has left Didi-Shou-Chang.</UserLeft>
        </Container>
      )
    case 'addSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <AddedSong>added <SongLabel>'{label}'</SongLabel> to the queue.</AddedSong>
        </Container>
      )
    case 'removeSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${timestamp}: `}</Timestamp>
          <RemovedSong>removed <SongLabel>'{label}'</SongLabel> from the queue.</RemovedSong>
        </Container>
      )
    default:
      return null;
  }
}

export default ChatMessage;