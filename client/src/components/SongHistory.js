import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

import Duration from 'utils/Duration';

const Container = styled.div`
  height: 50%;
  
  border: 1px solid black;
`

const Header = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  height: 30px;

  background-color: #333333;
  color: #CCCCCC;

  position: sticky; top: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

const SongList = styled.ul`
  margin: 0;
  padding: 0;

  overflow-y: auto;

  max-height: calc(100% - 40px);
`

const Song = styled.li`
  position: relative;

  border-bottom: 1px solid purple;
  margin: 0;
  padding: 5px;
`

const PlaceNumber = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  color: blue;
  font-weight: bold;

  border-radius: 20px;
  border: 1px solid grey;

  height: 40px;
  width: 40px;

  display: grid;
  justify-content: center;
  align-items: center;
`

const AddedBy = styled.div`
  font-size: 0.9rem;
`

const Length = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`

const SongHistory = (props) => {
  const { songHistory } = props;

  return (
    <Container>
      <Header>PAST</Header>
      <SongList>
        {songHistory.map((song, index) => {
          const { username, oEmbedData, url, duration, timestamp } = song;
  
          if (oEmbedData) {
            const { author_name, title } = oEmbedData;

            return <Song key={index}>
              <PlaceNumber>{index + 1}</PlaceNumber>
              
              <div>{author_name}</div>
              <a href={url}>{title}</a>
              
              <AddedBy>{`Added by ${username}, played at ${timestamp}`}</AddedBy>
            </Song>
          }

          else {
            return <Song key={index}>
              <div>asdf</div>
            </Song>
          }
        })}
      </SongList>
    </Container>
  )
}

export default SongHistory;