const ChatMessage = (props) => {
  return (
    <p>
      <strong>{props.name}</strong> <em>{props.message}</em>
    </p>
  )
}

export default ChatMessage;