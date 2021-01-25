import styled from 'styled-components';

import { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';

const AudioPlayer = (props) => {
  const { url } = props;

  const [error, setError] = useState(null);

  const handleError = () => {
    setError('error playing media at this url');
  }

  return (
    <div>
      <ReactPlayer 
        url={url} 
        playing={true}
        width="0"
        height="0"
        onError={handleError}
      />

      {error && <div>{error}</div>}
    </div>
  );
};

export default AudioPlayer;