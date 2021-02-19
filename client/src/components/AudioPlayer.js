import styled from 'styled-components';

import { useState, useEffect, useRef } from 'react';

import ReactPlayer from 'react-player';

import Duration from 'utils/Duration';

const Container = styled.div`
  padding: 5px;

  text-align: center;
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

const AudioPlayer = (props) => {
  const { song, seekTime } = props;

  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(null);

  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current && seekTime > 0) {
      playerRef.current.seekTo(seekTime, 'seconds');
      console.log(seekTime);
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
      Nothing currently playing.
    </Container>;
  }

  const { url, duration, oEmbedData } = song;

  return (
    <Container>
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

      <div>
        {error}
      </div>

      <Title>
        {oEmbedData.title}
      </Title>

      <Elapsed>
        <Duration seconds={elapsed * duration} /> / <Duration seconds={duration} />
      </Elapsed>

      <div>
        <progress max={1} value={elapsed}>{elapsed}</progress>
      </div>

      <hr />

      <div>
        Volume
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={handleVolumeChange}
      />

    </Container>
  );
};

export default AudioPlayer;