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

const Header = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  background-color: #333333;
  color: #CCCCCC;
`

const SongHistory = (props) => {
  const { songHistory } = props;

  return (
    <Container>
      <Header>PAST</Header>
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