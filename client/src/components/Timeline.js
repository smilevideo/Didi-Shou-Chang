import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  
  border: 1px solid black;
  
  ul {
    margin: 10px;
    padding: 0;
  }
`

const Timeline = (props) => {
  const { songQueue, songHistory } = props;

  return (
    <Container>
      <ul>
        {songQueue.map((song) => {
          return <li>
            <div>{song.username}</div>
            <div>{song.url}</div>
          </li>
        })}
      </ul>

      <hr />

      <ul>
        {songHistory.map((song) => {
          return <li>
            <div>{song.username}</div>
            <div>{song.url}</div>
          </li>
        })}
      </ul>
    </Container>
  )
}

export default Timeline;