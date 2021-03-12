import styled from 'styled-components';

const MessageContainer = styled.li`
  list-style-type: none;

  display: grid;
  grid-template-columns: 270px 38px;
  grid-gap: 6px;
  margin-bottom: 5px;
`

const Timestamp = styled.div`
  font-size: 0.9rem;
  display: grid;
  justify-content: center;
  align-items: center;
`

const Message = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

const UserJoined = styled.span`
  color: rgb(86, 211, 100);
`

const UserLeft = styled.span`
  color: rgb(86, 211, 100);
`

const AddedSong = styled.span`
  color: rgb(88, 166, 255);
`

const RemovedSong = styled.span`
  color: rgb(248, 81, 73);
`

const Username = styled.span`
  color: rgb(201, 209, 217);
  font-weight: bold;
`

const AddedSongName = styled.span`
  color: rgb(108, 186, 255);
  font-weight: bold;
`

const RemovedSongName = styled.span`
  color: rgb(255, 101, 93);
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
        <MessageContainer>
          <Message>
            <Username>{username}: </Username>{message}
          </Message>
          
          <Timestamp>{convertedTimestamp}</Timestamp>
        </MessageContainer>
      )
    case 'userEnter':
      return (
        <MessageContainer>
          <UserJoined>
            <Username>{username}</Username> has entered Didi-Shou-Chang.
          </UserJoined>

          <Timestamp>{convertedTimestamp}</Timestamp>
        </MessageContainer>
      ) 
    case 'userLeave':
      return (
        <MessageContainer>
          <UserLeft>
            <Username>{username}</Username> has left Didi-Shou-Chang.
          </UserLeft>

          <Timestamp>{convertedTimestamp}</Timestamp>
        </MessageContainer>
      )
    case 'addSong':
      return (
        <MessageContainer>
          <AddedSong>
            <Username>{username}</Username> added <AddedSongName>'{label}'</AddedSongName> to the queue.
          </AddedSong>

          <Timestamp>{convertedTimestamp}</Timestamp>
        </MessageContainer>
      )
    case 'removeSong':
      return (
        <MessageContainer>
          <RemovedSong>
            <Username>{username}</Username> removed <RemovedSongName>'{label}'</RemovedSongName> from the queue.
          </RemovedSong>

          <Timestamp>{convertedTimestamp}</Timestamp>
        </MessageContainer>
      )
    case 'skipSong':
      return (
        <MessageContainer>
          <RemovedSong>
            <RemovedSongName>'{label}'</RemovedSongName> was skipped.
          </RemovedSong>

          <Timestamp>{convertedTimestamp}</Timestamp>
        </MessageContainer>
      )
    default:
      return null;
  }
}

export default ChatMessage;