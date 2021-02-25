import styled from 'styled-components';

import { useState, useEffect, useRef } from 'react';

import ReactPlayer from 'react-player';

import Duration from 'utils/Duration';

const Container = styled.div`
  padding: 5px;

  text-align: center;

  display: grid;
  grid-template-columns: 15% 1fr 15%;

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
  display: grid;
  grid-template-rows: 1fr 90px;
  grid-template-columns: minmax(55px, 100%);
  justify-content: center;
  align-items: center;

  /* border: 1px solid black; */
  /* border-radius: 5px;

  box-shadow: 1px 1px 1px rgb(200, 200, 200); */

  div {
    /* border-bottom: 1px solid black; */
  }
`

const VolumeInput = styled.input`
  height: 90%;

  /* mode: vertical - a proper method seems yet to be standardized and implemented by browsers... */
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
`

const AudioPlayer = (props) => {
  const { song, seekTime } = props;
  
  const [error, setError] = useState(null);
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
    const { loaded, loadedSeconds, played, playedSeconds } = progress;

    setElapsed(played);

    // loaded: 0.1284723857811503
    // loadedSeconds: 30.000999999999998
    // played: 0.0248933544266832
    // playedSeconds: 5.8131210190734866
  }

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  }

  if (!song) {
    return <Container>
      <div />

      <div>
        <Title>
          NO MUSIC NO IDOL
        </Title>
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
          orient="vertical" /* makes it vertical for firefox or something */
        />
      </Volume>
    </Container>;
  }

  const { url, duration, oEmbedData } = song;

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
          {oEmbedData.title}
        </Title>

        <Elapsed>
          <Duration seconds={elapsed * duration} /> / <Duration seconds={duration} />
        </Elapsed>

        <div>
          <progress max={1} value={elapsed}>{elapsed}</progress>
        </div>
      </div>

      <Volume>
        Volume

        <VolumeInput
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
          orient="vertical" /* makes it vertical for firefox or something */
        />
      </Volume>
    </Container>
  );
};

export default AudioPlayer;