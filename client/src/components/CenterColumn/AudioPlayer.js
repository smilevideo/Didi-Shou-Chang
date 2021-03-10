import styled from 'styled-components';

import { useState, useEffect, useRef } from 'react';

import ReactPlayer from 'react-player';

import Duration from 'utils/Duration';

const Container = styled.div`
  padding: 5px;

  text-align: center;

  display: grid;
  grid-template-columns: minmax(15%, 25%) 1fr minmax(15%, 25%);
  grid-template-rows: 1fr 125px;

  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  
  margin-bottom: 10px;

  color: ${props => props.song ? 'rgb(88, 166, 255)' : 'unset'};

  transition: color 1s ease;
`

const Elapsed = styled.div`
  font-size: 1rem;
  font-weight: bold;
`

const SongProgressContainer = styled.div`
  width: 160px;
  height: 8px;

  display: grid;
  justify-content: center;
  align-items: center;

  margin: 10px auto 5px auto;

  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 0 2pt 1pt rgb(88, 166, 255);
`

const SongProgress = styled.progress`
  width: 160px;
`

const Volume = styled.div`
  grid-column: 2;
  grid-row: 2;

  display: ${props => props.hide ? 'none' : 'block'};

  max-width: 120px;

  margin: auto;
`

const VolumeInput = styled.input`
  width: 80%;
`

const AudioPlayer = (props) => {
  const { song, seekTime } = props;
  
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(null);

  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && seekTime > 0) {
      playerRef.current.seekTo(seekTime, 'seconds');
    }
  }, [seekTime]);

  const handleError = () => {
    setError('error playing media at this url');
  };

  const handleProgress = (progress) => {
    const { played } = progress;

    setElapsed(played);

    // example values of progress' properties
    // loaded: 0.1284723857811503
    // loadedSeconds: 30.000999999999998
    // played: 0.0248933544266832
    // playedSeconds: 5.8131210190734866
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <Container>
      <div>
        {song && <>
          <ReactPlayer 
            url={song.url}
            playing={true}
            width="0"
            height="0"
            onError={handleError}
            onProgress={handleProgress}
            volume={volume}
            ref={playerRef}
          />
          {error}
        </>}
      </div>

      <div>
        <Title song={song} >
          {song ? song.label : 'NO MUSIC NO IDOL'}
        </Title>

        {song && <>
          <Elapsed>
            <Duration seconds={elapsed * song.duration} /> 
            {' / '}
            <Duration seconds={song.duration} />
          </Elapsed>

          <SongProgressContainer>
            <SongProgress max={1} value={elapsed}>
              {elapsed}
            </SongProgress>
          </SongProgressContainer>
        </>}
      </div>

      <Volume hide={!song} >
        <div>
          Volume
        </div>

        <VolumeInput
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
        />
      </Volume>
    </Container>
  );
};

export default AudioPlayer;