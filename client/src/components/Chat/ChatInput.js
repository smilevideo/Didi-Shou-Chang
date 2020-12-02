import { useState } from 'react';

const ChatInput = (props) => {
  const { ws } = props;

  const [message, setMessage] = useState('');

  const sendMessage = (messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { message: messageString, type: 'chat' };
    ws.send(JSON.stringify(message));
  };

  return (
    <form
      action="."
      onSubmit={(event) => {
        event.preventDefault();

        if (message) {
          sendMessage(message);
          setMessage('');
        }
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