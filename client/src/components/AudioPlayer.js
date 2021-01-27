import styled from 'styled-components';

import { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';

const AudioPlayer = (props) => {
  const { song } = props;

  const [error, setError] = useState(null);
  const [duration, setDuration] = useState(null);

  const handleError = () => {
    setError('error playing media at this url');
  }

  const handleDuration = (duration) => {
    setDuration(duration);
  }

  return (
    <div>
      <ReactPlayer 
        url={song.url} 
        playing={true}
        width="0"
        height="0"
        onError={handleError}
        onDuration={handleDuration}
      />

      {error && <div>{error}</div>}

      

      {duration && <>
        <div>{`Now Playing: ${song.oEmbedData.title}`}</div>
        <div>{`0:00 / ${duration}`}</div>
      </>}
    </div>
  );
};

export default AudioPlayer;