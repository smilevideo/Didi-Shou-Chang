import styled from 'styled-components';

const Message = styled.li`
  list-style-type: none;
`

const ChatMessage = (props) => {
  const { type, message, username, timestamp } = props.message;

  switch (type) {
    case 'chat':
      return (
        <Message>
          <strong>{username}</strong> {`${timestamp}: `}{message}
        </Message>
      )
    case 'system':
      return (
        <Message>
          {`${timestamp}: `}<em>{message}</em>
        </Message>
      )
    default:
      return null;
  }
}

export default ChatMessage;