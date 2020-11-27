import styled from 'styled-components';
import { useState } from 'react';

const Form = styled.div`
`

const Entry = (props) => {
  const { username, setUsername, setUsernameEntered } = props;

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //stops the "form submission cancelled because form is not connected" console warning -- not sure if it really matters, though..
    setUsernameEntered(true);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        whomst:
        <input
          type="text"
          value={username}
          onChange={handleChangeUsername}
        />
      </label>
      <input type="submit" value="g" disabled={!username} />
    </form>
  )
};

export default Entry;