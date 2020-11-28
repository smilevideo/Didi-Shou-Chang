const ChatMessage = (props) => {
  const { type, message, username } = props.message;

  switch (type) {
    case 'chat':
      return (
        <li>
          <strong>{username}</strong> <em>{message}</em>
        </li>
      )
    case 'system':
      return (
        <li>
          <em>{message}</em>
        </li>
      )
    default:
      return null;
  }
}

export default ChatMessage;