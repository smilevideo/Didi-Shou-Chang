import { useState, useEffect } from 'react';

const useAudio = url => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    }
  }, [audio]);

  return [playing, togglePlaying];
};

const AudioPlayer = ({ url }) => {
  const [playing, togglePlaying] = useAudio(url);

  return (
    <div>
      <button onClick={togglePlaying}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;