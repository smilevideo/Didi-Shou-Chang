import styled from 'styled-components';

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
`

const Song = styled.li`
  min-height: 70px;

  border-bottom: 1px solid purple;
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
`

const PlaceNumber = styled.div`
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
  grid-row: 2;

  font-size: 0.9rem;
`

const SongHistory = (props) => {
  const { songHistory } = props;

  return (
    <Container>
      <SongList>
        {songHistory.map((song, index) => {
          const { username, label, timestamp } = song;
  
          return <Song key={index}>
            <PlaceNumber>
              {index + 1}
            </PlaceNumber>
            
            <SongTitle>
              {label}
            </SongTitle>
            
            <AddedBy>
              {`Added by ${username}, played at ${timestamp}`}
            </AddedBy>
          </Song>
        })}
      </SongList>
    </Container>
  )
}

export default SongHistory;