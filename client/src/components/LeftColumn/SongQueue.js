import styled from 'styled-components';

import Duration from 'utils/Duration';

const Container = styled.div`
  height: 100%;
  
  border-right: 1px solid black;
`

const SongList = styled.ul`
  margin: 0;
  padding: 0;

  overflow-y: auto;
  overflow-x: hidden;

  max-height: calc(100vh - 30px);

  li:nth-child(1) {
    background-image: url('/assets/woo3.gif');
    background-position-y: 50%;
    background-size: cover;

    min-height: 100px;

    color: white;
    font-weight: 400;

    .placenumber {
      display: none;
    }
  }
`

const Song = styled.li`
  min-height: 70px;

  border-bottom: 1px solid purple;
  margin: 0;
  padding: 5px;

  display: grid;
  grid-template-columns: calc(100% - 36px) 35px;
  grid-template-rows: 1fr 22px 22px;
  grid-gap: 8px;
`

const SongTitle = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;

  width: 100%;

  font-weight: ${props => props.first ? 'normal' : 'bold'};
`

const PlaceNumber = styled.span`
  grid-column: 2;
  grid-row: 1;

  color: rgb(90, 90, 255);
  font-weight: bold;

  border-radius: 14px;
  border: 1px solid grey;

  height: 28px;
  width: 28px;

  display: grid;
  justify-content: center;
  align-items: center;
`

const AddedBy = styled.div`
  grid-column: 1;
  grid-row: 3;

  font-size: 0.9rem;
`

const Length = styled.div`
  grid-column: 2;
  grid-row: 3;

  font-size: 0.9rem;
`

const RemoveButton = styled.div`
  grid-column: 2;
  grid-row: 2;

  cursor: pointer;
`

const SongQueue = (props) => {
  const { songQueue, sendMessage } = props;

  const removeFromQueue = (index, label) => {
    if (window.confirm(`rixslay ${label}?`)) {
      const message = {
        type: 'removeSong',
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
            <PlaceNumber className="placenumber">
              {index}
            </PlaceNumber>
            
            <SongTitle first={index === 0}>
              <div>
                {label}
              </div>
            </SongTitle>

            <RemoveButton onClick={() => removeFromQueue(index, label)}>
              [ri<span style={{color: 'red'}}>X</span>]
            </RemoveButton>
            
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