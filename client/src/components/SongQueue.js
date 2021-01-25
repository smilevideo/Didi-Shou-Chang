import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

const Container = styled.div`
  height: 50%;
  overflow-y: auto;
  
  border: 1px solid black;
`

const SongList = styled.ul`
  margin: 0;
  padding: 0;
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

const SongQueue = (props) => {
  const { songQueue } = props;

  return (
    <Container>
      <SongList>
        {songQueue.map((song, index) => {
          const { username, oEmbedData, url } = song;
  
          if (oEmbedData) {
            const { author_name, title } = oEmbedData;

            return <Song key={index}>
              <PlaceNumber>{index + 1}</PlaceNumber>
              
              <div>{author_name}</div>
              <div>{title}</div>

              <AddedBy>{`Added by ${username}`}</AddedBy>
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

export default SongQueue;