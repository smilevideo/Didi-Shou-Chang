import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  
  border-right: 1px solid rgb(33, 38, 45);
`

const SongList = styled.ul`
  margin: 0;
  padding: 0;

  overflow-y: auto;
  overflow-x: hidden;

  max-height: calc(100vh - 45px);
`

const Song = styled.li`
  min-height: 70px;

  border-bottom: 1px solid rgb(33, 38, 45);
  border-right: 1px solid rgb(33, 38, 45);

  margin: 0;
  padding: 5px;

  display: grid;
  grid-template-columns: calc(100% - 36px) 35px;
  grid-template-rows: 1fr 22px;
  grid-gap: 8px;
`

const SongTitle = styled.a`
  grid-column: 1;
  grid-row: 1;

  width: 100%;

  font-weight: bold;

  text-decoration: none;

  color: rgb(150, 180, 200);

  &:hover {
    text-decoration: underline;
  }
`

const PlaceNumber = styled.div`
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
  grid-row: 2;

  font-size: 0.9rem;
`

const SongHistory = (props) => {
  const { songHistory } = props;

  const UtcHoursOffset = (new Date().getTimezoneOffset() / 60) * -1;

  return (
    <Container>
      <SongList>
        {songHistory.map((song, index) => {
          const { username, label, timestamp, url } = song;

          const timestampHours = timestamp.substring(0, 2);
          let newHours = parseInt(timestampHours, 10) + UtcHoursOffset;
          if (newHours < 0) {
            newHours += 24;
          };
          const convertedTimestamp = `${newHours}${timestamp.substring(2)}`;
  
          return <Song key={`${label} - ${index}`} >
            <PlaceNumber>
              {index + 1}
            </PlaceNumber>
            
            <SongTitle href={url} target="_blank" rel="noreferrer" >
              {label}
            </SongTitle>
            
            <AddedBy>
              {`Added by ${username}, played at ${convertedTimestamp}`}
            </AddedBy>
          </Song>
        })}
      </SongList>
    </Container>
  )
}

export default SongHistory;