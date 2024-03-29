import styled from 'styled-components';

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
  min-height: 80px;

  border: 1px solid rgb(33, 38, 45);

  margin: 0;
  padding: 7px;

  display: grid;
  grid-template-columns: calc(100% - 35px) 33px;
  grid-template-rows: 1fr 22px;
  grid-gap: 2px;
`

const SongTitle = styled.a`
  grid-column: 1;
  grid-row: 1;

  width: 100%;

  font-weight: bold;

  text-decoration: none;

  color: ${props => props.color};

  &:hover {
    text-decoration: underline;
  }
`

const PlaceNumber = styled.div`
  grid-column: 2;
  grid-row: 1;

  color: rgb(88, 166, 255);
  font-weight: bold;
  

  height: 24px;


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

  const getSongTitleColor = (index) => {
    const colorList = [
      "#BB68FC",
      "#03DAC5",
      "#7132FC",
      "#FF7597",
      "#FF0266",
    ];
  
    return colorList[index % 5];
  };

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
            
            <SongTitle 
              href={url} 
              target="_blank" 
              rel="noreferrer" 
              color={getSongTitleColor(index)}
            >
              {label}
            </SongTitle>
            
            <AddedBy>
              {`Played by ${username} at ${convertedTimestamp}`}
            </AddedBy>
          </Song>
        })}
      </SongList>
    </Container>
  )
}

export default SongHistory;