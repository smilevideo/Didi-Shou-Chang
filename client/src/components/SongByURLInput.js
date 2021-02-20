import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import ReactPlayer from 'react-player';
import ReactPlayerYouTube from 'react-player/youtube';
import ReactPlayerSoundCloud from 'react-player/soundcloud';

const Container = styled.div`
  padding: 5px;
  text-align: center;
`;

const SongByURLInput = (props) => {
  const { sendMessage } = props;

  const [error, setError] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const [player, setPlayer] = useState(false);
  const [playerUrl, setPlayerUrl] = useState('');

  const handleNewMedia = (urlInput) => {
    setPlayerUrl(urlInput);
    setPlayer(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (ReactPlayerYouTube.canPlay(urlInput) || ReactPlayerSoundCloud.canPlay(urlInput)) {
      handleNewMedia(urlInput);
      setError(null);
    }

    else {
      setError('URL is not a valid YT or SC link');
    };

    setUrlInput('');
  };

  const handleChange = (event) => {
    setUrlInput(event.target.value);
  };

  const handleDuration = (duration) => {
    const message = { duration, url: playerUrl, type: 'addSong' };
    sendMessage(message);
    setPlayer(false);
  };

  return (
    <Container> 
      {player && (
        <ReactPlayer
          url={playerUrl}
          playing={false}
          width="0"
          height="0"
          onDuration={handleDuration}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          maxLength={100}
          value={urlInput} 
          onChange={handleChange}   
        />
        <input type="submit" value="yt/sc only" />
      </form>
      
      {error && <div>{error}</div>}
    </Container>
  )
}

export default SongByURLInput;