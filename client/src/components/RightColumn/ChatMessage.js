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
  color: rgb(0, 130, 0);
`

const UserLeft = styled.span`
  color: rgb(0, 130, 0);

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

  const UtcHoursOffset = (new Date().getTimezoneOffset() / 60) * -1;
  const timestampHours = timestamp.substring(0, 2);
  let newHours = parseInt(timestampHours, 10) + UtcHoursOffset;
  if (newHours < 0) {
    newHours += 24;
  };
  const convertedTimestamp = `${newHours}${timestamp.substring(2)}`;
  
  switch (type) {
    case 'chat':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${convertedTimestamp}: `}</Timestamp>

          <Message>{message}</Message>
        </Container>
      )
    case 'userEnter':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${convertedTimestamp}: `}</Timestamp>

          <UserJoined>has entered Didi-Shou-Chang.</UserJoined>
        </Container>
      ) 
    case 'userLeave':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${convertedTimestamp}: `}</Timestamp>

          <UserLeft>has left Didi-Shou-Chang.</UserLeft>
        </Container>
      )
    case 'addSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${convertedTimestamp}: `}</Timestamp>

          <AddedSong>
            added <SongLabel>'{label}'</SongLabel> to the queue.
          </AddedSong>
        </Container>
      )
    case 'removeSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${convertedTimestamp}: `}</Timestamp>

          <RemovedSong>
            removed <SongLabel>'{label}'</SongLabel> from the queue.
          </RemovedSong>
        </Container>
      )
    default:
      return null;
  }
}

export default ChatMessage;