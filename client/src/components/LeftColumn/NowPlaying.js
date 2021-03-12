import styled from 'styled-components';

import Duration from 'utils/Duration';

const Song = styled.li`
  height: 100px;
  max-height: 100px;

  border: 1px solid rgb(33, 38, 45);
  border-top: 0;

  margin: 0;
  padding: 5px;

  display: grid;
  grid-template-columns: calc(100% - 36px) 35px;
  grid-template-rows: 1fr 22px;
  grid-gap: 8px;

  background-image: url('/assets/woo4.gif');
  background-position-y: 50%;
  background-size: cover;

  color: white;
`

const SongTitle = styled.div`
  grid-column: 1;
  grid-row: 1;

  width: 100%;

  font-weight: bold;

  margin-bottom: 10px;
`

const SkipButton = styled.span`
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

    opacity: 1;

    &:hover {
      cursor: pointer;
    }
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

const NowPlaying = (props) => {
  const { song, sendMessage } = props;

  const skipNowPlaying = (label) => {
    if (window.confirm(`Skip '${label}'?`)) {
      const message = {
        type: 'removeSong',
        label,
        index: 0,
      };
  
      sendMessage(message);
    };
  };

  return <Song song={song}>
    {song && <>
      <SkipButton onClick={() => skipNowPlaying(song.label)} >
        <img src="/assets/icon-close.svg" alt="remove song from queue" />
      </SkipButton>
      
      <SongTitle>
        <div>
          {song.label}
        </div>
      </SongTitle>
      
      <AddedBy>
        {`Added by ${song.username}`}
      </AddedBy>

      <Length>
        <Duration seconds={song.duration} />
      </Length>
    </>}
  </Song>
}

export default NowPlaying; 