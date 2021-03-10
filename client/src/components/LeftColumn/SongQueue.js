import styled from 'styled-components';

import Duration from 'utils/Duration';

const ContainerList = styled.ul`  
  border: 1px solid rgb(45, 55, 65);

  margin: 0;
  padding: 0;

  overflow-y: auto;
  overflow-x: hidden;

  max-height: calc(100vh - 45px);

  li:nth-child(1) {
    background-image: url('/assets/woo3.gif');
    background-position-y: 50%;
    background-size: cover;

    min-height: 100px;

    color: white;

    .placenumber {
      display: none;
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
  grid-template-rows: 1fr 22px 22px;
  grid-gap: 8px;
`

const SongTitle = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;

  width: 100%;

  font-weight: ${props => props.first ? 'unset' : 'bold'};
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
        label,
        index,
      };
  
      sendMessage(message);
    };
  };

  return (
    <ContainerList>
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
    </ContainerList>
  )
}

export default SongQueue;