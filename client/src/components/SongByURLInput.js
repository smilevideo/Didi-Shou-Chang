import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ReactPlayer from 'react-player';

const SongByURLInput = (props) => {
  const { ws } = props;

  const [error, setError] = useState(null);
  const [mediaURL, setMediaURL] = useState('');

  const handleNewMedia = () => {
    const message = { url: mediaURL, type: 'addSong' };
    ws.send(JSON.stringify(message));
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (ReactPlayer.canPlay(mediaURL)) {
      handleNewMedia();
      setError(null);
    }

    else {
      setError('URL is not valid media');
    };

    setMediaURL('');
  }
  
  const handleChange = (event) => {
    setMediaURL(event.target.value);
  }

  return (
    <> 
      <form onSubmit={handleSubmit}>
        <input type="text" value={mediaURL} onChange={handleChange} />
        <input type="submit" />
      </form>
      
      {error && <div>{error}</div>}
    </>
  )
}

export default SongByURLInput;