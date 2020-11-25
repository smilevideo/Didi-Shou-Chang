import { useState } from 'react';

const ChatInput = (props) => {
  const [message, setMessage] = useState('');

  return (
    <form
      action="."
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmitMessage(message);
        setMessage('');
      }}
    >
      <input
        type="text"
        placeholder={'Enter message...'}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <input type="submit" value={'Send'} />
    </form>
  )
}

export default ChatInput