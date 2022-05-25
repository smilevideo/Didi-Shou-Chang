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
  min-height: 70px;

  border: 1px solid rgb(33, 38, 45);

  margin: 0;
  padding: 5px;

  display: grid;
  grid-template-columns: calc(100% - 36px) 35px;
  grid-template-rows: 1fr 22px;
  grid-gap: 5px;
`

const SongTitle = styled.a`
  grid-column: 1;
  grid-row: 1;

  width: 100%;

  font-weight: bold;

  text-decoration: none;

  color: ${props => props.color};
  
  display: grid;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
  
  img {
    height: 22px;
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

          let songFromProvider = true;
          if (url.startsWith(process.env.REACT_APP_S3_BUCKET_BASE_URL)) {
            songFromProvider = false;
          }
  
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

              <img src={`/assets/${songFromProvider ? 'p-trans.png' : 'tn.png'}`} alt="uploaded song" />
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