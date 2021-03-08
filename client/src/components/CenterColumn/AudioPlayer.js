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
`

const Elapsed = styled.div`
  font-size: 1rem;
  font-weight: bold;
`

const Volume = styled.div`
  grid-column: 2;
  grid-row: 2;

  display: ${props => props.hide ? 'none' : 'block'};

  max-width: 120px;

  margin: auto;

  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200);
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

  if (!song) {
    return <Container>
      <div />

      <div>
        <Title>
          NO MUSIC NO IDOL
        </Title>

        <Volume hide={true}>
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
      </div>
    </Container>;
  }

  const { url, label, duration } = song;

  return (
    <Container>
      <div>
        <ReactPlayer 
          url={url}
          playing={true}
          width="0"
          height="0"
          onError={handleError}
          onProgress={handleProgress}
          volume={volume}
          ref={playerRef}
        />
        {error}
      </div>

      <div>
        <Title>
          {label}
        </Title>

        <Elapsed>
          <Duration seconds={elapsed * duration} /> / <Duration seconds={duration} />
        </Elapsed>

        <div>
          <progress max={1} value={elapsed}>{elapsed}</progress>
        </div>
      </div>

      <Volume>
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