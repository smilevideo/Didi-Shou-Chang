import styled from 'styled-components';

import Duration from 'utils/Duration';

const Container = styled.div`
  height: calc(100vh - 45px - 100px);
  
  border: 1px solid rgb(45, 55, 65);
`

const SongList = styled.ul`
  margin: 0;
  padding: 0;

  height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
`

const Song = styled.li`
  min-height: 70px;

  border: 1px solid rgb(33, 38, 45);

  margin: 0;
  padding: 5px;

  display: grid;
  grid-template-columns: calc(100% - 36px) 35px;
  grid-template-rows: 1fr 22px;
  grid-gap: 8px;
`

const SongTitle = styled.div`
  grid-column: 1;
  grid-row: 1;

  width: 100%;

  font-weight: bold;

  margin-bottom: 10px;
`

const PlaceNumber = styled.span`
  grid-column: 2;
  grid-row: 1;

  color: rgb(88, 166, 255);
  font-weight: bold;

  border-radius: 14px;
  border: 1px solid rgb(33, 38, 45);

  height: 28px;
  width: 28px;

  display: grid;
  justify-content: center;
  align-items: center;

  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    opacity: 0;

    transition: opacity 0.1s;

    &:hover {
      opacity: 1;
      cursor: pointer;
    };
  };
`

const AddedBy = styled.div`
  grid-column: 1;
  grid-row: 2;

  font-size: 0.9rem;
`

const Length = styled.div`
  grid-column: 2;
  grid-row: 2;

  font-size: 0.9rem;
`

const SongQueue = (props) => {
  const { songQueue, sendMessage } = props;

  const removeFromQueue = (index, label, url) => {
    if (window.confirm(`Rixslay '${label}'?`)) {
      const message = {
        type: 'removeSong',
        label,
        index,
        url
      };
  
      sendMessage(message);
    };
  };

  const songQueueWithoutFirst = songQueue.filter((song, index) => {
    return index !== 0;
  });

  return (
    <Container>
      <SongList>
        {songQueueWithoutFirst.map((song, index) => {
          const { username, label, duration, url } = song;

          return <Song key={`${label} - ${index + 1}`}>
            <PlaceNumber 
              className="placenumber" 
              onClick={() => removeFromQueue(index + 1, label, url)}
            >
              {index + 1}
              <img src="/assets/icon-close.svg" alt="remove song from queue" />
            </PlaceNumber>
            
            <SongTitle>
              <div>
                {label}
              </div>
            </SongTitle>
            
            <AddedBy>
              {`Added by ${username}`}
            </AddedBy>

            <Length>
              <Duration seconds={duration} />
            </Length>
          </Song>
        })}
      </SongList>
    </Container>
  )
}

export default SongQueue;