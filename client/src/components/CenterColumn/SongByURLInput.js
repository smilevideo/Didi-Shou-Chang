import { useState } from 'react';
import styled from 'styled-components';

import ReactPlayer from 'react-player';
import ReactPlayerYouTube from 'react-player/youtube';
import ReactPlayerSoundCloud from 'react-player/soundcloud';

const Container = styled.div`
  padding: 5px;
  text-align: center;
`;

const SongUrlInput = styled.input`
  border-radius: 5px;
  border: 1px solid rgb(48, 54, 61);
`

const Error = styled.div`
  min-height: 58px;
`

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
      setError('Not a valid YT or SC URL');
      
      setTimeout(() => {
        setError(null);
      }, 5000)
    };

    setUrlInput('');
  };

  const handleChange = (event) => {
    setUrlInput(event.target.value);
  };

  const handleDuration = async (duration) => {
    const message = {
      type: 'addSong',
      url: playerUrl, 
      duration, 
    };
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
        <SongUrlInput
          type="text" 
          maxLength={100}
          value={urlInput} 
          onChange={handleChange}   
        />
      </form>
      
      <Error>
        {error}
      </Error>
    </Container>
  )
}

export default SongByURLInput;