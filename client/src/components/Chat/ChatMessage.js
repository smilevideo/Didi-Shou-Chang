const ChatMessage = (props) => {
  const { type, message, username } = props.message;

  switch (type) {
    case 'chat':
      return (
        <p>
          <strong>{username}</strong> <em>{message}</em>
        </p>
      )
    case 'system':
      return (
        <p>
          <em>{message}</em>
        </p>
      )
    default:
      return null;
  }
}

export default ChatMessage;