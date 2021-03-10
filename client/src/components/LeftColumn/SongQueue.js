import styled from 'styled-components';

import Duration from 'utils/Duration';

const Container = styled.div`
  height: calc(100vh - 45px);
  
  border: 1px solid rgb(45, 55, 65);
`

const SongList = styled.ul`
  margin: 0;
  padding: 0;

  height: 100%;

  overflow-y: auto;
  overflow-x: hidden;

  li:nth-child(1) {
    background-image: url('/assets/woo3.gif');
    background-position-y: 50%;
    background-size: cover;

    min-height: 100px;

    color: white;

    .placenumber {
      img {
        opacity: 1;
      }
    }
  }
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

  const removeFromQueue = (index, label) => {
    const confirmationMessage = (index === 0) ? 
      `Skip '${label}'?` :
      `Remove '${label}' from queue?`;

    if (window.confirm(confirmationMessage)) {
      const message = {
        type: 'removeSong',
        label,
        index,
      };
  
      sendMessage(message);
    };
  };

  return (
    <Container>
      <SongList>
        {songQueue.map((song, index) => {
          const { username, label, duration } = song;

          return <Song key={`${label} - ${index}`}>
            <PlaceNumber 
              className="placenumber" 
              onClick={() => removeFromQueue(index, label)}
            >
              {index}
              <img src="/assets/icon-close.svg" alt="remove song from queue" />
            </PlaceNumber>
            
            <SongTitle first={index === 0}>
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