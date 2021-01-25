import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

const Container = styled.div`
  height: 50%;
  overflow-y: auto;
  
  border: 1px solid black;
  
  ul {
    margin: 10px;
    padding: 0;
  }
`

const SongHistory = (props) => {
  const { songHistory } = props;

  return (
    <Container>
      <ul>
        {songHistory.map((song, index) => {
          return <li key={index}>
            <div>{song.username}</div>
            <div>{song.url}</div>
          </li>
        })}
      </ul>
    </Container>
  )
}

export default SongHistory;