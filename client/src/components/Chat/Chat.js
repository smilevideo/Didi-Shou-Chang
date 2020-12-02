import { useEffect, useState, useRef } from 'react';
import ChatInput from './ChatInput';
import ChatMessageContainer from './ChatMessageContainer';

const Chat = (props) => {
  const { messages, ws } = props;

  return (
    <div>
      <ChatMessageContainer messages={messages} />

      <ChatInput
        ws={ws}
      />
    </div>
  )
}

export default Chat