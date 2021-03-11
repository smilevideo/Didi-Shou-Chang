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
  color: rgb(86, 211, 100);
`

const UserLeft = styled.span`
  color: rgb(86, 211, 100);

  font-style: italic;
`

const AddedSong = styled.span`
  color: rgb(88, 166, 255);
`

const RemovedSong = styled.span`
  color: rgb(248, 81, 73);
`

const SongLabel = styled.span`
  color: rgb(201, 209, 217);
  font-weight: bold;
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
    case 'skipSong':
      return (
        <Container>
          <Username>{`${username} `}</Username>
          <Timestamp>{`${convertedTimestamp}: `}</Timestamp>

          <RemovedSong>
            <SongLabel>'{label}'</SongLabel> was skipped.
          </RemovedSong>
        </Container>
      )
    default:
      return null;
  }
}

export default ChatMessage;