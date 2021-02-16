import styled from 'styled-components';

import { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';

import Duration from 'utils/Duration';

const AudioPlayer = (props) => {
  const { song } = props;

  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(null);

  const handleError = () => {
    setError('error playing media at this url');
  };

  const { url, duration, oEmbedData } = song;

  const handleProgress = (progress) => {
    const { loaded, loadedSeconds, played, playedSeconds } = progress;

    setElapsed(played);

    // loaded: 0.1284723857811503
    // loadedSeconds: 30.000999999999998
    // played: 0.0248933544266832
    // playedSeconds: 5.8131210190734866
  }

  return (
    <div>
      <ReactPlayer 
        url={url}
        playing={true}
        width="0"
        height="0"
        onError={handleError}
        onProgress={handleProgress}
      />

      <div>
        {error}
      </div>

      {duration && <>
        <div>
          {`Now Playing: ${oEmbedData.title}`}
        </div>

        <hr />

        <div>
          <Duration seconds={elapsed * duration} /> / <Duration seconds={duration} />
        </div>

        <div>
          <progress max={1} value={elapsed}>{elapsed}</progress>
        </div>
      </>}
    </div>
  );
};

export default AudioPlayer;